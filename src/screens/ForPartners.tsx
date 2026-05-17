"use client";

import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { TerminalButton } from "@/components/marketing/ui/TerminalButton";

const WHO_SHOULD_PARTNER = [
  { type: "Stablecoin/RWA Firms", description: "Treasury management, compliance automation, and agent-powered operations" },
  { type: "Protocols", description: "Governed agent infrastructure for protocol operations and governance" },
  { type: "Custodians", description: "Policy-enforced access controls and automated compliance workflows" },
  { type: "Agent Platforms", description: "Integration with HELIOS governance and approval infrastructure" },
  { type: "Fintechs", description: "AI-native infrastructure for regulated financial operations" },
];

const PARTNER_USE_CASES = [
  {
    label: "Define a Problem",
    description: "Bring a specific challenge in governed autonomous capital. We'll explore whether it fits our thesis and methodology.",
  },
  {
    label: "Co-Incubate",
    description: "Joint development of solutions that combine your domain expertise with our validation frameworks and infrastructure.",
  },
  {
    label: "Pilot",
    description: "Design partner engagement with active incubations. Early access to solutions in exchange for feedback and validation.",
  },
  {
    label: "Design Partner Access",
    description: "Strategic access to portfolio companies for mutual benefit—distribution, integration, or GTM collaboration.",
  },
];

const CONFIDENTIALITY = [
  "All partnership discussions are under NDA by default",
  "IP boundaries are clearly defined before any technical work begins",
  "Governance posture: we don't share one partner's information with others",
  "You retain full ownership of any proprietary information you bring to discussions",
];

export default function ForPartnersScreen() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-8 max-w-[900px] mx-auto">
        {/* Hero */}
        <div className="mb-16">
          <span className="font-mono text-[9px] text-accent tracking-splice-ultra uppercase block mb-4">
            For Partners
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-splice-tight text-foreground leading-[1.1] mb-6">
            Partner With Splice
          </h1>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-[700px]">
            We work with firms building at the intersection of AI and programmable capital.
            Whether you have a problem to solve or want access to our portfolio, there's a path for collaboration.
          </p>
        </div>

        {/* Who Should Partner */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-6">
            Who Should Partner
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WHO_SHOULD_PARTNER.map((item, i) => (
              <div key={i} className="border border-surface-border p-4 hover:border-accent/30 transition-colors">
                <span className="font-mono text-[10px] text-accent tracking-splice-ultra uppercase block mb-1">
                  {item.type}
                </span>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Use Cases */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-6">
            Partner Use Cases
          </h2>
          <div className="space-y-4">
            {PARTNER_USE_CASES.map((item, i) => (
              <div key={i} className="border border-surface-border p-5 hover:border-accent/30 transition-colors">
                <span className="font-mono text-[10px] text-accent tracking-splice-ultra uppercase block mb-2">
                  {item.label}
                </span>
                <p className="text-sm text-foreground/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Confidentiality */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-6">
            Confidentiality, IP & Governance
          </h2>
          <div className="border border-surface-border p-6 bg-surface/50">
            <div className="space-y-3">
              {CONFIDENTIALITY.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-accent/40 shrink-0 mt-2" />
                  <p className="text-sm text-foreground/70 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <TerminalButton href="/#contact" data-event="cta_partner_with_splice">
            Partner with Splice
          </TerminalButton>
          <TerminalButton variant="ghost" href="/#contact" data-event="cta_submit_problem">
            Submit a Problem
          </TerminalButton>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
