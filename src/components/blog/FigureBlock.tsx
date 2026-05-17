import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export interface FigureBlockProps extends HTMLAttributes<HTMLElement> {
  caption?: string;
  /** Figure ordinal — renders as `FIG 01 —`. */
  number?: string | number;
  /** Lets the figure break out to the full content column width. */
  bleed?: boolean;
}

/** Hairline-framed wrapper for images, tables, and code blocks. */
export function FigureBlock({
  caption,
  number,
  bleed = false,
  className,
  children,
  ...rest
}: FigureBlockProps) {
  return (
    <figure
      {...rest}
      className={cn("my-8", bleed && "md:-mx-16", className)}
    >
      <div className="border border-blog-hairline-paper bg-blog-surface-muted p-4">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-3 font-display text-sm italic text-blog-text-muted">
          {number != null && (
            <span className="mr-1.5 font-mono not-italic uppercase tracking-[0.06em] text-blog-text-graphite">
              FIG {String(number).padStart(2, "0")} —
            </span>
          )}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
