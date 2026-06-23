import { cn } from "@/lib/utils";

export interface ModuleLabelProps {
  /** The module name — rendered after `prefix::`, e.g. "value". */
  name: string;
  /** Namespace before `::`. Default "module". */
  prefix?: string;
  /** Leading dot that pulses. */
  dot?: boolean;
  /** Trailing hairline rule that fills remaining width. */
  rule?: boolean;
  /** Section ID (kept for future use). */
  sectionId?: string;
  className?: string;
}

/**
 * The mono-caps section eyebrow — `module::value`, `splice_labs::init`.
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
          className="size-[3px] shrink-0 rounded-full bg-foreground/40"
        />
      )}
      <span className="shrink-0 font-mono text-[13px] uppercase tracking-splice-ultra text-foreground/60">
        {prefix}::{name}
      </span>
      {rule && (
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-r from-foreground/20 to-transparent"
        />
      )}
    </span>
  );
}
