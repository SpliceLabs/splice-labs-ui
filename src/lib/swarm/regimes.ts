// Regime types + presets. The swarm's "what it should look like" surface.
//
// All values here are plain TS literals — no leva, no reactive flow into
// uniforms. See feedback memory `feedback_leva_with_webgpu_tsl.md`: any
// undefined leaking into TSL uniforms crashes the kernel at compile time.

import { Color, type Vector3 } from "three";
import type {
  SwarmBoidsConfig,
  SwarmMaterialConfig,
} from "@/components/marketing/home/swarm/SwarmV7";
import type { OrbitalParams } from "./targets";

export type TargetGenerator = (n: number) => Vector3[];

// Optional wireframe-cube cage composited around a GLB target. Engine splits
// N into (1 - ratio)·N bird particles + ratio·N cube-edge particles. Reads as
// "GLB shape inside a wireframe box." Cage particles get a separate color
// applied shader-side via a per-particle classifier (max(|tgt.x|,|tgt.y|,|tgt.z|)
// > inset threshold), so the cage "lights up" against the bird body without
// needing a per-particle storage buffer.
export type CageSpec = {
  halfExtent: number;  // cube half-side in target-space (post fitRadius)
  ratio: number;       // fraction of N allocated to the cage (0..1)
  color?: string;      // hex; default "#FFB800" (matches Helios sun amber)
  // Inner box half-extent the shader uses to classify cage vs body particles.
  // Bird points stay bounded by ~fitRadius per axis; cage points sit at
  // ±halfExtent. Default = halfExtent - 0.2 cleanly separates them.
  threshold?: number;
};

// A regime's shape source — either a procedural generator or a GLB to sample.
// GLB sources require a procedural fallback for: load failure, missing mesh,
// or platforms where useGLTF can't resolve the asset.
export type RegimeSource =
  | {
      kind: "glb";
      url: string;
      fallback: TargetGenerator;
      fitRadius?: number;
      cage?: CageSpec;
    }
  | { kind: "generator"; gen: TargetGenerator };

export type BoidsPreset = "default" | "tight" | "loose" | "traveling" | "frozen";
export type MaterialPreset = "graphite" | "graphiteEmissive" | "graphiteEmissiveRed" | "tealHot";

// Local-rotation config for `cubeShellsTargets`-style layouts. Each cube
// spins around ITS OWN center instead of the world origin — useful when the
// shape is multiple discrete clusters arranged along X and you want each
// cluster animated independently. Engine classifies particles by x-position
// to assign per-cube center + omega.
export type CubeShellsLocalParams = {
  count: number;            // number of cubes (must match the generator)
  spacing: number;          // X spacing between cube centers (matches generator)
  omegas: number[];         // angular velocity per cube (rad/sec). length = count
  tilt?: number;            // shared tilt around X axis (rad). default 0
};

// Additive amber/colored illumination radiating from the rotation-center
// "sun" region. Particles within `radius` are core (bright); particles
// outside receive a 1/(1+falloff·d²) spill. Reuses the same per-particle
// xz-distance signal that drives `tint`, so cost is one madd + one rcp per
// fragment. Engine drives uSunActive from the same TINT_FADE clock as the
// tint cross-fade so amber color + amber light fade in/out together.
export type SunEmission = {
  color: string;     // hex; HDR-friendly (use intensity > 1 for bloom-ready)
  radius: number;    // inner core radius (typically matches tint.radius)
  intensity: number; // peak multiplier at d=0
  falloff: number;   // 1/(1+falloff·d²) shape constant
};

export type RegimeStep = {
  source: RegimeSource;
  boids?: BoidsPreset;
  material?: MaterialPreset;
  // Optional animated-orbit config. When set, the engine bakes a per-particle
  // omega buffer (radians/sec) by classifying each generated position by its
  // closest ring radius. Kernel rotates each fetched target around Y by
  // `omega*time` then tilts the orbital plane around X. See SwarmV7.
  orbital?: OrbitalParams;
  // Whole-regime uniform rotation. Every particle gets the same omega + tilt.
  // Use for forms where the entire structure spins as one (e.g. DNA helix,
  // rotating sculpture) rather than independent ring-orbit speeds. Mutually
  // exclusive with `orbital` — engine prefers `orbital` when both are set.
  rotation?: { omega: number; tilt?: number };
  // Independent per-cluster rotation for cubeShellsTargets-style layouts.
  // Each cube spins around its own center at its own omega. Engine classifies
  // particles by x. Mutually exclusive with `orbital`/`rotation` — engine
  // checks cubeShellsLocal first.
  cubeShellsLocal?: CubeShellsLocalParams;
  // Shader-side per-particle color tint. Fragment shader checks the
  // particle's current target distance from origin (xz plane). Particles
  // within `radius` are mixed toward `color` while the regime is active.
  // Use for "the sun in this orbital system is a different color than the
  // rings" without burning a per-particle storage buffer. See
  // docs/SWARM_BUFFER_CONSOLIDATION.md.
  tint?: { color: string; radius: number };
  // Sun-style additive illumination. Reuses the tint's xz-distance signal:
  // tint colors the core particles, sunEmission spills light onto every
  // particle via smooth falloff. Typically pair with `tint` on the same
  // step (matching color + radius) to get "particles are the sun AND emit
  // amber onto neighbors."
  sunEmission?: SunEmission;
};

// ADSR-style envelope on the global flock-boost multiplier. Engine fires
// "note-on" on section-change kickoff; the envelope walks attack → decay →
// sustain over the per-section timings. Release exists in the type for a
// future note-off event but isn't auto-triggered in the current pipeline
// (sustain holds until the next section change kicks off a new attack).
//
// Field semantics:
//   peak    = top of the attack ramp; multiplier on alignment/sep/cohesion
//   attack  = seconds, current → peak
//   decay   = seconds, peak → sustain
//   sustain = boost held after decay (0 = silence, small positive = baseline
//             flock dynamics continuing at low level)
//   release = seconds, current → 0 (reserved; not yet fired)
export type FlockEnvelope = {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  peak: number;
};

// Default envelope used by any section that doesn't override. Halved peak
// (1.5) matches FLOCK_PEAK before ADSR; 8s decay matches the prior fixed
// flock-fade duration. sustain=0 → after decay, only attractor + cursor-
// ray force act on particles.
export const DEFAULT_FLOCK_ENVELOPE: FlockEnvelope = {
  attack: 0.3,
  decay: 6,
  sustain: 0,
  release: 1.5,
  peak: 1.5,
};

// Attractor-strength envelope. Ramps up and holds (sustain == peak), so
// once the attack completes the attractor is permanently at 2× preset.
// Used by SwarmEngine to scale boidsBase.attractorStrength via:
//   attractorStrength = base * (1 + envValue)   // 0 → 1 maps to 1× → 2×
// Independent of section-change kickoff: starts on engine mount, runs to
// completion, then holds at sustain forever.
export const ATTRACTOR_ENVELOPE: FlockEnvelope = {
  attack: 4,        // 5s ramp 0 → 1 (preset → 2×)
  decay: 0.001,     // no-op (peak == sustain)
  sustain: 1,
  release: 1.5,
  peak: 1,
};

// Group-level Y-spin (rad/sec) applied by SwarmV7 to the whole swarm
// independent of any regime-internal rotation. Per-section override on
// SectionRegime.autoSpinSpeed; omit ⇒ this default; set to 0 ⇒ no spin.
export const DEFAULT_AUTO_SPIN_SPEED = 0.05;

// SectionRegime: how a section commands the swarm.
//   - single:   one steady-state shape; transitions handled by the engine.
//   - sequence: shape morphs along a driver (e.g. hero-internal scroll).
//               Engine pre-loads all steps, drives morph from the driver.
// flockEnvelope (optional, both branches): per-section ADSR override
// merged on top of DEFAULT_FLOCK_ENVELOPE.
// autoSpinSpeed (optional, both branches): per-section override of the
// group-level Y-spin. 0 = off. Omit ⇒ DEFAULT_AUTO_SPIN_SPEED.
// Spatial placement (where the swarm renders in the viewport) is no longer
// part of the regime — it's driven by per-section <SwarmSlot> DOM anchors
// and CSS. See SwarmEngine.projectSlot.
export type SectionRegime =
  | ({
      kind: "single";
      flockEnvelope?: Partial<FlockEnvelope>;
      autoSpinSpeed?: number;
      rotationOffset?: RotationOffset;
    } & RegimeStep)
  | {
      kind: "sequence";
      driver: "sectionInternalProgress";
      steps: RegimeStep[];
      flockEnvelope?: Partial<FlockEnvelope>;
      autoSpinSpeed?: number;
      rotationOffset?: RotationOffset;
    };

export function flockEnvelopeOf(regime: SectionRegime): FlockEnvelope {
  return { ...DEFAULT_FLOCK_ENVELOPE, ...(regime.flockEnvelope ?? {}) };
}

export function autoSpinSpeedOf(regime: SectionRegime): number {
  return regime.autoSpinSpeed ?? DEFAULT_AUTO_SPIN_SPEED;
}

// Static rotation offset (radians) applied at the swarm group level, on top
// of the global INITIAL_TRANSFORM base and before the animated Y-spin
// accumulator. Useful for dialing in a section's "resting" orientation when
// autoSpinSpeed is 0 (or just to tune the entry pose for spinning sections).
// Omit ⇒ no offset on that axis.
export type RotationOffset = { x?: number; y?: number; z?: number };

export function rotationOffsetOf(regime: SectionRegime): {
  x: number;
  y: number;
  z: number;
} {
  const o = regime.rotationOffset ?? {};
  return { x: o.x ?? 0, y: o.y ?? 0, z: o.z ?? 0 };
}

// Base boids tuned in Phase 1. Treat as immutable; build presets by spread.
const BASE_BOIDS: SwarmBoidsConfig = {
  separation: 0.15,
  alignment: 0.2,
  cohesion: 0.2,
  damping: 0.97,
  speedLimit: 2.4,
  attractorStrength: 8,
  attractorRange: 0.3,
  rayRadius: 0.2,
  rayStrength: 80,
  particleScale: 0.04,
  // Per-particle re-arm threshold. distToTgt > snap → boids force fully
  // active on that particle; below → boids force decays at recoveryRate.
  // 0.5 is wide enough that preset alignment+cohesion can't sustain an
  // orbital equilibrium just outside it (was 0.25 → orbits at ~0.4 self-
  // stabilized indefinitely).
  snapThreshold: 0.5,
  recoveryRate: 0.28,
  regimeEnabled: false,
  regimeVelocityThreshold: 0.5,
  regimeRatio: 0.4,
  regimeCooldown: 7,
  // Engine writes both each frame from the active section's ADSR
  // envelope; preset values are placeholders until first frame writes.
  flockBoost: 0,
  envPeak: 1.5,
  // Inner radius for per-particle envelope rearm. Particles must reach
  // within this distance of their target (and have free decayed) before
  // they're eligible to re-trigger. Lower = stricter; 0.1 = ~tight
  // equilibrium needed.
  armThreshold: 0.1,
};

export const BOIDS_PRESETS: Record<BoidsPreset, SwarmBoidsConfig> = {
  default: { ...BASE_BOIDS },
  // Crisp formation — high cohesion, low separation, strong pull.
  tight: {
    ...BASE_BOIDS,
    cohesion: 0.4,
    separation: 0.1,
    attractorStrength: 12,
  },
  // Loose orbit — diffuse around target, low cohesion. For Agents.
  loose: {
    ...BASE_BOIDS,
    cohesion: 0.1,
    separation: 0.25,
    attractorStrength: 4,
    speedLimit: 3.0,
  },
  // Mid-transit chase — strong attractor, particles disperse + travel together.
  traveling: {
    ...BASE_BOIDS,
    cohesion: 0.05,
    separation: 0.3,
    attractorStrength: 16,
    speedLimit: 4,
  },
  // Lattice-locked. Boids inert, attractor dominates. For Security.
  frozen: {
    ...BASE_BOIDS,
    cohesion: 0,
    separation: 0,
    alignment: 0,
    attractorStrength: 20,
    snapThreshold: 5.0,
    recoveryRate: 1.5,
  },
};

const BASE_MATERIAL: SwarmMaterialConfig = {
  color: "#1B1E22",
  metalness: 0.6,
  roughness: 0.4,
  exposure: 1.0,
  envIntensity: 0.9,
  emissiveIntensity: 0,
  // Default flicker color = teal. Presets can override (e.g. red flicker).
  emissiveColor: "#00D6A4",
  // Tint disabled by default. Engine overrides per regime when the regime
  // declares a `tint` config. tintActive=0 ⇒ the fragment shader's mix
  // contributes nothing regardless of color/radius.
  tintColor: "#ffffff",
  tintRadius: 0,
  tintActive: 0,
  // Sun emission disabled by default (intensity 0). Engine overrides per
  // regime when the regime declares `sunEmission`. Both intensity=0 AND
  // sunActive=0 are no-op safety nets.
  sunColor: "#000000",
  sunRadius: 0,
  sunIntensity: 0,
  sunFalloff: 1,
  sunActive: 0,
  // Cage disabled by default. Engine overrides per regime when the source
  // declares a `cage` config. cageActive=0 ⇒ the fragment shader's cage
  // mix contributes nothing regardless of color/threshold.
  cageColor: "#FFB800",
  cageThreshold: 99,
  cageActive: 0,
};

export const MATERIAL_PRESETS: Record<MaterialPreset, SwarmMaterialConfig> = {
  graphite: { ...BASE_MATERIAL },
  graphiteEmissive: {
    ...BASE_MATERIAL,
    envIntensity: 1.1,
    emissiveIntensity: 1.5,
  },
  graphiteEmissiveRed: {
    ...BASE_MATERIAL,
    envIntensity: 1.1,
    emissiveIntensity: 1.5,
    // Flicker starts teal (matches graphiteEmissive on arrival), warms to
    // red across decay, holds red in sustain. Engine reads emissiveColorSustain
    // off the active preset and drives the crossfade off flockEnv.phase.
    emissiveColorSustain: "#E03E3E",
  },
  tealHot: {
    ...BASE_MATERIAL,
    color: "#0D3D33",
    envIntensity: 1.4,
    emissiveIntensity: 2.5,
  },
};

export function boidsPresetOf(name: BoidsPreset | undefined): SwarmBoidsConfig {
  return BOIDS_PRESETS[name ?? "default"];
}

// Settle presets — global overlay applied between the regime preset and any
// per-section override. Tunes how the swarm "lands" into a section: how
// hard the attractor pulls, how quickly particles relax post-disturbance,
// and the kinetic damping floor. Keep "default" as a no-op so flipping the
// dropdown back to default == removing the overlay entirely.
export type SettlePresetName = "default" | "snappy" | "lazy";

export const SETTLE_PRESETS: Record<
  SettlePresetName,
  Partial<SwarmBoidsConfig>
> = {
  default: {},
  snappy: {
    attractorStrength: 16,
    attractorRange: 0.22,
    recoveryRate: 0.9,
    damping: 0.985,
    snapThreshold: 0.7,
  },
  lazy: {
    attractorStrength: 4,
    attractorRange: 0.55,
    recoveryRate: 0.15,
    damping: 0.94,
    snapThreshold: 1.1,
  },
};

export const SETTLE_PRESET_NAMES: SettlePresetName[] = [
  "default",
  "snappy",
  "lazy",
];

// Master switch for velocity-driven teal emissive (Phase-3 §2.1). Flip to
// false to ship the swarm in pure-graphite mode without removing any preset
// wiring or section-regime declarations. Affects every preset returned via
// materialPresetOf (and therefore every engine material write + transit lerp).
export const EMISSIVE_ENABLED = true;

export function materialPresetOf(
  name: MaterialPreset | undefined,
): SwarmMaterialConfig {
  const preset = MATERIAL_PRESETS[name ?? "graphite"];
  if (!EMISSIVE_ENABLED && preset.emissiveIntensity !== 0) {
    return { ...preset, emissiveIntensity: 0 };
  }
  return preset;
}

// Linear lerp between two boids configs. regimeEnabled stays off — section
// transitions drive regime, not the cursor-cycling self-trigger.
export function lerpBoids(
  a: SwarmBoidsConfig,
  b: SwarmBoidsConfig,
  t: number,
): SwarmBoidsConfig {
  const m = (x: number, y: number) => x + (y - x) * t;
  return {
    separation: m(a.separation, b.separation),
    alignment: m(a.alignment, b.alignment),
    cohesion: m(a.cohesion, b.cohesion),
    damping: m(a.damping, b.damping),
    speedLimit: m(a.speedLimit, b.speedLimit),
    attractorStrength: m(a.attractorStrength, b.attractorStrength),
    attractorRange: m(a.attractorRange, b.attractorRange),
    rayRadius: m(a.rayRadius, b.rayRadius),
    rayStrength: m(a.rayStrength, b.rayStrength),
    particleScale: m(a.particleScale, b.particleScale),
    snapThreshold: m(a.snapThreshold, b.snapThreshold),
    recoveryRate: m(a.recoveryRate, b.recoveryRate),
    regimeEnabled: false,
    regimeVelocityThreshold: m(
      a.regimeVelocityThreshold,
      b.regimeVelocityThreshold,
    ),
    regimeRatio: m(a.regimeRatio, b.regimeRatio),
    regimeCooldown: m(a.regimeCooldown, b.regimeCooldown),
    flockBoost: m(a.flockBoost, b.flockBoost),
    envPeak: m(a.envPeak, b.envPeak),
    armThreshold: m(a.armThreshold, b.armThreshold),
  };
}

// Module-scope temporaries — lerpMaterial runs every frame during transit,
// so allocate once and reuse. THREE.Color.lerp does sRGB-naive RGB lerp,
// good enough for graphite↔tealHot crossfades.
const lerpFromColor = new Color();
const lerpToColor = new Color();
const lerpOutColor = new Color();

export function lerpMaterial(
  a: SwarmMaterialConfig,
  b: SwarmMaterialConfig,
  t: number,
): SwarmMaterialConfig {
  const m = (x: number, y: number) => x + (y - x) * t;
  lerpFromColor.set(a.color);
  lerpToColor.set(b.color);
  lerpOutColor.copy(lerpFromColor).lerp(lerpToColor, t);
  const bodyHex = `#${lerpOutColor.getHexString()}`;
  lerpFromColor.set(a.emissiveColor);
  lerpToColor.set(b.emissiveColor);
  lerpOutColor.copy(lerpFromColor).lerp(lerpToColor, t);
  const emissiveHex = `#${lerpOutColor.getHexString()}`;
  return {
    color: bodyHex,
    metalness: m(a.metalness, b.metalness),
    roughness: m(a.roughness, b.roughness),
    exposure: m(a.exposure, b.exposure),
    envIntensity: m(a.envIntensity, b.envIntensity),
    emissiveIntensity: m(a.emissiveIntensity, b.emissiveIntensity),
    emissiveColor: emissiveHex,
    // Sustain-color snaps to destination — engine recomputes the live
    // emissiveColor each frame from phase, so transit-lerping this is moot.
    emissiveColorSustain: b.emissiveColorSustain,
    // tintColor/tintRadius snap to destination — hex lerping would require
    // a Color sample and the visual difference is small; tintActive carries
    // the cross-fade. Engine overwrites this after lerp anyway when the
    // active regime has a tint config.
    tintColor: b.tintColor,
    tintRadius: b.tintRadius,
    tintActive: m(a.tintActive, b.tintActive),
    // Sun emission mirrors tint's lerp policy: color/radius/intensity/
    // falloff snap to destination (engine overwrites anyway when the
    // active regime has `sunEmission`), sunActive carries the cross-fade.
    sunColor: b.sunColor,
    sunRadius: b.sunRadius,
    sunIntensity: b.sunIntensity,
    sunFalloff: b.sunFalloff,
    sunActive: m(a.sunActive, b.sunActive),
    // Cage mirrors tint's lerp policy: color/threshold snap to destination,
    // cageActive carries the cross-fade. Engine overwrites color/threshold
    // anyway when the active regime has a `cage`.
    cageColor: b.cageColor,
    cageThreshold: b.cageThreshold,
    cageActive: m(a.cageActive, b.cageActive),
  };
}
