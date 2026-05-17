import { SwarmSlot } from "./swarm/SwarmSlot";
import { ModuleLabel } from "../ui/ModuleLabel";
import { TerminalButton } from "../ui/TerminalButton";

// Hero copy. The swarm canvas is mounted at VersionE root (single fixed
// canvas spanning all sections); HeroSection no longer wraps in SwarmHero.
// id="hero" is required for the IntersectionObserver / hero-progress driver.
export function HeroSection() {
  return (
    <section
      id="hero"
      className="pt-32 pb-20 md:pt-44 md:pb-28 container-wide relative min-h-screen"
    >
      {/* Hero swarm slot: centered, full-width — swarm fills viewport. */}
      <SwarmSlot id="hero" className="absolute inset-0" />
      {/* Vertical splice line — left gutter */}
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-surface-border" />
      <div className="absolute left-6 md:left-8 top-32 md:top-44 w-px h-16 bg-accent/40" />

      <div className="pl-8 md:pl-12">
        {/* Junction node */}
        <div className="flex items-center gap-4 mb-10 motion-safe:animate-fade-up">
          <div className="w-3 h-3 border border-accent bg-accent/10 -ml-[calc(2rem+6px)] md:-ml-[calc(3rem+6px)]" />
          <ModuleLabel
            prefix="splice_labs"
            name="init"
            dot={false}
            className="flex-1"
          />
        </div>

        <h1 className="font-display text-4xl md:text-6xl lg:text-[4.5rem] font-bold tracking-splice-tight leading-[1.02] mb-8 max-w-[900px]">
          <span
            className="block text-foreground mb-2 motion-safe:animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            Protocol and<br />Systems Design.
          </span>
          <span
            className="block text-accent motion-safe:animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            <span className="relative inline-block">
              Prototype the Future.
              <span
                aria-hidden
                style={{ animationDelay: "640ms" }}
                className="absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-accent motion-safe:scale-x-0 motion-safe:animate-draw"
              />
            </span>
          </span>
        </h1>

        <div
          className="flex items-start gap-6 md:gap-10 mb-10 motion-safe:animate-fade-up"
          style={{ animationDelay: "240ms" }}
        >
          <div className="w-px h-20 bg-accent/30 shrink-0 mt-1" />
          <div>
            <p className="text-accent font-display text-xl md:text-2xl font-semibold tracking-splice-tight mb-3">
              Agent-Native by Design.
            </p>
            <p className="text-sm text-foreground/50 leading-relaxed max-w-[560px]">
              Splice Labs is a protocol and systems design foundry operating at the intersection of AI and decentralized finance.
            </p>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row gap-3 motion-safe:animate-fade-up"
          style={{ animationDelay: "320ms" }}
        >
          <TerminalButton href="#contact" data-event="cta_request_demo">
            Request a private demo
          </TerminalButton>
          <TerminalButton variant="ghost" href="#" data-event="cta_get_updates">
            Get updates
          </TerminalButton>
        </div>

        {/* System boundary line */}
        <div
          className="flex items-center gap-3 mt-16 motion-safe:animate-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          <span className="w-8 h-px bg-accent/30" />
          <span className="font-mono text-micro text-muted-foreground/60 tracking-splice-ultra uppercase">
            Prototypes first · Cross-chain by default · Security built in
          </span>
          <span className="flex-1 h-px bg-surface-border" />
        </div>
      </div>
    </section>
  );
}
