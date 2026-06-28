"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initTinybirdAnalytics } from "@splicelabs/web-analytics";

let analytics: ReturnType<typeof initTinybirdAnalytics> | null = null;

function getAnalytics() {
  if (typeof window === "undefined") return null;

  if (!analytics) {
    const token = process.env.NEXT_PUBLIC_TINYBIRD_TOKEN;
    const host = process.env.NEXT_PUBLIC_TINYBIRD_HOST;

    if (!token || !host) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[Analytics] Missing TINYBIRD_TOKEN or TINYBIRD_HOST");
      }
      return null;
    }

    analytics = initTinybirdAnalytics({
      token,
      host,
      domain: window.location.hostname,
      tenantId: "splicelabs",
      webVitals: true,
    });
  }

  return analytics;
}

/** Track a custom event */
export function trackEvent(event: string, properties?: Record<string, unknown>) {
  getAnalytics()?.track(event, properties);
}

/** Track a page view */
export function trackPageView(properties?: Record<string, unknown>) {
  getAnalytics()?.page(properties);
}

/** Analytics provider component - tracks page views on route changes */
export function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    trackPageView();
  }, [pathname, searchParams]);

  return null;
}
