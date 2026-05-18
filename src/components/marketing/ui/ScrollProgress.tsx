"use client";

import { useEffect, useState } from "react";

/** 3px page-scroll progress bar in ember, pinned above the nav. Hidden near the top. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const compute = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-ember transition-opacity duration-200"
      style={{
        transform: `scaleX(${progress})`,
        opacity: progress < 0.02 ? 0 : 1,
      }}
    />
  );
}
