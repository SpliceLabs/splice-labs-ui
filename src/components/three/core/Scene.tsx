'use client';

import { Suspense } from 'react';
import { SceneRenderer } from './SceneRenderer';
import { scenes } from '../scenes';
import { SceneConfig } from '../types';

interface SceneComponentProps {
  sceneName?: keyof typeof scenes;
  config?: Partial<SceneConfig>;
  fallback?: React.ReactNode;
  children?: React.ReactNode;
  debug?: boolean;
}

export function Scene({ 
  sceneName = 'particleField', 
  config = {},
  fallback = <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200" />,
  children,
  debug = false
}: SceneComponentProps) {
  const selectedScene = scenes[sceneName];
  
  if (!selectedScene) {
    console.warn(`Scene "${sceneName}" not found. Using default scene.`);
    const defaultScene = scenes.particleField;
    const mergedConfig = { ...defaultScene.defaultConfig, ...config };
    
    return (
      <Suspense fallback={fallback}>
        <SceneRenderer config={mergedConfig} debug={debug}>
          <defaultScene.component config={mergedConfig}>
            {children}
          </defaultScene.component>
        </SceneRenderer>
      </Suspense>
    );
  }

  const mergedConfig = { ...selectedScene.defaultConfig, ...config };

  return (
    <Suspense fallback={fallback}>
      <SceneRenderer config={mergedConfig} debug={debug}>
        <selectedScene.component config={mergedConfig}>
          {children}
        </selectedScene.component>
      </SceneRenderer>
    </Suspense>
  );
}