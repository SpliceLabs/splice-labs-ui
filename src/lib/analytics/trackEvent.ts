"use client";

declare global {
  interface Window {
    Tinybird?: {
      trackEvent: (event: string, properties?: Record<string, unknown>) => void;
    };
  }
}

/** Track a custom event via Tinybird */
export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.Tinybird) {
    window.Tinybird.trackEvent(event, properties);
  } else if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    // Debug logging in development
    console.log("[Analytics]", event, properties);
  }
}
