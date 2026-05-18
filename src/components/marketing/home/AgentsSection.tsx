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
      <div className="absolute right-20 top-0 bottom-0 w-px bg-foreground/10" />

      <div className="max-w-[1700px] mx-auto px-20 py-12 md:py-16">
        <div className="md:w-1/2 md:ml-auto flex justify-center md:justify-end mask-fade-from-right px-4 md:px-0">
         <div className="w-full max-w-[600px]">
          <div className="flex flex-row-reverse items-center gap-4 mb-6">
            <div className="w-2 h-2 bg-ember/40 md:-mr-[calc(3rem+4px)]" />
            <ModuleLabel name="agents" sectionId="agents" rule={false} dot={false} />
            <span className="flex-1 h-px bg-foreground/10" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground mb-4">
            Agents With Boundaries
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed max-w-[540px] mb-6">
            Every agent operates with scoped permissions and logged actions.
          </p>

          {/* Honeycomb-inspired offset grid */}
          <div className="grid grid-cols-2 gap-3">
            {AGENTS.map((a, i) => (
              <div
                key={a.type}
                className={`group border border-surface-border bg-surface p-5 transition-all duration-300 ease-out hover:border-ember/40 hover:shadow-ember-sm hover:-translate-y-0.5 ${
                  i % 2 === 1 ? "md:translate-y-4" : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 bg-foreground/30 group-hover:bg-ember transition-colors" />
                  <span className="font-mono text-xs text-foreground/70 tracking-splice-wide uppercase transition-all duration-200 group-hover:text-foreground group-hover:text-sm">
                    {a.type}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-ember/70 tracking-splice-wide transition-colors duration-200 group-hover:text-ember">
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
