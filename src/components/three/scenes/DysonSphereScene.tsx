'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneProps, SceneConfig } from '../types';

function ToroidalField() {
  const groupRef = useRef<THREE.Group>(null);
  const torusRefs = useRef<THREE.Mesh[]>([]);

  // Create multiple torus rings of different sizes
  const tori = useMemo(() => {
    const items = [];
    const count = 8;
    
    for (let i = 0; i < count; i++) {
      const radius = 2 + i * 0.5;
      const tube = 0.05 + i * 0.02;
      const radialSegments = 16;
      const tubularSegments = 100;
      
      items.push({
        id: i,
        radius,
        tube,
        radialSegments,
        tubularSegments,
        rotationSpeed: 0.1 + (i * 0.05),
        opacity: 0.6 - (i * 0.05)
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation of the entire field
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }

    // Individual torus rotations
    torusRefs.current.forEach((torus, i) => {
      if (torus) {
        torus.rotation.x = state.clock.elapsedTime * tori[i].rotationSpeed;
        torus.rotation.z = state.clock.elapsedTime * tori[i].rotationSpeed * 0.7;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {tori.map((torus, index) => (
        <mesh
          key={torus.id}
          ref={(el) => {
            if (el) torusRefs.current[index] = el;
          }}
        >
          <torusGeometry 
            args={[
              torus.radius, 
              torus.tube, 
              torus.radialSegments, 
              torus.tubularSegments
            ]} 
          />
          <meshStandardMaterial
            color="#6b7280"
            wireframe
            transparent
            opacity={torus.opacity}
          />
        </mesh>
      ))}
      
      {/* Central sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#4b5563"
          metalness={0.7}
          roughness={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Particle field around the torus */}
      <ParticleRing />
    </group>
  );
}

function ParticleRing() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(500 * 3);
    
    for (let i = 0; i < 500; i++) {
      // Create particles in a toroidal distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      const majorRadius = 3 + Math.random() * 3;
      const minorRadius = Math.random() * 0.5;
      
      positions[i * 3] = (majorRadius + minorRadius * Math.cos(phi)) * Math.cos(theta);
      positions[i * 3 + 1] = minorRadius * Math.sin(phi);
      positions[i * 3 + 2] = (majorRadius + minorRadius * Math.cos(phi)) * Math.sin(theta);
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#9ca3af"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export const DysonSphereScene = ({ children }: SceneProps) => {
  return (
    <>
      <ToroidalField />
      {children}
    </>
  );
};

export const dysonSphereConfig: SceneConfig = {
  background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
  camera: {
    position: [0, 3, 12],
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
        position: [-5, 5, -5],
        intensity: 0.3
      }
    ]
  },
  controls: {
    enableZoom: true,
    enablePan: false,
    autoRotate: true,
    autoRotateSpeed: 0.3,
    maxPolarAngle: Math.PI * 0.9,
    minPolarAngle: Math.PI * 0.1
  }
};