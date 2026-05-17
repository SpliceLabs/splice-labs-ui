import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

/**
 * The shared section `<h2>` for the marketing home — one display scale
 * across every section. Spacing below the heading is passed per use
 * (`mb-*`); the type scale itself is fixed here.
 */
export function SectionHeading({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      {...rest}
      className={cn(
        "font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground",
        className,
      )}
    >
      {children}
    </h2>
  );
}
