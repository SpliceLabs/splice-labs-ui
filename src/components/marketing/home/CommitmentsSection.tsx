import { SwarmSlot } from "./swarm/SwarmSlot";
import { ModuleLabel } from "../ui/ModuleLabel";

const COMMITMENTS = [
  { label: "Founder Ownership", body: "Majority equity stays with founders. No forced platform tax." },
  { label: "Clean Cap Tables", body: "Simple structures. No hidden complexity or lock-in." },
  { label: "Built With, Not Around", body: "Founders retain agency. We provide infrastructure, not mandates." },
  { label: "Governed by Design", body: "Policy gates, approval workflows, and audit trails from day one." },
  { label: "Kill Fast, Build Right", body: "Rapid validation. We'd rather kill a bad idea than nurse a zombie." },
];

export function CommitmentsSection() {
  return (
    <section id="commitments" className="border-t border-surface-border relative overflow-hidden">
      {/* Swarm slot: right half on md+; full width on mobile. */}
      <SwarmSlot id="commitments" className="absolute inset-0 md:left-1/3" />
      <div className="absolute left-20 top-0 bottom-0 w-px bg-foreground/10" />

      <div className="max-w-[1700px] mx-auto px-20 py-12 md:py-16">
        <div className="md:w-1/2 md:mr-auto flex justify-center md:justify-start mask-fade-from-left pl-4 md:pl-0">
         <div className="w-full max-w-[600px]">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2 bg-ember/40 md:-ml-[calc(3rem+4px)]" />
            <ModuleLabel name="commitments" sectionId="commitments" rule={false} dot={false} />
            <span className="flex-1 h-px bg-foreground/10" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground mb-8">
            Our Commitments
          </h2>

          {/* Pipeline diagram — each commitment is a node */}
          <div className="relative">
            {COMMITMENTS.map((c, i) => (
              <div key={i} className="group flex items-start gap-5 mb-0">
                {/* Vertical connector + node */}
                <div className="flex flex-col items-center shrink-0 w-5">
                  <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_2px_hsl(var(--accent)/0.4)]" />
                  {i < COMMITMENTS.length - 1 && (
                    <div className="w-px h-full min-h-[3rem] bg-foreground/15" />
                  )}
                </div>

                <div className="pb-8 transition-all duration-300 group-hover:translate-x-1">
                  <span className="font-mono text-xs font-bold text-foreground/70 tracking-splice-wide uppercase block mb-1 transition-colors duration-300 group-hover:text-accent">
                    {c.label}
                  </span>
                  <p className="text-sm text-foreground/60 leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
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
