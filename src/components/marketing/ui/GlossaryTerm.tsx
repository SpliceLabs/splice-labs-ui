"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const GLOSSARY: Record<string, string> = {
  "governed autonomous capital":
    "Capital that moves and works autonomously within explicit, human-defined governance bounds. AI executes; humans approve.",
  "agentic finance":
    "The application of AI agents to financial operations—executing within policy constraints with human approval at critical gates.",
  helios:
    "Splice's venture production OS. Validation frameworks, formation infrastructure, and GTM machinery for building companies.",
  opco:
    "Operating Company. The entity structure for each incubation—clean cap tables, standard venture terms.",
  "kill rate":
    "Percentage of concepts terminated before significant capital deployment. Evidence of disciplined validation.",
  formation:
    "The process of building and validating a new company from concept through prototype to market.",
  "design partners":
    "Early adopters who provide feedback and validation in exchange for early access to portfolio solutions.",
  "founder bench":
    "Network of vetted operators ready to be matched with validated incubation opportunities.",
};

interface GlossaryTermProps {
  term: string;
  children?: React.ReactNode;
}

export function GlossaryTerm({ term, children }: GlossaryTermProps) {
  const definition = GLOSSARY[term.toLowerCase()];

  if (!definition) {
    return <>{children || term}</>;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="underline decoration-accent/30 decoration-dotted underline-offset-2 cursor-help">
            {children || term}
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-[280px] text-xs leading-relaxed bg-surface border-surface-border"
        >
          <p>{definition}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
