import { cn } from "@/lib/utils";

export interface ModuleLabelProps {
  /** The module name — rendered after `prefix::`, e.g. "value". */
  name: string;
  /** Namespace before `::`. Default "module". */
  prefix?: string;
  /** Leading 2px pulsing accent dot. */
  dot?: boolean;
  /** Trailing hairline rule that fills remaining width. */
  rule?: boolean;
  className?: string;
}

/**
 * The mono-caps section eyebrow — `module::value`, `splice_labs::init`.
 * Replaces the hand-rolled eyebrow spans across the marketing sections.
 */
export function ModuleLabel({
  name,
  prefix = "module",
  dot = true,
  rule = true,
  className,
}: ModuleLabelProps) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      {dot && (
        <span
          aria-hidden
          className="size-[2px] shrink-0 bg-accent motion-safe:animate-pulse-accent"
        />
      )}
      <span className="shrink-0 font-mono text-[9px] uppercase tracking-splice-ultra text-accent/60">
        {prefix}::{name}
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
