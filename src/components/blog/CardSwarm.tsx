"use client";

import { useEffect, useRef } from "react";
import type { TileTone } from "./types";
import { subscribeTick } from "./cardSwarmTicker";

interface CardSwarmProps {
  tone: TileTone;
  /** Reveal stagger in ms — threaded from the grid index. */
  delay?: number;
}

// Particle ink: dark on the light/mid tiles (echoes the CSS halftone
// texture), light on the dark graphite tile.
const PARTICLE_RGB: Record<TileTone, string> = {
  teal: "12, 14, 16",
  amber: "12, 14, 16",
  bone: "12, 14, 16",
  graphite: "232, 230, 224",
};

const COUNT = 54;
const BASE_ALPHA = 0.22;
const REVEAL_MS = 720;
const REPEL_RADIUS = 72; // px
const REPEL_STRENGTH = 340;
const PUSH_DECAY = 3.2; // per second
const MAX_DPR = 2;

interface Particle {
  x: number;
  y: number;
  speed: number;
  angle: number;
  px: number; // transient cursor-repel push
  py: number;
  r: number;
  fade: number; // per-particle alpha factor — fakes depth
}

/**
 * Ambient particle layer for a blog cover tile — a calm drifting flock
 * that fades in on scroll and scatters away from the cursor. A 2D-canvas
 * evocation of the marketing swarm; one lightweight instance per card,
 * all driven by a single shared rAF (see cardSwarmTicker).
 *
 * Decorative only: `aria-hidden`, pointer-events-none, and fully static
 * under `prefers-reduced-motion`.
 */
export function CardSwarm({ tone, delay = 0 }: CardSwarmProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const host = canvas.parentElement;
    if (!ctx || !host) return;

    const rgb = PARTICLE_RGB[tone];
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    const particles: Particle[] = [];
    const pointer = { x: 0, y: 0, active: false };
    let revealAt = 0; // performance.now() target; 0 = not scheduled
    let unsubscribe: (() => void) | null = null;
    const rand = Math.random;

    function seed() {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: rand() * w,
          y: rand() * h,
          speed: 18 + rand() * 20,
          angle: rand() * Math.PI * 2,
          // a small initial push so the reveal reads as a settle, not a fade
          px: (rand() - 0.5) * 52,
          py: (rand() - 0.5) * 52,
          r: 0.9 + rand() * 1.5,
          fade: 0.7 + rand() * 0.5,
        });
      }
    }

    function draw(revealEased: number) {
      ctx!.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${rgb}, ${BASE_ALPHA * p.fade * revealEased})`;
        ctx!.fill();
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particles.length === 0) seed();
      if (reduceMotion) draw(1); // a single settled frame, no animation
    }

    function tick(dt: number) {
      if (w < 1 || h < 1) return;
      let revealEased = 0;
      if (revealAt !== 0) {
        const t = Math.min(
          Math.max((performance.now() - revealAt) / REVEAL_MS, 0),
          1,
        );
        revealEased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      }

      for (const p of particles) {
        // calm drift — slowly wander the heading
        p.angle += (rand() - 0.5) * dt * 2.2;
        const dvx = Math.cos(p.angle) * p.speed;
        const dvy = Math.sin(p.angle) * p.speed;

        // cursor repel — a transient push that decays back to drift
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < REPEL_RADIUS * REPEL_RADIUS && d2 > 0.5) {
            const d = Math.sqrt(d2);
            const f = (1 - d / REPEL_RADIUS) * REPEL_STRENGTH;
            p.px += (dx / d) * f * dt;
            p.py += (dy / d) * f * dt;
          }
        }
        const decay = Math.max(0, 1 - PUSH_DECAY * dt);
        p.px *= decay;
        p.py *= decay;

        p.x += (dvx + p.px) * dt;
        p.y += (dvy + p.py) * dt;

        // toroidal wrap keeps texture density even
        if (p.x < 0) p.x += w;
        else if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        else if (p.y > h) p.y -= h;
      }
      draw(revealEased);
    }

    function onIntersect(entries: IntersectionObserverEntry[]) {
      const visible = entries[0]?.isIntersecting ?? false;
      if (visible) {
        if (revealAt === 0) revealAt = performance.now() + delay;
        if (!unsubscribe) unsubscribe = subscribeTick(tick);
      } else if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let io: IntersectionObserver | null = null;
    if (!reduceMotion) {
      io = new IntersectionObserver(onIntersect, { rootMargin: "120px" });
      io.observe(canvas);
      host.addEventListener("pointermove", onPointerMove);
      host.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      ro.disconnect();
      io?.disconnect();
      unsubscribe?.();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [tone, delay]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 block h-full w-full"
    />
  );
}
