'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';

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

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Background */}
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200" />
        }
      >
        <HeroBackground
          sceneName={sceneName}
          customConfig={{ camera: { position: [-3, 1.18, -3], fov: 45 } }}
          debug={false}
        />
      </Suspense>

      {/* Navigation */}
      <nav className="relative z-10 mx-auto max-w-6xl px-6 pt-8">
        <div className="flex items-center justify-between rounded-full bg-white/60 backdrop-blur-md px-8 py-4 shadow-sm border border-gray-100/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">
              pliceLabs
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Docs
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Hackathons
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Blog
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Whitepaper
            </a>
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Explore
              <svg
                width="8"
                height="5"
                viewBox="0 0 8 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L4 4L7 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <button className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 group">
            Start Building
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:translate-x-0.5 transition-transform"
            >
              <path
                d="M1 1L5 5L1 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-32 text-center">
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
          <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
            Intelligence you can trust
            <br />
            on-chain, and off
          </h1>
        </div>

        <div
          className={`relative mt-8 transition-all duration-1000 delay-200 ${
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
          <p className="relative text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Delivering the universal layer where AI meets blockchain—enabling
            secure, verifiable, and decentralized intelligence across all your
            digital interactions, making complex AI-driven decisions transparent
            and trustworthy.
          </p>
        </div>

        <div
          className={`relative mt-12 transition-all duration-1000 delay-400 ${
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
          <button className="relative bg-gray-900 text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-gray-800 transition-all hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto group">
            Start Building
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path
                d="M1 1L7 7L1 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}