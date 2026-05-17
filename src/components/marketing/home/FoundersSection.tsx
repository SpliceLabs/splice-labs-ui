import { SwarmSlot } from "./swarm/SwarmSlot";
import { ModuleLabel } from "../ui/ModuleLabel";

const FOUNDERS = [
  {
    name: "Tim Varner",
    role: "CEO",
    bio: "Two-time founder. Former CEO of Roost (YC S14). Board advisor at Sancus Ventures. Stacks Foundation resident (2022–23).",
  },
  {
    name: "Jake Krogman",
    role: "CTO",
    bio: "Software architect focused on clean architecture and reliable delivery in web3 systems.",
  },
  {
    name: "Aakanksha Mahajan",
    role: "Engineering Lead",
    bio: "Engineering & Software lead building production-grade web and web3 applications.",
  },
];

export function FoundersSection() {
  return (
    <section id="founders" className="border-t border-surface-border relative">
      {/* Swarm slot: left half on md+; full width on mobile. */}
      <SwarmSlot id="founders" className="absolute inset-0 md:right-1/3" />
      <div className="absolute right-6 md:right-8 top-0 bottom-0 w-px bg-surface-border" />

      <div className="container-wide py-20 md:py-28">
        <div className="md:w-1/2 md:ml-auto flex justify-center md:justify-end mask-fade-from-right">
         <div className="w-full max-w-[600px]">
          <ModuleLabel variant="eyebrow" spine="right" name="team" className="mb-10" />

          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground mb-12">
            Built by Operators
          </h2>

          {/* Staggered founder cards */}
          <div className="space-y-6">
            {FOUNDERS.map((f, i) => (
              <div
                key={f.name}
                className={`grid grid-cols-1 lg:grid-cols-[180px_1fr] border border-surface-border card-lift ${
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
