'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SceneProps, SceneConfig } from '../types';

function ToroidalFieldLines() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create field lines that follow a toroidal pattern
  const curves = useMemo(() => {
    const lines = [];
    const numLines = 20;
    
    for (let i = 0; i < numLines; i++) {
      const points = [];
      const offset = (i / numLines) * Math.PI * 2;
      
      // Create a toroidal path
      for (let t = 0; t <= Math.PI * 2; t += 0.1) {
        const majorRadius = 4;
        const minorRadius = 1.5;
        
        // Toroidal parametric equations with twist
        const u = t;
        const v = offset + t * 2; // Creates the helical twist
        
        const x = (majorRadius + minorRadius * Math.cos(v)) * Math.cos(u);
        const y = minorRadius * Math.sin(v);
        const z = (majorRadius + minorRadius * Math.cos(v)) * Math.sin(u);
        
        points.push(new THREE.Vector3(x, y, z));
      }
      
      lines.push(points);
    }
    
    return lines;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {curves.map((points, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={points.length}
              array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color="#6b7280"
            transparent
            opacity={0.3 + (index % 3) * 0.1}
          />
        </line>
      ))}
    </group>
  );
}

function MagneticCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[4, 0.3, 8, 32]} />
      <meshStandardMaterial
        color="#4b5563"
        metalness={0.8}
        roughness={0.2}
        emissive="#4b5563"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

function FieldParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    
    for (let i = 0; i < 1000; i++) {
      // Distribute particles in a toroidal volume
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      const majorRadius = 3 + Math.random() * 2;
      const minorRadius = Math.random() * 2;
      
      positions[i * 3] = (majorRadius + minorRadius * Math.cos(phi)) * Math.cos(theta);
      positions[i * 3 + 1] = minorRadius * Math.sin(phi);
      positions[i * 3 + 2] = (majorRadius + minorRadius * Math.cos(phi)) * Math.sin(theta);
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < 1000; i++) {
        // Make particles flow along the field
        const idx = i * 3;
        const x = positions[idx];
        const z = positions[idx + 2];
        const angle = Math.atan2(z, x);
        const radius = Math.sqrt(x * x + z * z);
        
        // Rotate around the torus
        const newAngle = angle + 0.01;
        positions[idx] = radius * Math.cos(newAngle);
        positions[idx + 2] = radius * Math.sin(newAngle);
        
        // Oscillate vertically
        positions[idx + 1] += Math.sin(time * 2 + i * 0.1) * 0.005;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
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
        size={0.01}
        color="#9ca3af"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export const ToroidalFieldScene = ({ children }: SceneProps) => {
  return (
    <>
      <ToroidalFieldLines />
      <MagneticCore />
      <FieldParticles />
      {children}
    </>
  );
};

export const toroidalFieldConfig: SceneConfig = {
  background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
  camera: {
    position: [0, 5, 15],
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
    enableZoom: true,
    enablePan: false,
    autoRotate: true,
    autoRotateSpeed: 0.2,
    maxPolarAngle: Math.PI * 0.9,
    minPolarAngle: Math.PI * 0.1
  }
};