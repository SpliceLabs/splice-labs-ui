"use client";

import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { TerminalButton } from "@/components/marketing/ui/TerminalButton";

const PRIMITIVES = [
  {
    number: "01",
    title: "Memory Containment",
    body: "Agent memory is isolated and bounded. No agent can access context it hasn't been explicitly granted. Memory leakage between agents is structurally impossible. This prevents context poisoning and lateral movement between compromised agents.",
  },
  {
    number: "02",
    title: "Sandboxed Execution",
    body: "Every agent runs in a resource-bounded sandbox with strict communication boundaries. Compromised agents cannot escape their execution perimeter. This is structural containment—not prompt engineering, not policy.",
  },
  {
    number: "03",
    title: "Deterministic Constraint Engine",
    body: "Agent reasoning is probabilistic. Constraints are not. Hard rules on fund transfers, position limits, and protocol interactions that cannot be reasoned around. Allow/deny lists enforced at the infrastructure layer—not the model layer. LLMs can't prompt-inject their way past deterministic code.",
  },
  {
    number: "04",
    title: "Verification Layer",
    body: "Every proposed action passes through a verification layer that checks: compliance with constraints, simulation against expected outcomes, risk exposure calculations. Actions fail closed—not open. If verification fails, nothing executes.",
  },
  {
    number: "05",
    title: "Context Orchestration",
    body: "Multi-agent coordination with explicit information flow controls. Agents receive only the context they need for their scoped task. This limits blast radius when (not if) an agent is compromised via prompt injection or model steering attacks.",
  },
  {
    number: "06",
    title: "Immutable Audit Logs",
    body: "Every agent decision, constraint check, and action attempt is written to an immutable, replayable audit log. Forensic reconstruction is always possible. This is not monitoring—it is cryptographic proof of what happened and why.",
  },
];

const LAYERS = [
  { layer: "L1", label: "Prompt injection mitigation via model steering", note: "reduces but doesn't eliminate attacks" },
  { layer: "L2", label: "Deterministic constraints at the execution layer", note: "cannot be bypassed by reasoning" },
  { layer: "L3", label: "Pre-execution verification and simulation", note: "catches violations before capital moves" },
  { layer: "L4", label: "Immutable audit logs", note: "forensic reconstruction and accountability" },
  { layer: "L5", label: "SOC 2 compliance framework", note: "institutional-grade operational controls" },
];

const USE_CASES = [
  { tag: "DAO Treasury Management", body: "Demonstrate responsible capital management with verifiable decision logs that hold up under community scrutiny." },
  { tag: "Quant Fund Operations", body: "Institutional-grade safety layer for automated strategies at scale with forensic replay capability." },
  { tag: "MEV Searchers", body: "Execution safety without slowing time-to-block, with structural guardrails when custom code isn't enough." },
  { tag: "DeFi Protocol Teams", body: "Deploy on-chain agents for liquidity management or governance automation without reputational risk." },
];

export default function Helios() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* ── HERO ── */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-28 container-content relative">
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-surface-border" />
        <div className="absolute left-6 md:left-8 top-32 md:top-44 w-px h-16 bg-accent/40" />

        <div className="pl-8 md:pl-12">
          {/* Junction node */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-3 h-3 border border-accent bg-accent/10 -ml-[calc(2rem+6px)] md:-ml-[calc(3rem+6px)]" />
            <span className="font-mono text-[9px] text-accent/60 tracking-splice-ultra uppercase">
              module::platform
            </span>
            <span className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
          </div>

          <h1 className="font-display text-3xl md:text-5xl lg:text-[3.75rem] font-bold tracking-splice-tight text-foreground leading-[1.05] mb-6 max-w-[900px]">
            HELIOS — Secure Multi-Agent<br />Orchestration for DeFi
          </h1>

          <p className="text-accent font-display text-lg md:text-xl font-semibold tracking-splice-tight mb-4 max-w-[640px]">
            Zero-trust architecture for autonomous financial agents. Constrained reasoning replaces probabilistic hope.
          </p>

          <div className="text-sm text-foreground/50 leading-relaxed max-w-[600px] space-y-4 mb-10">
            <p>
              HELIOS is the secure orchestration layer for multi-agent DeFi systems—built on the assumption that models are already compromised.
            </p>
            <p>
              As autonomous agents take on responsibility for real capital in DeFi—from MEV searchers to DAO treasury management—HELIOS provides the security infrastructure that constrains agent behavior structurally, not through prompts.
            </p>
            <p className="text-foreground/70 font-medium">
              We don't trust AI reasoning. We enforce constraints that AI reasoning cannot escape.
            </p>
            <p>
              Built for quant funds, MEV searchers, DAO treasury operators, and DeFi protocol teams running machine-driven capital strategies who need provable safety.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <TerminalButton href="#contact" data-event="cta_helios_demo">
              Request HELIOS Demo
            </TerminalButton>
            <TerminalButton variant="ghost" href="#" data-event="cta_helios_docs">
              View Technical Documentation
            </TerminalButton>
            <TerminalButton variant="ghost" href="#use-cases">
              Explore Use Cases
            </TerminalButton>
          </div>
        </div>
      </section>

      {/* ── SECURITY PRIMITIVES ── */}
      <section className="border-t border-surface-border">
        <div className="container-content py-20 md:py-28">
          <div className="font-mono text-[10px] text-muted-foreground tracking-splice-ultra uppercase mb-3">
            Core Capabilities
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground mb-4">
            Security Primitives — Zero-Trust by Design
          </h2>
          <p className="text-sm text-foreground/50 max-w-[520px] mb-12">
            HELIOS assumes models are already compromised. Every primitive is a structural guarantee, not a behavioral expectation.
          </p>

          <div className="grid md:grid-cols-2 gap-px bg-surface-border">
            {PRIMITIVES.map((p) => (
              <div key={p.number} className="bg-background p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[10px] text-accent tracking-splice-ultra">{p.number}</span>
                  <span className="h-px flex-1 bg-surface-border" />
                </div>
                <h3 className="font-display text-base md:text-lg font-semibold tracking-splice-tight text-foreground mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LAYERED DEFENSE STACK ── */}
      <section className="border-t border-surface-border">
        <div className="container-content py-20 md:py-28">
          <div className="font-mono text-[10px] text-muted-foreground tracking-splice-ultra uppercase mb-3">
            Defense Model
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground mb-4">
            Layered Defense Stack
          </h2>
          <p className="text-sm text-foreground/50 max-w-[520px] mb-12">
            We don't rely on any single layer. Defense in depth is the only defensible strategy.
          </p>

          <div className="space-y-px">
            {LAYERS.map((l, i) => (
              <div
                key={l.layer}
                className="flex items-start gap-4 md:gap-6 bg-surface p-5 md:p-6 border-l-2 border-accent/30 hover:border-accent transition-colors"
                style={{ marginLeft: `${i * 12}px` }}
              >
                <span className="font-mono text-[11px] text-accent tracking-splice-wide shrink-0 mt-0.5">
                  {l.layer}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">{l.label}</p>
                  <p className="text-xs text-foreground/40">{l.note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Positioning statement */}
          <div className="mt-16 border-l-2 border-accent pl-6">
            <p className="font-display text-lg md:text-xl font-semibold tracking-splice-tight text-foreground/80">
              "Constrained reasoning for autonomous capital. Zero trust. Verified execution."
            </p>
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section id="use-cases" className="border-t border-surface-border">
        <div className="container-content py-20 md:py-28">
          <div className="font-mono text-[10px] text-muted-foreground tracking-splice-ultra uppercase mb-3">
            Applications
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground mb-12">
            Use Cases
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {USE_CASES.map((uc) => (
              <div key={uc.tag} className="border border-surface-border p-6 md:p-8 card-lift">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-accent">→</span>
                  <h3 className="font-display text-base font-semibold tracking-splice-tight text-foreground">
                    {uc.tag}
                  </h3>
                </div>
                <p className="text-sm text-foreground/50 leading-relaxed">{uc.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="border-t border-surface-border">
        <div className="container-content py-20 md:py-28 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground mb-4">
            Ready to constrain your agents?
          </h2>
          <p className="text-sm text-foreground/50 mb-10 max-w-[440px] mx-auto">
            Talk to our team about deploying HELIOS for your autonomous capital infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TerminalButton
              href="mailto:hello@splicelabs.io"
              data-event="cta_helios_demo"
            >
              Request HELIOS Demo
            </TerminalButton>
            <TerminalButton variant="ghost" href="#">
              View Technical Documentation
            </TerminalButton>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
