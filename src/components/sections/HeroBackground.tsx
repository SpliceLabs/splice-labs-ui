'use client';

import { Scene } from '../three/core/Scene';

interface HeroBackgroundProps {
  sceneName?: 'particleField' | 'waveGrid' | 'geometric' | 'dysonSphere' | 'toroidalField' | 'magneticDipole';
  customConfig?: any;
  debug?: boolean;
}

export default function HeroBackground({ 
  sceneName = 'particleField',
  customConfig,
  debug = true  // Enable debug by default for now
}: HeroBackgroundProps) {
  return (
    <Scene 
      sceneName={sceneName}
      config={customConfig}
      debug={debug}
    />
  );
}


