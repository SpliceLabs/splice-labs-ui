import { cn } from "@/lib/utils";
import type { Surface } from "./types";
import { useInViewOnce } from "./hooks/useInViewOnce";

export interface HairlineDividerProps {
  /** Picks the hairline color for the surface it sits on. */
  surface?: Surface;
  className?: string;
}

/**
 * 1px rule that draws left→right on first viewport entry (480ms).
 * Reduced-motion users get it static and fully drawn.
 */
export function HairlineDivider({
  surface = "graphite",
  className,
}: HairlineDividerProps) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div
      ref={ref}
      role="separator"
      className={cn(
        "h-px w-full origin-left",
        surface === "graphite" ? "bg-blog-hairline" : "bg-blog-hairline-paper",
        inView ? "motion-safe:animate-draw" : "motion-safe:scale-x-0",
        className,
      )}
    />
  );
}
