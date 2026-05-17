"use client";

import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { TerminalButton } from "@/components/marketing/ui/TerminalButton";

const WHO_SHOULD_APPLY = [
  "Technical or domain expertise in agentic finance, stablecoin infrastructure, or governed autonomous systems",
  "An idea at the concept or early validation stage—we help shape, not rescue",
  "Willingness to work within HELIOS validation frameworks and evidence-first methodology",
  "Long-term vision aligned with governed autonomous capital thesis",
];

const WHAT_SPLICE_CONTRIBUTES = [
  { label: "Research", description: "Market validation, competitive analysis, regulatory landscape mapping" },
  { label: "Architecture", description: "System design, protocol architecture, security modeling" },
  { label: "Technical Scaffolding", description: "MVP frameworks, HELIOS integration, governed agent infrastructure" },
  { label: "GTM", description: "Go-to-market strategy, pilot programs, institutional partnerships" },
  { label: "Fundraising Prep", description: "Deck development, investor intros, diligence preparation" },
];

const WHAT_FOUNDERS_KEEP = [
  { label: "Agency", description: "You make the calls. We provide infrastructure, not mandates." },
  { label: "Majority Ownership", description: "93% founder equity in co-incubation model. Clean cap tables." },
  { label: "Company Independence", description: "Your company. Your board. No platform lock-in." },
];

const FAQ = [
  {
    q: "What equity does Splice take?",
    a: "In our 93/7 co-incubation model, founders retain 93% and Splice takes 7%. This is negotiated based on contribution and timing.",
  },
  {
    q: "Are there platform fees?",
    a: "No mandatory platform fees. You don't pay to use HELIOS infrastructure. Our return comes from equity participation.",
  },
  {
    q: "Do you provide cofounders?",
    a: "We can help recruit from our operator bench, but we don't force cofounder matches. Team building is collaborative.",
  },
  {
    q: "What about board seats?",
    a: "We don't require board seats at early stages. Governance is appropriate to stage and negotiated transparently.",
  },
  {
    q: "Who owns the IP?",
    a: "The company owns all IP generated during incubation. HELIOS infrastructure is licensed, not transferred.",
  },
  {
    q: "What's the typical timeline?",
    a: "Validation to prototype: variable based on domain complexity. We optimize for evidence, not arbitrary deadlines.",
  },
];

export default function ForFoundersScreen() {
  return (
    <MarketingLayout>

      <section className="pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-8 max-w-[900px] mx-auto">
        {/* Hero */}
        <div className="mb-16">
          <span className="font-mono text-[9px] text-accent tracking-splice-ultra uppercase block mb-4">
            For Founders
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-splice-tight text-foreground leading-[1.1] mb-6">
            Build With Us
          </h1>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-[700px]">
            Splice is for founders building at the intersection of AI and programmable capital.
            We provide the infrastructure, validation frameworks, and GTM machinery—you keep the agency and ownership.
          </p>
        </div>

        {/* Who Should Apply */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-6">
            Who Should Apply
          </h2>
          <div className="space-y-3">
            {WHO_SHOULD_APPLY.map((item, i) => (
              <div key={i} className="flex items-start gap-4 border-l-2 border-accent/20 pl-4 py-2">
                <span className="w-1.5 h-1.5 bg-accent/40 shrink-0 mt-2" />
                <p className="text-sm text-foreground/70 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What Splice Contributes */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-6">
            What Splice Contributes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WHAT_SPLICE_CONTRIBUTES.map((item, i) => (
              <div key={i} className="border border-surface-border p-4 hover:border-accent/30 transition-colors">
                <span className="font-mono text-[10px] text-accent tracking-splice-ultra uppercase block mb-1">
                  {item.label}
                </span>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What Founders Keep */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-6">
            What Founders Keep
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {WHAT_FOUNDERS_KEEP.map((item, i) => (
              <div key={i} className="border border-surface-border p-4 hover:border-accent/30 transition-colors">
                <span className="font-mono text-[10px] text-accent tracking-splice-ultra uppercase block mb-1">
                  {item.label}
                </span>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {FAQ.map((item, i) => (
              <div key={i} className="border-l-2 border-accent/20 pl-4">
                <h3 className="font-display text-base font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <TerminalButton href="/#contact" data-event="cta_apply_founder">
            Apply as Founder
          </TerminalButton>
          <TerminalButton variant="ghost" href="/#contact" data-event="cta_join_bench">
            Join Founder Bench
          </TerminalButton>
        </div>
      </section>

    </MarketingLayout>
  );
}
