import { cn } from "@/lib/utils";

export interface ModuleLabelProps {
  /** The module name — rendered after `prefix::`, e.g. "value". */
  name: string;
  /** Namespace before `::`. Default "module". */
  prefix?: string;
  /**
   * `inline` — compact eyebrow (optional dot + rule).
   * `eyebrow` — the full section header: a junction node sitting on the
   * page gutter spine, the label, and a hairline rule.
   */
  variant?: "inline" | "eyebrow";
  /** Eyebrow variant: which gutter the junction node sits on. */
  spine?: "left" | "right";
  /** Inline variant: leading 2px pulsing accent dot. */
  dot?: boolean;
  /** Inline variant: trailing hairline rule that fills remaining width. */
  rule?: boolean;
  className?: string;
}

/**
 * The mono-caps section eyebrow — `module::value`, `splice_labs::init`.
 * Replaces the hand-rolled eyebrow blocks across the marketing sections.
 */
export function ModuleLabel({
  name,
  prefix = "module",
  variant = "inline",
  spine = "left",
  dot = true,
  rule = true,
  className,
}: ModuleLabelProps) {
  const label = `${prefix}::${name}`;

  if (variant === "eyebrow") {
    return (
      <div
        className={cn(
          "flex items-center gap-4",
          spine === "right" && "flex-row-reverse",
          className,
        )}
      >
        {/* Junction node — pulled onto the section gutter spine. */}
        <div
          aria-hidden
          className={cn(
            "size-2 shrink-0 bg-accent/40",
            spine === "right"
              ? "-mr-[calc(2rem+4px)] md:-mr-[calc(3rem+4px)]"
              : "-ml-[calc(2rem+4px)] md:-ml-[calc(3rem+4px)]",
          )}
        />
        <span className="shrink-0 font-mono text-eyebrow uppercase tracking-splice-ultra text-accent">
          {label}
        </span>
        <span aria-hidden className="h-px flex-1 bg-surface-border" />
      </div>
    );
  }

  return (
    <span className={cn("flex items-center gap-3", className)}>
      {dot && (
        <span
          aria-hidden
          className="size-[2px] shrink-0 bg-accent motion-safe:animate-pulse-accent"
        />
      )}
      <span className="shrink-0 font-mono text-eyebrow uppercase tracking-splice-ultra text-accent/60">
        {label}
      </span>
      {rule && (
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent"
        />
      )}
    </span>
  );
}
