import { SwarmSlot } from "./swarm/SwarmSlot";

const PROJECTS = [
  {
    name: "Silent Markets",
    description: "Agent-paired trading journal for web3. Cross-chain from day one.",
    tags: ["Trading", "Agents", "Cross-Chain"],
  },
  {
    name: "Anon Capital",
    description: "DAO infrastructure for structured earnings remittance.",
    tags: ["DAO", "Infrastructure"],
  },
  {
    name: "Crown Futures",
    description: "Enterprise-scale web3 trading infrastructure with institutional controls.",
    tags: ["Enterprise", "Institutional"],
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-surface-border relative">
      {/* Swarm slot: left half on md+; full width on mobile. */}
      <SwarmSlot id="projects" className="absolute inset-0 md:right-1/3" />
      <div className="absolute right-6 md:right-8 top-0 bottom-0 w-px bg-surface-border" />

      <div className="max-w-[1700px] mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="md:w-1/2 md:ml-auto flex justify-center md:justify-end mask-fade-from-right">
         <div className="w-full max-w-[600px]">
          <div className="flex flex-row-reverse items-center gap-4 mb-10">
            <div className="w-2 h-2 bg-accent/40 -mr-[calc(2rem+4px)] md:-mr-[calc(3rem+4px)]" />
            <span className="font-mono text-[9px] text-accent tracking-splice-ultra uppercase">
              module::projects
            </span>
            <span className="flex-1 h-px bg-surface-border" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground mb-12">
            Currently Building
          </h2>

          {/* Asymmetric project cards with splice connectors */}
          <div className="space-y-6">
            {PROJECTS.map((p, i) => (
              <div
                key={p.name}
                className={`grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 border border-surface-border bg-surface hover:border-accent/20 transition-colors ${
                  i % 2 === 1 ? "lg:ml-8" : ""
                }`}
              >
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {p.name}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div className="p-6 md:p-8 border-t lg:border-t-0 lg:border-l border-surface-border flex items-center">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] tracking-splice-wide uppercase text-accent border border-accent/20 px-2.5 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-8">
            <span className="w-12 h-px bg-accent/15" />
            <span className="font-mono text-[9px] text-muted-foreground/60 tracking-splice-wide">
              Additional prototypes are shared privately with partners.
            </span>
          </div>
         </div>
        </div>
      </div>
    </section>
  );
}
