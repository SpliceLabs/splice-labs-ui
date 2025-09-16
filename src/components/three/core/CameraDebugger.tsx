'use client';

import { useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Vector3 } from 'three';

export function CameraDebugger() {
  const { camera } = useThree();
  const [position, setPosition] = useState<Vector3>(camera.position.clone());
  const [rotation, setRotation] = useState({
    x: camera.rotation.x,
    y: camera.rotation.y,
    z: camera.rotation.z,
  });

  useFrame(() => {
    // Update position if changed
    if (!camera.position.equals(position)) {
      setPosition(camera.position.clone());
      setRotation({
        x: camera.rotation.x,
        y: camera.rotation.y,
        z: camera.rotation.z,
      });
    }
  });

  // Log on significant changes
  useEffect(() => {
  }, [position]);

  return (
    <Html
      fullscreen
      style={{ pointerEvents: 'none' }}
    >
      <div 
      style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontFamily: 'monospace',
        fontSize: '12px',
        pointerEvents: 'none',
      }}
    >
      <div>Camera Debug</div>
      <div>Pos X: {position.x.toFixed(2)}</div>
      <div>Pos Y: {position.y.toFixed(2)}</div>
      <div>Pos Z: {position.z.toFixed(2)}</div>
      <div style={{ marginTop: '5px', fontSize: '10px', opacity: 0.7 }}>
        <div>Rot X: {(rotation.x * 180 / Math.PI).toFixed(1)}°</div>
        <div>Rot Y: {(rotation.y * 180 / Math.PI).toFixed(1)}°</div>
        <div>Rot Z: {(rotation.z * 180 / Math.PI).toFixed(1)}°</div>
      </div>
      <div style={{ marginTop: '5px', fontSize: '10px', opacity: 0.5 }}>
        Drag to rotate, scroll to zoom
      </div>
    </div>
    </Html>
  );
}
