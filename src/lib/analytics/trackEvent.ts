"use client";

declare global {
  interface Window {
    Tinybird?: {
      trackEvent: (event: string, properties?: Record<string, unknown>) => void;
    };
    __analyticsQueue?: Array<{ event: string; properties?: Record<string, unknown> }>;
  }
}

/** Flush queued events once Tinybird is ready */
function flushQueue() {
  if (typeof window === "undefined" || !window.Tinybird || !window.__analyticsQueue) return;

  const queue = window.__analyticsQueue;
  window.__analyticsQueue = [];

  for (const { event, properties } of queue) {
    window.Tinybird.trackEvent(event, properties);
  }
}

/** Poll for Tinybird readiness and flush queue */
function waitForTinybird() {
  if (typeof window === "undefined") return;

  const check = () => {
    if (window.Tinybird) {
      flushQueue();
    } else {
      setTimeout(check, 100);
    }
  };
  check();
}

/** Track a custom event via Tinybird */
export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  // If Tinybird is ready, send immediately
  if (window.Tinybird) {
    window.Tinybird.trackEvent(event, properties);
    return;
  }

  // Otherwise queue the event
  if (!window.__analyticsQueue) {
    window.__analyticsQueue = [];
    // Start polling for Tinybird
    waitForTinybird();
  }

  window.__analyticsQueue.push({ event, properties });
}
