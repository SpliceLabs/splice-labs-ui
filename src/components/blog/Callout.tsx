import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  /** Swaps the 2px left bar color: teal / amber / graphite. */
  tone?: "note" | "warn" | "quote";
}

const barClasses: Record<NonNullable<CalloutProps["tone"]>, string> = {
  note: "border-l-blog-tile-teal",
  warn: "border-l-blog-tile-amber",
  quote: "border-l-blog-text-graphite",
};

/** Inline emphasis block — aside, warning, or pull quote. 2px left bar. */
export function Callout({
  tone = "note",
  className,
  children,
  ...rest
}: CalloutProps) {
  return (
    <div
      {...rest}
      className={cn(
        "border-l-2 py-1 pl-5 font-display text-prose leading-relaxed",
        tone === "quote" && "italic",
        barClasses[tone],
        className,
      )}
    >
      {children}
    </div>
  );
}
