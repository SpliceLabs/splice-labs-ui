"use client";

import { TerminalButton } from "@/components/marketing/ui/TerminalButton";

const FIRST_WEDGES = [
  {
    title: "Stablecoin Treasury & Compliance",
    description: "Automated treasury management with built-in compliance rails for institutional stablecoin operations.",
  },
  {
    title: "Risk & Guardian Agents",
    description: "Autonomous agents that monitor, assess, and mitigate risk in real-time with human approval gates.",
  },
  {
    title: "Permissioned Wallets",
    description: "Wallet infrastructure with policy-enforced access controls for governed capital deployment.",
  },
];

const WHAT_MUST_BE_TRUE = [
  "AI agents can reliably execute financial operations within defined policy constraints",
  "Governance infrastructure can scale without creating institutional friction",
  "The cost of evidence and validation continues to decrease faster than the cost of building",
  "Regulatory frameworks will accommodate governed autonomous systems with proper audit trails",
];

export default function ThesisScreen() {
  return (
    <section className="pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-8 max-w-[900px] mx-auto">
        {/* Hero */}
        <div className="mb-16">
          <span className="font-mono text-[9px] text-accent tracking-splice-ultra uppercase block mb-4">
            Our Thesis
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-splice-tight text-foreground leading-[1.1] mb-6">
            Governed Autonomous Capital
          </h1>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-[700px]">
            We believe the next wave of financial infrastructure will be built by AI agents operating within
            governed systems—where policy is explicit, approval is human, and every action is auditable.
          </p>
        </div>

        {/* Why Now */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-4">
            Why Now
          </h2>
          <div className="border-l-2 border-accent/20 pl-6 space-y-4">
            <p className="text-sm text-foreground/70 leading-relaxed">
              Three forces are converging: AI capabilities have crossed the threshold for reliable financial operations,
              stablecoin infrastructure has matured to institutional scale, and regulatory clarity is emerging for
              governed autonomous systems.
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              The window is opening for a new category of financial infrastructure—one where AI agents handle execution
              while humans retain governance and oversight.
            </p>
          </div>
        </div>

        {/* Agentic Finance */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-4">
            Agentic Finance
          </h2>
          <div className="border-l-2 border-accent/20 pl-6 space-y-4">
            <p className="text-sm text-foreground/70 leading-relaxed">
              Agentic finance is the application of AI agents to financial operations—not to replace human judgment,
              but to extend human capability. Agents execute within policy constraints. Humans approve at critical gates.
              Every action generates an audit trail.
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              This is the foundation for what we call <strong className="text-foreground">governed autonomous capital</strong>:
              capital that can move and work autonomously, but only within explicit, human-defined governance bounds.
            </p>
          </div>
        </div>

        {/* First Wedges */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-6">
            First Wedges
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed mb-6">
            We're starting where governed AI meets programmable capital—institutional use cases that demand both
            automation and oversight.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FIRST_WEDGES.map((wedge, i) => (
              <div key={i} className="border border-surface-border p-6 hover:border-accent/30 transition-colors">
                <span className="font-mono text-[9px] text-accent tracking-splice-ultra uppercase block mb-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-base font-semibold text-foreground mb-2">
                  {wedge.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {wedge.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What Must Be True */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-6">
            What Must Be True
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed mb-6">
            We're placing bets on these conditions. If they don't hold, we'll adapt or kill the approach.
          </p>
          <div className="space-y-3">
            {WHAT_MUST_BE_TRUE.map((condition, i) => (
              <div key={i} className="flex items-start gap-4 border-l-2 border-accent/20 pl-4 py-2">
                <span className="font-mono text-[9px] text-accent tracking-splice-ultra uppercase shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {condition}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bear Case */}
        <div className="mb-16 border border-surface-border p-6 bg-surface/50">
          <h2 className="font-display text-xl font-semibold tracking-splice-tight text-foreground mb-4">
            Bear Case
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed">
            AI capabilities plateau before reaching reliable autonomous execution. Regulatory frameworks reject
            autonomous financial agents. Institutional adoption remains slower than DeFi native paths. If these
            materialize, we pivot to infrastructure tooling for human-in-the-loop systems.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <TerminalButton href="/for-partners" data-event="cta_partner_from_thesis">
            Partner with Splice
          </TerminalButton>
          <TerminalButton variant="ghost" href="/studio-model" data-event="cta_studio_from_thesis">
            Read Studio Model
          </TerminalButton>
        </div>
    </section>
  );
}
