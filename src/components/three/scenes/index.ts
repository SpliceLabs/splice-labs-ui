import { Scene } from '../types';
import { ParticleFieldScene, particleFieldConfig } from './ParticleFieldScene';
import { WaveGridScene, waveGridConfig } from './WaveGridScene';
import { GeometricScene, geometricConfig } from './GeometricScene';
import { DysonSphereScene, dysonSphereConfig } from './DysonSphereScene';
import { ToroidalFieldScene, toroidalFieldConfig } from './ToroidalFieldScene';
import { MagneticDipoleScene, magneticDipoleConfig } from './MagneticDipoleScene';

export const scenes: Record<string, Scene> = {
  particleField: {
    name: 'Particle Field',
    description: 'Floating particles with a wireframe torus knot',
    component: ParticleFieldScene,
    defaultConfig: particleFieldConfig
  },
  waveGrid: {
    name: 'Wave Grid',
    description: 'Animated wave grid with dark theme',
    component: WaveGridScene,
    defaultConfig: waveGridConfig
  },
  geometric: {
    name: 'Geometric Shapes',
    description: 'Various geometric shapes with different materials',
    component: GeometricScene,
    defaultConfig: geometricConfig
  },
  dysonSphere: {
    name: 'Dyson Sphere',
    description: 'Rotating rings around a central core, like a Dyson sphere',
    component: DysonSphereScene,
    defaultConfig: dysonSphereConfig
  },
  toroidalField: {
    name: 'Toroidal Field',
    description: 'Magnetic field lines in a toroidal pattern',
    component: ToroidalFieldScene,
    defaultConfig: toroidalFieldConfig
  },
  magneticDipole: {
    name: 'Magnetic Dipole',
    description: 'Classic dipole magnetic field like Earth\'s magnetosphere',
    component: MagneticDipoleScene,
    defaultConfig: magneticDipoleConfig
  }
};

export { ParticleFieldScene, particleFieldConfig } from './ParticleFieldScene';
export { WaveGridScene, waveGridConfig } from './WaveGridScene';
export { GeometricScene, geometricConfig } from './GeometricScene';
export { DysonSphereScene, dysonSphereConfig } from './DysonSphereScene';
export { ToroidalFieldScene, toroidalFieldConfig } from './ToroidalFieldScene';
export { MagneticDipoleScene, magneticDipoleConfig } from './MagneticDipoleScene';