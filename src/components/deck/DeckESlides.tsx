import { Slide } from "./SlideComponents";

interface SlideProps {
  slideNumber: number;
  totalSlides: number;
}

const TOTAL = 10;

/* ─── Slide 1 — Cover ─── */
export function E_CoverSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="e-cover" module="deck-e::cover" accent slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col gap-10 min-h-[60vh] justify-center">
        <a href="#" className="flex items-center gap-1 font-mono text-sm text-foreground">
          <span className="text-foreground/30">›</span>
          <span>splice</span>
          <span className="text-accent font-bold">_</span>
          <span className="inline-block w-2 h-4 bg-accent ml-0.5 animate-blink-cursor" />
        </a>
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            SPLICE LABS
          </h1>
          <p className="font-display text-lg md:text-xl text-muted-foreground">
            Agentic Trading Research
          </p>
        </div>
        <div className="flex items-start gap-6">
          <div className="w-px h-16 bg-accent/30 shrink-0 mt-1" />
          <p className="text-sm text-muted-foreground/80 max-w-[480px]">
            Parallelized agent orchestration for quantitative strategy discovery.
            Infrastructure-layer advantage for the agentic trading era.
          </p>
        </div>
      </div>
    </Slide>
  );
}

/* ─── Slide 2 — The Moment ─── */
export function E_MomentSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="e-moment" module="deck-e::the-moment" slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col gap-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          The Moment
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Agentic systems will dominate on-chain trading volume by 2027–2029. The firms
              with proven strategies built <span className="text-accent font-semibold">now</span> win.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This is infrastructure-layer timing.
            </p>
          </div>
          <div className="border border-surface-border p-6 space-y-4">
            <span className="font-mono text-eyebrow text-accent/60 tracking-splice-ultra uppercase">
              Market Signal
            </span>
            <div className="space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold text-accent">2027</span>
                <span className="text-sm text-muted-foreground">Earliest dominance window</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold text-foreground">2029</span>
                <span className="text-sm text-muted-foreground">Full market transition</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ─── Slide 3 — The Gap ─── */
export function E_GapSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="e-gap" module="deck-e::the-gap" slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col gap-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          The Gap
        </h2>
        <p className="text-lg text-muted-foreground max-w-[640px] leading-relaxed">
          Building repeatable agentic trading strategies requires parallelized, iterative
          research at scale.
        </p>
        <div className="border-l-2 border-accent pl-6 py-2">
          <p className="text-foreground font-display text-xl font-semibold">
            Nobody has the right research infrastructure for this yet.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {["Sequential research", "Manual backtesting", "Single-agent systems"].map((gap) => (
            <div key={gap} className="border border-surface-border p-4 text-center">
              <span className="text-rust font-mono text-label tracking-splice-wide uppercase">
                Current State
              </span>
              <p className="text-sm text-muted-foreground mt-2">{gap}</p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ─── Slide 4 — Unfair Advantage ─── */
export function E_AdvantagSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="e-advantage" module="deck-e::unfair-advantage" accent slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col gap-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          The Unfair Advantage
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-5xl font-bold text-amber">~$500K</span>
              <span className="text-sm text-muted-foreground">in GPU compute</span>
            </div>
            <ul className="space-y-3">
              {[
                "Already exists.",
                "Already depreciating.",
                "Needs to be activated.",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-accent mt-2 shrink-0" />
                  <span className="text-muted-foreground">{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-surface-border p-6 flex flex-col items-center justify-center gap-4">
            <span className="font-mono text-eyebrow text-accent/60 tracking-splice-ultra uppercase">
              Compute Infrastructure
            </span>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 ${i < 12 ? "bg-accent/20 border border-accent/40" : "bg-surface-border/30 border border-surface-border"}`}
                />
              ))}
            </div>
            <span className="text-label text-muted-foreground/40 font-mono">GPU cluster · active capacity</span>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ─── Slide 5 — What We Built ─── */
export function E_ProductSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="e-product" module="deck-e::what-we-built" slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col gap-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          What Splice Labs Built
        </h2>
        <p className="text-muted-foreground max-w-[560px]">
          Parallelized agent orchestration framework — already in development.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Parallel Deployment", desc: "Deploys hundreds of strategy agents simultaneously" },
            { title: "Competitive Selection", desc: "Agents compete on performance metrics in real-time" },
            { title: "Auto-Surface", desc: "Best strategies surface automatically through selection pressure" },
            { title: "Not Starting From Zero", desc: "Framework already in active development" },
          ].map((item) => (
            <div key={item.title} className="border border-surface-border p-5 space-y-2">
              <h3 className="font-display text-sm font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ─── Slide 6 — The Operation ─── */
export function E_OperationSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="e-operation" module="deck-e::the-operation" slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col gap-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          The Operation
        </h2>
        <div className="flex flex-col md:flex-row items-stretch gap-0">
          {[
            { step: "01", label: "Deploy", desc: "Agents run" },
            { step: "02", label: "Compete", desc: "Strategies compete" },
            { step: "03", label: "Validate", desc: "Winners get validated" },
            { step: "04", label: "Deliver", desc: "Family offices get access to what works" },
          ].map((s, i) => (
            <div
              key={s.step}
              className={`flex-1 p-6 border border-surface-border ${
                i === 3 ? "bg-accent/5" : ""
              }`}
            >
              <span className="font-mono text-label text-accent/60 tracking-splice-ultra uppercase">
                {s.step}
              </span>
              <h3 className="font-display text-lg font-bold text-foreground mt-3">{s.label}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ─── Slide 7 — Team ─── */
export function E_TeamSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="e-team" module="deck-e::team" slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col gap-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          The Team
        </h2>
        <div className="border border-surface-border p-8 space-y-4 max-w-[560px]">
          <p className="text-muted-foreground italic leading-relaxed">
            [Who you are, what you've shipped, why this specifically.]
          </p>
          <span className="font-mono text-eyebrow text-accent/40 tracking-splice-ultra uppercase block">
            3 lines max · resolve before send
          </span>
        </div>
      </div>
    </Slide>
  );
}

/* ─── Slide 8 — The Ask ─── */
export function E_AskSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="e-ask" module="deck-e::the-ask" accent slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col gap-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          The Ask
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-accent/30 p-6 space-y-2">
            <span className="font-mono text-eyebrow text-accent/60 tracking-splice-ultra uppercase">
              Capital
            </span>
            <p className="font-display text-2xl font-bold text-accent">$[X]</p>
          </div>
          <div className="border border-surface-border p-6 space-y-2">
            <span className="font-mono text-eyebrow text-accent/60 tracking-splice-ultra uppercase">
              Allocation
            </span>
            <p className="text-sm text-muted-foreground">Rigs + research ops + team</p>
          </div>
          <div className="border border-surface-border p-6 space-y-2">
            <span className="font-mono text-eyebrow text-accent/60 tracking-splice-ultra uppercase">
              Timeline
            </span>
            <p className="text-sm text-muted-foreground">[X] months to first validated outputs</p>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ─── Slide 9 — What You Get ─── */
export function E_ReturnsSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="e-returns" module="deck-e::what-you-get" slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col gap-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          What You Get
        </h2>
        <div className="border border-surface-border p-8 space-y-6 max-w-[560px]">
          <p className="text-muted-foreground italic leading-relaxed">
            [Equity / strategy access / revenue share — resolve this before deck goes out]
          </p>
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-rust/40" />
            <span className="font-mono text-eyebrow text-rust/60 tracking-splice-ultra uppercase">
              Terms TBD
            </span>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ─── Slide 10 — Why Now ─── */
export function E_WhyNowSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="e-why-now" module="deck-e::why-now" accent slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col gap-8 min-h-[50vh] justify-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Why Now
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Hardware exists.",
            "Window is open.",
            "Foundation is built.",
            "Partners are aligned.",
          ].map((line) => (
            <div key={line} className="border border-accent/20 p-5 flex items-center justify-center text-center">
              <p className="font-display text-sm font-semibold text-foreground">{line}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6 mt-8">
          <div className="w-px h-10 bg-accent/30" />
          <p className="text-sm text-muted-foreground/60 font-mono tracking-splice-wide">
            splice_labs · agentic trading research
          </p>
        </div>
      </div>
    </Slide>
  );
}

export const TOTAL_SLIDES_E = TOTAL;
