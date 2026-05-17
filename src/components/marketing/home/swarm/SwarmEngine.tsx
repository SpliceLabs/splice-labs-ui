// SwarmEngine: regime state machine + section-driven transitions.
//
// Lives inside SwarmCanvas's R3F tree. Owns one SwarmV7 instance and:
//   1. Pre-loads every GLB referenced by the registry + bakes all procedural
//      targets at mount.
//   2. Watches activeSectionRef. On change, starts a transition:
//        t1 = current visual state (snapshot of where swarm physically is)
//        t2 = cloud (always — the dispersal way-point)
//        t3 = destination regime's targets
//        morph: 0 → 2 over TRANSIT_MS (eased)
//        boids: lerp from "traveling" preset to destination preset
//      On settle: rewrite slots so subsequent transits start clean.
//   3. While settled in hero (sequence regime), morph is driven by
//      heroProgressRef instead of the transition state machine.
//   4. Per-frame parallax: groupY = (sectionMidY - scrollY) * scaleFactor,
//      smoothed. Swarm appears to lag scroll, then chase to new section
//      anchor when activeSectionRef changes.

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Color, Group, type PerspectiveCamera, Texture, Vector3 } from "three";
import {
  SwarmV7,
  type SwarmAnimConfig,
  type SwarmBoidsConfig,
  type SwarmRegimeBank,
} from "./SwarmV7";
import type { SectionId, SwarmRefs } from "./swarmRefs";
import { SECTION_IDS } from "./swarmRefs";
import {
  ATTRACTOR_ENVELOPE,
  autoSpinSpeedOf,
  BOIDS_PRESETS,
  type BoidsPreset,
  boidsPresetOf,
  DEFAULT_AUTO_SPIN_SPEED,
  type FlockEnvelope,
  flockEnvelopeOf,
  type RegimeStep,
  lerpBoids,
  lerpMaterial,
  materialPresetOf,
  rotationOffsetOf,
  type SectionRegime,
  SETTLE_PRESETS,
} from "@/lib/swarm/regimes";
import { SECTION_REGIMES } from "../config/sectionRegimes";
import { INITIAL_FLUID, INITIAL_TRANSFORM } from "./swarmRefs";
import { sampleGLBScene } from "@/lib/swarm/sampleGLB";
import { cubeEdgesTargets, orbitalOmegas } from "@/lib/swarm/targets";

const N = 1728;

// Phase-1 fluid baseline now lives in swarmRefs.ts as INITIAL_FLUID so the
// dev panel + engine share one source of truth. Engine still passes a
// snapshot to SwarmV7 (legacy prop path); the live fluidRef takes priority
// in useFrame.
// autoSpinSpeed here is a fallback only; SwarmV7 reads the live
// autoSpinSpeedRef each frame, which the engine writes from the active
// section's per-section override (see autoSpinSpeedOf).
const ANIM: SwarmAnimConfig = {
  hoverSpeed: 0.6,
  hoverAmplitude: 0.08,
  autoSpinSpeed: DEFAULT_AUTO_SPIN_SPEED,
};

// Transit duration (ms). 0..0.5 = phase 1 (current → cloud / disperse).
// 0.5..1.0 = phase 2 (cloud → destination / reform). Tune by feel.
const TRANSIT_MS = 1200;
// Sun-tint cross-fade duration (ms), independent of TRANSIT_MS. Tint
// in/out runs on its own clock so the color can drift in slowly even
// after the shape + slot have already settled.
const TINT_FADE_MS = 7000;
// Cage cross-fade duration (ms). Quicker than tint so the wireframe cube
// resolves into amber within the user's settle dwell rather than mid-scroll.
const CAGE_FADE_MS = 3000;
// Approximate swarm bounding diameter at scale=1 (sphere of radius ~1.65).
// Used to convert a slot's projected world size into a swarm scale factor.
const SWARM_BASELINE_DIAMETER = 3.3;
// Fraction of the slot's min-dimension the swarm should fill. <1 = padding.
const SLOT_FILL_FRACTION = 0.9;

// Project a DOM slot rect (CSS pixels, viewport-relative) → world-space
// position + scale for the swarm group. The fixed full-viewport canvas means
// canvas pixels ≡ viewport pixels, so getBoundingClientRect numbers map
// directly through the camera's projection at z=0.
//
// posY tracks the slot's actual vertical center: swarm scrolls with its
// section as the user moves through the page (slot is placed at the section's
// vertical mid by SwarmSlot, so the swarm rides along with the section's
// content rather than pinning to viewport center).
function projectSlot(
  el: HTMLElement,
  camera: PerspectiveCamera,
  size: { width: number; height: number },
): { posX: number; posY: number; scale: number } {
  const rect = el.getBoundingClientRect();
  const fovRad = (camera.fov * Math.PI) / 180;
  const visibleHeight = 2 * camera.position.z * Math.tan(fovRad / 2);
  const worldPerPx = visibleHeight / size.height;
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const posX = (cx - size.width / 2) * worldPerPx;
  // Screen-Y grows down, world-Y grows up — flip the sign.
  const posY = (size.height / 2 - cy) * worldPerPx;
  const minDimPx = Math.min(rect.width, rect.height);
  const scale =
    (minDimPx * worldPerPx * SLOT_FILL_FRACTION) / SWARM_BASELINE_DIAMETER;
  return { posX, posY, scale };
}

// ---------------------------------------------------------------------------
// Registry walking — collect all GLB URLs to preload, all RegimeSteps to bake.

function collectGLBUrls(): string[] {
  const set = new Set<string>();
  for (const id of SECTION_IDS) {
    const r = SECTION_REGIMES[id];
    const visit = (step: RegimeStep) => {
      if (step.source.kind === "glb") set.add(step.source.url);
    };
    if (r.kind === "single") visit(r);
    else for (const s of r.steps) visit(s);
  }
  return Array.from(set);
}

const GLB_URLS = collectGLBUrls();

function resolveStepTargets(
  step: RegimeStep,
  glbScenes: Map<string, Group>,
): Vector3[] {
  if (step.source.kind === "glb") {
    const cage = step.source.cage;
    const cageN = cage ? Math.floor(N * cage.ratio) : 0;
    const innerN = N - cageN;

    let inner: Vector3[] | null = null;
    const scene = glbScenes.get(step.source.url);
    if (scene) {
      inner = sampleGLBScene(scene, innerN, {
        fitRadius: step.source.fitRadius ?? 1.5,
      });
    }
    if (!inner) inner = step.source.fallback(innerN);

    if (cage && cageN > 0) {
      return inner.concat(cubeEdgesTargets(cageN, cage.halfExtent));
    }
    return inner;
  }
  return step.source.gen(N);
}

function resolveSettledTargets(
  regime: SectionRegime,
  glbScenes: Map<string, Group>,
): Vector3[] {
  if (regime.kind === "single") return resolveStepTargets(regime, glbScenes);
  return resolveStepTargets(regime.steps[0], glbScenes);
}

// Per-particle omega (rad/sec) + tilt (rad) for one resolved regime step.
// Non-rotating steps return all zeros — kernel applies no transform. Two
// rotation paths supported (checked in this order):
//   - step.cubeShellsLocal → classify particles by x → per-cube center +
//                            omega. Kernel rotates each particle around its
//                            cube's center, not the world origin.
//   - step.orbital   → classifier-based omega (per-ring), constant tilt,
//                      rotation around world origin.
//   - step.rotation  → uniform omega + tilt across all particles, rotation
//                      around world origin.
// First match wins. Non-rotating regimes return zero buffers everywhere.
function rotationDataForStep(
  step: RegimeStep,
  positions: Vector3[],
): { omegas: Float32Array; tilts: Float32Array; centers: Vector3[] } {
  const N = positions.length;
  const zeroCenters = (): Vector3[] =>
    Array.from({ length: N }, () => new Vector3(0, 0, 0));
  if (step.cubeShellsLocal) {
    const p = step.cubeShellsLocal;
    const halfSpan = (p.count - 1) / 2;
    const omegas = new Float32Array(N);
    const tilts = new Float32Array(N);
    const centers: Vector3[] = new Array(N);
    const tilt = p.tilt ?? 0;
    for (let i = 0; i < N; i++) {
      const x = positions[i].x;
      const raw = Math.round(x / p.spacing) + halfSpan;
      const cubeIdx = Math.max(0, Math.min(p.count - 1, raw));
      const xOffset = (cubeIdx - halfSpan) * p.spacing;
      centers[i] = new Vector3(xOffset, 0, 0);
      omegas[i] = p.omegas[cubeIdx] ?? 0;
      tilts[i] = tilt;
    }
    return { omegas, tilts, centers };
  }
  if (step.orbital) {
    const omegas = orbitalOmegas(positions, step.orbital);
    const tilts = new Float32Array(N);
    tilts.fill(step.orbital.tilt);
    return { omegas, tilts, centers: zeroCenters() };
  }
  if (step.rotation) {
    const omegas = new Float32Array(N);
    omegas.fill(step.rotation.omega);
    const tilts = new Float32Array(N);
    tilts.fill(step.rotation.tilt ?? 0);
    return { omegas, tilts, centers: zeroCenters() };
  }
  return {
    omegas: new Float32Array(N),
    tilts: new Float32Array(N),
    centers: zeroCenters(),
  };
}

function rotationDataForRegime(
  regime: SectionRegime,
  positions: Vector3[],
): { omegas: Float32Array; tilts: Float32Array; centers: Vector3[] } {
  const step = regime.kind === "single" ? regime : regime.steps[0];
  return rotationDataForStep(step, positions);
}

function resolveBoidsPreset(regime: SectionRegime): BoidsPreset {
  if (regime.kind === "single") return regime.boids ?? "default";
  return regime.steps[0].boids ?? "default";
}

function regimeMaterialPreset(regime: SectionRegime) {
  if (regime.kind === "single") return regime.material;
  return regime.steps[0].material;
}

// Per-frame buffers for the phase-driven emissive crossfade (preset.emissiveColor
// → preset.emissiveColorSustain). Module-scope so the per-frame writer doesn't
// allocate. SwarmEngine is single-instance, so sharing is safe.
const emissiveFromBuf = new Color();
const emissiveToBuf = new Color();
const emissiveOutBuf = new Color();

function regimeTintOf(
  regime: SectionRegime,
): { color: string; radius: number } | undefined {
  if (regime.kind === "single") return regime.tint;
  return regime.steps[0].tint;
}

function regimeSunOf(
  regime: SectionRegime,
):
  | { color: string; radius: number; intensity: number; falloff: number }
  | undefined {
  if (regime.kind === "single") return regime.sunEmission;
  return regime.steps[0].sunEmission;
}

// Cage lives on the regime's GLB source, not on the regime itself. Returns
// resolved color + classifier threshold for the engine's per-frame writer.
// Threshold defaults to halfExtent - 0.2 — cage particles sit at the
// halfExtent on at least one axis (boxMax ~= halfExtent), bird particles
// stay well under it (boxMax bounded by fitRadius).
function regimeCageOf(
  regime: SectionRegime,
): { color: string; threshold: number } | undefined {
  const step = regime.kind === "single" ? regime : regime.steps[0];
  if (step.source.kind !== "glb") return undefined;
  const cage = step.source.cage;
  if (!cage) return undefined;
  return {
    color: cage.color ?? "#FFB800",
    threshold: cage.threshold ?? cage.halfExtent - 0.2,
  };
}

// ---------------------------------------------------------------------------
// Regime bank builder. Walks the registry, resolves every regime to
// Vector3[N], assigns each a stable index in the big buffer, and exposes
// helper lookups so the state machine can map section ids → indices.
//
// Hero is special: it's a 3-step sequence, so it occupies 3 consecutive
// slots. Hero's step 1 (cloud) is also the "transit cloud" — every
// transition disperses through it.

type RegimeBankBuild = {
  bank: SwarmRegimeBank;
  sectionToIdx: Record<SectionId, number>;
  heroStepIndices: [number, number, number];
  cloudIdx: number;
};

function buildRegimeBank(
  glbScenes: Map<string, Group>,
): RegimeBankBuild {
  const regimes: Vector3[][] = [];
  const omegasPerRegime: Float32Array[] = [];
  const tiltsPerRegime: Float32Array[] = [];
  const centersPerRegime: Vector3[][] = [];
  const sectionToIdx: Partial<Record<SectionId, number>> = {};

  const pushRegime = (
    step: RegimeStep | SectionRegime,
    positions: Vector3[],
  ) => {
    regimes.push(positions);
    const r = rotationDataForStep(step as RegimeStep, positions);
    omegasPerRegime.push(r.omegas);
    tiltsPerRegime.push(r.tilts);
    centersPerRegime.push(r.centers);
  };

  const heroRegime = SECTION_REGIMES.hero;
  let heroStepIndices: [number, number, number];
  if (heroRegime.kind === "sequence") {
    const ids: number[] = [];
    for (const step of heroRegime.steps) {
      const positions = resolveStepTargets(step, glbScenes);
      pushRegime(step, positions);
      ids.push(regimes.length - 1);
    }
    heroStepIndices = [ids[0], ids[1], ids[2]];
    sectionToIdx.hero = heroStepIndices[0];
  } else {
    // Hero collapsed to single — degenerate but keep working.
    const positions = resolveSettledTargets(heroRegime, glbScenes);
    const r = rotationDataForRegime(heroRegime, positions);
    regimes.push(positions);
    omegasPerRegime.push(r.omegas);
    tiltsPerRegime.push(r.tilts);
    centersPerRegime.push(r.centers);
    const i = regimes.length - 1;
    heroStepIndices = [i, i, i];
    sectionToIdx.hero = i;
  }
  const cloudIdx = heroStepIndices[1];

  for (const id of SECTION_IDS) {
    if (id === "hero") continue;
    const regime = SECTION_REGIMES[id];
    const positions = resolveSettledTargets(regime, glbScenes);
    const r = rotationDataForRegime(regime, positions);
    regimes.push(positions);
    omegasPerRegime.push(r.omegas);
    tiltsPerRegime.push(r.tilts);
    centersPerRegime.push(r.centers);
    sectionToIdx[id] = regimes.length - 1;
  }

  return {
    bank: {
      regimes,
      omegasPerRegime,
      tiltsPerRegime,
      centersPerRegime,
      initialT1Idx: heroStepIndices[0],
      initialT2Idx: heroStepIndices[1],
      initialT3Idx: heroStepIndices[2],
    },
    sectionToIdx: sectionToIdx as Record<SectionId, number>,
    heroStepIndices,
    cloudIdx,
  };
}

// "From" index for a transit kickoff: for hero (sequence), pick the step
// closest to current morph so the visible shape doesn't jump cut. For
// non-hero, the section's settled idx.
function resolveFromIdx(
  fromSection: SectionId,
  currentMorph: number,
  heroStepIndices: [number, number, number],
  sectionToIdx: Record<SectionId, number>,
): number {
  if (fromSection === "hero") {
    const step = Math.max(0, Math.min(2, Math.round(currentMorph)));
    return heroStepIndices[step];
  }
  return sectionToIdx[fromSection];
}

function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Diagnostic snapshot of all panel-controlled swarm state. Called on
// engine mount and on each section transit kickoff so the console shows
// exactly which values the kernel is running with.
function logSwarmState(
  label: string,
  sectionId: SectionId,
  refs: SwarmRefs,
) {
  console.log(`[swarm] ${label}`, {
    section: sectionId,
    settlePreset: refs.settlePresetRef.current,
    flockDuration: refs.flockDurationRef.current,
    flockBoost: refs.flockBoostRef.current,
    boids: { ...refs.boidsConfigRef.current },
    fluid: { ...refs.fluidConfigRef.current },
    boidsOverride: refs.boidsOverridesRef.current[sectionId],
    fluidOverride: refs.fluidOverridesRef.current[sectionId],
  });
}

// Merge layers on top of the regime preset, in order:
//   1. global settle preset (default = no-op)
//   2. per-section dev override (SwarmDevPanel)
//
// Boost (global ADSR envelope) and per-particle pulse are no longer
// applied at this layer — the kernel multiplies forces by
// max(flockBoost, perParticleFree) per particle. This function only
// resolves the static preset stack; envelope-driven values are written
// to boidsConfigRef.flockBoost / .envPeak each frame separately.
function applyBoidsLayers(
  preset: SwarmBoidsConfig,
  settle: Partial<SwarmBoidsConfig>,
  override: Partial<SwarmBoidsConfig> | undefined,
): SwarmBoidsConfig {
  // ALWAYS return a fresh object — never `return preset`. Engine writes
  // boidsConfigRef.current = applyBoidsLayers(...), and downstream code
  // (envelope overlay, kernel-uniform writeback) MUTATES that ref. If
  // we returned the preset by reference, those mutations would corrupt
  // the global BOIDS_PRESETS[...] object: attractorStrength compounded
  // multiplicatively each frame would explode within ~30 frames and
  // NaN through the kernel, silently blanking the scene.
  return { ...preset, ...settle, ...(override ?? {}) };
}

// ADSR envelope phases.
//   idle    — no transitions firing; phaseStartValue is "held" indefinitely
//   attack  — phaseStartValue → peak over env.attack
//   decay   — peak → sustain over env.decay
//   sustain — held at env.sustain until next note-on
//   release — phaseStartValue → 0 over env.release (reserved)
type EnvPhase = "idle" | "attack" | "decay" | "sustain" | "release";

// Per-channel envelope state. Engine holds one of these per output
// channel (flockBoost, attractor, …) so each can run an independent
// ADSR curve with the same evaluator.
type EnvelopeState = {
  phase: EnvPhase;
  phaseStartMs: number;
  phaseStartValue: number;
};

// Mutates `state` in place to auto-advance phase boundaries (handles
// slow frames + zero-length phases). Returns the envelope value at
// `nowMs`.
//
// Phase transitions reset `phaseStartMs` to the exact boundary time
// (not nowMs) so multiple short phases can elapse within one frame
// without drifting; and reset `phaseStartValue` to the new phase's
// from-point so the lerp math is uniform across phases.
function evaluateEnvelope(
  env: FlockEnvelope,
  state: EnvelopeState,
  nowMs: number,
): number {
  // Auto-advance through finished phases.
  while (
    state.phase === "attack" ||
    state.phase === "decay" ||
    state.phase === "release"
  ) {
    const phaseLen =
      state.phase === "attack"
        ? env.attack
        : state.phase === "decay"
        ? env.decay
        : env.release;
    const elapsed = (nowMs - state.phaseStartMs) / 1000;
    if (elapsed < Math.max(0.001, phaseLen)) break;
    if (state.phase === "attack") {
      state.phaseStartMs += env.attack * 1000;
      state.phaseStartValue = env.peak;
      state.phase = "decay";
    } else if (state.phase === "decay") {
      state.phaseStartMs += env.decay * 1000;
      state.phaseStartValue = env.sustain;
      state.phase = "sustain";
    } else {
      state.phaseStartMs += env.release * 1000;
      state.phaseStartValue = 0;
      state.phase = "idle";
    }
  }

  const tInPhase = (nowMs - state.phaseStartMs) / 1000;
  switch (state.phase) {
    case "idle":
      return state.phaseStartValue;
    case "attack": {
      const k = Math.min(1, tInPhase / Math.max(0.001, env.attack));
      return state.phaseStartValue + (env.peak - state.phaseStartValue) * k;
    }
    case "decay": {
      const k = Math.min(1, tInPhase / Math.max(0.001, env.decay));
      return state.phaseStartValue + (env.sustain - state.phaseStartValue) * k;
    }
    case "sustain":
      return env.sustain;
    case "release": {
      const k = Math.min(1, tInPhase / Math.max(0.001, env.release));
      return state.phaseStartValue + (0 - state.phaseStartValue) * k;
    }
  }
}

// Mutate the live fluid config in place — re-allocating each frame would
// be wasteful since SwarmV7 reads .current on every tick.
function applyFluidOverride(
  target: import("./SwarmV7").SwarmFluidConfig,
  override: Partial<import("./SwarmV7").SwarmFluidConfig> | undefined,
) {
  // Reset to baseline first so overrides don't accumulate when section
  // changes or override is removed.
  Object.assign(target, INITIAL_FLUID);
  if (override) Object.assign(target, override);
}

// ---------------------------------------------------------------------------

type EngineMachine = {
  currentRegimeId: SectionId;
  fromRegimeId: SectionId | null;
  transitStartMs: number | null;
  fromBoidsPreset: BoidsPreset;
  // Pre-transit transform snapshots taken at section-change kickoff so the
  // engine can lerp the swarm group from its current position+scale toward
  // the new section's slot target over TRANSIT_MS instead of snapping.
  fromPosX: number;
  fromPosY: number;
  fromScale: number;
  // Sun-style tint cross-fade — runs on its OWN clock, independent of
  // section transit. tintTransitStartMs is the ms timestamp the current
  // fade kicked off; null means no fade in flight (held at target). Fade
  // re-kicks whenever the active regime's tint status (has-tint vs not)
  // flips, snapshotting the current visibility into fromTintActive so the
  // fade resumes from wherever the previous one left off.
  tintTransitStartMs: number | null;
  fromTintActive: number;
  tintTarget: number;
  // Cage cross-fade — same shape as the tint fade above but on its own
  // clock (CAGE_FADE_MS). Lerps cageActive 0 → 1 on entering a regime
  // with `cage`, 1 → 0 on leaving, picking up from the current value if
  // the user crosses sections mid-fade.
  cageTransitStartMs: number | null;
  fromCageActive: number;
  cageTarget: number;
  // Flock-boost ADSR channel. Section-change kickoff sets
  // flockEnv.phase="attack". evaluateEnvelope walks the curve each
  // frame and writes flockBoostRef.
  flockEnv: EnvelopeState;
  // Attractor-strength ADSR channel. Independent of section-change —
  // starts on engine mount, ramps over ATTRACTOR_ENVELOPE.attack, then
  // sustains at peak forever. Engine multiplies attractorStrength by
  // (1 + attractorEnvValue).
  attractorEnv: EnvelopeState;
  // Last useFrame timestamp (ms). Reserved for any future framerate-
  // independent integrators; not currently read by the envelope (which
  // uses absolute phase-start timestamps instead).
  lastFrameMs: number;
};

export function SwarmEngine({
  envTex,
  refs,
}: {
  envTex: Texture;
  refs: SwarmRefs;
}) {
  if (GLB_URLS.length === 0) {
    return (
      <SwarmEngineInner envTex={envTex} refs={refs} glbScenes={new Map()} />
    );
  }
  return (
    <Suspense fallback={null}>
      <GLBPreloader envTex={envTex} refs={refs} />
    </Suspense>
  );
}

function GLBPreloader({
  envTex,
  refs,
}: {
  envTex: Texture;
  refs: SwarmRefs;
}) {
  // drei's useGLTF auto-configures meshopt + draco decoders. Accepts
  // string | string[]; returns the matching shape. Caches per URL across
  // remounts (matters because every GLB referenced from sectionRegimes
  // ends up here once).
  const loaded = useGLTF(GLB_URLS) as unknown as Array<{ scene: Group }>;
  const glbScenes = useMemo(() => {
    const m = new Map<string, Group>();
    GLB_URLS.forEach((url, i) => m.set(url, loaded[i].scene));
    return m;
  }, [loaded]);
  return <SwarmEngineInner envTex={envTex} refs={refs} glbScenes={glbScenes} />;
}

function SwarmEngineInner({
  envTex,
  refs,
  glbScenes,
}: {
  envTex: Texture;
  refs: SwarmRefs;
  glbScenes: Map<string, Group>;
}) {
  // Build the regime bank once per glb-scene set. All section regimes get
  // pre-baked into one big buffer; transitions just update offset uniforms.
  const built = useMemo(() => buildRegimeBank(glbScenes), [glbScenes]);
  const { bank, sectionToIdx, heroStepIndices, cloudIdx } = built;

  const machineRef = useRef<EngineMachine>({
    currentRegimeId: "hero",
    fromRegimeId: null,
    transitStartMs: null,
    fromBoidsPreset: "default",
    fromPosX: 0,
    fromPosY: 0,
    fromScale: 1,
    tintTransitStartMs: null,
    fromTintActive: 0,
    tintTarget: 0,
    cageTransitStartMs: null,
    fromCageActive: 0,
    cageTarget: 0,
    flockEnv: {
      phase: "idle",
      phaseStartMs: 0,
      phaseStartValue: 1, // matches flockBoostRef init = 1 (page-load preset)
    },
    attractorEnv: {
      // Initialized properly in the engine-mount useEffect with real
      // performance.now() — kept at idle/0 here so first-frame eval
      // returns 0 (no attractor boost) before the mount effect fires.
      phase: "idle",
      phaseStartMs: 0,
      phaseStartValue: 0,
    },
    lastFrameMs: 0,
  });

  useEffect(() => {
    refs.boidsConfigRef.current = applyBoidsLayers(
      boidsPresetOf(resolveBoidsPreset(SECTION_REGIMES.hero)),
      SETTLE_PRESETS[refs.settlePresetRef.current],
      refs.boidsOverridesRef.current.hero,
    );
    refs.materialConfigRef.current = {
      ...materialPresetOf(regimeMaterialPreset(SECTION_REGIMES.hero)),
    };
    applyFluidOverride(
      refs.fluidConfigRef.current,
      refs.fluidOverridesRef.current.hero,
    );
    refs.transformConfigRef.current.posY = 0;
    refs.transformConfigRef.current.posX = 0;
    refs.transformConfigRef.current.scale = 1;
    // Kick the attractor envelope into attack on engine mount — it runs
    // once, ramping attractor from preset → 2× preset over
    // ATTRACTOR_ENVELOPE.attack seconds, then sustains forever.
    machineRef.current.attractorEnv = {
      phase: "attack",
      phaseStartMs: performance.now(),
      phaseStartValue: 0,
    };
    // logSwarmState("load", "hero", refs);
  }, [refs]);

  // Diagnostic: poll fade-related values every 200ms while not at steady
  // state (boost === 1 + decay inactive). Prints boost value, decay flag,
  // duration, and the resulting alignment/separation/cohesion the kernel
  // is currently using. Quiet during idle so the console isn't spammed.
  useEffect(() => {
    const id = setInterval(() => {
      const m = machineRef.current;
      const boost = refs.flockBoostRef.current;
      // Only log while the envelope is actively walking a phase. idle +
      // sustain are steady states with nothing to watch frame-to-frame.
      if (m.flockEnv.phase === "idle" || m.flockEnv.phase === "sustain") return;
      const b = refs.boidsConfigRef.current;
      // console.log("[swarm-fade]", {
      //   section: m.currentRegimeId,
      //   envPhase: m.flockEnv.phase,
      //   flockBoost: boost.toFixed(4),
      //   swarmingRatio: refs.swarmingRatioRef.current.toFixed(4),
      //   align: b.alignment.toFixed(4),
      //   sep: b.separation.toFixed(4),
      //   coh: b.cohesion.toFixed(4),
      // });
    }, 200);
    return () => clearInterval(id);
  }, [refs]);

  useFrame((state) => {
    const m = machineRef.current;
    const desired = refs.activeSectionRef.current;

    // ---- 1. Transition kickoff ----
    if (m.currentRegimeId !== desired && m.transitStartMs === null) {
      const fromIdx = resolveFromIdx(
        m.currentRegimeId,
        refs.swarmStateRef.current.morph,
        heroStepIndices,
        sectionToIdx,
      );
      const toIdx = sectionToIdx[desired];
      // setRegimeIndices: t1=from, t2=cloud, t3=to. Kernel will mix
      // through these as morph animates 0→2.
      refs.swarmHandleRef.current?.setRegimeIndices(fromIdx, cloudIdx, toIdx);
      m.fromRegimeId = m.currentRegimeId;
      m.fromBoidsPreset = resolveBoidsPreset(
        SECTION_REGIMES[m.currentRegimeId],
      );
      m.transitStartMs = performance.now();
      m.currentRegimeId = desired;
      m.fromPosX = refs.transformConfigRef.current.posX;
      m.fromPosY = refs.transformConfigRef.current.posY;
      m.fromScale = refs.transformConfigRef.current.scale;
      // Canonical rotation reference per section: reset the spin accumulator
      // so the section's rotationOffset defines an absolute entry pose
      // independent of how long the user has been on the page or which
      // sections were visited earlier (autoSpinSpeed*dt had been integrating
      // forever before this).
      refs.spinAccumRef.current = 0;
      refs.swarmStateRef.current.morph = 0;
      // Kickoff = note-on for the flock-boost channel. Enter attack from
      // current boost so a section change mid-decay (or mid-attack)
      // crossfades smoothly to the new section's envelope instead of
      // snapping. (The attractor envelope channel runs independently of
      // section changes; engine-mount started it once and it keeps
      // sustaining.)
      m.flockEnv.phase = "attack";
      m.flockEnv.phaseStartMs = performance.now();
      m.flockEnv.phaseStartValue = refs.flockBoostRef.current;
      // logSwarmState(`section change → ${desired}`, desired, refs);
    }

    // ADSR envelopes — phase advances use absolute phase-start
    // timestamps inside evaluateEnvelope so a slow frame doesn't stall
    // the curve. Two independent channels:
    //   - flockEnv:    driven by section-change kickoff (note-on above)
    //   - attractorEnv: started once on engine mount; runs to sustain
    //                   and holds (sustain == peak in ATTRACTOR_ENVELOPE)
    const nowMs = performance.now();
    m.lastFrameMs = nowMs;
    const env = flockEnvelopeOf(SECTION_REGIMES[m.currentRegimeId]);
    const prevPhase = m.flockEnv.phase;
    refs.flockBoostRef.current = evaluateEnvelope(env, m.flockEnv, nowMs);
    if (prevPhase !== m.flockEnv.phase) {
      // console.log(`[swarm-fade] flock ${prevPhase} → ${m.flockEnv.phase}`, {
      //   section: m.currentRegimeId,
      //   flockBoost: refs.flockBoostRef.current.toFixed(4),
      //   swarmingRatio: refs.swarmingRatioRef.current.toFixed(4),
      // });
    }
    const prevAttractorPhase = m.attractorEnv.phase;
    const attractorEnvValue = evaluateEnvelope(
      ATTRACTOR_ENVELOPE,
      m.attractorEnv,
      nowMs,
    );
    // if (prevAttractorPhase !== m.attractorEnv.phase) {
    //   console.log(
    //     `[swarm-fade] attractor ${prevAttractorPhase} → ${m.attractorEnv.phase}`,
    //     { attractorEnvValue: attractorEnvValue.toFixed(4) },
    //   );
    // }

    // ---- 2. Transit progress / settle ----
    if (m.transitStartMs !== null) {
      const elapsed = performance.now() - m.transitStartMs;
      const tRaw = Math.min(1, elapsed / TRANSIT_MS);
      const t = easeInOut(tRaw);
      refs.swarmStateRef.current.morph = t * 2;

      const destPreset = boidsPresetOf(
        resolveBoidsPreset(SECTION_REGIMES[m.currentRegimeId]),
      );
      const fromPreset = boidsPresetOf(m.fromBoidsPreset);
      const traveling = BOIDS_PRESETS.traveling;
      // CLONE traveling — same aliasing risk as applyBoidsLayers: if
      // blended remains a reference to the global preset, end-of-frame
      // mutations on boidsConfigRef.current would corrupt traveling.
      let blended: SwarmBoidsConfig = { ...traveling };
      if (tRaw < 0.2) blended = lerpBoids(fromPreset, traveling, tRaw / 0.2);
      else if (tRaw > 0.8)
        blended = lerpBoids(traveling, destPreset, (tRaw - 0.8) / 0.2);
      // Boost amplification no longer applied here. Kernel reads
      // ec.flockBoost (driven by envelope) and combines with per-particle
      // free flag via max(); transit just resolves the static preset
      // blend.
      refs.boidsConfigRef.current = blended;

      const fromMat = materialPresetOf(
        m.fromRegimeId
          ? regimeMaterialPreset(SECTION_REGIMES[m.fromRegimeId])
          : undefined,
      );
      const destMat = materialPresetOf(
        regimeMaterialPreset(SECTION_REGIMES[m.currentRegimeId]),
      );
      refs.materialConfigRef.current = lerpMaterial(fromMat, destMat, tRaw);
      // Tint cross-fade runs on its own clock (TINT_FADE_MS) in the block
      // below — don't lerp it here. lerpMaterial wrote the preset zeros
      // for tint fields; the dedicated tint block overwrites both.

      if (tRaw >= 1) {
        // Settle. For hero: rebuild slots to the 3-step sequence so the
        // hero-internal scroll driver morphs through humanoid/cloud/sphere.
        // For non-hero: t1=t3=section, t2=cloud (so morph=0 reads section).
        if (m.currentRegimeId === "hero") {
          refs.swarmHandleRef.current?.setRegimeIndices(
            heroStepIndices[0],
            heroStepIndices[1],
            heroStepIndices[2],
          );
        } else {
          const idx = sectionToIdx[m.currentRegimeId];
          refs.swarmHandleRef.current?.setRegimeIndices(idx, cloudIdx, idx);
        }
        m.transitStartMs = null;
        m.fromRegimeId = null;
        // ADSR envelope is already in flight from kickoff (note-on).
        // Transit-settle is no longer a state-machine event for the
        // boost; the envelope's attack/decay timings own the curve.
        refs.boidsConfigRef.current = applyBoidsLayers(
          destPreset,
          SETTLE_PRESETS[refs.settlePresetRef.current],
          refs.boidsOverridesRef.current[m.currentRegimeId],
        );
        applyFluidOverride(
          refs.fluidConfigRef.current,
          refs.fluidOverridesRef.current[m.currentRegimeId],
        );
        refs.swarmStateRef.current.morph = 0;
      }
    } else {
      // ---- 3. Settled ----
      const r = SECTION_REGIMES[m.currentRegimeId];
      if (r.kind === "sequence") {
        refs.swarmStateRef.current.morph =
          Math.max(0, Math.min(1, refs.heroProgressRef.current)) * 2;
      } else {
        refs.swarmStateRef.current.morph = 0;
      }
      // Re-apply layers each settled frame so live dev-panel edits propagate.
      // Light overhead: one shallow spread per frame plus the fluid mutate.
      const settledPreset = boidsPresetOf(
        resolveBoidsPreset(SECTION_REGIMES[m.currentRegimeId]),
      );
      refs.boidsConfigRef.current = applyBoidsLayers(
        settledPreset,
        SETTLE_PRESETS[refs.settlePresetRef.current],
        refs.boidsOverridesRef.current[m.currentRegimeId],
      );
      applyFluidOverride(
        refs.fluidConfigRef.current,
        refs.fluidOverridesRef.current[m.currentRegimeId],
      );
    }

    // ---- 4. Group transform from slot rect ----
    // Active section's <SwarmSlot> element drives swarm position + scale.
    // Slot rect → world coords; swarm renders inside that on-screen box.
    // Transit lerps from the kickoff snapshot toward the new slot target.
    // Missing slot ⇒ fall back to viewport center + scale 1.
    const slotEl = refs.slotRefs.current[m.currentRegimeId];
    const slotTarget = slotEl
      ? projectSlot(slotEl, state.camera as PerspectiveCamera, state.size)
      : { posX: 0, posY: 0, scale: 1 };
    if (m.transitStartMs !== null) {
      const elapsed = performance.now() - m.transitStartMs;
      const tRaw = Math.min(1, elapsed / TRANSIT_MS);
      const tEase = easeInOut(tRaw);
      refs.transformConfigRef.current.posX =
        m.fromPosX + (slotTarget.posX - m.fromPosX) * tEase;
      refs.transformConfigRef.current.posY =
        m.fromPosY + (slotTarget.posY - m.fromPosY) * tEase;
      refs.transformConfigRef.current.scale =
        m.fromScale + (slotTarget.scale - m.fromScale) * tEase;
    } else {
      refs.transformConfigRef.current.posX = slotTarget.posX;
      refs.transformConfigRef.current.posY = slotTarget.posY;
      refs.transformConfigRef.current.scale = slotTarget.scale;
    }

    // Per-section static rotation offset. Additive on top of INITIAL_TRANSFORM
    // base orientation; SwarmV7 adds animated spinAccum to Y on top of this.
    // No regime override ⇒ values match INITIAL_TRANSFORM exactly.
    const rotOffset = rotationOffsetOf(SECTION_REGIMES[m.currentRegimeId]);
    refs.transformConfigRef.current.rotX = INITIAL_TRANSFORM.rotX + rotOffset.x;
    refs.transformConfigRef.current.rotY = INITIAL_TRANSFORM.rotY + rotOffset.y;
    refs.transformConfigRef.current.rotZ = INITIAL_TRANSFORM.rotZ + rotOffset.z;

    // ---- 5. Envelope overlay (one envelope, many outputs) ----
    // Map the global ADSR curve onto a handful of render parameters so a
    // section-change pulse is a coordinated event rather than only a
    // boids-force change. Each output reads its base from the regime
    // preset (or fluid-override-just-written) so the overlay does not
    // compound across frames; transit-time lerps on these specific
    // fields are intentionally superseded by the envelope (envelope
    // window ~10s ≫ transit ~1.2s, so the curve dominates).
    const envNorm =
      env.peak > 0
        ? Math.min(1, Math.max(0, refs.flockBoostRef.current / env.peak))
        : 0;

    // Material: emissive + env brightness pulse with the envelope.
    const matBase = materialPresetOf(
      regimeMaterialPreset(SECTION_REGIMES[m.currentRegimeId]),
    );
    refs.materialConfigRef.current.emissiveIntensity =
      matBase.emissiveIntensity + envNorm * 1.5;
    refs.materialConfigRef.current.envIntensity =
      matBase.envIntensity + envNorm * 0.4;

    // Phase-driven emissive color: when the active preset declares
    // emissiveColorSustain, fade emissiveColor → emissiveColorSustain across
    // the flockEnv decay window, hold at sustain, snap back on release.
    // Presets without emissiveColorSustain inherit whatever lerpMaterial wrote
    // (smooth transit blend across regime-change).
    if (matBase.emissiveColorSustain !== undefined) {
      let k = 0;
      switch (m.flockEnv.phase) {
        case "decay": {
          const flockEnv = flockEnvelopeOf(SECTION_REGIMES[m.currentRegimeId]);
          const tInPhase = (nowMs - m.flockEnv.phaseStartMs) / 1000;
          k = Math.min(1, Math.max(0, tInPhase / Math.max(0.001, flockEnv.decay)));
          break;
        }
        case "sustain":
          k = 1;
          break;
        // idle/attack/release ⇒ k=0 (teal). Release snap-back is intentional.
      }
      emissiveFromBuf.set(matBase.emissiveColor);
      emissiveToBuf.set(matBase.emissiveColorSustain);
      emissiveOutBuf.copy(emissiveFromBuf).lerp(emissiveToBuf, k);
      refs.materialConfigRef.current.emissiveColor = `#${emissiveOutBuf.getHexString()}`;
    }

    // Tint clock — runs every frame, independent of TRANSIT_MS.
    //   1. Resolve the active regime's target visibility (1 if it has a
    //      tint config, else 0).
    //   2. If the target just changed direction, kick off a new fade:
    //      snapshot the current tintActive into fromTintActive and stamp
    //      tintTransitStartMs. The fade picks up wherever the previous
    //      one left off (avoids a snap if the user crosses sections while
    //      a fade is still in flight).
    //   3. While a fade is in flight, lerp linearly over TINT_FADE_MS.
    //      When it lands, null out the start timestamp so we just hold.
    //   4. Color + radius snap to the active tint's values. When leaving a
    //      tinted regime we keep the LAST color/radius around so the
    //      fade-out doesn't lose its hue mid-transition.
    {
      const activeTint = regimeTintOf(SECTION_REGIMES[m.currentRegimeId]);
      const target = activeTint ? 1 : 0;
      if (target !== m.tintTarget) {
        m.tintTarget = target;
        m.fromTintActive = refs.materialConfigRef.current.tintActive;
        m.tintTransitStartMs = nowMs;
      }
      if (activeTint) {
        refs.materialConfigRef.current.tintColor = activeTint.color;
        refs.materialConfigRef.current.tintRadius = activeTint.radius;
      }
      // else: leave color/radius alone so a fade-out keeps its tone.
      if (m.tintTransitStartMs !== null) {
        const tEl = nowMs - m.tintTransitStartMs;
        const tRawTint = Math.min(1, tEl / TINT_FADE_MS);
        refs.materialConfigRef.current.tintActive =
          m.fromTintActive + (m.tintTarget - m.fromTintActive) * tRawTint;
        if (tRawTint >= 1) m.tintTransitStartMs = null;
      } else {
        refs.materialConfigRef.current.tintActive = m.tintTarget;
      }

      // Sun emission rides the same fade clock as tint. Color/radius/
      // intensity/falloff snap to the active sun's values (same "leave
      // alone on fade-out" convention as tint). sunActive == tintActive
      // so amber color (mix) and amber light (additive) move together.
      const activeSun = regimeSunOf(SECTION_REGIMES[m.currentRegimeId]);
      if (activeSun) {
        refs.materialConfigRef.current.sunColor = activeSun.color;
        refs.materialConfigRef.current.sunRadius = activeSun.radius;
        refs.materialConfigRef.current.sunIntensity = activeSun.intensity;
        refs.materialConfigRef.current.sunFalloff = activeSun.falloff;
      }
      refs.materialConfigRef.current.sunActive =
        refs.materialConfigRef.current.tintActive;

      // Cube cage cross-fade — mirrors the tint fade clock but on its own
      // CAGE_FADE_MS so the wireframe-cube → amber resolution feels distinct
      // from the slow Helios sun tint warm-up. Gated on settled-ness:
      // cageTarget stays 0 while transit is in flight, flips to 1 only after
      // the swarm lands at a regime that has a cage. Reads as "swarm reforms
      // grey, *then* the cage glows amber."
      //   1. Resolve target: cageTarget = activeCage && settled ? 1 : 0.
      //   2. On flip, snapshot current cageActive into fromCageActive and
      //      stamp cageTransitStartMs — fade resumes from wherever the last
      //      one left off if the user crosses sections mid-fade.
      //   3. Lerp linearly over CAGE_FADE_MS; clear the timestamp on land.
      //   4. Color + threshold snap to active values; on fade-out we keep
      //      the last values so the dissolve doesn't lose its hue.
      // Settled = transit completed AND most particles have actually arrived
      // at their targets (boids steering noise died down). Pure transit-state
      // gating fires the fade ~300ms before the swarm visually locks in;
      // swarmingRatio below 0.15 is the kinetic "we're parked" signal.
      const activeCage = regimeCageOf(SECTION_REGIMES[m.currentRegimeId]);
      const isSettled =
        m.transitStartMs === null && refs.swarmingRatioRef.current < 0.005;
      const cageTarget = activeCage && isSettled ? 1 : 0;
      if (cageTarget !== m.cageTarget) {
        m.cageTarget = cageTarget;
        m.fromCageActive = refs.materialConfigRef.current.cageActive;
        m.cageTransitStartMs = nowMs;
      }
      if (activeCage) {
        refs.materialConfigRef.current.cageColor = activeCage.color;
        refs.materialConfigRef.current.cageThreshold = activeCage.threshold;
      }
      if (m.cageTransitStartMs !== null) {
        const tEl = nowMs - m.cageTransitStartMs;
        const tRawCage = Math.min(1, tEl / CAGE_FADE_MS);
        refs.materialConfigRef.current.cageActive =
          m.fromCageActive + (m.cageTarget - m.fromCageActive) * tRawCage;
        if (tRawCage >= 1) m.cageTransitStartMs = null;
      } else {
        refs.materialConfigRef.current.cageActive = m.cageTarget;
      }
    }

    // Boids: attractor pull driven by its OWN ADSR channel
    // (ATTRACTOR_ENVELOPE). Sustain == peak, so once the attack ramps
    // attractorEnvValue from 0 → 1, the attractor stays at 2× preset
    // forever — "slowly tighten and hold" rather than the flock-boost
    // pulse-and-decay. attractorEnvValue ∈ [0, 1] maps to multiplier
    // [1, 2].
    const boidsBase = applyBoidsLayers(
      boidsPresetOf(resolveBoidsPreset(SECTION_REGIMES[m.currentRegimeId])),
      SETTLE_PRESETS[refs.settlePresetRef.current],
      refs.boidsOverridesRef.current[m.currentRegimeId],
    );
    refs.boidsConfigRef.current.attractorStrength =
      boidsBase.attractorStrength * (1 + attractorEnvValue);

    // Fluid: amplify wave motion during the pulse. Derive base from
    // INITIAL_FLUID + per-section override each frame — applyFluidOverride
    // only runs in the settled branch + on transit-settle, NOT during
    // active transit, so a multiplicative-on-current-ref overlay would
    // compound frame-over-frame during the 1.2s transit and blow waveAmp
    // up to NaN within ~30 frames.
    const fluidOverride = refs.fluidOverridesRef.current[m.currentRegimeId];
    const fluidBaseWaveAmp =
      fluidOverride?.waveAmp ?? INITIAL_FLUID.waveAmp;
    refs.fluidConfigRef.current.waveAmp =
      fluidBaseWaveAmp * (1 + envNorm * 0.6);

    // ---- 6. Kernel-uniform writeback ----
    // SwarmV7 syncs these to ec.flockBoost / ec.envPeak next frame.
    refs.boidsConfigRef.current.flockBoost = refs.flockBoostRef.current;
    refs.boidsConfigRef.current.envPeak = env.peak;

    // Per-section group-spin override. Falls back to DEFAULT_AUTO_SPIN_SPEED
    // for sections that don't set autoSpinSpeed in their regime.
    refs.autoSpinSpeedRef.current = autoSpinSpeedOf(
      SECTION_REGIMES[m.currentRegimeId],
    );
  });

  return (
    <SwarmV7
      N={N}
      targets={bank}
      envTex={envTex}
      stateRef={refs.swarmStateRef}
      material={refs.materialConfigRef.current}
      anim={ANIM}
      boids={refs.boidsConfigRef.current}
      fluid={INITIAL_FLUID}
      fluidRef={refs.fluidConfigRef}
      swarmingRatioRef={refs.swarmingRatioRef}
      transform={refs.transformConfigRef.current}
      handleRef={refs.swarmHandleRef}
      boidsRef={refs.boidsConfigRef}
      materialRef={refs.materialConfigRef}
      transformRef={refs.transformConfigRef}
      autoSpinSpeedRef={refs.autoSpinSpeedRef}
      spinAccumRef={refs.spinAccumRef}
    />
  );
}
