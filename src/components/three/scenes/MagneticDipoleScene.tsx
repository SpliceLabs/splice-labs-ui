'use client';

import { useRef, useMemo, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { SceneProps, SceneConfig } from '../types';

// SVG stops in [0..1]
const STOPS = [
  { p: 0.0,       hex: 0xFF07F3 },
  { p: 0.490385,  hex: 0xFFA806 },
  { p: 1.0,       hex: 0x52C5FF },
];

const yToT = (y: number, ymin: number, ymax: number) =>
  Math.max(0, Math.min(1, (y - ymin) / (ymax - ymin || 1)));

// ---- sRGB <-> linear helpers (per IEC 61966-2-1) ----
const srgbToLinear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

const hexToLinearRGB = (hex: number) => {
  const r = ((hex >> 16) & 255) / 255;
  const g = ((hex >> 8) & 255) / 255;
  const b = (hex & 255) / 255;
  return {
    r: srgbToLinear(r),
    g: srgbToLinear(g),
    b: srgbToLinear(b),
  };
};

// Precompute linear colors for stops
const STOPS_LIN = STOPS.map(s => ({ p: s.p, ...hexToLinearRGB(s.hex) }));

// Lerp helper
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Replacement pastel() that matches the SVG gradient
export function pastel(t: number): THREE.Color {
  // clamp t
  t = Math.max(0, Math.min(1, t));

  // find surrounding stops
  let a = STOPS_LIN[0], b = STOPS_LIN[STOPS_LIN.length - 1];
  for (let i = 0; i < STOPS_LIN.length - 1; i++) {
    const s0 = STOPS_LIN[i], s1 = STOPS_LIN[i + 1];
    if (t >= s0.p && t <= s1.p) { a = s0; b = s1; break; }
  }

  // local t between the two stops
  const u = (t - a.p) / (b.p - a.p || 1);

  // interpolate in linear space, then feed to THREE.Color (expects linear)
  const r = lerp(a.r, b.r, u);
  const g = lerp(a.g, b.g, u);
  const bC = lerp(a.b, b.b, u);

  return new THREE.Color(r, g, bC);
}

type DipoleParams = {
  Ls: number[];
  phis: number;
  segments: number;
  thetaMin: number;
  rMax: number;
};

function buildDipoleCurves({
  Ls,
  phis,
  segments,
  thetaMin,
  rMax,
}: DipoleParams) {
  const curves: THREE.CatmullRomCurve3[] = [];
  for (const L of Ls) {
    for (let j = 0; j < phis; j++) {
      const phi = (2 * Math.PI * j) / phis;
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const theta = thetaMin + t * (Math.PI - 2 * thetaMin);
        const s = Math.sin(theta),
          c = Math.cos(theta);
        const r = Math.min(L * s * s, rMax);
        const x = r * s * Math.cos(phi);
        const y = r * c;
        const z = r * s * Math.sin(phi);
        pts.push(new THREE.Vector3(x, y, z));
      }
      curves.push(new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.25));
    }
  }
  return curves;
}

export function ChargedParticles({
  count = 50,
  size = 0.018,
  speedRange = [0.01, 0.03],
  Ls = [5, 10],
  phis = 8,
  segments = 420,
  thetaMin = 0.02,
  rMax = 12,
}: {
  count?: number;
  size?: number;
  speedRange?: [number, number];
} & Partial<DipoleParams>) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const curves = useMemo(
    () => buildDipoleCurves({ Ls, phis, segments, thetaMin, rMax }),
    [Ls, phis, segments, thetaMin, rMax]
  );

  // global Y extents → consistent banding
  const { ymin, ymax } = useMemo(() => {
    let lo = Infinity, hi = -Infinity;
    const p = new THREE.Vector3();
    for (const c of curves) for (let i = 0; i <= 128; i++) {
      c.getPoint(i / 128, p); lo = Math.min(lo, p.y); hi = Math.max(hi, p.y);
    }
    return { ymin: lo, ymax: hi };
  }, [curves]);

  const particles = useMemo(() => {
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    return new Array(count).fill(0).map(() => ({
      ci: Math.floor(Math.random() * curves.length),
      u: Math.random(),
      v: rnd(speedRange[0], speedRange[1]),
      dir: -1,
    }));
  }, [count, curves.length, speedRange]);

  useLayoutEffect(() => {
    const mesh = meshRef.current!;
    // Allocate instanceColor on the MESH (canonical API)
    mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3);
    // Initialize to white so they’re visible even before the first frame
    mesh.instanceColor.array.fill(1);
    mesh.instanceColor.needsUpdate = true;

    // Also initialize matrices once so we never render zero matrices
    const tmp = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      tmp.position.set(9999, 9999, 9999); // off-screen until first frame updates
      tmp.updateMatrix();
      mesh.setMatrixAt(i, tmp.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [count]);

  useFrame((_, dt) => {
    const mesh = meshRef.current!;
    if (!mesh) return;

    const up = new THREE.Vector3(0, 1, 0);
    const tmp = new THREE.Object3D();
    const p = new THREE.Vector3();
    const p2 = new THREE.Vector3();
    const tangent = new THREE.Vector3();
    const c = new THREE.Color();

    for (let i = 0; i < particles.length; i++) {
      const s = particles[i];
      const curve = curves[s.ci];

      s.u = (s.u + s.dir * s.v * dt) % 1;
      if (s.u < 0) s.u += 1;

      curve.getPointAt(s.u, p);
      curve.getPointAt((s.u + 1e-3) % 1, p2);
      tangent.subVectors(p2, p).normalize();

      const quat = new THREE.Quaternion().setFromUnitVectors(up, tangent);

      tmp.position.copy(p);
      tmp.quaternion.copy(quat);
      tmp.scale.setScalar(1);
      tmp.updateMatrix();
      mesh.setMatrixAt(i, tmp.matrix);

      // Y → t → color, then setColorAt
      const t = Math.max(0, Math.min(1, (p.y - ymin) / (ymax - ymin || 1)));
      c.copy(pastel(t));                // pastel returns linear RGB
      mesh.setColorAt(i, c);            // <-- canonical API
    }

    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor!.needsUpdate = true; // tell GPU the colors changed
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined as any, undefined as any, count]}>
      <sphereGeometry args={[size, 8, 8]} />
      {/* start with Basic to remove lighting from the equation */}
      <meshBasicMaterial color="white" toneMapped={false} />
      {/* After you see the gradient, switch to:
          <meshStandardMaterial color="white" />
       */}
    </instancedMesh>
  );
}

/** Parametric magnetic dipole field lines (moment along +Y).
 * r(θ) = L · sin²θ,  θ∈(θmin, π-θmin), φ = azimuth
 */
export function DipoleFieldLines({
  Ls = [0.6, 1.0, 1.6, 2.4, 3.4, 4.6],
  phis = 12,
  segments = 420,
  thetaMin = 0.09,
  rMax = 12,
}: Partial<DipoleParams>) {
  const lines = useMemo(() => {
    const tmp: { pts: THREE.Vector3[]; cols: THREE.Color[] }[] = [];
    let ymin = Infinity,
      ymax = -Infinity;

    // 1) build all points & track y-extents
    for (const L of Ls!) {
      for (let j = 0; j < phis!; j++) {
        const phi = (2 * Math.PI * j) / phis!;
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i <= segments!; i++) {
          const t = i / segments!;
          const theta = thetaMin! + t * (Math.PI - 2 * thetaMin!);
          const s = Math.sin(theta),
            c = Math.cos(theta);
          const r = Math.min(L! * s * s, rMax!);
          const x = r * s * Math.cos(phi);
          const y = r * c;
          const z = r * s * Math.sin(phi);
          pts.push(new THREE.Vector3(x, y, z));
          if (y < ymin) ymin = y;
          if (y > ymax) ymax = y;
        }
        tmp.push({ pts, cols: [] as THREE.Color[] });
      }
    }

    // 2) color pass: Y → t using the global ymin/ymax
    for (const seg of tmp) {
      seg.cols = seg.pts.map((p) => pastel(yToT(p.y, ymin, ymax)));
    }

    return tmp;
  }, [Ls, phis, segments, thetaMin, rMax]);

  return (
    <group>
      {lines.map((l, i) => (
        <Line
          key={i}
          points={l.pts}
          vertexColors={l.cols} // same Y at same height => same color across rings
          transparent
          opacity={0.9}
          linewidth={2}
        />
      ))}
    </group>
  );
}

export const MagneticDipoleScene = ({ children }: SceneProps) => {
  return (
    <>
      <DipoleFieldLines
        // Ls={[0.7, 1.0, 1.5, 2.2, 3.2, 4.4]} // tune spread/density
        // Ls={[0.7, 1.2, 2.5]} // tune spread/density
        // Ls={[0.2, 0.7]}
        Ls={[5, 10]}
        phis={8} // 12–20 looks like the reference
        segments={420}
        thetaMin={0.02}
      />
      <ChargedParticles
        count={50}
        size={0.018}
        speedRange={[0.01, 0.03]}
        Ls={[5, 10]}
        phis={8}
        segments={420}
        thetaMin={0.02}
      />
      {children}
    </>
  );
};

export const magneticDipoleConfig: SceneConfig = {
  background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
  camera: {
    position: [-5.13, 0.82, -5.74],
    rotation: [-171.9 * Math.PI / 180, -41.5 * Math.PI / 180, -174.6 * Math.PI / 180],
    fov: 45
  },
  lights: {
    ambient: {
      intensity: 2
    },
    directional: [
      {
        position: [10, 10, 5],
        intensity: 0.5
      }
    ]
  },
  controls: {
    enableZoom: false,
    enablePan: false,
    autoRotate: true,
    autoRotateSpeed: 0.2,
    maxPolarAngle: Math.PI * 0.9,
    minPolarAngle: Math.PI * 0.1
  }
};
