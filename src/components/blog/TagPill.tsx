import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

export interface TagPillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

/**
 * Filter / category button. Mono caps, 0px radius. The inactive hover tint
 * is teal @ 12% — it reads correctly on both graphite and paper surfaces.
 */
export function TagPill({
  active = false,
  className,
  children,
  type = "button",
  ...rest
}: TagPillProps) {
  return (
    <button
      {...rest}
      type={type}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center px-3 py-1.5 font-mono text-[12px] uppercase leading-none tracking-[0.06em]",
        "transition-colors duration-150 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blog-ring-teal",
        active
          ? "bg-blog-chip-ink text-blog-chip-text"
          : "bg-transparent text-current hover:bg-[hsl(var(--blog-tile-teal)/0.12)]",
        className,
      )}
    >
      {children}
    </button>
  );
}
