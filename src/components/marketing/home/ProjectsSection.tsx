"use client";

import { SwarmSlot } from "./swarm/SwarmSlot";
import { cn } from "@/lib/utils";
import { TagChip } from "../ui/TagChip";
import { ModuleLabel } from "../ui/ModuleLabel";
import { JunctionNode } from "./JunctionNode";

type ProjectStatus = "concept" | "validation" | "prototype" | "private-beta" | "design-partner";

const PROJECTS: { name: string; description: string; tags: string[]; status: ProjectStatus }[] = [
  {
    name: "OpenTrade",
    description: "Institutional-grade crypto portfolio intelligence. AI-powered analysis and execution infrastructure.",
    tags: ["Trading", "AI", "Institutional"],
    status: "validation",
  },
  {
    name: "Agent Circuit",
    description: "F1 for AI agents. Competitive arenas where trading bots and gaming agents race, battle, and prove their edge.",
    tags: ["Agents", "Competition", "Gaming"],
    status: "prototype",
  },
  {
    name: "Agent Evolve",
    description: "Governed agent development platform. Policy-enforced AI systems with audit trails.",
    tags: ["Agents", "Governance", "Infrastructure"],
    status: "concept",
  },
];

const STATUS_LABELS: Record<ProjectStatus, string> = {
  concept: "Concept",
  validation: "Validation",
  prototype: "Prototype",
  "private-beta": "Private Beta",
  "design-partner": "Design Partner",
};

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-surface-border relative">
      {/* Swarm slot: left half on md+; full width on mobile. */}
      <SwarmSlot id="projects" className="absolute inset-0 md:right-1/3" />
      <div className="absolute right-20 top-0 bottom-0 w-px bg-foreground/10" />

      <div className="max-w-[1700px] mx-auto px-20 py-12 md:py-16">
        <div className="md:w-1/2 md:ml-auto flex justify-center md:justify-end mask-fade-from-right px-4 md:px-0">
         <div className="w-full max-w-[600px]">
          <div className="flex flex-row-reverse items-center gap-4 mb-6">
            <JunctionNode sectionId="projects" align="right" />
            <ModuleLabel name="projects" sectionId="projects" rule={false} dot={false} />
            <span className="flex-1 h-px bg-foreground/10" />
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground mb-8">
            Currently Building
          </h2>

          {/* Asymmetric project cards with splice connectors */}
          <div className="space-y-6">
            {PROJECTS.map((p, i) => (
              <div
                key={p.name}
                className={cn(
                  "hover-card group/card grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 border border-surface-border bg-surface transition-all duration-300 ease-out hover:border-ember/40 hover:shadow-ember-md hover:-translate-y-0.5",
                  i % 2 === 1 && "lg:ml-8",
                )}
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-lg font-semibold text-foreground transition-all duration-200 group-hover/card:text-xl">
                      <span className="relative inline-block">
                        {p.name}
                        <span
                          aria-hidden
                          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-ember motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out group-hover/card:scale-x-100"
                        />
                      </span>
                    </h3>
                    <span className="font-mono text-label text-ember tracking-splice-ultra uppercase px-2 py-0.5 border border-ember/30 bg-ember/5 transition-colors duration-200 group-hover/card:bg-ember/10">
                      {STATUS_LABELS[p.status]}
                    </span>
                  </div>
                  <p className="text-base text-foreground/70 leading-relaxed transition-colors duration-200 group-hover/card:text-foreground/90">
                    {p.description}
                  </p>
                </div>
                <div className="p-6 md:p-8 border-t lg:border-t-0 lg:border-l border-surface-border flex items-center">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <TagChip key={tag}>{tag}</TagChip>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-8">
            <span className="w-12 h-px bg-foreground/10" />
            <span className="font-mono text-label text-muted-foreground/60 tracking-splice-wide">
              Additional prototypes are shared privately with partners.
            </span>
          </div>
         </div>
        </div>
      </div>
    </section>
  );
}
