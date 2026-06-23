import { TerminalWordmark } from "@/components/logos/TerminalLogo";

/* ─── Slide wrapper ─── */
export function Slide({
  id,
  module,
  children,
  accent = false,
  slideNumber,
  totalSlides,
}: {
  id: string;
  module: string;
  children: React.ReactNode;
  accent?: boolean;
  slideNumber?: number;
  totalSlides?: number;
}) {
  return (
    <section
      id={id}
      className="min-h-screen border-b border-surface-border relative flex items-center"
    >
      {/* Continuous splice line */}
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-surface-border" />

      {/* Logo watermark — top right */}
      <div className="absolute top-6 right-6 md:right-8 opacity-30">
        <TerminalWordmark accent scale="product" />
      </div>

      {/* Pagination — bottom right */}
      {slideNumber && totalSlides && (
        <div className="absolute bottom-6 right-6 md:right-8 flex items-center gap-2">
          <span className="font-mono text-label-sm text-muted-foreground/40 tracking-splice-wide">
            {String(slideNumber).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: totalSlides }, (_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 ${
                  i + 1 === slideNumber ? "bg-accent" : "bg-surface-border"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="pl-8 md:pl-12">
          {/* Junction node */}
          <div className="flex items-center gap-4 mb-10">
            <div
              className={`${
                accent
                  ? "w-3 h-3 border border-accent bg-accent/10 -ml-[calc(2rem+6px)] md:-ml-[calc(3rem+6px)]"
                  : "w-2 h-2 bg-accent/40 -ml-[calc(2rem+4px)] md:-ml-[calc(3rem+4px)]"
              }`}
            />
            <span className="font-mono text-label-xs text-accent/60 tracking-splice-ultra uppercase">
              {module}
            </span>
            <span className="flex-1 h-px bg-surface-border" />
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

/* ─── Placeholder block ─── */
export function Placeholder({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`border border-dashed border-surface-border flex items-center justify-center ${className}`}
    >
      <span className="font-mono text-label-sm text-muted-foreground/30 tracking-splice-wide uppercase">
        {label}
      </span>
    </div>
  );
}
