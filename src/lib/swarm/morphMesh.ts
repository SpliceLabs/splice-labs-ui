/* eslint-disable @typescript-eslint/no-explicit-any */
// Morph-mesh primitive: poly → blob → bird vertex morph using a single
// icosphere base mesh. Two layers of API:
//   - buildMorphGeometry(kind, detail): BufferGeometry with packed attributes
//   - buildMorphNodes(init): TSL node graph for vertex displacement
//
// Designed so callers (FluidV3 cell, V6/V7 instanced swarm) compose with
// their own per-instance translate/rotate/scale. The morph builder always
// returns LOCAL-space position; instancing/transform is the caller's job.

import {
  BufferAttribute,
  BufferGeometry,
  IcosahedronGeometry,
  Vector3,
} from "three";
// IMPORTANT: import TSL from three/webgpu, NOT three/tsl. three/tsl is a
// separate prebuilt bundle with its own internal node registry. When the
// app also imports WebGPURenderer/NodeMaterial from three/webgpu, the two
// bundles end up with independent NodeBuilder state and nodes built via
// three/tsl fail to register against the WebGPU builder ("Uniform 'null'
// not declared"). three/webgpu re-exports the TSL namespace from the same
// instance, so all TSL calls share one registry.
import { TSL } from "three/webgpu";

const uniform = TSL.uniform as any;
const attribute = TSL.attribute as any;
const vec3 = TSL.vec3 as any;
const float = TSL.float as any;
const mix = TSL.mix as any;
const clamp = TSL.clamp as any;
const normalize = TSL.normalize as any;
const sin = TSL.sin as any;
const positionLocal = TSL.positionLocal as any;

// ---------- Constants ----------

export const TARGET_R = 0.6;
export const BIRD_RAW_MAX = 30;
export const BIRD_SCALE = TARGET_R / BIRD_RAW_MAX;
export const WING_TIP_X = 20 * BIRD_SCALE;

// Bird verts pre-rotated upright (x, z, -y of the original threejs sample).
const BIRD_VERTS_RAW: number[] = [
  0, 0, -20, 0, -8, 10, 0, 0, 30,
  0, 0, -15, -20, 0, 5, 0, 0, 15,
  0, 0, 15, 20, 0, 5, 0, 0, -15,
];
export const BIRD_VERTS = (() => {
  const out = new Float32Array(BIRD_VERTS_RAW.length);
  for (let i = 0; i < BIRD_VERTS_RAW.length; i += 3) {
    out[i + 0] = BIRD_VERTS_RAW[i];
    out[i + 1] = BIRD_VERTS_RAW[i + 2];
    out[i + 2] = -BIRD_VERTS_RAW[i + 1];
  }
  return out;
})();

const BIRD_TRIS: { v: Vector3[]; isWing: boolean }[] = (() => {
  const v = (i: number) =>
    new Vector3(
      BIRD_VERTS[i * 3] * BIRD_SCALE,
      BIRD_VERTS[i * 3 + 1] * BIRD_SCALE,
      BIRD_VERTS[i * 3 + 2] * BIRD_SCALE,
    );
  return [
    { v: [v(0), v(1), v(2)], isWing: false },
    { v: [v(3), v(4), v(5)], isWing: true },
    { v: [v(6), v(7), v(8)], isWing: true },
  ];
})();

export type ShapeKind = 0 | 1 | 2 | 3;

export function polyR(kind: ShapeKind): number {
  switch (kind) {
    case 0: return TARGET_R;
    case 1: return TARGET_R / Math.sqrt(3);
    case 2: return TARGET_R;
    case 3: return TARGET_R;
  }
}

// ---------- CPU SDFs (sign-correct for radial bisection) ----------

function sdOcta(p: Vector3, s: number): number {
  return (Math.abs(p.x) + Math.abs(p.y) + Math.abs(p.z) - s) * 0.57735027;
}
function sdBox(p: Vector3, h: number): number {
  const qx = Math.abs(p.x) - h;
  const qy = Math.abs(p.y) - h;
  const qz = Math.abs(p.z) - h;
  const ox = Math.max(qx, 0);
  const oy = Math.max(qy, 0);
  const oz = Math.max(qz, 0);
  const outside = Math.sqrt(ox * ox + oy * oy + oz * oz);
  const inside = Math.min(Math.max(qx, Math.max(qy, qz)), 0);
  return outside + inside;
}
function sdTetra(p: Vector3, r: number): number {
  return (
    (Math.max(Math.abs(p.x + p.y) - p.z, Math.abs(p.x - p.y) + p.z) - r) /
    Math.sqrt(3)
  );
}
function sdIcosa(p: Vector3, r: number): number {
  const G = 1.61803398874989;
  const NRM = 0.52573111211913;
  const planes: [number, number, number][] = [
    [G, 1, 0], [-G, 1, 0],
    [0, G, 1], [0, -G, 1],
    [1, 0, G], [-1, 0, G],
  ];
  let d = -Infinity;
  for (const [nx, ny, nz] of planes) {
    const dp = Math.abs(p.x * nx * NRM + p.y * ny * NRM + p.z * nz * NRM);
    if (dp > d) d = dp;
  }
  return d - r;
}

function sdfShape(p: Vector3, kind: ShapeKind): number {
  const r = polyR(kind);
  switch (kind) {
    case 0: return sdOcta(p, r);
    case 1: return sdBox(p, r);
    case 2: return sdTetra(p, r);
    case 3: return sdIcosa(p, r);
  }
}

function projectRadial(dir: Vector3, kind: ShapeKind, out: Vector3) {
  let lo = 0;
  let hi = TARGET_R * 4;
  const probe = new Vector3();
  for (let iter = 0; iter < 40; iter++) {
    const mid = (lo + hi) * 0.5;
    probe.copy(dir).multiplyScalar(mid);
    if (sdfShape(probe, kind) < 0) lo = mid;
    else hi = mid;
  }
  out.copy(dir).multiplyScalar((lo + hi) * 0.5);
}

function polyNormal(p: Vector3, kind: ShapeKind, out: Vector3) {
  const eps = 0.001;
  const ks = [
    new Vector3(1, -1, -1),
    new Vector3(-1, -1, 1),
    new Vector3(-1, 1, -1),
    new Vector3(1, 1, 1),
  ];
  out.set(0, 0, 0);
  const tmp = new Vector3();
  for (const k of ks) {
    tmp.copy(p).addScaledVector(k, eps);
    const d = sdfShape(tmp, kind);
    out.addScaledVector(k, d);
  }
  if (out.lengthSq() < 1e-8) out.copy(p).normalize();
  else out.normalize();
}

function closestPointOnTri(
  p: Vector3,
  a: Vector3,
  b: Vector3,
  c: Vector3,
  out: Vector3,
): number {
  const ab = new Vector3().subVectors(b, a);
  const ac = new Vector3().subVectors(c, a);
  const ap = new Vector3().subVectors(p, a);
  const d1 = ab.dot(ap);
  const d2 = ac.dot(ap);
  if (d1 <= 0 && d2 <= 0) {
    out.copy(a);
    return out.distanceTo(p);
  }
  const bp = new Vector3().subVectors(p, b);
  const d3 = ab.dot(bp);
  const d4 = ac.dot(bp);
  if (d3 >= 0 && d4 <= d3) {
    out.copy(b);
    return out.distanceTo(p);
  }
  const vc = d1 * d4 - d3 * d2;
  if (vc <= 0 && d1 >= 0 && d3 <= 0) {
    const t = d1 / (d1 - d3);
    out.copy(a).addScaledVector(ab, t);
    return out.distanceTo(p);
  }
  const cp = new Vector3().subVectors(p, c);
  const d5 = ab.dot(cp);
  const d6 = ac.dot(cp);
  if (d6 >= 0 && d5 <= d6) {
    out.copy(c);
    return out.distanceTo(p);
  }
  const vb = d5 * d2 - d1 * d6;
  if (vb <= 0 && d2 >= 0 && d6 <= 0) {
    const t = d2 / (d2 - d6);
    out.copy(a).addScaledVector(ac, t);
    return out.distanceTo(p);
  }
  const va = d3 * d6 - d5 * d4;
  if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) {
    const t = (d4 - d3) / (d4 - d3 + (d5 - d6));
    out.copy(b).addScaledVector(new Vector3().subVectors(c, b), t);
    return out.distanceTo(p);
  }
  const denom = 1 / (va + vb + vc);
  const v_ = vb * denom;
  const w_ = vc * denom;
  out.copy(a).addScaledVector(ab, v_).addScaledVector(ac, w_);
  return out.distanceTo(p);
}

function projectBird(
  p: Vector3,
  outCp: Vector3,
  outDir: Vector3,
): { wing: number } {
  let best = Infinity;
  const tmp = new Vector3();
  let bestTri: { v: Vector3[]; isWing: boolean } | null = null;
  for (const tri of BIRD_TRIS) {
    const d = closestPointOnTri(p, tri.v[0], tri.v[1], tri.v[2], tmp);
    if (d < best) {
      best = d;
      outCp.copy(tmp);
      bestTri = tri;
    }
  }
  outDir.subVectors(p, outCp);
  if (outDir.lengthSq() < 1e-10) {
    if (bestTri) {
      const ab = new Vector3().subVectors(bestTri.v[1], bestTri.v[0]);
      const ac = new Vector3().subVectors(bestTri.v[2], bestTri.v[0]);
      outDir.crossVectors(ab, ac);
    }
    if (outDir.lengthSq() < 1e-10) outDir.set(0, 1, 0);
  }
  outDir.normalize();
  let wing = 0;
  if (bestTri && bestTri.isWing) {
    wing = Math.min(1, Math.abs(outCp.x) / WING_TIP_X);
  }
  return { wing };
}

// ---------- Geometry builder ----------

// Returns BufferGeometry with attributes:
//   position  — icosphere unit verts (used as direction & blob source)
//   aPoly     — radially-projected polyhedron position
//   aBirdCp   — closest point on bare bird tris
//   aBirdOut  — outward unit dir from cp (for thickness extrusion)
//   aNormPoly — analytic poly face normal
//   aPack     — packed scalars: x=wavePhase, y=randPhase, z=wingWeight
//
// Built-in normal/uv attributes are removed to stay under WebGPU's 8 vertex
// buffer cap (we end up with 6 attributes total: position + 5 morph attrs).
export function buildMorphGeometry(
  kind: ShapeKind,
  detail: number,
): BufferGeometry {
  const base = new IcosahedronGeometry(1, detail);
  const pos = base.attributes.position as BufferAttribute;
  const n = pos.count;

  const aPoly = new Float32Array(n * 3);
  const aBirdCp = new Float32Array(n * 3);
  const aBirdOut = new Float32Array(n * 3);
  const aNormPoly = new Float32Array(n * 3);
  const aPack = new Float32Array(n * 3);

  const dir = new Vector3();
  const polyP = new Vector3();
  const polyN = new Vector3();
  const blobP = new Vector3();
  const birdCp = new Vector3();
  const birdOut = new Vector3();

  for (let i = 0; i < n; i++) {
    dir.fromBufferAttribute(pos, i).normalize();
    blobP.copy(dir).multiplyScalar(TARGET_R);

    projectRadial(dir, kind, polyP);
    polyNormal(polyP, kind, polyN);
    aPoly[i * 3 + 0] = polyP.x;
    aPoly[i * 3 + 1] = polyP.y;
    aPoly[i * 3 + 2] = polyP.z;
    aNormPoly[i * 3 + 0] = polyN.x;
    aNormPoly[i * 3 + 1] = polyN.y;
    aNormPoly[i * 3 + 2] = polyN.z;

    const { wing } = projectBird(blobP, birdCp, birdOut);
    aBirdCp[i * 3 + 0] = birdCp.x;
    aBirdCp[i * 3 + 1] = birdCp.y;
    aBirdCp[i * 3 + 2] = birdCp.z;
    aBirdOut[i * 3 + 0] = birdOut.x;
    aBirdOut[i * 3 + 1] = birdOut.y;
    aBirdOut[i * 3 + 2] = birdOut.z;

    aPack[i * 3 + 0] =
      Math.sin(blobP.x * 3.7) +
      Math.sin(blobP.y * 4.3) +
      Math.sin(blobP.z * 5.1);
    aPack[i * 3 + 1] = Math.random() * Math.PI * 2;
    aPack[i * 3 + 2] = wing;
  }

  base.setAttribute("aPoly", new BufferAttribute(aPoly, 3));
  base.setAttribute("aBirdCp", new BufferAttribute(aBirdCp, 3));
  base.setAttribute("aBirdOut", new BufferAttribute(aBirdOut, 3));
  base.setAttribute("aNormPoly", new BufferAttribute(aNormPoly, 3));
  base.setAttribute("aPack", new BufferAttribute(aPack, 3));
  base.deleteAttribute("normal");
  base.deleteAttribute("uv");

  return base;
}

// ---------- TSL node builder ----------

export type MorphInit = {
  morph?: number;
  waveAmp?: number;
  waveSpeed?: number;
  // 0 = all cells phase-locked, 1 = each cell on its own clock.
  phaseRandom?: number;
  // 0..2 — fades in extra wave layers (1 → +faster, 2 → +slower).
  waveLayers?: number;
  flapAmount?: number;
  birdThick?: number;
  // Override per-cell time offset; defaults to Math.random()*100.
  cellSeed?: number;
  // Initial wing flap phase; defaults to Math.random()*2π.
  flapPhase?: number;
};

export type MorphPosInit = {
  uniforms: MorphUniforms;
  // Per-particle morph expression. If omitted, uniforms.uMorph drives the
  // whole mesh (single global morph). When provided, this expression replaces
  // uMorph in the position math — caller can build it from any per-instance
  // signal (e.g. distance-from-target, velocity, free state).
  morphNode?: any;
};

export type MorphPosNodes = {
  localPosNode: any;
  localNormalDirNode: any;
  wingWeightNode: any;
};

export type MorphUniforms = {
  uMorph: any;
  uWaveAmp: any;
  uWaveSpeed: any;
  uPhaseRandom: any;
  uWaveLayers: any;
  uCellSeed: any;
  uPhase: any;
  uTime: any;
  uFlap: any;
  uBirdThick: any;
};

export type MorphNodes = {
  // Local-space morphed vertex position. Caller plugs into mat.positionNode
  // directly, OR composes with per-instance translate/rotate/scale.
  localPosNode: any;
  // Lerped surface-normal direction. Suitable for jitter direction or
  // fallback shading; use dFdx-based normal in fragment for accurate PBR.
  localNormalDirNode: any;
  // Per-vert wing weight (0 body, 1 wing tip). Exposed for additional fx.
  wingWeightNode: any;
  uniforms: MorphUniforms;
};

const D = (v: number | undefined, fallback: number) =>
  v === undefined ? fallback : v;

// Allocate the uniform set used by buildMorphPos. Caller owns the lifetime
// and may share one set across multiple buildMorphPos calls (e.g. when the
// same swarm needs different per-particle morph expressions per shape group
// but shared wave/flap/bird parameters).
export function buildMorphUniforms(init: MorphInit = {}): MorphUniforms {
  return {
    uMorph: uniform(D(init.morph, 0)),
    uWaveAmp: uniform(D(init.waveAmp, 0.265)),
    uWaveSpeed: uniform(D(init.waveSpeed, 2.5)),
    uPhaseRandom: uniform(D(init.phaseRandom, 1)),
    uWaveLayers: uniform(D(init.waveLayers, 2)),
    uCellSeed: uniform(D(init.cellSeed, Math.random() * 100)),
    uPhase: uniform(D(init.flapPhase, Math.random() * Math.PI * 2)),
    uTime: uniform(0),
    uFlap: uniform(D(init.flapAmount, 8)),
    uBirdThick: uniform(D(init.birdThick, 0.04)),
  };
}

// Build the position+normal+wing-weight node graph for one material. Reads
// per-vertex attributes from the bound geometry (aPoly, aBirdCp, aBirdOut,
// aNormPoly, aPack — see buildMorphGeometry) and combines with the uniform
// state from `opts.uniforms`.
//
// `opts.morphNode` overrides uniforms.uMorph in the position math when
// provided. Use it to drive morph from a per-instance signal (e.g. distance
// from formation target). Other uniforms (wave, flap, bird thickness) still
// apply globally — they shape the morph trajectory rather than gating it.
export function buildMorphPos(opts: MorphPosInit): MorphPosNodes {
  const { uniforms } = opts;
  const morphValue = opts.morphNode ?? uniforms.uMorph;

  const aPoly = attribute("aPoly", "vec3");
  const aBirdCp = attribute("aBirdCp", "vec3");
  const aBirdOut = attribute("aBirdOut", "vec3");
  const aNormPoly = attribute("aNormPoly", "vec3");
  const aPack = attribute("aPack", "vec3");

  // aBlob = positionLocal * TARGET_R (icosphere base verts are unit-length).
  const aBlob = positionLocal.mul(float(TARGET_R));
  const aWavePhase = aPack.x;
  const aWingWeight = aPack.z;

  // Morph stages: 0..0.5 = poly→blob, 0.5..1 = blob→bird.
  const t1 = clamp(morphValue.mul(2.0), float(0), float(1));
  const t2 = clamp(morphValue.mul(2.0).sub(1.0), float(0), float(1));

  // Bird with thickness: closest-point + outward * birdThick.
  const aBird = aBirdCp.add(aBirdOut.mul(uniforms.uBirdThick));

  const stage1Pos = mix(aPoly, aBlob, t1);
  const morphPos = mix(stage1Pos, aBird, t2);

  // Lerped normal direction. Blob normal = aBlob direction (radial unit
  // vector). Bird normal = aBirdOut.
  const aNormBlob = normalize(aBlob);
  const stage1Norm = mix(aNormPoly, aNormBlob, t1);
  const morphNormDir = normalize(mix(stage1Norm, aBirdOut, t2));

  // Multi-layer wave. tEff = uTime + uCellSeed*uPhaseRandom for per-cell
  // desync. Bell amplitude peaks at morph=0.5 — particles in mid-fluid get
  // the wave; particles fully poly or fully bird get none.
  const bell = sin(morphValue.mul(Math.PI));
  const tEff = uniforms.uTime.add(uniforms.uCellSeed.mul(uniforms.uPhaseRandom));
  const w1 = sin(tEff.mul(uniforms.uWaveSpeed).add(aWavePhase));
  const w2 = sin(
    tEff
      .mul(uniforms.uWaveSpeed.mul(1.7))
      .add(aWavePhase.mul(2.1))
      .add(float(1.3)),
  );
  const w3 = sin(
    tEff
      .mul(uniforms.uWaveSpeed.mul(0.43))
      .add(aWavePhase.mul(0.6))
      .add(float(2.7)),
  );
  const layer2Mix = clamp(uniforms.uWaveLayers, float(0), float(1));
  const layer3Mix = clamp(uniforms.uWaveLayers.sub(1.0), float(0), float(1));
  const waveSum = w1
    .add(w2.mul(layer2Mix).mul(0.6))
    .add(w3.mul(layer3Mix).mul(0.4));
  const norm = float(1.0).add(layer2Mix.mul(0.6)).add(layer3Mix.mul(0.4));
  const wave = waveSum.div(norm);
  const waveOffset = morphNormDir.mul(wave.mul(bell).mul(uniforms.uWaveAmp));

  // Wing flap: only wing-weighted verts in bird stage (t2²).
  const flapAmt = sin(uniforms.uPhase).mul(uniforms.uFlap).mul(BIRD_SCALE);
  const flapZ = aWingWeight.mul(flapAmt).mul(t2.mul(t2));
  const flapOffset = vec3(0, 0, flapZ);

  const localPosNode = morphPos.add(waveOffset).add(flapOffset);

  return {
    localPosNode,
    localNormalDirNode: morphNormDir,
    wingWeightNode: aWingWeight,
  };
}

// Convenience: allocate uniforms + build position graph in one call. Used
// by FluidV3 (single mesh, single morph value). Swarm-style consumers that
// need per-particle morph should call buildMorphUniforms + buildMorphPos
// directly so they can share one uniform set across multiple materials.
export function buildMorphNodes(init: MorphInit = {}): MorphNodes {
  const uniforms = buildMorphUniforms(init);
  const pos = buildMorphPos({ uniforms });
  return { ...pos, uniforms };
}
