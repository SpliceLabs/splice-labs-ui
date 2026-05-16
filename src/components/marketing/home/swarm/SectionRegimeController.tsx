// Section observer + scroll listener. Writes refs the engine reads each
// frame. No render output beyond children.
//
// Active-section detection: track the latest intersectionRatio per observed
// section. The IntersectionObserver only delivers entries that crossed a
// threshold this tick — so we maintain a running map and pick the highest-
// ratio section on each callback. Threshold list is dense enough to give
// ratio updates throughout scroll travel.

import { useEffect } from "react";
import type { SwarmRefs } from "./swarmRefs";
import { SECTION_IDS, type SectionId } from "./swarmRefs";

export function SectionRegimeController({
  refs,
  children,
}: {
  refs: SwarmRefs;
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Dev tuning: ?regime=<SectionId> pins the swarm to one regime and
    // skips IntersectionObserver wiring entirely. Lets us snap to e.g.
    // localhost:8081/?regime=helios to tune emissive presets without
    // scrolling through the page.
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("regime");
    if (requested && (SECTION_IDS as string[]).includes(requested)) {
      refs.activeSectionRef.current = requested as SectionId;
      return;
    }

    const ratios = new Map<SectionId, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id as SectionId;
          if (!SECTION_IDS.includes(id)) continue;
          ratios.set(id, e.isIntersecting ? e.intersectionRatio : 0);
        }
        let bestId: SectionId | null = null;
        let bestRatio = 0;
        for (const [id, r] of ratios) {
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }
        // Only update when a section has visible portion. Prevents reset
        // between sections (e.g. when neither has fired its threshold yet).
        if (bestId) refs.activeSectionRef.current = bestId;
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    const observed: Element[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observed.push(el);
      }
    });

    return () => {
      for (const el of observed) observer.unobserve(el);
      observer.disconnect();
    };
  }, [refs]);

  useEffect(() => {
    const onScroll = () => {
      refs.scrollYRef.current = window.scrollY;

      const activeId = refs.activeSectionRef.current;
      const activeEl = document.getElementById(activeId);
      if (activeEl) {
        refs.sectionMidYRef.current =
          activeEl.offsetTop + activeEl.offsetHeight / 2;
      }

      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        const h = rect.height || 1;
        refs.heroProgressRef.current = Math.max(
          0,
          Math.min(1, -rect.top / h),
        );
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [refs]);

  return <>{children}</>;
}
