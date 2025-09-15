'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SceneConfig } from '../types';
import { CameraDebugger } from './CameraDebugger';

interface SceneRendererProps {
  config: SceneConfig;
  children: React.ReactNode;
  debug?: boolean;
}

export function SceneRenderer({ config, children, debug = false }: SceneRendererProps) {
  const { 
    background = '#ffffff',
    camera = { position: [0, 0, 5], fov: 50 },
    lights = {},
    controls = {}
  } = config;

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ 
          position: camera.position || [0, 0, 5], 
          fov: camera.fov || 50 
        }}
        style={{ 
          background: background 
        }}
      >
        {/* Lighting setup */}
        {lights.ambient && (
          <ambientLight 
            intensity={lights.ambient.intensity} 
            color={lights.ambient.color}
          />
        )}
        
        {lights.directional?.map((light, index) => (
          <directionalLight
            key={index}
            position={light.position}
            intensity={light.intensity}
            color={light.color}
          />
        ))}

        {/* Scene content */}
        {children}
        
        {/* Debug camera position */}
        {debug && <CameraDebugger />}

        {/* Controls */}
        <OrbitControls
          enableZoom={controls.enableZoom ?? true}
          enablePan={controls.enablePan ?? true}
          enableRotate={controls.enableRotate ?? true}
          autoRotate={controls.autoRotate ?? false}
          autoRotateSpeed={controls.autoRotateSpeed ?? 1}
          maxPolarAngle={controls.maxPolarAngle}
          minPolarAngle={controls.minPolarAngle}
        />
      </Canvas>
    </div>
  );
}