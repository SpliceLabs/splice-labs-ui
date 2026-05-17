import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export interface LabelChipProps extends HTMLAttributes<HTMLSpanElement> {
  /** `notched` cuts 4px pixel corners — a nod to machine output. */
  variant?: "solid" | "notched";
  size?: "sm" | "md" | "lg";
  /** `paper` inverts the chip for use against dark tiles. */
  tone?: "ink" | "paper";
  /** Appends a blinking terminal caret. */
  caret?: boolean;
}

const sizeClasses: Record<NonNullable<LabelChipProps["size"]>, string> = {
  sm: "text-meta px-4 py-[10px]",
  md: "text-code px-5 py-[14px]",
  lg: "text-prose px-7 py-[18px]",
};

/**
 * The signature mono-caps inset chip. Black rectangle, 0px radius, no shadow.
 * Renders identically on graphite and paper surfaces — that consistency is
 * what makes the blog feel like one system.
 */
export function LabelChip({
  variant = "solid",
  size = "md",
  tone = "ink",
  caret = false,
  className,
  children,
  style,
  ...rest
}: LabelChipProps) {
  return (
    <span
      {...rest}
      style={{
        ...style,
        clipPath:
          variant === "notched"
            ? "polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)"
            : undefined,
      }}
      className={cn(
        "inline-flex items-center font-mono uppercase leading-none tracking-splice-label",
        sizeClasses[size],
        tone === "ink"
          ? "bg-blog-chip-ink text-blog-chip-text"
          : "bg-blog-chip-text text-blog-chip-ink",
        className,
      )}
    >
      {children}
      {caret && (
        <span aria-hidden className="ml-1 motion-safe:animate-blink-cursor">
          _
        </span>
      )}
    </span>
  );
}
