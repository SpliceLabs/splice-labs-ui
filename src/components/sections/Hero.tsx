'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Section from '../ui/Section';
import PageWrapper from '../layout/PageWrapper';

const HeroBackground = dynamic(() => import('./HeroBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200" />
});

interface HeroProps {
  sceneName?: 'particleField' | 'waveGrid' | 'geometric' | 'dysonSphere' | 'toroidalField' | 'magneticDipole';
}

export default function Hero({ sceneName = 'magneticDipole' }: HeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const background = (
    <Suspense
      fallback={
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200" />
      }
    >
      <HeroBackground
        sceneName={sceneName}
        customConfig={{
          camera: {
            position: [-5.13, 0.82, -5.74],
            rotation: [-171.9 * Math.PI / 180, -41.5 * Math.PI / 180, -174.6 * Math.PI / 180],
            fov: 45
          }
        }}
        debug={false}
      />
    </Suspense>
  );

  return (
    <Section background={background}>
      {/* Hero content */}
      <PageWrapper className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 text-center">
        <div
          className={`relative transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* White gradient background for title */}
          <div
            className="absolute inset-0 -inset-x-40 -inset-y-20"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(250, 251, 255, 0.95) 0%, rgba(250, 251, 255, 0.98) 40%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />
          <h1 className="relative text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
            Intelligence you can trust
            <br />
            on-chain, and off
          </h1>
        </div>

        <div
          className={`relative mt-10 sm:mt-8 transition-all duration-1000 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* White gradient background for subtext */}
          <div
            className="absolute inset-0 -inset-x-20 -inset-y-20"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(250, 251, 255, 0.9) 0%, rgba(250, 251, 255, 0.98) 40%, transparent 70%)",
              filter: "blur(6px)",
            }}
          />
          <p className="relative text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Delivering the universal layer where AI meets blockchain—enabling
            secure, verifiable, and decentralized intelligence across all your
            digital interactions, making complex AI-driven decisions transparent
            and trustworthy.
          </p>
        </div>

        <div
          className={`relative mt-8 sm:mt-12 transition-all duration-1000 delay-400 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* White gradient background for button */}
          <div
            className="absolute inset-0 -inset-x-40 -inset-y-8"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(250, 251, 255, 0.85) 0%, rgba(250, 251, 255, 0.6) 30%, transparent 60%)",
              filter: "blur(10px)",
            }}
          />
        </div>
      </PageWrapper>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </Section>
  );
}
