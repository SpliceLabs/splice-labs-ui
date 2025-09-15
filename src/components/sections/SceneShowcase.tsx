'use client';

import { useState } from 'react';
import { Scene } from '../three/core/Scene';
import { scenes } from '../three/scenes';

export default function SceneShowcase() {
  const [currentScene, setCurrentScene] = useState<string>('particleField');
  
  return (
    <div className="relative min-h-screen">
      {/* 3D Scene */}
      <Scene sceneName={currentScene as 'particleField' | 'waveGrid' | 'geometric' | 'dysonSphere' | 'toroidalField' | 'magneticDipole'} />
      
      {/* Scene Selector UI */}
      <div className="absolute top-8 left-8 z-20">
        <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Select Scene</h2>
          <div className="space-y-2">
            {Object.entries(scenes).map(([key, scene]) => (
              <button
                key={key}
                onClick={() => setCurrentScene(key)}
                className={`w-full text-left px-4 py-3 rounded-md transition-all ${
                  currentScene === key
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="font-medium">{scene.name}</div>
                {scene.description && (
                  <div className="text-sm opacity-80 mt-1">{scene.description}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-4 max-w-xs">
          <p className="text-sm text-gray-600">
            Drag to rotate • Scroll to zoom • Click scenes to switch
          </p>
        </div>
      </div>
    </div>
  );
}