// Section → regime registry. THE SWAP SURFACE.
//
// To change what shape a section's swarm settles at:
//   1. Edit the entry below for that section.
//   2. To use a GLB: drop the file in `public/`, set source = { kind: "glb", url, fallback }.
//   3. To use a generator: set source = { kind: "generator", gen }.
//   4. Save. Vite HMR re-resolves at runtime.
//
// To add a new shape:
//   1. Add the generator function to `src/lib/swarm/targets.ts`.
//   2. Reference it from this file via thin lambda (params inline).
//
// No string indirection — direct function references via lambdas. TS catches
// typos. IDE jumps to definition. Refactor-safe.

import type { SectionRegime } from "@/lib/swarm/regimes";
import {
  cloudTargets,
  cubeLatticeTargets,
  cubeShellsTargets,
  dnaHelixTargets,
  type DnaHelixParams,
  humanoidBonesTargets,
  orbitalSystemTargets,
  type OrbitalParams,
  sphereTargets,
  swarmFreeTargets,
  doubleTorusTargets,
} from "@/lib/swarm/targets";
import type { SectionId } from "../swarm/swarmRefs";

// Helios orbital params shared by the generator + the engine's per-particle
// omega classifier. Single source of truth for ring radii, omegas, and tilt.
// 4 rings = the Helios 4-layer narrative (Approval/Policy/Orchestrator/Runtime).
// Inner rings spin faster (high-frequency policy gates), outer rings slower
// (deeper runtime concerns).
// Commitments DNA helix params. Two intertwined strands + rungs at regular
// intervals = the visual cue that locks the brain onto "DNA" rather than
// "spring." Engine pairs this w/ regime.rotation for whole-structure spin.
const COMMITMENTS_DNA: DnaHelixParams = {
  R: 0.6,
  height: 3.6,
  turns: 3,
  rungs: 40,
  strandRatio: 0.7,
};

const HELIOS_ORBITAL: OrbitalParams = {
  sunRadius: 0.28,
  tilt: 0.42,
  rings: [
    { radius: 0.6, omega: 0.85, planetSize: 0.10, planetAngle: 0.4 },
    { radius: 0.95, omega: 0.55, planetSize: 0.13, planetAngle: 2.1 },
    { radius: 1.3, omega: 0.32, planetSize: 0.11, planetAngle: 4.0 },
    { radius: 1.65, omega: 0.18, planetSize: 0.15, planetAngle: 5.4 },
  ],
};

export const SECTION_REGIMES: Record<SectionId, SectionRegime> = {
  // Hero: 3-step internal sequence driven by hero-internal scroll progress.
  // Step 0 = humanoid mesh (GLB if available, bones fallback).
  // Step 1 = cloud — disorder before structure.
  // Step 2 = sphere — resolution into form.
  hero: {
    kind: "sequence",
    driver: "sectionInternalProgress",
    steps: [
      {
        source: {
          kind: "glb",
          url: "/glbs/humanoid.glb",
          fallback: humanoidBonesTargets,
          fitRadius: 1.65,
        },
        // graphiteEmissive: faint teal flicker on idle boid jitter so the
        // hero argues the AI-first claim without requiring a scroll.
        material: "graphiteEmissive",
      },
      {
        source: { kind: "generator", gen: (n) => cloudTargets(n) },
        material: "graphiteEmissive",
      },
      {
        source: { kind: "generator", gen: (n) => sphereTargets(n) },
        material: "graphiteEmissive",
      },
    ],
  },

  // Value: drifting cloud — disorder before structure (the "why").
  // Content sits right → swarm left.
  value: {
    kind: "single",
    source: { kind: "generator", gen: (n) => cloudTargets(n, 1.7) },
    boids: "loose",
    material: "graphiteEmissive",
  },

  // Commitments: rotating double-helix. Two intertwined strands + rungs
  // read as DNA at 2000-particle resolution where literal hand-finger
  // detail collapses. Whole structure rotates around Y at constant omega
  // (rotation field, not orbital — single uniform spin, not per-ring).
  // Content sits left → swarm right.
  commitments: {
    kind: "single",
    source: {
      kind: "generator",
      gen: (n) => dnaHelixTargets(n, COMMITMENTS_DNA),
    },
    rotation: { omega: 0.2, tilt: Math.PI / 4 },
    material: "graphiteEmissive",
    autoSpinSpeed: 0,
    rotationOffset: { y: Math.PI / 4 },
  },

  // Projects: 3 cube shells, count-matched to the active project list.
  // Content sits right → swarm left. Each cube spins around its own center
  // at a distinct omega so the 3 projects read as independent agents rather
  // than one rotating block.
  projects: {
    kind: "single",
    source: {
      kind: "generator",
      gen: (n) => cubeShellsTargets(n, 3, 0.4, 1.4),
    },
    material: "graphiteEmissive",
    autoSpinSpeed: 0,
    cubeShellsLocal: {
      count: 3,
      spacing: 1.4,
      omegas: [0.35, 0.35, 0.35],
      tilt: 0.25,
    },
    rotationOffset: {
      y: Math.PI / 1.5,
    },
  },

  // Helios: animated orbital system — sun + 4 rings with planets, each
  // ring rotating at its own angular velocity. The kernel rotates each
  // particle around Y by its omega*time and tilts the orbital plane.
  // 4-layer narrative made literal: Approval/Policy/Orchestrator/Runtime
  // each on its own ring at its own pace. Sun particles (xz-radius <
  // tint.radius around origin) get an amber tint via shader-side
  // classification — no per-particle storage buffer needed.
  // Content sits left → swarm right.
  helios: {
    kind: "single",
    source: {
      kind: "generator",
      gen: (n) => orbitalSystemTargets(n, HELIOS_ORBITAL),
    },
    orbital: HELIOS_ORBITAL,
    material: "tealHot",
    tint: { color: "#FFB800", radius: HELIOS_ORBITAL.sunRadius },
    // Amber light spilling onto the rings. Matches tint color so the sun
    // particles (colored amber by `tint`) appear to emit the light reaching
    // the orbiting particles. intensity 4× for HDR-bloom headroom; falloff
    // 1.2 spills ~1.5 world-units (reaches inner ring at r=0.6).
    sunEmission: {
      color: "#FF6B1A",
      radius: HELIOS_ORBITAL.sunRadius,
      intensity: 4,
      falloff: 160,
    },
    autoSpinSpeed: 0,
    rotationOffset: {
      y: Math.PI / 2,
    },
  },

  // Agents: bird-form sculpture inside a wireframe cube cage. Reads as
  // "autonomous agent operating within bounded scope." Engine splits N into
  // bird particles + cube-edge particles per `cage.ratio`.
  // tealHot + loose boids = continuous motion glow.
  // Content sits right → swarm left.
  agents: {
    kind: "single",
    source: {
      kind: "glb",
      url: "/glbs/bird.glb",
      fallback: (n) => swarmFreeTargets(n, 2.4),
      fitRadius: 1,
      cage: { halfExtent: 1.28, ratio: 0.22 },
    },
    boids: "loose",
    material: "tealHot",
    // autoSpinSpeed: 0,
    rotationOffset: {
      y: -2 * Math.PI,
    },
  },

  // Security: cube lattice — ordered, contained, audited. Boids inert.
  // graphite (no emissive) reinforces the "frozen / audited" read.
  // Content sits left → swarm right.
  security: {
    kind: "single",
    source: { kind: "generator", gen: (n) => cubeLatticeTargets(n, 1.3, 0.04) },
    boids: "frozen",
    material: "graphiteEmissiveRed",
  },

  // Founders: humanoid mesh-surface (denser fidelity than hero's bones).
  // Bookends the page: hero shows nascent form, founders shows fuller form.
  // Content sits right → swarm left.
  founders: {
    kind: "single",
    source: {
      kind: "glb",
      url: "/glbs/humanoid.glb",
      fallback: humanoidBonesTargets,
      fitRadius: 1.65,
    },
    material: "graphiteEmissive",
  },

  contact: {
    kind: "single",
    source: { kind: "generator", gen: (n) => doubleTorusTargets(n, 1, 0.025, Math.PI / 6) },
    boids: "tight",
    material: "graphiteEmissive",
    rotation: { omega: 0.15, tilt: .45 },
    autoSpinSpeed: 0,
    rotationOffset: { y: Math.PI, x: Math.PI / 3 }
  },
};
