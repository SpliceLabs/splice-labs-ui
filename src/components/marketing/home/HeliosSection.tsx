"use client";

import { SwarmSlot } from "./swarm/SwarmSlot";
import { ModuleLabel } from "../ui/ModuleLabel";
import { getSectionLayout, type SectionAlign } from "./sectionLayout";
import { JunctionNode } from "./JunctionNode";

interface HeliosSectionProps {
  align?: SectionAlign;
}

export function HeliosSection({ align = "left" }: HeliosSectionProps) {
  const layout = getSectionLayout(align);
  const isLeft = align === "left";

  return (
    <section id="helios" className="border-t border-surface-border relative overflow-hidden">
      <SwarmSlot id="helios" className={layout.swarmSlot} />
      <div className={layout.accentLine} />
      {/* Background splice motif */}
      <div className={`absolute ${isLeft ? "right-0" : "left-0"} top-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-[0.03]`}>
        <svg viewBox="0 0 300 300" fill="none" className="w-full h-full">
          <line x1="0" y1="150" x2="300" y2="150" stroke="currentColor" strokeWidth="1" className="text-accent" />
          <line x1="150" y1="0" x2="150" y2="300" stroke="currentColor" strokeWidth="1" className="text-accent" />
          <circle cx="150" cy="150" r="60" stroke="currentColor" strokeWidth="1" className="text-accent" />
          <circle cx="150" cy="150" r="120" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
        </svg>
      </div>

      <div className="max-w-[1700px] mx-auto px-20 py-12 md:py-16 relative">
        <div className={layout.contentWrapper}>
         <div className="w-full max-w-[600px]">
          <div className={layout.headerFlex}>
            <JunctionNode sectionId="helios" align={align} large />
            <ModuleLabel name="platform" sectionId="helios" rule={false} dot={false} />
            <span className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 gap-10">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground mb-5">
                HELIOS: Venture Production OS
              </h2>
              <p className="text-sm text-foreground/50 leading-relaxed max-w-[580px] mb-8">
                HELIOS is our formation harness—research, validation, evals, policy, approval gates, provenance, GTM, and fundraising machinery. Every incubation runs on the same governed infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/helios" className="group inline-flex items-center font-mono text-[11px] tracking-splice-wide uppercase text-accent transition-all duration-300 hover:text-ember hover:translate-x-1">
                  <span className="relative">
                    Learn more about HELIOS
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-ember transition-transform duration-200 group-hover:scale-x-100" />
                  </span>
                  <span className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </a>
                <a href="#contact" className="group inline-flex items-center font-mono text-[11px] tracking-splice-wide uppercase text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-1">
                  <span className="relative">
                    Request a HELIOS demo
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-ember transition-transform duration-200 group-hover:scale-x-100" />
                  </span>
                  <span className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            </div>

            {/* Systems diagram */}
            <div className="space-y-3">
              {[
                { layer: "Research & Validation", active: true },
                { layer: "Eval Registry", active: false },
                { layer: "Policy Engine", active: false },
                { layer: "Approval Gates", active: false },
                { layer: "GTM & Fundraising", active: false },
              ].map((l, i) => (
                <div key={i} className="hover-card group border border-surface-border bg-surface p-3 flex items-center gap-3 transition-all duration-300 ease-out hover:border-ember/30 hover:bg-ember/[0.02] hover:-translate-x-1">
                  <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_2px_hsl(var(--accent)/0.4)]" />
                  <span className="font-mono text-xs text-foreground/60 tracking-splice-wide transition-colors duration-300 group-hover:text-foreground/90">
                    {l.layer}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-1">
                <span className="w-px h-4 bg-foreground/15" />
                <span className="font-mono text-[8px] text-muted-foreground/60 tracking-splice-ultra uppercase">
                  Formation Harness: 5 layers
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
