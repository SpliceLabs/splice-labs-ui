// SwarmCanvas: fixed full-viewport WebGPU canvas. Lifted out of SwarmHero so
// a single canvas spans every section of VersionE. Knows nothing about
// regimes — it sets up the renderer + env texture and mounts SwarmEngine
// inside the R3F tree.
//
// Mobile / no-WebGPU: the canvas does not mount. Page sections render
// normally. Phase-3 work could swap in a CSS swarm-evocation here.

import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useEnvironment } from "@react-three/drei";
import { Color, LinearFilter, Texture } from "three";
import { WebGPURenderer } from "three/webgpu";
import { SwarmEngine } from "./SwarmEngine";
import type { SwarmRefs } from "./swarmRefs";

// Canvas background lives on the wrapper <div>, not the WebGPU clear color:
// R3F overrides clearColor mid-frame in ways we can't reliably suppress
// alongside requiredLimits/alpha:true. Painting the bg via CSS on the
// fixed-position wrapper gives the same visual (rgba shows through to body
// bg) without fighting the renderer. Renderer itself clears to transparent
// so particle pixels are the only thing the canvas contributes.
const BG_COLOR_CSS = "rgba(13, 15, 17, 0.9)";
const BG_COLOR = "#0D0F11";
const FOG_NEAR = 5;
const FOG_FAR = 2;
const ENV_PRESET = "night" as const;

function hasWebGPU(): boolean {
  if (typeof navigator === "undefined") return false;
  return Boolean((navigator as unknown as { gpu?: unknown }).gpu);
}

function EnvLoader({
  children,
}: {
  children: (envTex: Texture) => React.ReactNode;
}) {
  const envTex = useEnvironment({ preset: ENV_PRESET }) as unknown as Texture;
  useEffect(() => {
    if (!envTex) return;
    envTex.minFilter = LinearFilter;
    envTex.magFilter = LinearFilter;
    envTex.generateMipmaps = false;
    envTex.needsUpdate = true;
  }, [envTex]);
  if (!envTex) return null;
  return <>{children(envTex)}</>;
}

export function SwarmCanvas({ refs }: { refs: SwarmRefs }) {
  const [webgpuAvailable] = useState<boolean>(() => hasWebGPU());
  const [supportFailed, setSupportFailed] = useState(false);
  const [rendererReady, setRendererReady] = useState(false);

  const glFactory = useMemo(
    () => (canvas: HTMLCanvasElement) => {
      // alpha: true + setClearColor(..., 0.9) gives the canvas a translucent
      // clear instead of an opaque scene.background paint. <color attach=
      // "background"> would short-circuit this with a fullscreen opaque pass,
      // so we omit that and let the renderer's clear color show through.
      //
      // requiredLimits bumps maxStorageBuffersPerShaderStage from the WebGPU
      // default of 8 to 10. The compute kernel binds 9 buffers (positions,
      // velocities, all-targets, omegas, tilts, centers, scaleVars, free,
      // armed, target), so the default limit causes pipeline-layout
      // validation to fail silently and freeze the swarm.
      const renderer = new WebGPURenderer({
        canvas,
        antialias: true,
        alpha: true,
        requiredLimits: {
          maxStorageBuffersPerShaderStage: 10,
        },
      } as ConstructorParameters<typeof WebGPURenderer>[0]);
      renderer
        .init()
        .then(() => {
          // Clear to fully transparent so the wrapper div's CSS background
          // is what the viewer sees in regions without particles.
          renderer.setClearColor(new Color(0x000000), 0);
          const isGPU =
            (renderer as unknown as { backend?: { isWebGPUBackend?: boolean } })
              .backend?.isWebGPUBackend === true;
          if (isGPU) setRendererReady(true);
          else setSupportFailed(true);
        })
        .catch(() => setSupportFailed(true));
      return renderer;
    },
    [],
  );

  const renderCanvas = webgpuAvailable && !supportFailed;
  if (!renderCanvas) return null;

  return (
    <div
      className="fixed inset-0 z-0"
      style={{ backgroundColor: BG_COLOR_CSS }}
      aria-hidden
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={glFactory as never}
        frameloop={rendererReady ? "always" : "never"}
      >
        {/* No scene.background — renderer.clearColor (set in glFactory) owns
            the canvas background so its 0.9 alpha can blend with the page. */}
        <fog attach="fog" args={[BG_COLOR, FOG_NEAR, FOG_FAR]} />
        {rendererReady ? (
          <>
            <ambientLight intensity={0.15} />
            <directionalLight position={[3, 4, 5]} intensity={0.6} />
            <Suspense fallback={null}>
              <EnvLoader>
                {(envTex) => <SwarmEngine envTex={envTex} refs={refs} />}
              </EnvLoader>
            </Suspense>
          </>
        ) : null}
      </Canvas>
    </div>
  );
}
