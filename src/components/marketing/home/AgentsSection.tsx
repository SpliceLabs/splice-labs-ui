import { SwarmSlot } from "./swarm/SwarmSlot";
import { ModuleLabel } from "../ui/ModuleLabel";

const AGENTS = [
  { type: "Research", scope: "Read-only" },
  { type: "Systems", scope: "Scoped write" },
  { type: "Protocol", scope: "Scoped write" },
  { type: "Smart Contract", scope: "Audit-gated" },
  { type: "Security", scope: "Read-only" },
  { type: "Operations", scope: "Approval-gated" },
];

export function AgentsSection() {
  return (
    <section id="agents" className="border-t border-surface-border relative">
      {/* Swarm slot: left half on md+; full width on mobile. */}
      <SwarmSlot id="agents" className="absolute inset-0 md:right-1/3" />
      <div className="absolute right-6 md:right-8 top-0 bottom-0 w-px bg-surface-border" />

      <div className="container-wide py-20 md:py-28">
        <div className="md:w-1/2 md:ml-auto flex justify-center md:justify-end mask-fade-from-right">
         <div className="w-full max-w-[600px]">
          <ModuleLabel variant="eyebrow" spine="right" name="agents" className="mb-10" />

          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground mb-4">
            Agents With Boundaries
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed max-w-[540px] mb-10">
            Every agent operates with scoped permissions and logged actions.
          </p>

          {/* Honeycomb-inspired offset grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AGENTS.map((a, i) => (
              <div
                key={a.type}
                className={`border border-surface-border p-5 card-lift ${
                  i % 2 === 1 ? "md:translate-y-4" : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 bg-accent/50" />
                  <span className="font-mono text-[10px] text-foreground/70 tracking-splice-wide uppercase">
                    {a.type}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-muted-foreground/60 tracking-splice-wide">
                  {a.scope}
                </span>
              </div>
            ))}
          </div>
         </div>
        </div>
      </div>
    </section>
  );
}
