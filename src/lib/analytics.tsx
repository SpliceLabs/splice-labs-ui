"use client";

import Script from "next/script";

declare global {
  interface Window {
    Tinybird?: {
      trackEvent: (event: string, properties?: Record<string, unknown>) => void;
    };
  }
}

/** Track a custom event */
export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.Tinybird) {
    window.Tinybird.trackEvent(event, properties);
  }
}

/** Analytics script component - auto-tracks page views */
export function AnalyticsScript() {
  const token = process.env.NEXT_PUBLIC_TINYBIRD_TOKEN;

  if (!token) return null;

  return (
    <Script
      src="https://unpkg.com/@tinybirdco/flock.js"
      data-token={token}
      data-host="https://api.tinybird.co/"
      web-vitals="true"
      strategy="afterInteractive"
    />
  );
}
