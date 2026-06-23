// Dev tuning panel for the swarm. Shows leva controls scoped to the
// currently-active section. Writes Partial<SwarmBoidsConfig> to
// refs.boidsOverridesRef[currentSection]; engine merges those on top of
// the regime preset at settle and each settled frame.
//
// Safety: leva returns the same control names you registered as initial
// values, never undefined post-mount. Values flow through the override
// ref (NEVER directly into TSL uniforms), so the Phase-1 leva-with-WGSL
// crash (undefined leaking into uniform()) cannot recur — the kernel
// already compiled with constants and only reads from boidsConfigRef
// each frame, which is always populated by the engine.

import { useEffect, useState } from "react";
import { Leva, useControls } from "leva";
import type { SwarmRefs, SectionId } from "./swarmRefs";
import { INITIAL_FLUID, SECTION_IDS } from "./swarmRefs";
import {
  boidsPresetOf,
  type SettlePresetName,
  SETTLE_PRESET_NAMES,
  SETTLE_PRESETS,
} from "@/lib/swarm/regimes";
import { SECTION_REGIMES } from "../config/sectionRegimes";

function resolveBoidsPresetName(sectionId: SectionId) {
  const r = SECTION_REGIMES[sectionId];
  if (r.kind === "single") return r.boids ?? "default";
  return r.steps[0].boids ?? "default";
}

function SectionControls({
  section,
  settle,
  refs,
}: {
  section: SectionId;
  settle: SettlePresetName;
  refs: SwarmRefs;
}) {
  // Effective baseline = regime preset overlaid with the active settle
  // preset. Sliders show this so values reflect what's actually being
  // applied. Leva's store keys by folder name and ignores new initial
  // values on remount, so we use the programmatic `set` API instead:
  // function-schema → [values, setter]; useEffect pushes the effective
  // values when section or settle changes.
  const regimePreset = boidsPresetOf(resolveBoidsPresetName(section));
  const [boids, setBoids] = useControls(
    `${section} · boids`,
    () => ({
      separation: { value: regimePreset.separation, min: 0, max: 1, step: 0.01 },
      alignment: { value: regimePreset.alignment, min: 0, max: 1, step: 0.01 },
      cohesion: { value: regimePreset.cohesion, min: 0, max: 1, step: 0.01 },
      attractorStrength: {
        value: regimePreset.attractorStrength,
        min: 0,
        max: 30,
        step: 0.5,
      },
      attractorRange: {
        value: regimePreset.attractorRange,
        min: 0,
        max: 2,
        step: 0.05,
      },
      speedLimit: { value: regimePreset.speedLimit, min: 0, max: 8, step: 0.1 },
      damping: { value: regimePreset.damping, min: 0.8, max: 1, step: 0.005 },
      snapThreshold: {
        value: regimePreset.snapThreshold,
        min: 0,
        max: 2,
        step: 0.05,
      },
    }),
  );

  useEffect(() => {
    const eff = { ...regimePreset, ...SETTLE_PRESETS[settle] };
    setBoids({
      separation: eff.separation,
      alignment: eff.alignment,
      cohesion: eff.cohesion,
      attractorStrength: eff.attractorStrength,
      attractorRange: eff.attractorRange,
      speedLimit: eff.speedLimit,
      damping: eff.damping,
      snapThreshold: eff.snapThreshold,
    });
    // setBoids identity is stable across renders for a given control set
    // (leva memoizes); intentionally omit it from deps to avoid redundant
    // pushes that would clobber user fine-tuning when only `settle` is
    // meant to drive the change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, settle]);
  // Fluid morph distance controls. `particleMorph` is a global floor 0..1
  // forcing all particles toward bird-shape; morphInner/Outer set the
  // distance-from-target window where each particle interpolates poly
  // → blob → bird. Per-section override layered on top of INITIAL_FLUID
  // baseline at engine settle.
  const fluid = useControls(
    `${section} · fluid`,
    {
      particleMorph: {
        value: INITIAL_FLUID.particleMorph,
        min: 0,
        max: 1,
        step: 0.01,
      },
      morphInnerR: {
        value: INITIAL_FLUID.morphInnerR,
        min: 0,
        max: 1,
        step: 0.01,
      },
      morphOuterR: {
        value: INITIAL_FLUID.morphOuterR,
        min: 0,
        max: 2,
        step: 0.05,
      },
    },
    [section],
  );

  useEffect(() => {
    refs.boidsOverridesRef.current[section] = { ...boids };
  }, [boids, section, refs]);
  useEffect(() => {
    refs.fluidOverridesRef.current[section] = { ...fluid };
  }, [fluid, section, refs]);

  return null;
}

export function SwarmDevPanel({ refs }: { refs: SwarmRefs }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<SectionId>(
    refs.activeSectionRef.current,
  );
  const [settle, setSettle] = useState<SettlePresetName>(
    refs.settlePresetRef.current,
  );
  const [flockDuration, setFlockDuration] = useState<number>(
    refs.flockDurationRef.current,
  );

  // Poll active section. Cheap (200ms) and avoids coupling to the observer.
  useEffect(() => {
    const id = setInterval(() => {
      const cur = refs.activeSectionRef.current;
      setSection((prev) => (prev !== cur ? cur : prev));
    }, 200);
    return () => clearInterval(id);
  }, [refs]);

  // Mirror local state into the shared ref. Engine reads ref each settled
  // frame so swap takes effect immediately on next tick.
  useEffect(() => {
    refs.settlePresetRef.current = settle;
  }, [settle, refs]);
  useEffect(() => {
    refs.flockDurationRef.current = flockDuration;
  }, [flockDuration, refs]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-50 px-3 py-2 font-mono text-label uppercase tracking-wider border border-white/15 bg-black/70 text-foreground hover:bg-black/90 hover:border-electric-teal transition-colors backdrop-blur-sm"
        aria-label="Open swarm dev panel"
      >
        DEV · SWARM
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-[300px] border border-white/15 bg-black/85 backdrop-blur-sm font-mono text-foreground">
      <header className="flex items-center justify-between px-3 py-2 border-b border-white/10">
        <span className="text-label-sm uppercase tracking-wider opacity-70">
          swarm
        </span>
        <div className="flex items-center gap-2">
          <select
            value={section}
            onChange={(e) => setSection(e.target.value as SectionId)}
            className="bg-transparent border border-white/15 px-1 py-0.5 text-label-sm uppercase tracking-wider focus:outline-none focus:border-electric-teal"
            aria-label="Section selector"
          >
            {SECTION_IDS.map((id) => (
              <option key={id} value={id} className="bg-black">
                {id}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-[14px] leading-none px-1 hover:text-electric-teal"
            aria-label="Close swarm dev panel"
          >
            ×
          </button>
        </div>
      </header>
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 text-label-sm uppercase tracking-wider">
        <label htmlFor="settle-preset" className="opacity-70">
          settle
        </label>
        <select
          id="settle-preset"
          value={settle}
          onChange={(e) => setSettle(e.target.value as SettlePresetName)}
          className="bg-transparent border border-white/15 px-1 py-0.5 text-label-sm uppercase tracking-wider focus:outline-none focus:border-electric-teal"
        >
          {SETTLE_PRESET_NAMES.map((name) => (
            <option key={name} value={name} className="bg-black">
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-white/10 text-label-sm uppercase tracking-wider">
        <label
          htmlFor="flock-duration"
          className="opacity-70 whitespace-nowrap"
        >
          flock fade
        </label>
        <input
          id="flock-duration"
          type="range"
          min={0.1}
          max={5}
          step={0.05}
          value={flockDuration}
          onChange={(e) => setFlockDuration(parseFloat(e.target.value))}
          className="flex-1 accent-electric-teal"
          aria-label="Flock boost fade duration (seconds)"
        />
        <span className="tabular-nums opacity-70 w-[4ch] text-right">
          {flockDuration.toFixed(1)}s
        </span>
      </div>
      <div className="leva-host">
        {/* `fill` makes leva render inside this container. `flat` removes
            the outer panel chrome since we provide our own header. */}
        <Leva fill flat hideCopyButton titleBar={false} />
        <SectionControls
          key={section}
          section={section}
          settle={settle}
          refs={refs}
        />
      </div>
    </div>
  );
}
