import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Real-content building blocks for the Splice seed deck (distinct from the
 * blank-scaffold primitives in DeckScaffold.tsx). These render actual
 * numbers, tables, and source citations — the evidence-based layer.
 */

/* ── Source citation ── */
export function Src({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[8px] tracking-splice-wide uppercase text-muted-foreground/45">
      {children}
    </span>
  );
}

/* ── Big stat tile with optional source ── */
export function StatTile({
  value,
  label,
  src,
  className,
}: {
  value: string;
  label: string;
  src?: string;
  className?: string;
}) {
  return (
    <div className={cn("border-l-2 border-accent/40 pl-4", className)}>
      <div className="font-display text-2xl md:text-4xl font-bold leading-none tracking-splice-tight text-foreground">
        {value}
      </div>
      <div className="mt-2.5 text-sm leading-snug text-foreground/65">{label}</div>
      {src && (
        <div className="mt-1.5">
          <Src>{src}</Src>
        </div>
      )}
    </div>
  );
}

/* ── Accent-bordered list of real points ── */
export function Points({
  items,
  className,
}: {
  items: ReactNode[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {items.map((it, i) => (
        <div
          key={i}
          className="border-l-2 border-accent/30 pl-5 text-sm md:text-base leading-relaxed text-foreground/80"
        >
          {it}
        </div>
      ))}
    </div>
  );
}

/* ── Two-column "old vs new" comparison ── */
export function CompareTable({
  leftTitle,
  rightTitle,
  rows,
}: {
  leftTitle: string;
  rightTitle: string;
  rows: [string, string][];
}) {
  return (
    <div className="border border-surface-border">
      <div className="grid grid-cols-2 border-b border-surface-border bg-surface/40">
        <div className="px-5 py-3 font-mono text-[10px] tracking-splice-wide uppercase text-muted-foreground/55">
          {leftTitle}
        </div>
        <div className="border-l border-surface-border px-5 py-3 font-mono text-[10px] tracking-splice-wide uppercase text-accent/75">
          {rightTitle}
        </div>
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          className="grid grid-cols-2 border-b border-surface-border last:border-b-0"
        >
          <div className="px-5 py-3 text-sm text-foreground/50">{r[0]}</div>
          <div className="border-l border-surface-border px-5 py-3 text-sm text-foreground/90">
            {r[1]}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Sequential two-ledger timeline ── */
export function LedgerTimeline() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="border border-accent/40 bg-accent/[0.05] p-6">
        <div className="font-mono text-[9px] tracking-splice-ultra uppercase text-accent">
          Ledger 1 · active at seed
        </div>
        <div className="mt-3 font-display text-xl font-semibold text-foreground">
          Studio OpCo
        </div>
        <p className="mt-2 text-sm leading-relaxed text-foreground/70">
          Owns the formation OS, harness/IP, founder pipeline, and studio
          common in spinouts. This is what the seed funds.
        </p>
      </div>
      <div className="border border-dashed border-surface-border p-6">
        <div className="font-mono text-[9px] tracking-splice-ultra uppercase text-muted-foreground/50">
          Ledger 2 · begins at series a
        </div>
        <div className="mt-3 font-display text-xl font-semibold text-foreground/55">
          Studio Fund I
        </div>
        <p className="mt-2 text-sm leading-relaxed text-foreground/45">
          Designed now, capitalized later — invests cash into the pipeline only
          after the proof gates clear.
        </p>
      </div>
    </div>
  );
}

/* ── Valuation staircase ── */
export function ValuationLadder({
  steps,
}: {
  steps: { value: string; when: string }[];
}) {
  return (
    <div className="space-y-2">
      {steps.map((s, i) => (
        <div
          key={i}
          className="flex items-baseline gap-4 border-l-2 border-accent/40 bg-surface/30 px-5 py-3"
          style={{ marginLeft: `${i * 9}%` }}
        >
          <span className="whitespace-nowrap font-display text-xl md:text-2xl font-bold tracking-splice-tight text-foreground">
            {s.value}
          </span>
          <span className="text-sm text-foreground/60">{s.when}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Use-of-funds bars ── */
export function FundsBars({ rows }: { rows: { label: string; pct: number }[] }) {
  return (
    <div className="space-y-3">
      {rows.map((r, i) => (
        <div key={i}>
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-foreground/80">{r.label}</span>
            <span className="font-mono text-[11px] text-accent/70">{r.pct}%</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full bg-surface-border">
            <div className="h-full bg-accent/55" style={{ width: `${r.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Cap-table stacked bar + legend ── */
export function CapBars({
  rows,
}: {
  rows: { label: string; pct: number; accent?: boolean }[];
}) {
  return (
    <div>
      <div className="flex h-9 w-full overflow-hidden border border-surface-border">
        {rows.map((r, i) => (
          <div
            key={i}
            className={cn(
              "h-full",
              r.accent ? "bg-accent/60" : "bg-surface-raised",
            )}
            style={{
              width: `${r.pct}%`,
              boxShadow: "inset -1px 0 0 hsl(var(--background))",
            }}
          />
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-3 text-sm">
            <span
              className={cn(
                "h-2.5 w-2.5 shrink-0",
                r.accent ? "bg-accent/60" : "bg-surface-raised",
              )}
            />
            <span className="text-foreground/80">{r.label}</span>
            <span className="ml-auto font-mono text-[11px] text-muted-foreground/50">
              {r.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Proof-gate rows ── */
export function ProofRows({
  rows,
}: {
  rows: { metric: string; target: string }[];
}) {
  return (
    <div className="divide-y divide-surface-border border-y border-surface-border">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center justify-between gap-6 py-3">
          <span className="text-sm text-foreground/80">{r.metric}</span>
          <span className="whitespace-nowrap font-mono text-[11px] tracking-splice-wide text-accent/75">
            {r.target}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Diligence Q&A grid ── */
export function QAGrid({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((it, i) => (
        <div key={i} className="border border-surface-border p-5">
          <div className="flex items-start gap-2.5">
            <span className="mt-1.5 h-2 w-2 shrink-0 bg-accent" />
            <div>
              <div className="font-display text-sm font-semibold text-foreground">
                {it.q}
              </div>
              <div className="mt-1.5 text-sm leading-relaxed text-foreground/65">
                {it.a}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Multi-column matrix (model comparison, cap-table evolution) ── */
export function Matrix({
  headers,
  rows,
  accentCol,
}: {
  headers: string[];
  rows: string[][];
  /** 1-based data column to tint (e.g. the recommended model). */
  accentCol?: number;
}) {
  const cols = headers.length;
  return (
    <div
      className="grid border border-surface-border text-[13px]"
      style={{ gridTemplateColumns: `1.3fr repeat(${cols - 1}, 1fr)` }}
    >
      {headers.map((h, i) => (
        <div
          key={`h${i}`}
          className={cn(
            "border-b border-surface-border bg-surface/40 px-4 py-3 font-mono text-[9px] tracking-splice-wide uppercase",
            i > 0 && "border-l border-surface-border",
            accentCol === i ? "text-accent/80" : "text-muted-foreground/55",
          )}
        >
          {h}
        </div>
      ))}
      {rows.map((r, ri) =>
        r.map((c, ci) => (
          <div
            key={`${ri}-${ci}`}
            className={cn(
              "px-4 py-2.5 leading-snug",
              ri < rows.length - 1 && "border-b border-surface-border",
              ci > 0 && "border-l border-surface-border",
              ci === 0
                ? "font-medium text-foreground/85"
                : "text-foreground/65",
              accentCol === ci && ci > 0 && "bg-accent/[0.04]",
            )}
          >
            {c}
          </div>
        )),
      )}
    </div>
  );
}

/* ── Labeled box (formation-OS layers, Series A columns) ── */
export function Box({
  kicker,
  title,
  body,
  accent = false,
}: {
  kicker?: string;
  title: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col border p-5",
        accent ? "border-accent/40 bg-accent/[0.04]" : "border-surface-border",
      )}
    >
      {kicker && (
        <div className="mb-2 font-mono text-[9px] tracking-splice-wide uppercase text-accent/60">
          {kicker}
        </div>
      )}
      <div className="font-display text-base font-semibold text-foreground">
        {title}
      </div>
      <div className="mt-1.5 text-sm leading-relaxed text-foreground/65">
        {body}
      </div>
    </div>
  );
}
