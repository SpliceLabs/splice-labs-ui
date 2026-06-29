"use client";

import Script from "next/script";

// Re-export trackEvent from the dedicated module (avoids circular deps)
export { trackEvent } from "./analytics/trackEvent";

/** Analytics script component - auto-tracks page views */
export function AnalyticsScript() {
  const token = process.env.NEXT_PUBLIC_TINYBIRD_TOKEN;

  if (!token) return null;

  return (
    <Script
      src="https://unpkg.com/@tinybirdco/flock.js"
      data-token={token}
      data-host="https://api.europe-west2.gcp.tinybird.co"
      web-vitals="true"
      strategy="afterInteractive"
    />
  );
}

// Re-export everything from analytics subdirectory
export * from "./analytics/events";
export * from "./analytics/hooks";
