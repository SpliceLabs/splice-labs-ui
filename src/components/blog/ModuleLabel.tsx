import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export interface ModuleLabelProps extends HTMLAttributes<HTMLSpanElement> {
  /** Leading pulsing teal square. */
  dot?: boolean;
  /** Trailing blinking terminal caret. */
  caret?: boolean;
}

/**
 * The mono-caps eyebrow used throughout the blog (`READ MORE`,
 * `GET TLDR FROM:`, `02 / FILTER RAIL`).
 */
export function ModuleLabel({
  dot = false,
  caret = false,
  className,
  children,
  ...rest
}: ModuleLabelProps) {
  return (
    <span
      {...rest}
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-blog-text-muted",
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden
          className="size-1.5 shrink-0 bg-blog-tile-teal motion-safe:animate-pulse-accent"
        />
      )}
      {children}
      {caret && (
        <span aria-hidden className="motion-safe:animate-blink-cursor">
          _
        </span>
      )}
    </span>
  );
}
