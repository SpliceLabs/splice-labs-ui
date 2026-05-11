import { SwarmSlot } from "./swarm/SwarmSlot";

export function SecuritySection() {
  return (
    <section id="security" className="border-t border-surface-border relative">
      {/* Swarm slot: right half on md+; full width on mobile. */}
      <SwarmSlot id="security" className="absolute inset-0 md:left-1/3" />
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-surface-border" />

      <div className="max-w-[1700px] mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="md:w-1/2 md:mr-auto flex justify-center md:justify-start mask-fade-from-left">
         <div className="w-full max-w-[600px]">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-2 h-2 bg-accent/40 -ml-[calc(2rem+4px)] md:-ml-[calc(3rem+4px)]" />
            <span className="font-mono text-[9px] text-accent tracking-splice-ultra uppercase">
              module::security
            </span>
            <span className="flex-1 h-px bg-surface-border" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground mb-10">
            Security by Design
          </h2>

          {/* Three pillars with connecting lines */}
          <div className="grid grid-cols-1 gap-0">
            {[
              { label: "Policies", detail: "Clear policies govern every system boundary." },
              { label: "Approvals", detail: "Explicit human approvals for all critical paths." },
              { label: "Logs", detail: "Deterministic, immutable audit logs throughout." },
            ].map((item) => (
              <div key={item.label} className="flex">
                <div className="flex-1 p-6 md:p-8 border border-surface-border -mt-px first:mt-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-px bg-accent/40" />
                    <span className="font-mono text-[11px] text-accent tracking-splice-wide uppercase">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-8">
            <span className="w-12 h-px bg-accent/15" />
            <span className="font-mono text-[9px] text-muted-foreground/60 tracking-splice-wide">
              No mystery deployments.
            </span>
          </div>
         </div>
        </div>
      </div>
    </section>
  );
}
