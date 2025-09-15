'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { SceneProps, SceneConfig } from '../types';

/**
 * Magnetic dipole field lines like a bar magnet (m along +Y).
 * - RK4 streamline integration for accuracy/stability
 * - Seeds distributed by polar angle around the dipole axis
 * - Long, gentle arcs; vertex-colored pastel gradient
 */
function MagneticFieldLines({
  m = new THREE.Vector3(0, 1, 0), // dipole moment (direction sets "north")
  poleOffset = 0.8,               // visual separation of the "poles" along Y
  seedsPerHemisphere = 18,        // number of lines per hemisphere
  step = 0.06,                     // integration step size (smaller = smoother)
  maxSteps = 900,                  // safety bound
  rMin = 0.25,                     // stop if we get too close to the dipole
  rMax = 8.0,                      // stop once we're far enough out
}: {
  m?: THREE.Vector3;
  poleOffset?: number;
  seedsPerHemisphere?: number;
  step?: number;
  maxSteps?: number;
  rMin?: number;
  rMax?: number;
}) {
  // Magnetic dipole field: B(r) ∝ 3 r (m·r)/|r|^5 − m/|r|^3 (we skip μ0/4π scale)
  const B = (r: THREE.Vector3) => {
    const rr = r.length();
    // Avoid singularity
    if (rr < 1e-6) return new THREE.Vector3();
    const mdotr = m.dot(r);
    const rHat = r.clone().divideScalar(rr);
    const term1 = rHat.clone().multiplyScalar(3 * mdotr / Math.pow(rr, 3));
    const term2 = m.clone().divideScalar(Math.pow(rr, 3));
    return term1.sub(term2);
  };

  // One RK4 step along the field (forward if dir=+1, backward if dir=-1)
  const rk4 = (p: THREE.Vector3, h: number, dir = 1) => {
    const k1 = B(p).multiplyScalar(dir);
    const k2 = B(p.clone().addScaledVector(k1, h * 0.5)).multiplyScalar(dir);
    const k3 = B(p.clone().addScaledVector(k2, h * 0.5)).multiplyScalar(dir);
    const k4 = B(p.clone().addScaledVector(k3, h)).multiplyScalar(dir);
    return p
      .clone()
      .addScaledVector(k1, h / 6)
      .addScaledVector(k2, h / 3)
      .addScaledVector(k3, h / 3)
      .addScaledVector(k4, h / 6);
  };

  // Build streamlines from seed points around each "pole"
  const lines = useMemo(() => {
    const out: { points: THREE.Vector3[]; colors: THREE.Color[] }[] = [];

    const pastel = (t: number) =>
      new THREE.Color().setHSL(0.75 + 0.6 * t, 0.45, 0.6); // aqua→rose

    const makeLineFromSeed = (seed: THREE.Vector3) => {
      const fwd: THREE.Vector3[] = [seed.clone()];
      const back: THREE.Vector3[] = [seed.clone()];

      // integrate forward
      let p = seed.clone();
      for (let i = 0; i < maxSteps; i++) {
        p = rk4(p, step, +1);
        const r = p.length();
        fwd.push(p.clone());
        if (r < rMin || r > rMax) break;
      }
      // integrate backward
      p = seed.clone();
      for (let i = 0; i < maxSteps; i++) {
        p = rk4(p, step, -1);
        const r = p.length();
        back.push(p.clone());
        if (r < rMin || r > rMax) break;
      }

      // connect backward (reversed) + forward for a full loop
      const pts = back.reverse().concat(fwd.slice(1));
      // soft vertical offset to visually "pinch" into poles
      pts.forEach(v => (v.y += Math.sign(seed.y) * 0.1));

      // pastel gradient along arc length
      const colors: THREE.Color[] = [];
      const n = pts.length - 1;
      for (let i = 0; i <= n; i++) {
        const t = i / n;
        colors.push(pastel(t));
      }

      out.push({ points: pts, colors });
    };

    // Distribute seeds in rings around each pole
    const addHemisphere = (sign: 1 | -1) => {
      const center = new THREE.Vector3(0, sign * poleOffset, 0);
      for (let i = 0; i < seedsPerHemisphere; i++) {
        // polar angle away from pole axis; bias to produce wide outer arcs
        const theta = THREE.MathUtils.lerp(0.22, 1.25, (i + 0.5) / seedsPerHemisphere);
        const ringR = 0.65 * Math.sin(theta);
        const y = center.y + 0.65 * Math.cos(theta) * sign;
        const rings = 20; // azimuthal copies for circular symmetry
        for (let k = 0; k < rings; k += 5) { // sparse to keep ~thin "hairlines"
          const phi = (2 * Math.PI * k) / rings;
          const x = ringR * Math.cos(phi);
          const z = ringR * Math.sin(phi);
          makeLineFromSeed(new THREE.Vector3(x, y, z));
        }
      }
    };

    addHemisphere(+1);
    addHemisphere(-1);
    return out;
  }, [m, poleOffset, seedsPerHemisphere, step, maxSteps, rMin, rMax]);

  // Add rotation to the whole field
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map((l, i) => (
        <Line
          key={i}
          points={l.points}
          vertexColors={l.colors}
          segments
          linewidth={1}        // works on wide-line capable contexts; otherwise falls back
          transparent
          opacity={0.9}
        />
      ))}
    </group>
  );
}


/** Parametric magnetic dipole field lines (moment along +Y).
 * r(θ) = L · sin²θ,  θ∈(θmin, π-θmin), φ = azimuth
 */
export function DipoleFieldLines({
  Ls = [0.6, 1.0, 1.6, 2.4, 3.4, 4.6], // “loop size” set; add/remove to change rings
  phis = 12, // how many meridians around the axis
  segments = 420, // points per curve
  thetaMin = 0.09, // avoid singularity at the poles
  rMax = 12, // hard cap so lines don’t run off
}: {
  Ls?: number[];
  phis?: number;
  segments?: number;
  thetaMin?: number;
  rMax?: number;
}) {
  const pastel = (t: number) =>
    new THREE.Color().setHSL(0.78 + 0.55 * t, 0.45, 0.62); // aqua→rose

  const lines = useMemo(() => {
    const out: { pts: THREE.Vector3[]; cols: THREE.Color[] }[] = [];
    for (const L of Ls) {
      for (let j = 0; j < phis; j++) {
        const phi = (2 * Math.PI * j) / phis;
        const pts: THREE.Vector3[] = [];
        const cols: THREE.Color[] = [];
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const theta = thetaMin + t * (Math.PI - 2 * thetaMin);
          const r = Math.min(L * Math.sin(theta) * Math.sin(theta), rMax);
          // spherical (axis = +Y): x = r sinθ cosφ, y = r cosθ, z = r sinθ sinφ
          const s = Math.sin(theta);
          const c = Math.cos(theta);
          const x = r * s * Math.cos(phi);
          const y = r * c;
          const z = r * s * Math.sin(phi);
          pts.push(new THREE.Vector3(x, y, z));
          cols.push(pastel(t));
        }
        out.push({ pts, cols });
      }
    }
    return out;
  }, [Ls, phis, segments, thetaMin, rMax]);

  return (
    <group>
      {lines.map((l, i) => (
        <Line
          key={i}
          points={l.pts}
          vertexColors={l.cols}
          // segments
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
        phis={8}                           // 12–20 looks like the reference
        segments={420}
        thetaMin={0.02}
      />
      {/* <ChargedParticles /> */}
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
      intensity: 0.5
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
