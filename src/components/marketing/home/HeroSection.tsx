import { SwarmSlot } from "./swarm/SwarmSlot";

// Hero copy. The swarm canvas is mounted at VersionE root (single fixed
// canvas spanning all sections); HeroSection no longer wraps in SwarmHero.
// id="hero" is required for the IntersectionObserver / hero-progress driver.
export function HeroSection() {
  return (
    <section
      id="hero"
      className="pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-8 max-w-[1700px] mx-auto relative min-h-screen"
    >
      {/* Hero swarm slot: centered, full-width — swarm fills viewport. */}
      <SwarmSlot id="hero" className="absolute inset-0" />
      {/* Vertical splice line — left gutter */}
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-surface-border" />
      <div className="absolute left-6 md:left-8 top-32 md:top-44 w-px h-16 bg-accent/40" />

      <div className="pl-8 md:pl-12">
        {/* Junction node */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-3 h-3 border border-accent bg-accent/10 -ml-[calc(2rem+6px)] md:-ml-[calc(3rem+6px)]" />
          <span className="font-mono text-[9px] text-accent tracking-splice-ultra uppercase">
            splice_labs::init
          </span>
          <span className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
        </div>

        <h1 className="font-display text-4xl md:text-6xl lg:text-[4.5rem] font-bold tracking-splice-tight text-foreground leading-[1.02] mb-2 max-w-[900px]">
          Protocol and<br />Systems Design.
        </h1>
        <h1 className="font-display text-4xl md:text-6xl lg:text-[4.5rem] font-bold tracking-splice-tight text-accent leading-[1.02] mb-8 max-w-[900px]">
          Prototype the Future.
        </h1>

        <div className="flex items-start gap-6 md:gap-10 mb-10">
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

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="#contact"
            className="inline-flex items-center justify-center font-mono text-xs tracking-splice-wide uppercase bg-accent text-accent-foreground px-6 py-3 hover:bg-accent/90 transition-colors"
          >
            Request a private demo
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center font-mono text-xs tracking-splice-wide uppercase border border-surface-border text-muted-foreground px-6 py-3 hover:text-foreground hover:border-foreground/20 transition-colors"
          >
            Get updates
          </a>
        </div>

        {/* System boundary line */}
        <div className="flex items-center gap-3 mt-16">
          <span className="w-8 h-px bg-accent/30" />
          <span className="font-mono text-[8px] text-muted-foreground/60 tracking-splice-ultra uppercase">
            Prototypes first · Cross-chain by default · Security built in
          </span>
          <span className="flex-1 h-px bg-surface-border" />
        </div>
      </div>
    </section>
  );
}
