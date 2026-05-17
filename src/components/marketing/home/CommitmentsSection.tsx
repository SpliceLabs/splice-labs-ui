import { SwarmSlot } from "./swarm/SwarmSlot";

const COMMITMENTS = [
  { label: "Agent-Paired", body: "Human + agent collaboration is the default." },
  { label: "AI + DeFi", body: "We build where intelligence meets programmable capital." },
  { label: "Security as Constraint", body: "Threat modeling early. Audit trails always." },
  { label: "Prototype-Led", body: "Artifacts create alignment. Talking comes later." },
  { label: "Partner-First", body: "We strengthen larger teams. We don't compete for spotlight." },
];

export function CommitmentsSection() {
  return (
    <section id="commitments" className="border-t border-surface-border relative">
      {/* Swarm slot: right half on md+; full width on mobile. */}
      <SwarmSlot id="commitments" className="absolute inset-0 md:left-1/3" />
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-surface-border" />

      <div className="max-w-[1700px] mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="md:w-1/2 md:mr-auto flex justify-center md:justify-start mask-fade-from-left">
         <div className="w-full max-w-[600px]">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-2 h-2 bg-accent/40 -ml-[calc(2rem+4px)] md:-ml-[calc(3rem+4px)]" />
            <span className="font-mono text-[9px] text-accent tracking-splice-ultra uppercase">
              module::commitments
            </span>
            <span className="flex-1 h-px bg-surface-border" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground mb-12">
            Our Commitments
          </h2>

          {/* Pipeline diagram — each commitment is a node */}
          <div className="relative">
            {COMMITMENTS.map((c, i) => (
              <div key={i} className="flex items-start gap-5 mb-0">
                {/* Vertical connector + node */}
                <div className="flex flex-col items-center shrink-0 w-5">
                  <div className={`w-2.5 h-2.5 border border-accent/50 ${i === 0 ? "bg-accent/20" : "bg-transparent"}`} />
                  {i < COMMITMENTS.length - 1 && (
                    <div className="w-px h-full min-h-[3rem] bg-accent/15" />
                  )}
                </div>

                <div className="pb-8">
                  <span className="font-mono text-[11px] text-accent tracking-splice-wide uppercase block mb-1">
                    {c.label}
                  </span>
                  <p className="text-sm text-foreground/50 leading-relaxed">
                    {c.body}
                  </p>
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
