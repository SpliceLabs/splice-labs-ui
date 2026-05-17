import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export interface BlogEyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  /** Leading pulsing teal square. */
  dot?: boolean;
  /** Trailing blinking terminal caret. */
  caret?: boolean;
}

/**
 * The mono-caps eyebrow used throughout the blog (`READ MORE`,
 * `GET TLDR FROM:`, `02 / FILTER RAIL`).
 */
export function BlogEyebrow({
  dot = false,
  caret = false,
  className,
  children,
  ...rest
}: BlogEyebrowProps) {
  return (
    <span
      {...rest}
      className={cn(
        "inline-flex items-center gap-2 font-mono text-meta uppercase leading-none tracking-splice-wide text-blog-text-muted",
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
