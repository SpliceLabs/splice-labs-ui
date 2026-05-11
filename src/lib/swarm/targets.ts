import { Box3, Mesh, Vector3 } from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

type Bone = { a: [number, number, number]; b: [number, number, number]; r: number };

// Bones as line segments with thickness — particles sampled along their length and within their radius.
const BONES: Bone[] = [
  { a: [0, 1.55, 0],     b: [0, 1.82, 0],     r: 0.18 }, // head
  { a: [0, 1.05, 0],     b: [0, 1.55, 0],     r: 0.13 }, // neck
  { a: [0, 0.45, 0],     b: [0, 1.05, 0],     r: 0.24 }, // torso
  { a: [-0.5, 1.22, 0],  b: [0.5, 1.22, 0],   r: 0.11 }, // shoulder line
  { a: [-0.2, 0.0, 0],   b: [0.2, 0.0, 0],    r: 0.18 }, // hip line

  { a: [-0.5, 1.22, 0],  b: [-0.8, 0.7, 0],   r: 0.10 }, // L upper arm
  { a: [-0.8, 0.7, 0],   b: [-0.97, 0.18, 0], r: 0.085 }, // L forearm
  { a: [0.5, 1.22, 0],   b: [0.8, 0.7, 0],    r: 0.10 }, // R upper arm
  { a: [0.8, 0.7, 0],    b: [0.97, 0.18, 0],  r: 0.085 }, // R forearm

  { a: [-0.2, 0.0, 0],   b: [-0.28, -0.7, 0], r: 0.13 }, // L thigh
  { a: [-0.28, -0.7, 0], b: [-0.34, -1.45, 0], r: 0.10 }, // L shin
  { a: [0.2, 0.0, 0],    b: [0.28, -0.7, 0],  r: 0.13 }, // R thigh
  { a: [0.28, -0.7, 0],  b: [0.34, -1.45, 0], r: 0.10 }, // R shin
];

export function humanoidBonesTargets(N: number): Vector3[] {
  // Weight each bone by volume (length × r²) so thicker/longer bones get proportionally more particles.
  const weights = BONES.map(({ a, b, r }) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz) * r * r;
  });
  const total = weights.reduce((s, w) => s + w, 0);

  const out: Vector3[] = [];
  for (let i = 0; i < N; i++) {
    let r = Math.random() * total;
    let idx = 0;
    for (let j = 0; j < weights.length; j++) {
      r -= weights[j];
      if (r <= 0) { idx = j; break; }
    }
    const bone = BONES[idx];
    const t = Math.random();
    const cx = bone.a[0] + (bone.b[0] - bone.a[0]) * t;
    const cy = bone.a[1] + (bone.b[1] - bone.a[1]) * t;
    const cz = bone.a[2] + (bone.b[2] - bone.a[2]) * t;
    // Uniform offset inside a sphere of radius bone.r.
    const u = Math.random();
    const off = bone.r * Math.cbrt(u);
    const theta = Math.acos(1 - 2 * Math.random());
    const phi = 2 * Math.PI * Math.random();
    out.push(new Vector3(
      cx + off * Math.sin(theta) * Math.cos(phi),
      cy + off * Math.sin(theta) * Math.sin(phi),
      cz + off * Math.cos(theta),
    ));
  }
  return out;
}

export function cloudTargets(N: number, R = 1.6): Vector3[] {
  return Array.from({ length: N }, () => {
    const u = Math.random();
    const r = R * Math.cbrt(u);
    const theta = Math.acos(1 - 2 * Math.random());
    const phi = 2 * Math.PI * Math.random();
    return new Vector3(
      r * Math.sin(theta) * Math.cos(phi),
      r * Math.sin(theta) * Math.sin(phi),
      r * Math.cos(theta),
    );
  });
}

// Sample N uniform points across a mesh's surface, then center + scale to fit a target height.
export function sampleMeshSurface(
  mesh: Mesh,
  N: number,
  opts?: { fitHeight?: number; yOffset?: number },
): Vector3[] {
  mesh.updateMatrixWorld(true);
  const sampler = new MeshSurfaceSampler(mesh).build();
  const points: Vector3[] = [];
  const tmp = new Vector3();

  for (let i = 0; i < N; i++) {
    sampler.sample(tmp);
    tmp.applyMatrix4(mesh.matrixWorld);
    points.push(tmp.clone());
  }

  const box = new Box3();
  for (const p of points) box.expandByPoint(p);
  const size = box.getSize(new Vector3());
  const center = box.getCenter(new Vector3());
  const scale = opts?.fitHeight && size.y > 0 ? opts.fitHeight / size.y : 1;

  for (const p of points) {
    p.sub(center).multiplyScalar(scale);
    if (opts?.yOffset) p.y += opts.yOffset;
  }

  return points;
}

export function sphereTargets(N: number, R = 1.3): Vector3[] {
  return Array.from({ length: N }, (_, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
    return new Vector3(
      R * Math.sin(phi) * Math.cos(theta),
      R * Math.sin(phi) * Math.sin(theta),
      R * Math.cos(phi),
    );
  });
}

// Uniform points along the 12 edges of a cube of half-extent S. Reads as
// a wireframe outline — pair with a GLB target via `cage` source spec to
// composite a shape "inside" a cage.
export function cubeEdgesTargets(N: number, S = 1.3): Vector3[] {
  return Array.from({ length: N }, () => {
    const edge = Math.floor(Math.random() * 12);
    const axis = Math.floor(edge / 4); // 0 = X-aligned, 1 = Y, 2 = Z
    const corner = edge % 4;           // bit0,bit1 = sign of the two fixed axes
    const a = (corner & 1) ? -S : S;
    const b = (corner & 2) ? -S : S;
    const t = (Math.random() * 2 - 1) * S;
    if (axis === 0) return new Vector3(t, a, b);
    if (axis === 1) return new Vector3(a, t, b);
    return new Vector3(a, b, t);
  });
}

// Uniform points on the surface of a cube of half-extent S.
export function cubeShellTargets(N: number, S = 1.3): Vector3[] {
  return Array.from({ length: N }, () => {
    const face = Math.floor(Math.random() * 6);
    const u = Math.random() * 2 - 1;
    const v = Math.random() * 2 - 1;
    switch (face) {
      case 0: return new Vector3(S, u * S, v * S);
      case 1: return new Vector3(-S, u * S, v * S);
      case 2: return new Vector3(u * S, S, v * S);
      case 3: return new Vector3(u * S, -S, v * S);
      case 4: return new Vector3(u * S, v * S, S);
      default: return new Vector3(u * S, v * S, -S);
    }
  });
}

// Surface of a torus (major radius R, tube radius r).
export function torusTargets(N: number, R = 1.2, r = 0.35): Vector3[] {
  return Array.from({ length: N }, () => {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI * 2;
    const ring = R + r * Math.cos(phi);
    return new Vector3(
      ring * Math.cos(theta),
      r * Math.sin(phi),
      ring * Math.sin(theta),
    );
  });
}

// Vertical helix.
export function helixTargets(N: number, R = 0.9, height = 3.2, turns = 3): Vector3[] {
  return Array.from({ length: N }, (_, i) => {
    const t = i / Math.max(1, N - 1);
    const angle = t * turns * Math.PI * 2;
    return new Vector3(
      R * Math.cos(angle),
      (t - 0.5) * height,
      R * Math.sin(angle),
    );
  });
}

// Flat disk in the XZ plane, sqrt-distributed for uniform area density.
export function diskTargets(N: number, R = 1.6): Vector3[] {
  return Array.from({ length: N }, () => {
    const r = R * Math.sqrt(Math.random());
    const angle = Math.random() * Math.PI * 2;
    return new Vector3(
      r * Math.cos(angle),
      (Math.random() - 0.5) * 0.05,
      r * Math.sin(angle),
    );
  });
}

// Sinusoidal wave sheet sampled on a square grid.
export function waveTargets(N: number, W = 3.0, A = 0.45): Vector3[] {
  const side = Math.ceil(Math.sqrt(N));
  return Array.from({ length: N }, (_, i) => {
    const u = (i % side) / Math.max(1, side - 1);
    const v = Math.floor(i / side) / Math.max(1, side - 1);
    const x = (u - 0.5) * W;
    const z = (v - 0.5) * W;
    const y = A * Math.sin(x * 2.0) * Math.cos(z * 2.0);
    return new Vector3(x, y, z);
  });
}

// Stacked horizontal disks of points. Reads as "layered commitments."
export function latticeTargets(N: number, layers = 6, S = 1.4): Vector3[] {
  return Array.from({ length: N }, (_, i) => {
    const layer = i % layers;
    const y = (layer / Math.max(1, layers - 1) - 0.5) * (S * 1.6);
    const r = S * Math.sqrt(Math.random());
    const a = Math.random() * Math.PI * 2;
    return new Vector3(r * Math.cos(a), y, r * Math.sin(a));
  });
}

// 3D grid w/ small jitter. Reads as "ordered, contained, audited."
export function cubeLatticeTargets(N: number, S = 1.3, jitter = 0.04): Vector3[] {
  const side = Math.ceil(Math.cbrt(N));
  return Array.from({ length: N }, (_, i) => {
    const x = i % side;
    const y = Math.floor(i / side) % side;
    const z = Math.floor(i / (side * side)) % side;
    const u = (x / Math.max(1, side - 1) - 0.5) * (S * 2);
    const v = (y / Math.max(1, side - 1) - 0.5) * (S * 2);
    const w = (z / Math.max(1, side - 1) - 0.5) * (S * 2);
    return new Vector3(
      u + (Math.random() - 0.5) * jitter,
      v + (Math.random() - 0.5) * jitter,
      w + (Math.random() - 0.5) * jitter,
    );
  });
}

// Concentric horizontal rings. Reads as "layered stack" — Helios.
export function concentricRingsTargets(
  N: number,
  layers = 4,
  baseR = 0.5,
  spacing = 0.35,
): Vector3[] {
  return Array.from({ length: N }, (_, i) => {
    const layer = i % layers;
    const r = baseR + layer * spacing;
    const a = Math.random() * Math.PI * 2;
    const yJitter = (Math.random() - 0.5) * 0.04;
    return new Vector3(r * Math.cos(a), yJitter, r * Math.sin(a));
  });
}

// Multiple cube shells laid out along X. Reads as "discrete portfolio entries."
export function cubeShellsTargets(
  N: number,
  count = 3,
  S = 0.4,
  spacing = 1.4,
): Vector3[] {
  const per = Math.ceil(N / count);
  return Array.from({ length: N }, (_, i) => {
    const cube = Math.min(count - 1, Math.floor(i / per));
    const xOffset = (cube - (count - 1) / 2) * spacing;
    const face = Math.floor(Math.random() * 6);
    const u = Math.random() * 2 - 1;
    const v = Math.random() * 2 - 1;
    let x = 0, y = 0, z = 0;
    switch (face) {
      case 0: x = S; y = u * S; z = v * S; break;
      case 1: x = -S; y = u * S; z = v * S; break;
      case 2: x = u * S; y = S; z = v * S; break;
      case 3: x = u * S; y = -S; z = v * S; break;
      case 4: x = u * S; y = v * S; z = S; break;
      default: x = u * S; y = v * S; z = -S; break;
    }
    return new Vector3(x + xOffset, y, z);
  });
}

// Wider-volume cloud — reads as "agents acting w/ scoped autonomy."
// Boids dynamics carry the visual; shape is intentionally diffuse.
export function swarmFreeTargets(N: number, R = 2.4): Vector3[] {
  return cloudTargets(N, R);
}

// Two interlinked tori arranged as a Hopf link — each torus's major loop
// passes through the hole of the other. Reads as "link up / connect."
//
// Layout (target-space, untransformed):
//   Torus A: axis = Z (lies in XY plane), centered at (-R/2, 0, 0).
//   Torus B: local axis Z' rotated by `angle` around the X axis, centered
//            at (+R/2, 0, 0). angle=π/2 ⇒ perpendicular tori (axes Z and Y).
//
// Parameters:
//   R     = major radius (loop)
//   r     = minor radius (tube thickness)
//   angle = angle between the two torus axes, radians. 0 ⇒ coplanar (not
//           linked); π/2 ⇒ perpendicular; small values give a "barely tilted
//           rings" read. Defaults sized to fit the standard ~1.65 slot radius.
//
// Particles are split evenly and sampled uniformly in (u, v) on each surface.
export function doubleTorusTargets(
  N: number,
  R = 0.6,
  r = 0.12,
  angle = Math.PI / 2,
): Vector3[] {
  const half = Math.ceil(N / 2);
  const cosT = Math.cos(angle);
  const sinT = Math.sin(angle);
  return Array.from({ length: N }, (_, i) => {
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI * 2;
    const rim = R + r * Math.cos(v);
    const minor = r * Math.sin(v);
    if (i < half) {
      // Torus A: axis Z (XY plane), centered (-R/2, 0, 0).
      return new Vector3(
        -R / 2 + rim * Math.cos(u),
        rim * Math.sin(u),
        minor,
      );
    }
    // Torus B: local frame with axis Z', rotated by `angle` around X. At
    // angle=π/2 the local Z' lands on world Y (perpendicular to A).
    const ly = rim * Math.sin(u);
    const lz = minor;
    return new Vector3(
      R / 2 + rim * Math.cos(u),
      ly * cosT - lz * sinT,
      ly * sinT + lz * cosT,
    );
  });
}

// Animated orbital system. Generator emits FLAT (untilted) XZ-plane positions:
//   sun  → volumetric sphere at origin
//   ring → samples along each ring's circumference (thin tube)
//   planet → cluster around (radius, 0) at planetAngle on each ring
// Kernel rotates each particle around Y by its omega*time, then tilts the
// whole plane around X by `tilt` (uOrbitTilt). See SwarmV7 for kernel.

export type OrbitalRingSpec = {
  radius: number;       // ring radius in flat XZ plane
  omega: number;        // angular velocity (rad/sec)
  planetSize: number;   // sphere radius for the planet cluster
  planetAngle: number;  // initial angular position of the planet on its ring (rad)
};

export type OrbitalParams = {
  sunRadius: number;          // volumetric core sphere radius
  rings: OrbitalRingSpec[];
  tilt: number;               // orbital-plane tilt around X axis (rad)
  sunRatio?: number;          // fraction of N going to sun (default 0.20)
  ringPathRatio?: number;     // fraction along ring tubes (default 0.30)
  ringTubeJitter?: number;    // radial jitter applied to ring-path samples (default 0.02)
  ringTubeYJitter?: number;   // vertical jitter for ring-path samples (default 0.01)
};

function sampleSpherical(R: number): Vector3 {
  const u = Math.random();
  const r = R * Math.cbrt(u);
  const theta = Math.acos(1 - 2 * Math.random());
  const phi = 2 * Math.PI * Math.random();
  return new Vector3(
    r * Math.sin(theta) * Math.cos(phi),
    r * Math.sin(theta) * Math.sin(phi),
    r * Math.cos(theta),
  );
}

export function orbitalSystemTargets(N: number, p: OrbitalParams): Vector3[] {
  const sunRatio = p.sunRatio ?? 0.20;
  const ringPathRatio = p.ringPathRatio ?? 0.30;
  const ringCount = p.rings.length;
  const sunCount = Math.floor(N * sunRatio);
  const ringPathTotal = Math.floor(N * ringPathRatio);
  const planetTotal = N - sunCount - ringPathTotal;
  const ringPathPer = Math.floor(ringPathTotal / Math.max(1, ringCount));
  const planetPer = Math.floor(planetTotal / Math.max(1, ringCount));
  const radJitter = p.ringTubeJitter ?? 0.02;
  const yJitter = p.ringTubeYJitter ?? 0.01;

  const out: Vector3[] = [];
  for (let i = 0; i < sunCount; i++) out.push(sampleSpherical(p.sunRadius));

  for (let r = 0; r < ringCount; r++) {
    const ring = p.rings[r];
    for (let i = 0; i < ringPathPer; i++) {
      const angle = Math.random() * Math.PI * 2;
      const rr = ring.radius + (Math.random() - 0.5) * radJitter;
      const yj = (Math.random() - 0.5) * yJitter;
      out.push(new Vector3(rr * Math.cos(angle), yj, rr * Math.sin(angle)));
    }
  }

  for (let r = 0; r < ringCount; r++) {
    const ring = p.rings[r];
    const cx = ring.radius * Math.cos(ring.planetAngle);
    const cz = ring.radius * Math.sin(ring.planetAngle);
    for (let i = 0; i < planetPer; i++) {
      const off = sampleSpherical(ring.planetSize);
      out.push(new Vector3(cx + off.x, off.y, cz + off.z));
    }
  }

  while (out.length < N) out.push(sampleSpherical(p.sunRadius));
  return out.slice(0, N);
}

// Double helix — two intertwined strands + rungs. Reads as DNA at ~2000
// particles. Pair w/ regime.rotation = { omega } for whole-structure spin
// around Y. Strands take ~70% of N; rungs split the rest evenly across the
// requested rung count. Generator emits flat (no tilt) — rotation is
// applied in kernel.
export type DnaHelixParams = {
  R: number;            // strand radius
  height: number;       // total vertical extent
  turns: number;        // number of full twists across the height
  rungs: number;        // count of rung connectors
  strandRatio?: number; // fraction of N going to the two strands (default 0.7)
};

export function dnaHelixTargets(N: number, p: DnaHelixParams): Vector3[] {
  const strandRatio = p.strandRatio ?? 0.7;
  const strandTotal = Math.floor(N * strandRatio);
  const strandPer = Math.floor(strandTotal / 2);
  const rungTotal = N - strandPer * 2;
  const rungs = Math.max(1, p.rungs);
  const rungPer = Math.max(1, Math.floor(rungTotal / rungs));

  const out: Vector3[] = [];
  // Strand A — phase 0
  for (let i = 0; i < strandPer; i++) {
    const t = i / Math.max(1, strandPer - 1);
    const angle = t * p.turns * Math.PI * 2;
    out.push(
      new Vector3(
        p.R * Math.cos(angle),
        (t - 0.5) * p.height,
        p.R * Math.sin(angle),
      ),
    );
  }
  // Strand B — phase π (180° offset gives the DNA read)
  for (let i = 0; i < strandPer; i++) {
    const t = i / Math.max(1, strandPer - 1);
    const angle = t * p.turns * Math.PI * 2 + Math.PI;
    out.push(
      new Vector3(
        p.R * Math.cos(angle),
        (t - 0.5) * p.height,
        p.R * Math.sin(angle),
      ),
    );
  }
  // Rungs — line segments between paired strand points at regular y intervals
  for (let r = 0; r < rungs; r++) {
    const t = r / Math.max(1, rungs - 1);
    const angle = t * p.turns * Math.PI * 2;
    const y = (t - 0.5) * p.height;
    const ax = p.R * Math.cos(angle);
    const az = p.R * Math.sin(angle);
    const bx = p.R * Math.cos(angle + Math.PI);
    const bz = p.R * Math.sin(angle + Math.PI);
    for (let i = 0; i < rungPer; i++) {
      const u = i / Math.max(1, rungPer - 1);
      out.push(new Vector3(ax + (bx - ax) * u, y, az + (bz - az) * u));
    }
  }
  while (out.length < N) out.push(new Vector3(0, 0, 0));
  return out.slice(0, N);
}

// Classify each position to its ring's omega so the kernel can rotate it at
// the correct angular velocity. Sun particles (XZ < sunRadius) → 0.
export function orbitalOmegas(
  positions: Vector3[],
  p: OrbitalParams,
): Float32Array {
  const N = positions.length;
  const out = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const v = positions[i];
    const xzR = Math.sqrt(v.x * v.x + v.z * v.z);
    if (xzR < p.sunRadius) {
      out[i] = 0;
      continue;
    }
    let bestIdx = 0;
    let bestD = Infinity;
    for (let r = 0; r < p.rings.length; r++) {
      const d = Math.abs(xzR - p.rings[r].radius);
      if (d < bestD) {
        bestD = d;
        bestIdx = r;
      }
    }
    const ring = p.rings[bestIdx];
    const tol = ring.planetSize + 0.05;
    out[i] = bestD <= tol ? ring.omega : 0;
  }
  return out;
}
