"use client";

import { TerminalButton } from "@/components/marketing/ui/TerminalButton";

const INCUBATION_MODELS = [
  {
    name: "93/7 Co-Incubation",
    equity: "93% Founder / 7% Splice",
    bestFor: "Founder brings the idea and domain expertise. Splice provides validation, architecture, and GTM infrastructure.",
    details: [
      "Founder retains majority ownership",
      "Access to HELIOS validation and formation tooling",
      "GTM and fundraising support",
      "No platform fees or hidden costs",
    ],
  },
  {
    name: "Wholly Owned",
    equity: "100% Splice (initially)",
    bestFor: "Splice identifies opportunity, builds initial prototype, then recruits CEO from operator bench.",
    details: [
      "Splice incubates to validation stage",
      "CEO recruited with founder-level equity",
      "Clean handoff with established traction",
      "Ideal for operators seeking a validated starting point",
    ],
  },
  {
    name: "Delayed-Founder",
    equity: "Negotiated at founder join",
    bestFor: "Complex domain requiring extended research before founder placement. Equity negotiated when CEO joins.",
    details: [
      "Extended validation and research phase",
      "Founder joins with clear scope and traction",
      "Equity reflects contribution timing",
      "De-risked entry for specialized operators",
    ],
  },
];

const TWO_LEDGER = [
  {
    label: "OpCo",
    title: "Operating Company",
    description: "Formation equity for each incubation. Clean cap tables, majority founder ownership, standard venture terms.",
  },
  {
    label: "Fund",
    title: "Splice Fund (Later)",
    description: "Begins after systems are hardened and portfolio demonstrates repeatability. LP sidecar for aligned capital.",
  },
];

export default function StudioModelScreen() {
  return (
    <section className="pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-8 max-w-[900px] mx-auto">
        {/* Hero */}
        <div className="mb-16">
          <span className="font-mono text-[11px] text-accent tracking-splice-ultra uppercase block mb-4">
            Studio Model
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-splice-tight text-foreground leading-[1.1] mb-6">
            How We Build Companies
          </h1>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-[700px]">
            Splice is a venture studio, not an accelerator. We co-build with founders, providing research,
            architecture, and GTM infrastructure—without mandatory platform fees or cap table complexity.
          </p>
        </div>

        {/* Two-Ledger Architecture */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-6">
            Two-Ledger Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TWO_LEDGER.map((ledger, i) => (
              <div key={i} className="hover-card group border border-surface-border p-6 bg-surface transition-all duration-300 ease-out hover:border-ember/40 hover:shadow-ember-sm hover:-translate-y-0.5">
                <span className="font-mono text-[11px] text-accent tracking-splice-ultra uppercase block mb-2 transition-colors duration-300 group-hover:text-ember">
                  {ledger.label}
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 transition-colors duration-300 group-hover:text-foreground">
                  {ledger.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                  {ledger.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Three Incubation Models */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-6">
            Three Incubation Models
          </h2>
          <div className="space-y-6">
            {INCUBATION_MODELS.map((model, i) => (
              <div key={i} className="hover-card group border border-surface-border p-6 bg-surface transition-all duration-300 ease-out hover:border-ember/40 hover:shadow-ember-sm hover:-translate-y-0.5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <span className="font-mono text-[11px] text-accent tracking-splice-ultra uppercase block mb-1 transition-colors duration-300 group-hover:text-ember">
                      Model {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-foreground">
                      {model.name}
                    </h3>
                  </div>
                  <span className="font-mono text-[13px] text-accent tracking-splice-wide mt-2 md:mt-0 transition-colors duration-300 group-hover:text-ember">
                    {model.equity}
                  </span>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed mb-4 transition-colors duration-300 group-hover:text-foreground/85">
                  {model.bestFor}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {model.details.map((detail, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-accent shadow-[0_0_4px_1px_hsl(var(--accent)/0.3)] shrink-0" />
                      <span className="text-sm text-foreground/60 transition-colors duration-300 group-hover:text-foreground/80">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decision Tree */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-6">
            Which Model Applies?
          </h2>
          <div className="hover-card group border border-surface-border p-6 bg-surface/50 transition-all duration-300 ease-out hover:border-ember/30 hover:bg-ember/[0.02]">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="font-mono text-[11px] text-ember/80 tracking-splice-ultra uppercase shrink-0 mt-1 transition-colors duration-300 group-hover:text-ember">IF</span>
                <p className="text-sm text-foreground/70 transition-colors duration-300 group-hover:text-foreground/85">
                  You have a venture idea and domain expertise → <strong className="text-foreground">93/7 Co-Incubation</strong>
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-mono text-[11px] text-ember/80 tracking-splice-ultra uppercase shrink-0 mt-1 transition-colors duration-300 group-hover:text-ember">IF</span>
                <p className="text-sm text-foreground/70 transition-colors duration-300 group-hover:text-foreground/85">
                  You're an operator looking for a validated starting point → <strong className="text-foreground">Wholly Owned</strong> (join as recruited CEO)
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-mono text-[11px] text-ember/80 tracking-splice-ultra uppercase shrink-0 mt-1 transition-colors duration-300 group-hover:text-ember">IF</span>
                <p className="text-sm text-foreground/70 transition-colors duration-300 group-hover:text-foreground/85">
                  The domain requires extended research before you're ready to commit → <strong className="text-foreground">Delayed-Founder</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Founder-First Economics */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-4">
            Founder-First Economics
          </h2>
          <div className="border-l-2 border-accent/20 pl-6 space-y-4">
            <p className="text-sm text-foreground/70 leading-relaxed">
              <strong className="text-foreground">No mandatory platform tax.</strong> You don't pay fees for using HELIOS
              infrastructure. The studio's return comes from equity participation, not platform revenue.
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              <strong className="text-foreground">Clean cap tables.</strong> Standard venture structures. No hidden
              complexity, advisory overhangs, or lock-in mechanics.
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              <strong className="text-foreground">Founder agency.</strong> You make the calls. We provide infrastructure,
              not mandates.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <TerminalButton href="/for-founders" data-event="cta_founders_from_studio">
            Apply as Founder
          </TerminalButton>
          <TerminalButton variant="ghost" href="/for-investors" data-event="cta_investors_from_studio">
            Request Investor Materials
          </TerminalButton>
        </div>
    </section>
  );
}
