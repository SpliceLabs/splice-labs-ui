"use client";

import { SwarmSlot } from "./swarm/SwarmSlot";
import { ModuleLabel } from "../ui/ModuleLabel";
import { TerminalButton } from "../ui/TerminalButton";
import { GlossaryTerm } from "../ui/GlossaryTerm";
import { JunctionNode } from "./JunctionNode";

// Hero copy. The swarm canvas is mounted at VersionE root (single fixed
// canvas spanning all sections); HeroSection no longer wraps in SwarmHero.
// id="hero" is required for the IntersectionObserver / hero-progress driver.
export function HeroSection() {
  return (
    <section
      id="hero"
      className="pt-32 pb-16 md:pt-40 md:pb-20 px-20 max-w-[1700px] mx-auto relative"
    >
      {/* Hero swarm slot: centered, full-width — swarm fills viewport. */}
      <SwarmSlot id="hero" className="absolute inset-0" />
      {/* Vertical splice line — left gutter */}
      <div className="absolute left-20 top-0 bottom-0 w-px bg-foreground/10" />
      <div className="absolute left-20 top-32 md:top-40 w-px h-16 bg-ember/30" />

      <div className="pl-8 md:pl-12">
        {/* Junction node */}
        <div className="flex items-center gap-4 mb-6 motion-safe:animate-fade-up">
          <JunctionNode sectionId="hero" align="left" large />
          <ModuleLabel
            prefix="splice_labs"
            name="init"
            sectionId="hero"
            dot={false}
            className="flex-1"
          />
        </div>

        <h1
          className="font-display text-4xl md:text-6xl lg:text-[4.5rem] font-bold tracking-splice-tight text-foreground leading-[1.02] mb-2 max-w-[900px] motion-safe:animate-fade-up"
          style={{ animationDelay: "80ms" }}
        >
          An AI-Native<br />Venture Studio.
        </h1>
        <h1
          className="font-display text-4xl md:text-6xl lg:text-[4.5rem] font-bold tracking-splice-tight text-accent leading-[1.02] mb-8 max-w-[900px] motion-safe:animate-fade-up"
          style={{ animationDelay: "160ms" }}
        >
          <span className="relative inline-block">
            Governed Autonomous Capital.
            <span
              aria-hidden
              style={{ animationDelay: "640ms" }}
              className="absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-accent motion-safe:scale-x-0 motion-safe:animate-draw"
            />
          </span>
        </h1>

        <div
          className="flex items-start gap-6 md:gap-10 mb-6 motion-safe:animate-fade-up"
          style={{ animationDelay: "240ms" }}
        >
          <div className="w-px h-20 bg-foreground/15 shrink-0 mt-1" />
          <div>
            <p className="text-accent font-display text-xl md:text-2xl font-semibold tracking-splice-tight mb-3">
              Where AI Meets Programmable Capital.
            </p>
            <p className="text-sm text-foreground/50 leading-relaxed max-w-[560px]">
              We form, fund, and build <GlossaryTerm term="agentic finance">agentic finance</GlossaryTerm> companies—providing research, architecture, and GTM infrastructure through our venture production OS.
            </p>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row gap-3 motion-safe:animate-fade-up"
          style={{ animationDelay: "320ms" }}
        >
          <TerminalButton href="#contact" data-event="cta_build_with_splice">
            Build with Splice
          </TerminalButton>
          <TerminalButton variant="ghost" href="/thesis" data-event="cta_read_thesis">
            Read the Thesis
          </TerminalButton>
        </div>

        {/* System boundary line */}
        <div
          className="flex items-center gap-3 mt-16 motion-safe:animate-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          <span className="w-8 h-px bg-foreground/15" />
          <span className="font-mono text-[8px] text-muted-foreground/60 tracking-splice-ultra uppercase">
            Evidence before scale · Governed by design · Founder-first economics
          </span>
          <span className="flex-1 h-px bg-foreground/10" />
        </div>
      </div>
    </section>
  );
}
