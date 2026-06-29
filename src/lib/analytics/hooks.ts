"use client";

import { useEffect, useRef, useCallback } from "react";
import { trackEvent } from "./trackEvent";
import { EVENTS, type SectionId, type FormField } from "./events";

/**
 * Track when a section enters the viewport (fires once)
 */
export function useTrackSectionView<T extends HTMLElement = HTMLElement>(
  sectionId: SectionId,
  threshold = 0.3
) {
  const hasTracked = useRef(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasTracked.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTracked.current) {
          hasTracked.current = true;
          trackEvent(EVENTS.SECTION_VIEWED, {
            section: sectionId,
            page: typeof window !== "undefined" ? window.location.pathname : "",
          });
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionId, threshold]);

  return ref;
}

/**
 * Track scroll depth milestones (25%, 50%, 75%, 100%)
 */
export function useTrackScrollDepth() {
  const milestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

      const thresholds = [25, 50, 75, 100];
      for (const threshold of thresholds) {
        if (scrollPercent >= threshold && !milestones.current.has(threshold)) {
          milestones.current.add(threshold);
          trackEvent(EVENTS.SCROLL_DEPTH_REACHED, {
            depth: threshold,
            page: window.location.pathname,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}

/**
 * Track form field focus events
 */
export function useTrackFormField(field: FormField) {
  const hasTracked = useRef(false);

  const onFocus = useCallback(() => {
    if (!hasTracked.current) {
      hasTracked.current = true;
      trackEvent(EVENTS.FORM_FIELD_FOCUSED, {
        field,
        page: typeof window !== "undefined" ? window.location.pathname : "",
      });
    }
  }, [field]);

  return { onFocus };
}

/**
 * Track form viewed (when form section enters viewport)
 */
export function useTrackFormViewed<T extends HTMLElement = HTMLElement>(
  formName: string,
  threshold = 0.3
) {
  const hasTracked = useRef(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasTracked.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTracked.current) {
          hasTracked.current = true;
          trackEvent(EVENTS.FORM_VIEWED, {
            form: formName,
            page: typeof window !== "undefined" ? window.location.pathname : "",
          });
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [formName, threshold]);

  return ref;
}

/**
 * Track audience type selection in forms
 */
export function trackAudienceSelected(
  audience: string,
  previousAudience?: string
) {
  trackEvent(EVENTS.FORM_AUDIENCE_SELECTED, {
    audience,
    previous_audience: previousAudience,
    page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/**
 * Track form validation errors
 */
export function trackValidationError(field: string, errorType: string) {
  trackEvent(EVENTS.FORM_VALIDATION_ERROR, {
    field,
    error_type: errorType,
    page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/**
 * Track form submission success
 */
export function trackFormSubmitSuccess(audience: string, actionType?: string) {
  trackEvent(EVENTS.FORM_SUBMIT_SUCCESS, {
    audience,
    action_type: actionType,
    page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/**
 * Track form submission error
 */
export function trackFormSubmitError(errorType: string) {
  trackEvent(EVENTS.FORM_SUBMIT_ERROR, {
    error_type: errorType,
    page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/**
 * Track navigation menu interactions
 */
export function trackNavMenuOpened(menuType: "mobile" | "dropdown", dropdownName?: string) {
  trackEvent(EVENTS.NAV_MENU_OPENED, {
    menu: menuType,
    dropdown_name: dropdownName,
    page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/**
 * Track navigation link clicks
 */
export function trackNavLinkClicked(destination: string, isExternal: boolean) {
  trackEvent(EVENTS.NAV_LINK_CLICKED, {
    destination,
    is_external: isExternal,
    source_page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/**
 * Track glossary term tooltip views
 */
export function trackGlossaryTermViewed(term: string) {
  trackEvent(EVENTS.GLOSSARY_TERM_VIEWED, {
    term,
    page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/**
 * Track external link clicks
 */
export function trackExternalLinkClicked(url: string, linkText?: string) {
  trackEvent(EVENTS.EXTERNAL_LINK_CLICKED, {
    url,
    link_text: linkText,
    page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

/**
 * Track API errors
 */
export function trackApiError(endpoint: string, status: number, errorType: string) {
  trackEvent(EVENTS.API_ERROR, {
    endpoint,
    status,
    error_type: errorType,
    page: typeof window !== "undefined" ? window.location.pathname : "",
  });
}
