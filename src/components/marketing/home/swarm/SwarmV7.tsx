/* eslint-disable @typescript-eslint/no-explicit-any */
// V7 swarm: V6 boids + per-particle fluid morph mesh.
// Each particle is a tiny morph-mesh blob (poly → blob → bird) instead of a
// raw polyhedron. Position composition: per-instance rotate+scale on the
// morphed local-space vert, then translated by the boids-driven swarm pos.

import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BufferAttribute,
  Color,
  DoubleSide,
  Group,
  InstancedMesh,
  Matrix4,
  Raycaster,
  Texture,
  Vector3,
} from "three";
// See lib/swarm/morphMesh.ts header — TSL must come from three/webgpu, not
// three/tsl, to avoid the dual-bundle NodeBuilder split.
import { NodeMaterial, TSL, WebGPURenderer } from "three/webgpu";

import {
  buildMorphGeometry,
  buildMorphPos,
  buildMorphUniforms,
  ShapeKind,
} from "@/lib/swarm/morphMesh";
import {
  buildFluidPBRColorNode,
  buildFluidPBRUniforms,
  equirectEnvSampler,
  type PBRUniforms,
} from "@/lib/swarm/fluidPBR";

// TSL .d.ts in three 0.171 is incomplete. Cast at the boundary.
const Fn = TSL.Fn as any;
const If = TSL.If as any;
const Loop = TSL.Loop as any;
const Continue = TSL.Continue as any;
const cos = TSL.cos as any;
const sin = TSL.sin as any;
const dot = TSL.dot as any;
const cross = TSL.cross as any;
const abs = TSL.abs as any;
const float = TSL.float as any;
const length = TSL.length as any;
const normalize = TSL.normalize as any;
const select = TSL.select as any;
const min = TSL.min as any;
const max = TSL.max as any;
const clamp = TSL.clamp as any;
const instanceIndex = TSL.instanceIndex as any;
const instancedArray = TSL.instancedArray as any;
const mix = TSL.mix as any;
const uint = TSL.uint as any;
const uniform = TSL.uniform as any;
const varying = (TSL as any).varying;
const vec2 = TSL.vec2 as any;
const vec3 = TSL.vec3 as any;

const SHAPES = 4;
const TWO_PI = 6.28318530718;

// Legacy 3-slot targets — preserved for SwarmHero (Phase-1 hero-only canvas).
// Phase-2 SwarmEngine uses SwarmTargetBank (below) for the big-buffer path.
export type SwarmTargets = { t1: Vector3[]; t2: Vector3[]; t3: Vector3[] };

// Phase-2 target bank: ALL section regimes' targets pre-baked into one
// big storage buffer. Live regime switching = uniform writes (offset
// indices), not buffer writes. Necessary because three.js WebGPU caches
// storage buffers at first compute and doesn't honor needsUpdate /
// version / setUsage on either the BufferAttribute or the StorageBufferNode
// wrapper.
//
// Layout: regimes[r] is N Vector3s for regime r. Internally concatenated
// into a Float32Array of length numRegimes * N * 3. Kernel reads with
// offset = regimeIdx * N + instanceIdx.
//
// `omegasPerRegime` and `tiltsPerRegime` (parallel to regimes) hold
// per-particle angular velocity (rad/sec around Y) and orbital-plane tilt
// (rad around X). Both default to all zeros for non-rotating regimes.
// Per-particle storage lets multiple animated regimes coexist with
// different tilts and per-ring speeds without uniform contention.
export type SwarmRegimeBank = {
  regimes: Vector3[][]; // length R, each length N
  omegasPerRegime: Float32Array[]; // length R, each length N (rad/sec)
  tiltsPerRegime: Float32Array[]; // length R, each length N (rad)
  // Per-particle rotation pivot (world-space). Kernel rotates each target
  // around its center instead of the world origin, so regimes like the
  // projects cube shells can spin each cube around ITS own midpoint.
  // Length R, each length N. All-zero ⇒ rotation around world origin
  // (original behavior).
  centersPerRegime: Vector3[][];
  initialT1Idx: number;
  initialT2Idx: number;
  initialT3Idx: number;
};

export type SwarmMaterialConfig = {
  color: string;
  metalness: number;
  roughness: number;
  exposure: number;
  envIntensity: number;
  // Teal emissive scales with per-particle velocity magnitude. 0 = graphite
  // only; values in 1.5–2.5 give a visible glow during transitions and on
  // fast-moving regimes (e.g. agents).
  emissiveIntensity: number;
  // Hex color of the velocity-driven emissive flicker. Default teal; presets
  // can override (e.g. red flicker on a graphite body).
  emissiveColor: string;
  // Optional sustain-phase emissive color. Engine lerps emissiveColor →
  // emissiveColorSustain across the flockEnv decay window, holds at sustain,
  // snaps back on release. Undefined ⇒ no sustain shift (color stays at
  // emissiveColor across all phases).
  emissiveColorSustain?: string;
  // Sun-style tint: when the active regime declares `tint`, the engine sets
  // these. The fragment shader uses tintActive (0..1) as overall visibility
  // and tintRadius as the xz-plane classifier around the rotation center.
  // tintActive=0 ⇒ no contribution regardless of color/radius.
  tintColor: string;
  tintRadius: number;
  tintActive: number;
  // Sun-style additive emission. Engine writes when active regime declares
  // `sunEmission`. sunActive mirrors tintActive (shares the fade clock).
  // sunIntensity=0 ⇒ no contribution regardless of color/active.
  sunColor: string;
  sunRadius: number;
  sunIntensity: number;
  sunFalloff: number;
  sunActive: number;
  // Cube-cage color. Engine writes these when the active regime's source
  // declares a `cage`. cageActive in 0..1 mirrors tintActive's fade clock.
  cageColor: string;
  cageThreshold: number;
  cageActive: number;
};

export type SwarmAnimConfig = {
  hoverSpeed: number;
  hoverAmplitude: number;
  autoSpinSpeed: number;
};

export type SwarmTransformConfig = {
  posX: number;
  posY: number;
  posZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
};

export type SwarmAnimState = {
  morph: number;
  resolution: number;
  scaleMul: number;
};

export type SwarmBoidsConfig = {
  separation: number;
  alignment: number;
  cohesion: number;
  damping: number;
  speedLimit: number;
  // Capped soft attractor (replaces V6's hard linear spring). Particles
  // outside attractorRange feel a constant pull of magnitude attractorStrength
  // toward their target; within the range it behaves like a linear spring.
  // Eliminates the rubber-band yank that flung particles back and lets the
  // boids→formation recovery glide instead of snap.
  attractorStrength: number;
  attractorRange: number;
  rayRadius: number;
  rayStrength: number;
  particleScale: number;
  snapThreshold: number;
  recoveryRate: number;
  regimeEnabled: boolean;
  regimeVelocityThreshold: number;
  regimeRatio: number;
  regimeCooldown: number;
  // Global flock-boost (driven by ADSR envelope in SwarmEngine). Kernel
  // takes max(flockBoost, perParticleFree) as the per-particle force
  // multiplier — global pulses (section change) and per-particle pulses
  // (cursor displacement) co-exist; the larger drives the force.
  flockBoost: number;
  // Per-particle re-trigger snap target. When a particle's distToTgt
  // exceeds snapThreshold, its free flag is set to envPeak (instead of
  // 1.0). Drives the height of the cursor-disturbance pulse on each
  // particle. Engine writes from current section's envelope.peak.
  envPeak: number;
  // Inner radius the particle must reach for the per-particle envelope
  // to "rearm" after a trigger fires. Required to break the orbital
  // equilibrium feedback loop: without re-arming, a particle outside
  // snapThreshold would re-snap free → peak every frame and the flock
  // would self-sustain. Should be < snapThreshold; typical value 0.1.
  armThreshold: number;
};

// Per-particle vertex morph parameters. Independent axis from the swarm
// morph (which selects target attractor). Per-particle morph is driven by
// distance(localPos, target): in formation = 0 (poly), mid-flight = blob,
// far from formation = 1 (bird). particleMorph is a global FLOOR that
// forces a minimum morph regardless of distance.
export type SwarmFluidConfig = {
  particleMorph: number;
  // Below this distance the particle is fully in poly state (morph=0).
  morphInnerR: number;
  // At/above this distance the particle is fully in bird state (morph=1).
  // Linear interpolation between inner and outer ⇒ blob/fluid stage.
  morphOuterR: number;
  detail: number;
  waveAmp: number;
  waveSpeed: number;
  phaseRandom: number;
  waveLayers: number;
  flapSpeed: number;
  flapAmount: number;
  birdThick: number;
};

type Built = {
  meshes: InstancedMesh[];
  materials: NodeMaterial[];
  computeVelocity: ReturnType<typeof Fn>;
  computePosition: ReturnType<typeof Fn>;
  ec: ReturnType<typeof buildUniforms>;
  morphUniforms: ReturnType<typeof buildMorphUniforms>;
  pbrUniforms: PBRUniforms;
  velocityAttr: BufferAttribute;
  // Per-particle "free" buffer: 1 = swarming (distance > snapThreshold
  // from current rotated target), 0 = in-formation. Distance-driven so it
  // works for rotating regimes (orbital + DNA) where world-space velocity
  // is non-zero even at rest. JS readback computes mean(free) =
  // swarming ratio.
  freeAttr: BufferAttribute;
  // Particle count (for setRegimeIndices to compute offset = idx * N).
  N: number;
  raycaster: Raycaster;
};

// Imperative handle exposed via handleRef. Engine commands regime changes
// by updating offset uniforms — kernel keeps running, only the indexes it
// reads from change. No buffer rewrites. Slot meaning by convention:
// t1=from, t2=cloud (always), t3=to during transitions.
export type SwarmHandle = {
  setRegimeIndices: (t1Idx: number, t2Idx: number, t3Idx: number) => void;
};

function buildUniforms() {
  return {
    separation: uniform(0.15),
    alignment: uniform(0.2),
    cohesion: uniform(0.2),
    damping: uniform(0.99),
    speedLimit: uniform(2.4),
    attractorStrength: uniform(8.0),
    attractorRange: uniform(0.3),
    rayRadius: uniform(0.9),
    rayStrength: uniform(80.0),
    rayOrigin: uniform(new Vector3()),
    rayDirection: uniform(new Vector3(0, 0, -1)),
    snapThreshold: uniform(0.5),
    recoveryRate: uniform(0.4),
    // Global ADSR-driven boost. Kernel: vel += boids * max(flockBoost, free).
    flockBoost: uniform(0.0),
    // Snap target for per-particle free re-trigger on disturbance.
    envPeak: uniform(1.5),
    // Inner radius for re-arming the per-particle envelope. See
    // SwarmBoidsConfig.armThreshold for full semantics.
    armThreshold: uniform(0.1),
    deltaTime: uniform(0.016),
    particleScale: uniform(0.045),
    breathAmplitude: uniform(0.08),
    time: uniform(0.0),
    morph: uniform(0.0),
    // Per-particle morph range. Distance < morphInnerR ⇒ poly,
    // > morphOuterR ⇒ bird, between ⇒ blob/fluid.
    morphInnerR: uniform(0.05),
    morphOuterR: uniform(0.5),
    // Global morph floor — forces minimum morph regardless of distance.
    particleMorphFloor: uniform(0.0),
    // Regime-bank offsets: float uniforms (three.js TSL infers type from
    // initial value) holding regimeIdx * N. Kernel reads with .toUint()
    // and adds to instanceIndex to look up that regime's slot in the big
    // concatenated allStorage buffer. Engine writes these on transition.
    t1OffsetFloat: uniform(0.0),
    t2OffsetFloat: uniform(0.0),
    t3OffsetFloat: uniform(0.0),
  };
}

function buildPipeline(
  N: number,
  detail: number,
  envTex: Texture,
  bank: SwarmRegimeBank,
): Built {
  const PER_SHAPE = N / SHAPES;
  const R = bank.regimes.length;
  if (R < 1) throw new Error("SwarmV7: regimes array must be non-empty");

  const positionArr = new Float32Array(N * 3);
  const velocityArr = new Float32Array(N * 3);
  // ALL regimes packed contiguously: [r0_p0, r0_p1, ..., r0_pN-1, r1_p0, ...].
  // Length R*N*3. Kernel indexes via instanceIdx + regimeIdx*N. Pre-baked at
  // mount; never rewritten — section change updates offset uniforms only.
  const allTargetsArr = new Float32Array(R * N * 3);
  // Parallel per-particle omega (rad/sec) and tilt (rad) for animated
  // orbital/rotation regimes. Same indexing as allTargetsArr but scalar
  // (R*N). Non-rotating regimes contribute all-zero N-arrays.
  const allOmegasArr = new Float32Array(R * N);
  const allTiltsArr = new Float32Array(R * N);
  // Per-particle rotation pivot per regime. Same indexing as allTargetsArr
  // (R*N*3, vec3). Zero pivots fall back to world-origin rotation.
  const allCentersArr = new Float32Array(R * N * 3);
  const scaleVarArr = new Float32Array(N * 2);

  // Index → target permutation (Fisher-Yates). Same shuffle applied to
  // every regime so a particle's identity is stable across regimes — its
  // bird trajectory across morphs doesn't cross-tangle with neighbors.
  // See V7 history: spatially-correlated samplers (mesh-surface, bones)
  // would otherwise cluster all octahedrons in one body region.
  const perm = new Uint32Array(N);
  for (let i = 0; i < N; i++) perm[i] = i;
  for (let i = N - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    const tmp = perm[i];
    perm[i] = perm[j];
    perm[j] = tmp;
  }

  // Initialize particle positions from the initial t1 regime so they spawn
  // in formation (no startup glitch) and seed scaleVar/velocity in one pass.
  const initialT1 = bank.regimes[bank.initialT1Idx];
  for (let i = 0; i < N; i++) {
    const src = perm[i];
    const a = initialT1[src];
    positionArr[i * 3 + 0] = a.x;
    positionArr[i * 3 + 1] = a.y;
    positionArr[i * 3 + 2] = a.z;
    velocityArr[i * 3 + 0] = (Math.random() - 0.5) * 0.05;
    velocityArr[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
    velocityArr[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    scaleVarArr[i * 2 + 0] = 0.7 + Math.random() * 0.6;
    scaleVarArr[i * 2 + 1] = Math.random() * Math.PI * 2;
  }

  // Pack every regime into the big buffer with the same perm applied.
  // Omegas + tilts use the same perm so a particle's identity is consistent
  // across regimes (same particle index → same shuffled source slot).
  for (let r = 0; r < R; r++) {
    const regime = bank.regimes[r];
    const omegas = bank.omegasPerRegime[r];
    const tilts = bank.tiltsPerRegime[r];
    const centers = bank.centersPerRegime[r];
    const base = r * N * 3;
    const obase = r * N;
    for (let i = 0; i < N; i++) {
      const src = perm[i];
      const v = regime[src];
      allTargetsArr[base + i * 3 + 0] = v.x;
      allTargetsArr[base + i * 3 + 1] = v.y;
      allTargetsArr[base + i * 3 + 2] = v.z;
      allOmegasArr[obase + i] = omegas[src];
      allTiltsArr[obase + i] = tilts[src];
      const c = centers[src];
      allCentersArr[base + i * 3 + 0] = c.x;
      allCentersArr[base + i * 3 + 1] = c.y;
      allCentersArr[base + i * 3 + 2] = c.z;
    }
  }

  const freeArr = new Float32Array(N);
  // Per-particle "armed" flag: 1 = eligible to re-trigger free→envPeak on
  // displacement; 0 = was triggered, must rearm before next trigger fires.
  // Initialized to 1 so the first kickoff (or any cursor sweep on a
  // freshly-loaded page) triggers cleanly.
  const armedArr = new Float32Array(N);
  armedArr.fill(1);

  const positionStorage = instancedArray(positionArr, "vec3");
  const velocityStorage = instancedArray(velocityArr, "vec3");
  const allStorage = instancedArray(allTargetsArr, "vec3");
  // Per-particle omega + tilt storage (scalar). Indexed identically to
  // allStorage: omega/tilt for slot s = element(idx + tNOffsetFloat.toUint()).
  const allOmegasStorage = instancedArray(allOmegasArr, "float");
  const allTiltsStorage = instancedArray(allTiltsArr, "float");
  const allCentersStorage = instancedArray(allCentersArr, "vec3");
  const scaleVarStorage = instancedArray(scaleVarArr, "vec2");
  const freeStorage = instancedArray(freeArr, "float");
  const armedStorage = instancedArray(armedArr, "float");
  // Per-particle current morph target — written each frame inside the
  // velocity compute kernel after the t1/t2/t3 blend is computed there.
  // Vertex stage reads this to compute distance-from-target.
  const targetArr = new Float32Array(N * 3);
  const targetStorage = instancedArray(targetArr, "vec3");

  const velocityAttr = (
    velocityStorage as unknown as { value: BufferAttribute }
  ).value;
  const freeAttr = (
    freeStorage as unknown as { value: BufferAttribute }
  ).value;

  const ec = buildUniforms();
  // Initialize offset uniforms from the bank's initial regime indices.
  ec.t1OffsetFloat.value = bank.initialT1Idx * N;
  ec.t2OffsetFloat.value = bank.initialT2Idx * N;
  ec.t3OffsetFloat.value = bank.initialT3Idx * N;

  // ---------- Compute (boids) — unchanged from V6 except target lookups ----------
  // t1/t2/t3 used to be three separate storage buffers; now they're three
  // index offsets into one big allStorage. Engine writes the offset uniforms
  // when sections change. Float→uint conversion via .toUint() because
  // instanceIndex is uint and TSL won't auto-promote.
  const computeVelocity = Fn(() => {
    const idx = instanceIndex;
    const pos = positionStorage.element(idx).toVar("pos");
    const vel = velocityStorage.element(idx).toVar("vel");
    const m = ec.morph;
    const f = m.floor();
    const k = m.sub(f);
    const t1v = allStorage.element(idx.add(ec.t1OffsetFloat.toUint()));
    const t2v = allStorage.element(idx.add(ec.t2OffsetFloat.toUint()));
    const t3v = allStorage.element(idx.add(ec.t3OffsetFloat.toUint()));
    const t1w = allOmegasStorage.element(idx.add(ec.t1OffsetFloat.toUint()));
    const t2w = allOmegasStorage.element(idx.add(ec.t2OffsetFloat.toUint()));
    const t3w = allOmegasStorage.element(idx.add(ec.t3OffsetFloat.toUint()));
    const t1tilt = allTiltsStorage.element(idx.add(ec.t1OffsetFloat.toUint()));
    const t2tilt = allTiltsStorage.element(idx.add(ec.t2OffsetFloat.toUint()));
    const t3tilt = allTiltsStorage.element(idx.add(ec.t3OffsetFloat.toUint()));
    // Per-particle rotation pivot. Zero center ⇒ rotation around world
    // origin (orbital/global rotation). Non-zero center ⇒ rotation around
    // that pivot (cubeShellsLocal — each cube spins on its own midpoint).
    const t1c = allCentersStorage.element(idx.add(ec.t1OffsetFloat.toUint()));
    const t2c = allCentersStorage.element(idx.add(ec.t2OffsetFloat.toUint()));
    const t3c = allCentersStorage.element(idx.add(ec.t3OffsetFloat.toUint()));
    // Animated-rotation transform. Algebraically:
    //   rotate_around_center(v) = rotate_origin(v) + (center - rotate_origin(center))
    // We compute rotate_origin(v) exactly as the original kernel did — so for
    // every non-cube regime where center=(0,0,0) the adjustment term is
    // identically zero and behavior is byte-identical to pre-pivot code.
    const orbitTime = ec.time;
    const applyOrbital = (v: any, omega: any, tilt: any, center: any) => {
      const a = omega.mul(orbitTime);
      const cosA = cos(a);
      const sinA = sin(a);
      const cosT = cos(tilt);
      const sinT = sin(tilt);
      // rotate v around Y: x' = x*cosA + z*sinA ; z' = z*cosA - x*sinA
      const rxv = v.x.mul(cosA).add(v.z.mul(sinA));
      const rzv = v.z.mul(cosA).sub(v.x.mul(sinA));
      // tilt v around X: y' = y*cosT - z*sinT ; z'' = y*sinT + z*cosT
      const ty = v.y.mul(cosT).sub(rzv.mul(sinT));
      const tz = v.y.mul(sinT).add(rzv.mul(cosT));
      // rotate center around Y + tilt around X (same transform applied to c)
      const rcx = center.x.mul(cosA).add(center.z.mul(sinA));
      const rcz0 = center.z.mul(cosA).sub(center.x.mul(sinA));
      const rcy = center.y.mul(cosT).sub(rcz0.mul(sinT));
      const rcz = center.y.mul(sinT).add(rcz0.mul(cosT));
      // adjustment = center - rotated_center  (zero when center is zero)
      const ax = center.x.sub(rcx);
      const ay = center.y.sub(rcy);
      const az = center.z.sub(rcz);
      return vec3(rxv.add(ax), ty.add(ay), tz.add(az));
    };
    const t1r = applyOrbital(t1v, t1w, t1tilt, t1c);
    const t2r = applyOrbital(t2v, t2w, t2tilt, t2c);
    const t3r = applyOrbital(t3v, t3w, t3tilt, t3c);
    const isFirst = f.lessThan(0.5);
    const isMiddle = f.lessThan(1.5);
    const aTgt = select(isFirst, t1r, select(isMiddle, t2r, t3r));
    const bTgt = select(isFirst, t2r, t3r);
    const tgt = mix(aTgt, bTgt, k).toVar("tgt");
    // Persist the current target for vertex-stage distance-from-target.
    targetStorage.element(idx).assign(tgt);
    const free = freeStorage.element(idx).toVar("freev");
    const dt = ec.deltaTime;

    // Capped soft attractor. Magnitude = min(distance, attractorRange) *
    // attractorStrength. Inside the range it behaves like a linear spring;
    // beyond, the pull saturates at a constant magnitude — particles flung
    // far out drift back gracefully instead of getting yanked.
    const toTarget = tgt.sub(pos);
    const distToTarget = length(toTarget);
    const safeDirToTarget = select(
      distToTarget.greaterThan(0.0001),
      toTarget.div(distToTarget),
      vec3(0, 0, 0),
    );
    const cappedDist = min(distToTarget, ec.attractorRange);
    const pullMag = cappedDist.mul(ec.attractorStrength).mul(dt);
    // Attractor is ALWAYS on, even for snapped particles. Threejs's example
    // works because center-pull never disengages — that's what curves a
    // free-flying flock back into a circulation pattern. Without this, the
    // alignment chain gives every particle the same velocity vector and the
    // whole flock flies straight forever until damping bleeds momentum.
    vel.addAssign(safeDirToTarget.mul(pullMag));

    const boids = vec3(0, 0, 0).toVar("boids");
    const zoneRadius = ec.separation.add(ec.alignment).add(ec.cohesion);
    const sepThresh = ec.separation.div(zoneRadius);
    const alignThresh = ec.separation.add(ec.alignment).div(zoneRadius);
    const zoneSq = zoneRadius.mul(zoneRadius);

    Loop(
      { start: uint(0), end: uint(N), type: "uint", condition: "<" },
      ({ i }: { i: any }) => {
        If(i.equal(idx), () => {
          Continue();
        });
        const otherPos = positionStorage.element(i);
        const dir = otherPos.sub(pos);
        const dist = length(dir);
        If(dist.lessThan(0.0001), () => {
          Continue();
        });
        const distSq = dist.mul(dist);
        If(distSq.greaterThan(zoneSq), () => {
          Continue();
        });
        const percent = distSq.div(zoneSq);
        If(percent.lessThan(sepThresh), () => {
          const adj = min(sepThresh.div(percent).sub(1.0).mul(dt), float(2.0));
          boids.subAssign(normalize(dir).mul(adj));
        })
          .ElseIf(percent.lessThan(alignThresh), () => {
            const tDelta = alignThresh.sub(sepThresh);
            const ap = percent.sub(sepThresh).div(tDelta);
            const otherVel = velocityStorage.element(i);
            const otherSpeed = length(otherVel);
            If(otherSpeed.greaterThan(0.0001), () => {
              const cosR = cos(ap.mul(TWO_PI));
              const adj = float(0.5).sub(cosR.mul(0.5)).add(0.5).mul(dt);
              boids.addAssign(otherVel.div(otherSpeed).mul(adj));
            });
          })
          .Else(() => {
            const tDelta = alignThresh.oneMinus();
            const ap = percent.sub(alignThresh).div(tDelta);
            const cosR = cos(ap.mul(TWO_PI));
            const adj1 = cosR.mul(-0.5);
            const adj2 = adj1.add(0.5);
            const adj3 = float(0.5).sub(adj2).mul(dt);
            boids.addAssign(normalize(dir).mul(adj3));
          });
      },
    );

    // Per-particle force scale = max(global boost, per-particle free).
    // Global drives the section-change ADSR pulse; per-particle drives
    // cursor-disturbance pulses on individual particles. Either signal
    // > 0 keeps boids force on this particle; both at 0 = silent.
    const boostScale = max(ec.flockBoost, free);
    vel.addAssign(boids.mul(boostScale));

    const dirToRay = ec.rayOrigin.sub(pos);
    const projLen = dot(dirToRay, ec.rayDirection);
    const closest = ec.rayOrigin.sub(ec.rayDirection.mul(projLen));
    const toClosest = closest.sub(pos);
    const distClose = length(toClosest);
    const distCloseSq = distClose.mul(distClose);
    const rayRadiusSq = ec.rayRadius.mul(ec.rayRadius);
    If(distClose.greaterThan(0.0001), () => {
      If(distCloseSq.lessThan(rayRadiusSq), () => {
        const adj = distCloseSq
          .div(rayRadiusSq)
          .sub(1.0)
          .mul(dt)
          .mul(ec.rayStrength);
        vel.addAssign(normalize(toClosest).mul(adj));
      });
    });

    vel.mulAssign(ec.damping);
    const speed = length(vel);
    If(speed.greaterThan(ec.speedLimit), () => {
      vel.assign(normalize(vel).mul(ec.speedLimit));
    });

    const finalSpeed = length(vel);
    const safeVel = select(finalSpeed.equal(finalSpeed), vel, vec3(0, 0, 0));
    velocityStorage.element(idx).assign(safeVel);

    // Per-particle ADSR pulse with armed-bit gating to break the
    // orbital-equilibrium feedback loop:
    //
    //   - Trigger: armed && distToTgt > snapThreshold
    //       → free = envPeak, armed = 0
    //   - Otherwise: free decays at recoveryRate (always; no auto-resnap)
    //   - Rearm: not triggering && distToTgt < armThreshold && free ~ 0
    //       → armed = 1
    //
    // Why armed: without it, a particle stuck at orbit radius >
    // snapThreshold would re-snap free → envPeak every frame and the
    // flock would self-sustain forever. With armed, a triggered particle
    // must physically settle within armThreshold before another trigger
    // can fire. armThreshold << snapThreshold (default 0.1 vs 0.5)
    // gives a wide hysteresis band the particle can decay through
    // without re-arming prematurely.
    const armed = armedStorage.element(idx).toVar("armed");
    const distToTgt = length(pos.sub(tgt));
    const tooFarBool = distToTgt.greaterThan(ec.snapThreshold);
    const tooFarF = select(tooFarBool, float(1.0), float(0.0));
    const canTriggerBool = armed.mul(tooFarF).greaterThan(float(0.5));

    const decayed = free.sub(ec.recoveryRate.mul(dt));
    const decayedClamped = select(
      decayed.greaterThan(0.0),
      decayed,
      float(0.0),
    );
    const newFree = select(canTriggerBool, ec.envPeak, decayedClamped);

    // Rearm: only when NOT triggering this frame, particle settled
    // inside armThreshold, and the per-particle envelope has decayed
    // (free ≈ 0 means previous pulse fully ran out).
    const insideArmBool = distToTgt.lessThan(ec.armThreshold);
    const insideArmF = select(insideArmBool, float(1.0), float(0.0));
    const decayedDoneF = select(newFree.lessThan(float(0.05)), float(1.0), float(0.0));
    const notTriggerF = select(canTriggerBool, float(0.0), float(1.0));
    const shouldArmBool = insideArmF
      .mul(decayedDoneF)
      .mul(notTriggerF)
      .greaterThan(float(0.5));
    const newArmed = select(
      canTriggerBool,
      float(0.0),
      select(shouldArmBool, float(1.0), armed),
    );

    freeStorage.element(idx).assign(newFree);
    armedStorage.element(idx).assign(newArmed);
  })().compute(N);

  const computePosition = Fn(() => {
    const dt = ec.deltaTime;
    const idx = instanceIndex;
    const newPos = positionStorage
      .element(idx)
      .add(velocityStorage.element(idx).mul(dt));
    const lenP = length(newPos);
    // NaN fallback: snap back to whatever the t1 regime says. Same shape
    // semantics as before, just sourced via offset lookup.
    const fallback = allStorage.element(idx.add(ec.t1OffsetFloat.toUint()));
    const safePos = select(lenP.equal(lenP), newPos, fallback);
    positionStorage.element(idx).assign(safePos);
  })().compute(N);

  // ---------- Render: per-particle morph mesh ----------
  // Shared morph uniforms + shared PBR colorNode across all 4 shape
  // materials. Per-particle morph (driven by distance-from-target) is
  // computed inside the per-shape loop because it depends on each shape's
  // index range — so each material gets its own morph position graph but
  // they read from one shared uniform set.
  const morphUniforms = buildMorphUniforms();
  // Shared PBR uniforms — every per-shape colorNode reads from this same
  // set, so engine writes to (e.g.) `uEmissiveIntensity.value` propagate to
  // all four shape meshes in one assignment.
  const pbrUniforms = buildFluidPBRUniforms();
  // Equirect sampler is built once and reused — internally allocates a
  // single TSL Fn that's shared across colorNode references.
  const envSampler = equirectEnvSampler(envTex);

  const meshes: InstancedMesh[] = [];
  const materials: NodeMaterial[] = [];

  for (let s = 0; s < SHAPES; s++) {
    const baseOffset = s * PER_SHAPE;
    const myIdx = instanceIndex.add(uint(baseOffset));
    const swarmPos = positionStorage.element(myIdx);
    const variation = scaleVarStorage.element(myIdx);
    const scaleMul = variation.x;
    const phase = variation.y;
    const breath = float(1.0).add(
      ec.breathAmplitude.mul(sin(ec.time.mul(0.8).add(phase))),
    );
    const finalScale = ec.particleScale.mul(scaleMul).mul(breath);

    // Velocity-aligned orientation: each particle's mesh +Y axis is rotated
    // to point along its velocity direction. Bird body extends in +Y in
    // local space (head at +y), so this makes birds visibly point in flight
    // direction → graceful banking through curves.
    //
    // Build orthonormal basis from velocity:
    //   vDir   = normalize(velocity), used as the new local +Y axis
    //   right  = perpendicular to vDir, falls back to world up reference
    //   fwd    = right × vDir, third basis vector
    // For (almost) vertical velocities, swap the reference axis to avoid a
    // degenerate cross product. Below an epsilon speed, hold identity.
    const vel = velocityStorage.element(myIdx);
    const speed = length(vel);
    const vDir = select(
      speed.greaterThan(0.0001),
      vel.div(speed),
      vec3(0, 1, 0),
    );
    const refVec = select(
      abs(vDir.y).lessThan(0.99),
      vec3(0, 1, 0),
      vec3(1, 0, 0),
    );
    const right = normalize(cross(vDir, refVec));
    const fwd = cross(right, vDir);
    const alignToVel = (v: any) =>
      right.mul(v.x).add(vDir.mul(v.y)).add(fwd.mul(v.z));

    // Per-particle morph from distance-to-target. The distance is local
    // space (positionStorage and targetStorage are both local-frame), so
    // this signal is invariant to group hover/rotation — a particle in
    // its formation slot reads "0" no matter where the model is in world
    // space. Combined with a global floor uniform so the user can still
    // crank everyone toward bird/blob via leva.
    const tgt = targetStorage.element(myIdx);
    const distToTgt = length(swarmPos.sub(tgt));
    const distMorph = clamp(
      distToTgt.sub(ec.morphInnerR).div(ec.morphOuterR.sub(ec.morphInnerR)),
      float(0),
      float(1),
    );
    const combinedMorph = max(ec.particleMorphFloor, distMorph);

    const morphPos = buildMorphPos({
      uniforms: morphUniforms,
      morphNode: combinedMorph,
    });

    const mat = new NodeMaterial();
    // Compose: morph local pos → velocity-align → scale → swarm translate.
    mat.positionNode = alignToVel(morphPos.localPosNode)
      .mul(finalScale)
      .add(swarmPos);
    // Per-shape emissive activity: `distToTgt` is computed in vertex from
    // this shape's own myIdx (= instanceIndex + s*PER_SHAPE). varying()
    // pins it to vertex stage and creates a flat-ish interpolated input
    // the fragment colorNode reads — sidesteps fragment-stage instanced
    // storage binding (unreliable in three.js 0.171 WebGPU) AND the
    // original bug where a shared colorNode read instanceIndex
    // 0..PER_SHAPE-1 globally, mis-indexing shapes 1..3.
    //
    // Distance-from-target (NOT world-space velocity) so the emissive
    // signal is "swarming vs resting in formation" rather than "moving
    // vs not moving" — orbital + DNA particles co-rotating with their
    // formation read 0 distance and stay graphite, while transit /
    // disturbed particles glow teal as they chase a target they're far
    // from.
    const emissiveActivityVar = varying(distToTgt);
    // Per-particle tint classifier: xz-plane distance from origin of the
    // CURRENT blended target. Helios sun particles cluster near (0,0,0)
    // so they read ~0; orbital ring particles read their ring radius.
    // Engine's uTintRadius decides what counts as "inside" per regime.
    const tgtRadialDist = length(vec2(tgt.x, tgt.z));
    const tintDistanceVar = varying(tgtRadialDist);
    // Per-particle cage classifier: max(|x|,|y|,|z|) of the current blended
    // target. Cube-edge particles sit at the cage's halfExtent on at least
    // one axis (read ~halfExtent); GLB-bird particles bounded by ~fitRadius.
    // Fragment shader's uCageThreshold sits between the two.
    const tgtBoxMax = max(max(abs(tgt.x), abs(tgt.y)), abs(tgt.z));
    const tgtBoxMaxVar = varying(tgtBoxMax);
    mat.colorNode = buildFluidPBRColorNode(
      envSampler,
      pbrUniforms,
      emissiveActivityVar,
      tintDistanceVar,
      tgtBoxMaxVar,
    );
    mat.side = DoubleSide;
    mat.transparent = false;
    mat.depthWrite = true;

    const geo = buildMorphGeometry(s as ShapeKind, detail);
    const mesh = new InstancedMesh(geo, mat, PER_SHAPE);
    mesh.frustumCulled = false;
    meshes.push(mesh);
    materials.push(mat);
  }

  return {
    meshes,
    materials,
    computeVelocity,
    computePosition,
    ec,
    morphUniforms,
    pbrUniforms,
    velocityAttr,
    freeAttr,
    N,
    raycaster: new Raycaster(),
  };
}

// Update offset uniforms — kernel reads the new regime indices on its
// next compute pass. No buffer rewrites, no upload paths to worry about.
function setRegimeIndices(
  built: Built,
  t1Idx: number,
  t2Idx: number,
  t3Idx: number,
) {
  const N = built.N;
  built.ec.t1OffsetFloat.value = t1Idx * N;
  built.ec.t2OffsetFloat.value = t2Idx * N;
  built.ec.t3OffsetFloat.value = t3Idx * N;
}

export function SwarmV7({
  N,
  targets,
  envTex,
  stateRef,
  material: matCfg,
  anim,
  boids,
  fluid,
  transform,
  onRegimeChange,
  handleRef,
  boidsRef,
  materialRef,
  transformRef,
  fluidRef,
  swarmingRatioRef,
  autoSpinSpeedRef,
  spinAccumRef: spinAccumRefProp,
}: {
  N: number;
  targets: SwarmRegimeBank;
  envTex: Texture;
  stateRef: MutableRefObject<SwarmAnimState>;
  material: SwarmMaterialConfig;
  anim: SwarmAnimConfig;
  boids: SwarmBoidsConfig;
  fluid: SwarmFluidConfig;
  transform: SwarmTransformConfig;
  onRegimeChange?: (newMorph: number) => void;
  // Live-config refs. When provided, useFrame reads the latest value each
  // tick and overrides the prop snapshots — lets the engine drive lerps
  // continuously without thrashing React props or useEffect dep arrays.
  handleRef?: MutableRefObject<SwarmHandle | null>;
  boidsRef?: MutableRefObject<SwarmBoidsConfig>;
  materialRef?: MutableRefObject<SwarmMaterialConfig>;
  transformRef?: MutableRefObject<SwarmTransformConfig>;
  fluidRef?: MutableRefObject<SwarmFluidConfig>;
  // When provided, SwarmV7 reads back `freeAttr` periodically and writes
  // mean(free) here (= swarming ratio, 0..1). Engine uses this to gate
  // the post-decay snap-reset on actual particle settle, not just timer.
  swarmingRatioRef?: MutableRefObject<number>;
  // Live group-Y-spin speed (rad/sec). Read each tick to allow per-section
  // overrides via SectionRegime.autoSpinSpeed. Missing ⇒ anim.autoSpinSpeed.
  autoSpinSpeedRef?: MutableRefObject<number>;
  // Externally-owned spin accumulator. When provided, used instead of the
  // local ref so the engine can reset it on section kickoff (canonical
  // rotation reference per section). Missing ⇒ falls back to local ref.
  spinAccumRef?: MutableRefObject<number>;
}) {
  const groupRef = useRef<Group>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const lastMorphRef = useRef<number>(-1);
  const localSpinAccumRef = useRef<number>(0);
  const spinAccumRef = spinAccumRefProp ?? localSpinAccumRef;
  // Track previous pointer NDC to detect movement frame-by-frame. The
  // threejs compute-birds example only disturbs the flock while the mouse is
  // actually moving — between frames where the pointer is stationary, the
  // ray uniforms get parked far away so the always-on repulsion sleeps.
  const lastPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const readbackInFlightRef = useRef<boolean>(false);
  const activeRatioRef = useRef<number>(0);
  const lastRegimeMsRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const localOrigin = useMemo(() => new Vector3(), []);
  const localDirection = useMemo(() => new Vector3(), []);
  const invMatrix = useMemo(() => new Matrix4(), []);

  // Rebuild pipeline ONLY if N, detail, or env texture changes — those
  // require kernel/geometry rebuild (WGSL recompile + InstancedMesh re-init,
  // both stuttery). Regime targets are pre-baked into the big buffer at
  // build time; section changes update offset uniforms via setRegimeIndices.
  const built = useMemo<Built>(
    () => buildPipeline(N, fluid.detail, envTex, targets),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [N, fluid.detail, envTex],
  );

  // Expose imperative setRegimeIndices to the engine. Re-populated when
  // the pipeline rebuilds (rare — only on N/detail/env changes).
  useEffect(() => {
    if (!handleRef) return;
    handleRef.current = {
      setRegimeIndices: (t1Idx, t2Idx, t3Idx) =>
        setRegimeIndices(built, t1Idx, t2Idx, t3Idx),
    };
    return () => {
      if (handleRef.current) handleRef.current = null;
    };
  }, [built, handleRef]);

  useEffect(() => {
    const u = built.pbrUniforms;
    (u.uColor.value as Color).set(matCfg.color);
    u.uMetalness.value = matCfg.metalness;
    u.uRoughness.value = matCfg.roughness;
    u.uExposure.value = matCfg.exposure;
    u.uEnvIntensity.value = matCfg.envIntensity;
    u.uEmissiveIntensity.value = matCfg.emissiveIntensity;
    (u.uEmissiveColor.value as Color).set(matCfg.emissiveColor);
    (u.uTintColor.value as Color).set(matCfg.tintColor);
    u.uTintRadius.value = matCfg.tintRadius;
    u.uTintActive.value = matCfg.tintActive;
    (u.uSunColor.value as Color).set(matCfg.sunColor);
    u.uSunRadius.value = matCfg.sunRadius;
    u.uSunIntensity.value = matCfg.sunIntensity;
    u.uSunFalloff.value = matCfg.sunFalloff;
    u.uSunActive.value = matCfg.sunActive;
    (u.uCageColor.value as Color).set(matCfg.cageColor);
    u.uCageThreshold.value = matCfg.cageThreshold;
    u.uCageActive.value = matCfg.cageActive;
  }, [built, matCfg]);

  useEffect(() => {
    const ec = built.ec;
    ec.separation.value = boids.separation;
    ec.alignment.value = boids.alignment;
    ec.cohesion.value = boids.cohesion;
    ec.damping.value = boids.damping;
    ec.speedLimit.value = boids.speedLimit;
    ec.attractorStrength.value = boids.attractorStrength;
    ec.attractorRange.value = boids.attractorRange;
    ec.rayRadius.value = boids.rayRadius;
    ec.rayStrength.value = boids.rayStrength;
    ec.snapThreshold.value = boids.snapThreshold;
    ec.recoveryRate.value = boids.recoveryRate;
    ec.particleScale.value = boids.particleScale;
    ec.flockBoost.value = boids.flockBoost;
    ec.envPeak.value = boids.envPeak;
    ec.armThreshold.value = boids.armThreshold;
  }, [built, boids]);

  useFrame((state) => {
    const now = performance.now();
    const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
    lastTimeRef.current = now;

    const renderer = state.gl as unknown as WebGPURenderer;
    if (typeof renderer.compute !== "function") return;

    // Live-config: prefer refs over prop snapshots when provided. The engine
    // mutates refs each frame to drive transition lerps without touching
    // React props (which would thrash useEffect deps + GC pressure).
    const liveTransform = transformRef?.current ?? transform;
    const liveBoids = boidsRef?.current;
    const liveMaterial = materialRef?.current;

    if (liveBoids) {
      const ec = built.ec;
      ec.separation.value = liveBoids.separation;
      ec.alignment.value = liveBoids.alignment;
      ec.cohesion.value = liveBoids.cohesion;
      ec.damping.value = liveBoids.damping;
      ec.speedLimit.value = liveBoids.speedLimit;
      ec.attractorStrength.value = liveBoids.attractorStrength;
      ec.attractorRange.value = liveBoids.attractorRange;
      ec.rayRadius.value = liveBoids.rayRadius;
      ec.rayStrength.value = liveBoids.rayStrength;
      ec.snapThreshold.value = liveBoids.snapThreshold;
      ec.recoveryRate.value = liveBoids.recoveryRate;
      ec.particleScale.value = liveBoids.particleScale;
      ec.flockBoost.value = liveBoids.flockBoost;
      ec.envPeak.value = liveBoids.envPeak;
      ec.armThreshold.value = liveBoids.armThreshold;
    }
    if (liveMaterial) {
      const u = built.pbrUniforms;
      (u.uColor.value as Color).set(liveMaterial.color);
      u.uMetalness.value = liveMaterial.metalness;
      u.uRoughness.value = liveMaterial.roughness;
      u.uExposure.value = liveMaterial.exposure;
      u.uEnvIntensity.value = liveMaterial.envIntensity;
      u.uEmissiveIntensity.value = liveMaterial.emissiveIntensity;
      (u.uEmissiveColor.value as Color).set(liveMaterial.emissiveColor);
      (u.uTintColor.value as Color).set(liveMaterial.tintColor);
      u.uTintRadius.value = liveMaterial.tintRadius;
      u.uTintActive.value = liveMaterial.tintActive;
      (u.uSunColor.value as Color).set(liveMaterial.sunColor);
      u.uSunRadius.value = liveMaterial.sunRadius;
      u.uSunIntensity.value = liveMaterial.sunIntensity;
      u.uSunFalloff.value = liveMaterial.sunFalloff;
      u.uSunActive.value = liveMaterial.sunActive;
      (u.uCageColor.value as Color).set(liveMaterial.cageColor);
      u.uCageThreshold.value = liveMaterial.cageThreshold;
      u.uCageActive.value = liveMaterial.cageActive;
    }

    built.ec.morph.value = stateRef.current.morph;
    lastMorphRef.current = stateRef.current.morph;

    const t = state.clock.getElapsedTime();
    const spinSpeed = autoSpinSpeedRef?.current ?? anim.autoSpinSpeed;
    spinAccumRef.current += spinSpeed * dt;
    if (groupRef.current) {
      const hoverOffset = Math.sin(t * anim.hoverSpeed) * anim.hoverAmplitude;
      groupRef.current.position.set(
        liveTransform.posX,
        liveTransform.posY + hoverOffset,
        liveTransform.posZ,
      );
      groupRef.current.rotation.set(
        liveTransform.rotX,
        liveTransform.rotY + spinAccumRef.current,
        liveTransform.rotZ,
      );
      groupRef.current.scale.setScalar(
        liveTransform.scale * stateRef.current.scaleMul,
      );
      groupRef.current.updateMatrixWorld();
    }

    built.raycaster.setFromCamera(state.pointer, state.camera);

    if (groupRef.current) {
      invMatrix.copy(groupRef.current.matrixWorld).invert();
      localOrigin
        .copy(built.raycaster.ray.origin)
        .applyMatrix4(invMatrix);
      localDirection
        .copy(built.raycaster.ray.direction)
        .transformDirection(invMatrix)
        .normalize();
    } else {
      localOrigin.copy(built.raycaster.ray.origin);
      localDirection.copy(built.raycaster.ray.direction);
    }

    // Mouse only disturbs the flock when actually moving. r3f's state.pointer
    // updates only on DOM pointermove events, so per-frame equality vs last
    // frame's value tells us whether the user moved this frame.
    const pointerMoved =
      state.pointer.x !== lastPointerRef.current.x ||
      state.pointer.y !== lastPointerRef.current.y;
    lastPointerRef.current.x = state.pointer.x;
    lastPointerRef.current.y = state.pointer.y;

    const ec = built.ec;
    ec.deltaTime.value = dt;
    ec.time.value = t;
    if (pointerMoved) {
      ec.rayOrigin.value.copy(localOrigin);
      ec.rayDirection.value.copy(localDirection);
    } else {
      ec.rayOrigin.value.set(1e6, 1e6, 1e6);
      ec.rayDirection.value.set(0, 0, -1);
    }

    // Per-particle morph: ec.particleMorphFloor is a global floor (uniform);
    // the actual per-particle morph is computed in vertex stage from
    // distance(localPos, target) using ec.morphInnerR / ec.morphOuterR. The
    // wave/flap/bird uniforms still live on morphUniforms (shared across
    // shape materials). Prefer fluidRef when provided so the engine can
    // drive per-section overrides each frame.
    const liveFluid = fluidRef?.current ?? fluid;
    ec.particleMorphFloor.value = liveFluid.particleMorph;
    ec.morphInnerR.value = liveFluid.morphInnerR;
    ec.morphOuterR.value = liveFluid.morphOuterR;
    const mu = built.morphUniforms;
    mu.uWaveAmp.value = liveFluid.waveAmp;
    mu.uWaveSpeed.value = liveFluid.waveSpeed;
    mu.uPhaseRandom.value = liveFluid.phaseRandom;
    mu.uWaveLayers.value = liveFluid.waveLayers;
    mu.uFlap.value = liveFluid.flapAmount;
    mu.uBirdThick.value = liveFluid.birdThick;
    mu.uPhase.value += dt * liveFluid.flapSpeed;
    mu.uTime.value = t;

    renderer.compute(built.computeVelocity);
    renderer.compute(built.computePosition);

    frameRef.current += 1;

    // Swarming-ratio readback (every 5 frames) — feeds engine's settle
    // gate. Reads `freeAttr` (per-particle 0/1 distance-from-target
    // flag) and writes mean to swarmingRatioRef. Independent of the
    // velocity-readback path used by regimeEnabled.
    if (
      swarmingRatioRef &&
      !readbackInFlightRef.current &&
      frameRef.current % 5 === 0
    ) {
      readbackInFlightRef.current = true;
      const rendererAny = renderer as unknown as {
        getArrayBufferAsync?: (a: BufferAttribute) => Promise<ArrayBuffer>;
      };
      if (typeof rendererAny.getArrayBufferAsync !== "function") {
        readbackInFlightRef.current = false;
      } else {
        rendererAny
          .getArrayBufferAsync(built.freeAttr)
          .then((buf) => {
            const arr = new Float32Array(buf);
            let sum = 0;
            for (let i = 0; i < N; i++) sum += arr[i];
            swarmingRatioRef.current = sum / N;
          })
          .catch(() => {})
          .finally(() => {
            readbackInFlightRef.current = false;
          });
      }
    } else if (
      boids.regimeEnabled &&
      !readbackInFlightRef.current &&
      frameRef.current % 5 === 0
    ) {
      readbackInFlightRef.current = true;
      const rendererAny = renderer as unknown as {
        getArrayBufferAsync?: (a: BufferAttribute) => Promise<ArrayBuffer>;
      };
      if (typeof rendererAny.getArrayBufferAsync !== "function") {
        readbackInFlightRef.current = false;
      } else {
        rendererAny
          .getArrayBufferAsync(built.velocityAttr)
          .then((buf) => {
            const arr = new Float32Array(buf);
            const stride = arr.length >= N * 4 ? 4 : 3;
            const sq =
              boids.regimeVelocityThreshold * boids.regimeVelocityThreshold;
            let active = 0;
            for (let i = 0; i < N; i++) {
              const x = arr[i * stride];
              const y = arr[i * stride + 1];
              const z = arr[i * stride + 2];
              if (x * x + y * y + z * z > sq) active++;
            }
            activeRatioRef.current = active / N;
          })
          .catch(() => {})
          .finally(() => {
            readbackInFlightRef.current = false;
          });
      }
    }

    if (boids.regimeEnabled) {
      const nowMs = performance.now();
      const cooledDown =
        (nowMs - lastRegimeMsRef.current) / 1000 > boids.regimeCooldown;
      if (activeRatioRef.current > boids.regimeRatio && cooledDown) {
        const cur = Math.round(stateRef.current.morph);
        const next = (cur + 1) % 3;
        lastRegimeMsRef.current = nowMs;
        activeRatioRef.current = 0;
        stateRef.current.morph = next;
        onRegimeChange?.(next);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {built.meshes.map((m, i) => (
        <primitive key={i} object={m} />
      ))}
    </group>
  );
}
