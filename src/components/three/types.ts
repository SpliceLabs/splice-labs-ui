import { ReactNode } from 'react';

export interface SceneConfig {
  background?: string;
  fog?: {
    color: string;
    near?: number;
    far?: number;
  };
  camera?: {
    position?: [number, number, number];
    rotation?: [number, number, number];
    fov?: number;
  };
  lights?: {
    ambient?: {
      intensity: number;
      color?: string;
    };
    directional?: Array<{
      position: [number, number, number];
      intensity: number;
      color?: string;
    }>;
  };
  controls?: {
    enableZoom?: boolean;
    enablePan?: boolean;
    enableRotate?: boolean;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    maxPolarAngle?: number;
    minPolarAngle?: number;
  };
}

export interface SceneProps {
  config?: SceneConfig;
  children?: ReactNode;
}

export interface Scene {
  name: string;
  description?: string;
  component: React.ComponentType<SceneProps>;
  defaultConfig?: SceneConfig;
}