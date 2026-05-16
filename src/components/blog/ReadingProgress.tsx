import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export interface ReadingProgressProps {
  /** Id of the element whose scroll-through drives the bar. */
  targetId: string;
  className?: string;
}

/** 1px top progress bar tracking read-through of the target element. */
export function ReadingProgress({ targetId, className }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const compute = () => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const top = el.offsetTop;
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = window.scrollY - top;
      setProgress(Math.min(1, Math.max(0, scrolled / scrollable)));
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [targetId]);

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-px origin-left bg-blog-tile-teal transition-opacity",
        progress < 0.02 && "opacity-0",
        className,
      )}
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
