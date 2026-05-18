/**
 * One shared requestAnimationFrame loop for every visible CardSwarm.
 *
 * Each card runs ~34 particles; a blog index can show a dozen cards at
 * once. Giving each its own rAF loop would be wasteful and drift out of
 * sync — instances register here instead, and the loop stops entirely
 * when none are visible.
 */
type TickFn = (dt: number) => void;

const subscribers = new Set<TickFn>();
let rafId: number | null = null;
let lastTime = 0;

function loop(now: number): void {
  const raw = lastTime ? (now - lastTime) / 1000 : 0;
  lastTime = now;
  // A backgrounded tab parks rAF, so the first frame back can carry a
  // multi-second gap. Clamp it — one small step is enough to resync.
  const dt = Math.min(raw, 0.05);
  for (const fn of subscribers) fn(dt);
  rafId = subscribers.size > 0 ? requestAnimationFrame(loop) : null;
}

/** Register a per-frame callback. Returns an unsubscribe function. */
export function subscribeTick(fn: TickFn): () => void {
  subscribers.add(fn);
  if (rafId === null) {
    lastTime = 0;
    rafId = requestAnimationFrame(loop);
  }
  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0 && rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}
