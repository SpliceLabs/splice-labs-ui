import { useEffect, useState } from "react";

/**
 * Hook to detect if a section is currently active (visible in viewport).
 * Uses IntersectionObserver with rootMargin to detect when section enters center area.
 */
export function useIsActiveSection(sectionId: string): boolean {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsActive(entry.isIntersecting);
        }
      },
      {
        // Shrink the detection zone to middle 40% of viewport
        rootMargin: "-30% 0px -30% 0px",
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionId]);

  return isActive;
}
