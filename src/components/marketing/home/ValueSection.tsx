"use client";

import { SwarmSlot } from "./swarm/SwarmSlot";
import { cn } from "@/lib/utils";
import { ModuleLabel } from "../ui/ModuleLabel";
import { JunctionNode } from "./JunctionNode";

const VALUES = [
  { title: "Vertical Focus", body: "Agentic finance infrastructure—where AI meets programmable money." },
  { title: "Founder-First Economics", body: "Clean cap tables. No mandatory platform tax. Founders keep majority ownership and agency." },
  { title: "Venture Production OS", body: "Shared research, validation frameworks, MVP scaffolding, and GTM infrastructure." },
  { title: "Governed AI Infrastructure", body: "Evaluated workflows, audit logs, policy gates, and human approval at every critical step." },
  { title: "Portfolio Commons", body: "Reusable learning across incubations without exposing proprietary data." },
  { title: "Evidence Before Scale", body: "AI reduces the cost of evidence while preserving founder autonomy. We kill bad ideas fast." },
];

export function ValueSection() {
  return (
    <section id="value" className="border-t border-surface-border relative">
      {/* Swarm slot: left half on md+; full width on mobile. */}
      <SwarmSlot id="value" className="absolute inset-0 md:right-1/3" />
      {/* Mirrored splice line — right gutter */}
      <div className="absolute right-20 top-0 bottom-0 w-px bg-foreground/10" />

      <div className="max-w-[1700px] mx-auto px-20 py-12 md:py-16">
        <div className="md:w-1/2 md:ml-auto flex justify-center md:justify-end mask-fade-from-right px-4 md:px-0">
         <div className="w-full max-w-[600px]">
          {/* Section junction — node on right spine */}
          <div className="flex flex-row-reverse items-center gap-4 mb-6">
            <JunctionNode sectionId="value" align="right" />
            <ModuleLabel name="value" sectionId="value" rule={false} dot={false} />
            <span className="flex-1 h-px bg-foreground/10" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground mb-8">
            Why Splice Labs
          </h2>

          {/* Asymmetric staggered grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {VALUES.map((v, i) => (
              <div
                key={i}
                className={cn(
                  "hover-card group relative border-l-2 border-foreground/20 pl-6 py-2 transition-all duration-300 ease-out hover:border-ember/70 hover:bg-ember/[0.02] hover:pl-7",
                  i % 2 === 1 && "md:mt-8",
                )}
              >
                <span
                  aria-hidden
                  className="absolute right-0 top-2 font-mono text-label tracking-splice-wide text-ember/60 transition-all duration-200 group-hover:text-ember group-hover:text-label-lg"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-base font-semibold text-foreground mb-2 transition-all duration-200 group-hover:text-lg">
                  {v.title}
                </h3>
                <p className="text-base text-foreground/60 leading-relaxed transition-colors duration-200 group-hover:text-foreground/85">
                  {v.body}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-10">
            <span className="w-12 h-px bg-foreground/10" />
            <span className="text-label-lg text-foreground/60 italic">
              If it needs to be real, not theoretical, we can help.
            </span>
          </div>
         </div>
        </div>
      </div>
    </section>
  );
}
