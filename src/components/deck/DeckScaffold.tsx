import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Premium scaffolding primitives for blank pitch-deck slides.
 *
 * The goal is a deck that looks finished while empty: real, confident
 * typography carries the structure, and every place that needs content is
 * a clearly-labelled, on-brand slot (never a raw "TODO"). Drop real copy
 * in later by replacing the <Guide>/<Frame>/<Stat> placeholders.
 */

/* ── Type ── */

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[9px] tracking-splice-ultra uppercase text-accent/60">
      {children}
    </span>
  );
}

export function SlideTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display text-3xl md:text-5xl font-bold tracking-splice-tight leading-[1.04] text-foreground",
        className,
      )}
    >
      {children}
    </h2>
  );
}

/** Supporting line under a title. Pass real copy or a <Guide>. */
export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 max-w-[640px] text-base md:text-lg leading-relaxed text-muted-foreground/70">
      {children}
    </p>
  );
}

/** Inline bracketed hint marking where content goes. */
export function Guide({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[10px] tracking-splice-wide uppercase text-muted-foreground/35">
      [ {children} ]
    </span>
  );
}

/* ── Placeholder slots ── */

/**
 * A premium dashed content frame with accent corner ticks — for charts,
 * diagrams, product shots, logo walls.
 */
export function Frame({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative grid place-items-center border border-dashed border-surface-border bg-surface/30",
        className,
      )}
    >
      <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-accent/40" />
      <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-accent/40" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-accent/40" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-accent/40" />
      <span className="font-mono text-[10px] tracking-splice-wide uppercase text-muted-foreground/30">
        {label}
      </span>
    </div>
  );
}

/** A big metric slot — faded placeholder value over a mono label. */
export function Stat({ label }: { label: string }) {
  return (
    <div className="border-l-2 border-accent/30 pl-4">
      <div className="font-display text-3xl md:text-4xl font-bold leading-none text-foreground/20">
        000
      </div>
      <div className="mt-2 font-mono text-[9px] tracking-splice-wide uppercase text-muted-foreground/45">
        {label}
      </div>
    </div>
  );
}

/** Accent-bordered list of placeholder points. */
export function Bullets({ items }: { items: string[] }) {
  return (
    <div className="space-y-4">
      {items.map((it, i) => (
        <div key={i} className="border-l-2 border-accent/20 pl-5">
          <div className="font-display text-base md:text-lg font-semibold text-foreground/30">
            ——
          </div>
          <div className="mt-1.5">
            <Guide>{it}</Guide>
          </div>
        </div>
      ))}
    </div>
  );
}

/** A team member placeholder — square avatar frame + name/role slots. */
export function PersonCard({ role }: { role: string }) {
  return (
    <div className="flex flex-col gap-3">
      <Frame label="Photo" className="aspect-square w-full" />
      <div>
        <div className="h-3 w-24 bg-foreground/10" />
        <div className="mt-2">
          <Guide>{role}</Guide>
        </div>
      </div>
    </div>
  );
}

/** Short accent rule for footers / separators. */
export function AccentRule() {
  return <span className="inline-block h-px w-10 bg-accent/40" />;
}
