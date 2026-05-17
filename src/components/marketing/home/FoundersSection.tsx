import { SwarmSlot } from "./swarm/SwarmSlot";

const FOUNDERS = [
  {
    name: "Tim Varner",
    role: "CEO",
    bio: "Two-time founder (YC S14). Former CEO of Roost. Board advisor at Sancus Ventures. Stacks Foundation resident. Venture formation, GTM, and institutional partnerships.",
  },
  {
    name: "Jake Krogman",
    role: "CTO",
    bio: "Systems architect with deep expertise in security, protocol design, and governed infrastructure. Builds the technical backbone for every incubation.",
  },
  {
    name: "Aakanksha Mahajan",
    role: "Engineering Lead",
    bio: "Full-stack engineering lead shipping production-grade web3 applications. Prior experience in AI systems and product engineering.",
  },
];

export function FoundersSection() {
  return (
    <section id="founders" className="border-t border-surface-border relative">
      {/* Swarm slot: left half on md+; full width on mobile. */}
      <SwarmSlot id="founders" className="absolute inset-0 md:right-1/3" />
      <div className="absolute right-6 md:right-8 top-0 bottom-0 w-px bg-surface-border" />

      <div className="max-w-[1700px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="md:w-1/2 md:ml-auto flex justify-center md:justify-end mask-fade-from-right">
         <div className="w-full max-w-[600px]">
          <div className="flex flex-row-reverse items-center gap-4 mb-6">
            <div className="w-2 h-2 bg-accent/40 md:-mr-[calc(3rem+4px)]" />
            <span className="font-mono text-[9px] text-accent tracking-splice-ultra uppercase">module::team</span>
            <span className="flex-1 h-px bg-surface-border" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground mb-8">
            Built by Operators
          </h2>

          {/* Staggered founder cards */}
          <div className="space-y-6">
            {FOUNDERS.map((f, i) => (
              <div
                key={f.name}
                className={`grid grid-cols-1 lg:grid-cols-[180px_1fr] border border-surface-border hover:border-accent/20 transition-colors ${
                  i % 2 === 1 ? "lg:ml-8" : ""
                }`}
              >
                <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-surface-border flex flex-col justify-center">
                  <div className="w-12 h-12 border border-accent/20 flex items-center justify-center mb-3">
                    <span className="font-mono text-sm text-accent">
                      {f.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">{f.name}</h3>
                  <span className="font-mono text-[10px] text-accent tracking-splice-wide uppercase">{f.role}</span>
                </div>
                <div className="p-6 md:p-8 flex items-center">
                  <p className="text-sm text-foreground/70 leading-relaxed">{f.bio}</p>
                </div>
              </div>
            ))}
          </div>
         </div>
        </div>
      </div>
    </section>
  );
}
