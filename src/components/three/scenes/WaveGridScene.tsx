'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneProps, SceneConfig } from '../types';

function WaveGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);

  useFrame((state) => {
    if (!geometryRef.current) return;
    
    const { position } = geometryRef.current.attributes;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      
      const waveX = Math.sin(x * 0.5 + time) * 0.3;
      const waveY = Math.sin(y * 0.5 + time * 0.8) * 0.3;
      
      position.setZ(i, waveX + waveY);
    }
    
    position.needsUpdate = true;
    geometryRef.current.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry ref={geometryRef} args={[20, 20, 50, 50]} />
      <meshStandardMaterial 
        color="#4a5568"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

export const WaveGridScene = ({ children }: SceneProps) => {
  return (
    <>
      <WaveGrid />
      {children}
    </>
  );
};

export const waveGridConfig: SceneConfig = {
  background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
  camera: {
    position: [0, 5, 10],
    fov: 60
  },
  lights: {
    ambient: {
      intensity: 0.3,
      color: '#ffffff'
    },
    directional: [
      {
        position: [5, 10, 5],
        intensity: 0.7,
        color: '#ffffff'
      }
    ]
  },
  controls: {
    enableZoom: false,
    enablePan: false,
    autoRotate: true,
    autoRotateSpeed: 0.3
  }
};