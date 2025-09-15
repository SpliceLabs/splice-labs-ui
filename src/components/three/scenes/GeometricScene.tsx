'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { SceneProps, SceneConfig } from '../types';

function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[-3, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color="#6b7280"
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
}

function DistortedSphere() {
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <mesh position={[3, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <MeshDistortMaterial
          color="#9ca3af"
          distort={0.3}
          speed={2}
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <torusGeometry args={[1.5, 0.5, 16, 100]} />
      <meshStandardMaterial 
        color="#4b5563"
        metalness={0.5}
        roughness={0.4}
        wireframe
      />
    </mesh>
  );
}

export const GeometricScene = ({ children }: SceneProps) => {
  return (
    <>
      <RotatingCube />
      <DistortedSphere />
      <FloatingTorus />
      {children}
    </>
  );
};

export const geometricConfig: SceneConfig = {
  background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
  camera: {
    position: [0, 0, 8],
    fov: 45
  },
  lights: {
    ambient: {
      intensity: 0.4
    },
    directional: [
      {
        position: [10, 10, 5],
        intensity: 0.6
      },
      {
        position: [-10, -10, -5],
        intensity: 0.3
      }
    ]
  },
  controls: {
    enableZoom: true,
    enablePan: false,
    autoRotate: true,
    autoRotateSpeed: 0.8
  }
};