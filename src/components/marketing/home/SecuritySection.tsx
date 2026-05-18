import { SwarmSlot } from "./swarm/SwarmSlot";
import { ModuleLabel } from "../ui/ModuleLabel";
import { getSectionLayout, type SectionAlign } from "./sectionLayout";

interface SecuritySectionProps {
  align?: SectionAlign;
}

export function SecuritySection({ align = "right" }: SecuritySectionProps) {
  const layout = getSectionLayout(align);

  return (
    <section id="security" className="border-t border-surface-border relative">
      <SwarmSlot id="security" className={layout.swarmSlot} />
      <div className={layout.accentLine} />

      <div className="max-w-[1700px] mx-auto px-20 py-12 md:py-16">
        <div className={layout.contentWrapper}>
         <div className="w-full max-w-[600px]">
          <div className={layout.headerFlex}>
            <div className={`w-2 h-2 bg-ember/40 ${layout.junctionMargin}`} />
            <ModuleLabel name="security" sectionId="security" rule={false} dot={false} />
            <span className="flex-1 h-px bg-foreground/10" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground mb-6">
            Security by Design
          </h2>

          {/* Three pillars with connecting lines */}
          <div className="grid grid-cols-1 gap-0">
            {[
              { label: "Policies", detail: "Clear policies govern every system boundary." },
              { label: "Approvals", detail: "Explicit human approvals for all critical paths." },
              { label: "Logs", detail: "Deterministic, immutable audit logs throughout." },
            ].map((item) => (
              <div key={item.label} className="hover-card group flex">
                <div className="flex-1 p-6 md:p-8 border border-surface-border -mt-px first:mt-0 bg-surface transition-all duration-300 ease-out hover:border-ember/30 hover:bg-ember/[0.02]">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-px bg-foreground/20 transition-all duration-300 group-hover:w-8 group-hover:bg-ember/50" />
                    <span className="font-mono text-[11px] text-ember/80 tracking-splice-wide uppercase transition-colors duration-300 group-hover:text-ember">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed transition-colors duration-300 group-hover:text-foreground/85">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-8">
            <span className="w-12 h-px bg-foreground/10" />
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
