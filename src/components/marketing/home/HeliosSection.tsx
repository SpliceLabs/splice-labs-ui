import { SwarmSlot } from "./swarm/SwarmSlot";

export function HeliosSection() {
  return (
    <section id="helios" className="border-t border-surface-border relative overflow-hidden">
      {/* Swarm slot: right half on md+; full width on mobile. */}
      <SwarmSlot id="helios" className="absolute inset-0 md:left-1/3" />
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-surface-border" />
      {/* Background splice motif */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-[0.03]">
        <svg viewBox="0 0 300 300" fill="none" className="w-full h-full">
          <line x1="0" y1="150" x2="300" y2="150" stroke="currentColor" strokeWidth="1" className="text-accent" />
          <line x1="150" y1="0" x2="150" y2="300" stroke="currentColor" strokeWidth="1" className="text-accent" />
          <circle cx="150" cy="150" r="60" stroke="currentColor" strokeWidth="1" className="text-accent" />
          <circle cx="150" cy="150" r="120" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
        </svg>
      </div>

      <div className="container-wide py-20 md:py-28 relative">
        <div className="md:w-1/2 md:mr-auto flex justify-center md:justify-start mask-fade-from-left">
         <div className="w-full max-w-[600px]">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-3 h-3 border border-accent bg-accent/10 -ml-[calc(2rem+6px)] md:-ml-[calc(3rem+6px)]" />
            <span className="font-mono text-[9px] text-accent tracking-splice-ultra uppercase">
              module::platform
            </span>
            <span className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-10">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground mb-5">
                HELIOS: Our AgenticOS
              </h2>
              <p className="text-sm text-foreground/50 leading-relaxed max-w-[580px] mb-8">
                HELIOS is the control plane Splice Labs runs on. It orchestrates agents, applies policies, and routes work through human approval gates.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/helios" className="inline-flex items-center font-mono text-[11px] tracking-splice-wide uppercase text-accent hover:text-accent transition-colors">
                  Learn more about HELIOS →
                </a>
                <a href="#contact" className="inline-flex items-center font-mono text-[11px] tracking-splice-wide uppercase text-muted-foreground hover:text-foreground transition-colors">
                  Request a HELIOS demo →
                </a>
              </div>
            </div>

            {/* Systems diagram */}
            <div className="space-y-3">
              {[
                { layer: "Approval Gates", active: true },
                { layer: "Policy Engine", active: false },
                { layer: "Agent Orchestrator", active: false },
                { layer: "Cross-Chain Runtime", active: false },
              ].map((l, i) => (
                <div key={i} className="border border-surface-border p-3 flex items-center gap-3 card-lift">
                  <span className={`w-1.5 h-1.5 ${l.active ? "bg-accent" : "bg-surface-border"}`} />
                  <span className="font-mono text-[10px] text-foreground/60 tracking-splice-wide">
                    {l.layer}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-1">
                <span className="w-px h-4 bg-accent/30" />
                <span className="font-mono text-[8px] text-muted-foreground/60 tracking-splice-ultra uppercase">
                  Stack depth: 4 layers
                </span>
              </div>
            </div>
          </div>
         </div>
        </div>
      </div>
    </section>
  );
}
