'use client';

import { useMemo, useRef } from 'react';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { SceneProps, SceneConfig } from '../types';

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    return positions;
  }, []);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#666666"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingMesh() {
  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh position={[0, 0, -2]}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial
          color="#888888"
          metalness={0.8}
          roughness={0.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export const ParticleFieldScene = ({ children }: SceneProps) => {
  return (
    <>
      <ParticleField />
      <FloatingMesh />
      {children}
    </>
  );
};

export const particleFieldConfig: SceneConfig = {
  background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
  camera: {
    position: [0, 0, 5],
    fov: 50
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
    autoRotateSpeed: 0.5,
    maxPolarAngle: Math.PI / 2,
    minPolarAngle: Math.PI / 2
  }
};