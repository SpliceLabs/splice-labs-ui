import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface TagChipProps {
  children: ReactNode;
  className?: string;
}

/**
 * Mono-caps tag chip. Inside a `group/card`, its border strengthens when the
 * parent card is hovered.
 */
export function TagChip({ children, className }: TagChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-accent/20 px-2.5 py-1",
        "font-mono text-eyebrow uppercase tracking-splice-wide text-accent",
        "transition-colors duration-150 group-hover/card:border-accent/40",
        className,
      )}
    >
      {children}
    </span>
  );
}
