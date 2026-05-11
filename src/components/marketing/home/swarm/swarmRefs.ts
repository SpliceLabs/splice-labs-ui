// Centralized refs the swarm system passes around.
//
// The fixed canvas (SwarmCanvas/SwarmEngine), the section observer
// (SectionRegimeController), and the page root (VersionE) all need to
// touch the same per-frame state — scroll position, active section,
// imperative swarm handle, and the live-config refs SwarmV7 reads each
// frame. Centralizing here keeps that state out of React render passes
// (refs don't trigger re-renders) and out of module-singleton scope
// (which would leak across remounts).
//
// VersionE owns the lifetime via useSwarmRefs(); children receive the
// object as a prop.

import { createContext, useContext, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import type {
  SwarmAnimState,
  SwarmBoidsConfig,
  SwarmFluidConfig,
  SwarmHandle,
  SwarmMaterialConfig,
  SwarmTransformConfig,
} from "./SwarmV7";
import {
  BOIDS_PRESETS,
  DEFAULT_AUTO_SPIN_SPEED,
  MATERIAL_PRESETS,
  type SettlePresetName,
} from "@/lib/swarm/regimes";

export type SectionId =
  | "hero"
  | "value"
  | "commitments"
  | "projects"
  | "helios"
  | "agents"
  | "security"
  | "founders"
  | "contact";

export const SECTION_IDS: SectionId[] = [
  "hero",
  "value",
  "commitments",
  "projects",
  "helios",
  "agents",
  "security",
  "founders",
  "contact",
];

export type SwarmRefs = {
  // Window scrollY in CSS pixels. Updated by SectionRegimeController.
  scrollYRef: MutableRefObject<number>;
  // Section center in document-y (CSS pixels). Engine uses for parallax.
  sectionMidYRef: MutableRefObject<number>;
  // Current most-visible section. Updated by IntersectionObserver.
  activeSectionRef: MutableRefObject<SectionId>;
  // Hero-internal scroll progress 0..1. Drives sequence regime morph.
  heroProgressRef: MutableRefObject<number>;
  // Imperative handle SwarmV7 populates so the engine can rewrite target
  // buffers without pipeline rebuild.
  swarmHandleRef: MutableRefObject<SwarmHandle | null>;
  // Live-config refs SwarmV7 reads each frame (over prop snapshots).
  boidsConfigRef: MutableRefObject<SwarmBoidsConfig>;
  materialConfigRef: MutableRefObject<SwarmMaterialConfig>;
  transformConfigRef: MutableRefObject<SwarmTransformConfig>;
  // Per-section developer overrides for fine-tuning. SwarmDevPanel writes
  // partial boids configs keyed by section id; engine merges them on top of
  // the regime preset at settle time. Missing key = use preset as-is.
  boidsOverridesRef: MutableRefObject<
    Partial<Record<SectionId, Partial<SwarmBoidsConfig>>>
  >;
  // Live fluid config (per-particle morph distance + wave/flap params).
  // Engine maintains; SwarmV7 reads each frame via fluidRef prop.
  fluidConfigRef: MutableRefObject<SwarmFluidConfig>;
  // Per-section fluid override layer (morph distance / floor / wave amp).
  fluidOverridesRef: MutableRefObject<
    Partial<Record<SectionId, Partial<SwarmFluidConfig>>>
  >;
  // Global settle preset overlay (default/snappy/lazy). Engine reads on
  // settle frames; layered between regime preset and per-section override.
  settlePresetRef: MutableRefObject<SettlePresetName>;
  // Flock-boost multiplier driven by the per-section ADSR envelope (see
  // FlockEnvelope in regimes.ts). Engine writes this each frame from
  // evaluateEnvelope():
  //   attack  — current → env.peak
  //   decay   — env.peak → env.sustain
  //   sustain — held at env.sustain until next note-on (section change)
  //   release — reserved; not auto-fired in the current pipeline
  // Section-change kickoff = note-on. Per-particle convergence inside
  // the dead zone uses the kernel free flag (snapThreshold) and is
  // independent of this global multiplier.
  flockBoostRef: MutableRefObject<number>;
  // Post-transit settle duration (seconds). Slider-controlled.
  flockDurationRef: MutableRefObject<number>;
  // Mean(free) across all particles (0..1). Read-back from kernel every
  // ~5 frames. 0 = all particles in formation; 1 = all swarming. Diagnostic
  // signal for the dev panel/log. No longer gates state machine.
  swarmingRatioRef: MutableRefObject<number>;
  // Group-level Y-spin speed (rad/sec). Engine writes each frame from the
  // active section's autoSpinSpeed override (falls back to
  // DEFAULT_AUTO_SPIN_SPEED). SwarmV7 reads this each tick instead of the
  // module-const ANIM.autoSpinSpeed so sections can opt out of the global
  // spin individually.
  autoSpinSpeedRef: MutableRefObject<number>;
  // Accumulated Y-spin (radians). SwarmV7 integrates autoSpinSpeed*dt into
  // this each frame and applies it to the group's rotY. Hoisted out of
  // SwarmV7 (was local) so the engine can reset it on section kickoff —
  // gives each section a deterministic canonical rotation reference instead
  // of inheriting whatever phase the global integrator happens to be at.
  spinAccumRef: MutableRefObject<number>;
  // SwarmV7's existing animState ref. Engine writes morph here.
  swarmStateRef: MutableRefObject<SwarmAnimState>;
  // Per-section DOM slot elements. Each <SwarmSlot id={...}/> registers its
  // div here on mount. Engine reads the active section's slot rect each
  // frame and projects center/size to world coords for posX/posY/scale.
  // Missing slot ⇒ engine falls back to center + scale 1.
  slotRefs: MutableRefObject<Partial<Record<SectionId, HTMLDivElement | null>>>;
};

export const INITIAL_TRANSFORM: SwarmTransformConfig = {
  posX: 0,
  posY: 0,
  posZ: 0,
  rotX: 0,
  rotY: -2.15,
  rotZ: 0,
  scale: 1,
};

// Phase-1 fluid baseline. Single source of truth — SwarmEngine reads from
// here when initializing fluidConfigRef and applying overrides.
export const INITIAL_FLUID: SwarmFluidConfig = {
  particleMorph: 0,
  morphInnerR: 0.05,
  morphOuterR: 0.5,
  detail: 2,
  waveAmp: 0.27,
  waveSpeed: 6.6,
  phaseRandom: 0.38,
  waveLayers: 2,
  flapSpeed: 16.6,
  flapAmount: 18.3,
  birdThick: 0.04,
};

export function useSwarmRefs(): SwarmRefs {
  const scrollYRef = useRef(0);
  const sectionMidYRef = useRef(0);
  const activeSectionRef = useRef<SectionId>("hero");
  const heroProgressRef = useRef(0);
  const swarmHandleRef = useRef<SwarmHandle | null>(null);
  const boidsConfigRef = useRef<SwarmBoidsConfig>({ ...BOIDS_PRESETS.default });
  const materialConfigRef = useRef<SwarmMaterialConfig>({
    ...MATERIAL_PRESETS.graphite,
  });
  const transformConfigRef = useRef<SwarmTransformConfig>({
    ...INITIAL_TRANSFORM,
  });
  const boidsOverridesRef = useRef<
    Partial<Record<SectionId, Partial<SwarmBoidsConfig>>>
  >({});
  const fluidConfigRef = useRef<SwarmFluidConfig>({ ...INITIAL_FLUID });
  const fluidOverridesRef = useRef<
    Partial<Record<SectionId, Partial<SwarmFluidConfig>>>
  >({});
  const settlePresetRef = useRef<SettlePresetName>("default");
  // Initial boost = 1 (preset baseline) for page-load steady state.
  // Engine's ADSR envelope takes over on first section-change kickoff.
  const flockBoostRef = useRef<number>(1);
  const flockDurationRef = useRef<number>(8);
  // Initial 1 = "all swarming" until the readback overwrites it. Engine's
  // gate ignores this until at least one readback has landed (boost in
  // decay phase only ever transitions, so the initial value is fine).
  const swarmingRatioRef = useRef<number>(1);
  const autoSpinSpeedRef = useRef<number>(DEFAULT_AUTO_SPIN_SPEED);
  const spinAccumRef = useRef<number>(0);
  const swarmStateRef = useRef<SwarmAnimState>({
    morph: 0,
    resolution: 0.945,
    scaleMul: 1,
  });
  const slotRefs = useRef<Partial<Record<SectionId, HTMLDivElement | null>>>({});

  return useMemo(
    () => ({
      scrollYRef,
      sectionMidYRef,
      activeSectionRef,
      heroProgressRef,
      swarmHandleRef,
      boidsConfigRef,
      materialConfigRef,
      transformConfigRef,
      boidsOverridesRef,
      fluidConfigRef,
      fluidOverridesRef,
      settlePresetRef,
      flockBoostRef,
      flockDurationRef,
      swarmingRatioRef,
      autoSpinSpeedRef,
      spinAccumRef,
      swarmStateRef,
      slotRefs,
    }),
    [],
  );
}

// Context lets the SwarmSlot component (rendered deep inside sections)
// register its DOM node without prop-threading SwarmRefs through every
// section component. VersionE owns the provider.
const SwarmRefsContext = createContext<SwarmRefs | null>(null);

export const SwarmRefsProvider = SwarmRefsContext.Provider;

export function useSwarmContext(): SwarmRefs {
  const ctx = useContext(SwarmRefsContext);
  if (!ctx) {
    throw new Error("useSwarmContext must be used inside SwarmRefsProvider");
  }
  return ctx;
}
