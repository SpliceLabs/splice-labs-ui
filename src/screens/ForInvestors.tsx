"use client";

import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { TerminalButton } from "@/components/marketing/ui/TerminalButton";

const OPCO_RATIONALE = [
  "Formation equity in each incubation provides direct exposure to individual company performance",
  "Clean cap tables with standard venture terms—no platform complexity",
  "Early-stage pricing with de-risked entry via HELIOS validation",
];

const VALUATION_LOGIC = [
  { label: "Platform/IP", description: "HELIOS infrastructure, validation frameworks, formation harness" },
  { label: "Forward Pipeline", description: "Incubation queue depth, design partner commitments, founder bench quality" },
  { label: "Repeatability", description: "Documented methodology, kill rate discipline, evidence-based validation" },
];

const PROOF_METRICS = [
  { metric: "Validation Cost", description: "Cost per validated hypothesis vs. traditional venture diligence" },
  { metric: "Kill Rate", description: "Percentage of concepts terminated before significant capital deployment" },
  { metric: "Pilots", description: "Active design partner engagements and pilot programs" },
  { metric: "CEOs Recruited", description: "Operators placed from founder bench into incubations" },
];

export default function ForInvestorsScreen() {
  return (
    <MarketingLayout>

      <section className="pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-8 max-w-[900px] mx-auto">
        {/* Hero */}
        <div className="mb-16">
          <span className="font-mono text-[9px] text-accent tracking-splice-ultra uppercase block mb-4">
            For Investors
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-splice-tight text-foreground leading-[1.1] mb-6">
            Invest in Governed Autonomous Capital
          </h1>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-[700px]">
            Splice Labs is building the infrastructure layer for agentic finance. We're raising at the OpCo level first—
            fund structure follows after systems are hardened and portfolio demonstrates repeatability.
          </p>
        </div>

        {/* OpCo-First Rationale */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-6">
            OpCo-First Seed Rationale
          </h2>
          <div className="space-y-3">
            {OPCO_RATIONALE.map((item, i) => (
              <div key={i} className="flex items-start gap-4 border-l-2 border-accent/20 pl-4 py-2">
                <span className="w-1.5 h-1.5 bg-accent/40 shrink-0 mt-2" />
                <p className="text-sm text-foreground/70 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Fund Begins Later */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-4">
            Why Fund Begins After Systems Are Hardened
          </h2>
          <div className="border-l-2 border-accent/20 pl-6 space-y-4">
            <p className="text-sm text-foreground/70 leading-relaxed">
              We're building the formation infrastructure first. HELIOS, our venture production OS, is the platform
              that de-risks incubation and creates repeatable outcomes. The fund structure makes sense once we've
              demonstrated this repeatability.
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              This approach aligns incentives: early investors get OpCo exposure at platform-building prices;
              later LP capital comes in when the methodology is proven.
            </p>
          </div>
        </div>

        {/* Valuation Logic */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-6">
            Valuation Logic
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {VALUATION_LOGIC.map((item, i) => (
              <div key={i} className="border border-surface-border p-4 hover:border-accent/30 transition-colors">
                <span className="font-mono text-[10px] text-accent tracking-splice-ultra uppercase block mb-1">
                  {item.label}
                </span>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* LP Sidecar Overview */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-4">
            LP Sidecar Overview
          </h2>
          <div className="border border-surface-border p-6 bg-surface/50">
            <p className="text-sm text-foreground/70 leading-relaxed mb-4">
              We're exploring sidecar structures for aligned capital that wants exposure to the full portfolio
              without direct OpCo participation. Details are available privately for qualified investors.
            </p>
            <p className="text-sm text-foreground/60 italic">
              Request investor materials for full sidecar terms and structure.
            </p>
          </div>
        </div>

        {/* Proof Metrics */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-6">
            Proof Discipline Metrics
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed mb-6">
            We track these metrics to demonstrate methodology effectiveness. Current figures available in investor materials.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROOF_METRICS.map((item, i) => (
              <div key={i} className="border border-surface-border p-4 hover:border-accent/30 transition-colors">
                <span className="font-mono text-[10px] text-accent tracking-splice-ultra uppercase block mb-1">
                  {item.metric}
                </span>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <TerminalButton href="/#contact" data-event="cta_request_materials">
            Request Investor Materials
          </TerminalButton>
          <TerminalButton variant="ghost" href="/#contact" data-event="cta_schedule_diligence">
            Schedule Diligence Call
          </TerminalButton>
        </div>
      </section>

    </MarketingLayout>
  );
}
