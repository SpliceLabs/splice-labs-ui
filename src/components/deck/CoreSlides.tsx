import { Slide, Placeholder } from "./SlideComponents";

interface SlideProps {
  slideNumber: number;
  totalSlides: number;
}

/* ─── Slide 1 — Title ─── */
export function TitleSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="title" module="deck::title" accent slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col gap-10 min-h-[60vh] justify-center">
        {/* <Placeholder label="Splice Labs Logo" className="w-24 h-24" /> */}
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
          <p className="font-display text-lg md:text-xl text-muted-foreground">Infrastructure for serious DeFi.</p>
        </div>
        <div className="flex items-start gap-6">
          <div className="w-px h-16 bg-accent/30 shrink-0 mt-1" />
          <p className="text-sm text-muted-foreground/80 max-w-[480px]">
            Design and build institutional-grade DeFi protocols, stablecoins, token systems, and onchain agent
            architectures.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-auto">
          <span className="w-8 h-px bg-accent/30" />
          <span className="font-mono text-label text-muted-foreground/40 tracking-splice-wide">
            [INSERT date] · Seed Round · Confidential
          </span>
        </div>
      </div>
    </Slide>
  );
}

/* ─── Slide 2 — Problem ─── */
export function ProblemSlide({ slideNumber, totalSlides }: SlideProps) {
  const problems = [
    {
      title: "Retail-grade protocols",
      desc: "Built fast, break under institutional scrutiny. No compliance posture, no audit depth, no cross-chain coherence.",
    },
    {
      title: "TradFi bolt-ons",
      desc: "Legacy finance wrapping old systems in tokens. No protocol-native thinking, no agent compatibility, no composability.",
    },
    {
      title: "No one builds the hard middle",
      desc: "Institutional-grade, protocol-native, agent-ready infrastructure that works across chains.",
    },
  ];

  return (
    <Slide id="problem" module="deck::problem" slideNumber={slideNumber} totalSlides={totalSlides}>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
        DeFi infrastructure is stuck between two failures.
      </h2>
      <p className="text-sm text-muted-foreground/60 mb-12 max-w-[600px]">
        The result: serious capital sits on the sideline. Institutions want in, but the infrastructure doesn't exist.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          {problems.map((p, i) => (
            <div key={i} className="border-l-2 border-accent/20 pl-6 py-2">
              <h3 className="font-display text-sm font-semibold text-foreground mb-1">{p.title}</h3>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
        <Placeholder
          label="2×2 Matrix: Retail vs Institutional × Legacy vs Protocol-Native"
          className="min-h-[280px]"
        />
      </div>
    </Slide>
  );
}

/* ─── Slide 3 — Solution ─── */
export function SolutionSlide({ slideNumber, totalSlides }: SlideProps) {
  const pillars = [
    {
      title: "Protocol design & engineering",
      desc: "DeFi protocols, stablecoins, and token systems built to institutional standard.",
    },
    {
      title: "HELIOS AgenticOS",
      desc: "AI-driven onchain agents that execute transactions, manage risk, and operate autonomously across chains.",
    },
    {
      title: "Cross-chain competence",
      desc: "Architecture-first approach to multi-chain deployment. Not bridges — native protocol design.",
    },
  ];

  return (
    <Slide id="solution" module="deck::solution" accent slideNumber={slideNumber} totalSlides={totalSlides}>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        Splice Labs builds the infrastructure layer.
      </h2>
      <p className="text-sm text-accent/60 mb-12">We are a protocol studio, not a fund. We build.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p, i) => (
          <div key={i} className="border border-surface-border p-6">
            <div className="w-8 h-8 border border-accent/20 mb-4 flex items-center justify-center">
              <span className="w-2 h-2 bg-accent/40" />
            </div>
            <h3 className="font-display text-sm font-semibold text-foreground mb-3">{p.title}</h3>
            <p className="text-xs text-muted-foreground/70 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

/* ─── Slide 4 — Product / How It Works ─── */
export function ProductSlide({ slideNumber, totalSlides }: SlideProps) {
  const steps = [
    { label: "Design", desc: "Tokenomics, mechanism design, compliance mapping." },
    { label: "Build", desc: "Smart contracts, agent logic, cross-chain infra." },
    { label: "Deploy", desc: "Multi-chain launch, audit coordination, monitoring." },
    { label: "Operate", desc: "HELIOS agents manage ongoing execution, rebalancing, risk." },
  ];

  return (
    <Slide id="product" module="deck::product" slideNumber={slideNumber} totalSlides={totalSlides}>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-12">How we deliver.</h2>
      <Placeholder
        label="Pipeline diagram: Client Brief → Protocol Design → HELIOS Integration → Deployment → Ongoing Ops"
        className="w-full h-[120px] mb-8"
      />
      <div className="flex flex-wrap gap-4">
        {steps.map((s, i) => (
          <div key={i} className="flex items-start gap-3 flex-1 min-w-[200px] border border-surface-border p-4">
            <span className="font-mono text-label-sm text-accent/60 tracking-splice-wide mt-0.5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-sm font-semibold text-foreground mb-1">{s.label}</h3>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

/* ─── Slide 5 — How It Works (Mechanism) ─── */
export function HowItWorksSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="how" module="deck::traction" accent slideNumber={slideNumber} totalSlides={totalSlides}>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
        What we've built and what's in motion.
      </h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-border">
              <th className="text-left font-mono text-label-sm text-accent/60 tracking-splice-wide uppercase py-3 pr-6">
                Project
              </th>
              <th className="text-left font-mono text-label-sm text-accent/60 tracking-splice-wide uppercase py-3 pr-6">
                Status
              </th>
              <th className="text-left font-mono text-label-sm text-accent/60 tracking-splice-wide uppercase py-3">
                Signal
              </th>
            </tr>
          </thead>
          <tbody className="text-xs text-muted-foreground/80">
            {[
              { name: "Crown Futures", status: "[INSERT status]", signal: "[INSERT metric: TVL, users, volume]" },
              { name: "Silent Markets", status: "[INSERT status]", signal: "[INSERT metric]" },
              { name: "Agave", status: "[INSERT status]", signal: "[INSERT metric]" },
              { name: "Poolhouse", status: "[INSERT status]", signal: "[INSERT metric]" },
            ].map((r) => (
              <tr key={r.name} className="border-b border-surface-border/50">
                <td className="py-3 pr-6 font-display font-medium text-foreground">{r.name}</td>
                <td className="py-3 pr-6">{r.status}</td>
                <td className="py-3">{r.signal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-2 text-xs text-muted-foreground/70">
        <p>• [INSERT #] protocol deployments across [INSERT #] chains.</p>
        <p>• [INSERT pipeline]: [INSERT #] institutional partners in diligence / LOI stage.</p>
        <p>• HELIOS: [INSERT agent count / tx processed / uptime metric].</p>
      </div>
    </Slide>
  );
}

/* ─── Slide 6 — Why We're Special / Insight ─── */
export function MarketSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="market" module="deck::insight" slideNumber={slideNumber} totalSlides={totalSlides}>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10">
        Our insight: DeFi needs protocol studios, not more tokens.
      </h2>
      <div className="space-y-6 max-w-[700px]">
        {[
          "The market is flooded with token launches. What's missing is the engineering underneath.",
          "The next wave of DeFi adoption is institutional — and institutions buy infrastructure, not speculation.",
          "HELIOS gives us compounding leverage: every protocol we build makes the agent layer smarter and more capable.",
          "We are not competing with protocols. We build them.",
        ].map((line, i) => (
          <div key={i} className="flex items-start gap-4">
            <span className="w-1.5 h-1.5 bg-accent/50 mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground/80 leading-relaxed">{line}</p>
          </div>
        ))}
      </div>
      <Placeholder
        label="Flywheel: Build Protocol → Train Agents → Deploy → Learn → Build Better"
        className="mt-10 w-full max-w-[500px] h-[200px]"
      />
    </Slide>
  );
}

/* ─── Slide 7 — Business Model ─── */
export function TractionSlide({ slideNumber, totalSlides }: SlideProps) {
  const streams = [
    {
      title: "Protocol engineering fees",
      desc: "Design + build engagements. [INSERT typical range or deal structure].",
      horizon: "Near-term",
    },
    {
      title: "HELIOS licensing",
      desc: "Recurring revenue from agent deployment and operation. [INSERT pricing model].",
      horizon: "Recurring",
    },
    {
      title: "Token / equity positions",
      desc: "Strategic stakes in protocols we build. [INSERT structure: token warrants, equity, rev share].",
      horizon: "Long-term",
    },
  ];

  return (
    <Slide id="traction" module="deck::business-model" slideNumber={slideNumber} totalSlides={totalSlides}>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-12">How we make money.</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {streams.map((s, i) => (
          <div key={i} className="border border-surface-border p-6">
            <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase block mb-3">
              {s.horizon}
            </span>
            <h3 className="font-display text-sm font-semibold text-foreground mb-2">{s.title}</h3>
            <p className="text-xs text-muted-foreground/70 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground/50 italic">
        Revenue diversification: project fees (near-term) + licensing (recurring) + portfolio upside (long-term).
      </p>
    </Slide>
  );
}

/* ─── Slide 8 — Market / Growth ─── */
export function TeamSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="team" module="deck::market" slideNumber={slideNumber} totalSlides={totalSlides}>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-12">
        The market for DeFi infrastructure is massive and underserved.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-10">
        <div className="flex items-center justify-center min-h-[300px] relative">
          {[
            { size: 200, label: "TAM" },
            { size: 140, label: "SAM" },
            { size: 80, label: "SOM" },
          ].map((c, i) => (
            <div
              key={i}
              className="absolute border border-accent/20 flex items-end justify-center pb-3"
              style={{ width: c.size, height: c.size }}
            >
              <span className="font-mono text-label-xs text-accent/40 tracking-splice-wide">{c.label}</span>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {[
            {
              label: "TAM",
              desc: "Total addressable market for DeFi protocol development, infrastructure, and agent systems.",
            },
            { label: "SAM", desc: "Institutional DeFi infrastructure (protocols, stablecoins, agent systems)." },
            { label: "SOM", desc: "Serviceable market in [INSERT timeframe]." },
          ].map((m) => (
            <div key={m.label} className="border border-surface-border p-4">
              <span className="font-mono text-label-sm text-accent/60 tracking-splice-wide uppercase block mb-2">
                {m.label}
              </span>
              <p className="text-xs text-muted-foreground/70 mb-2">{m.desc}</p>
              <div className="h-6 w-20 bg-foreground/8" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 space-y-2 text-xs text-muted-foreground/60">
        <p>• Institutional adoption of DeFi accelerating — [INSERT data point].</p>
        <p>• Cross-chain complexity increasing demand for specialized builders.</p>
        <p>• AI agent market creating new category (onchain agents).</p>
      </div>
    </Slide>
  );
}

/* ─── Slide 9 — Team ─── */
export function TeamFoundersSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="team-founders" module="deck::team" slideNumber={slideNumber} totalSlides={totalSlides}>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-12">Founders.</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`border border-surface-border p-6 ${i === 2 ? "md:translate-y-6" : ""}`}>
            <div className="w-14 h-14 border border-accent/20 flex items-center justify-center mb-4">
              <div className="w-4 h-4 bg-accent/10" />
            </div>
            <h3 className="font-display text-sm font-semibold text-foreground mb-1">[INSERT Founder {i} Name]</h3>
            <span className="font-mono text-label-sm text-accent/50 tracking-splice-wide block mb-4">[INSERT title]</span>
            <p className="text-xs text-muted-foreground/70 leading-relaxed">
              [INSERT 1-line credential: what they built before, domain expertise]
            </p>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground/50 mt-8 max-w-[600px]">
        Why this team: [INSERT 1–2 sentences on why these specific people are uniquely positioned to build this].
      </p>
    </Slide>
  );
}

/* ─── Slide 10 — The Ask ─── */
export function AskSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="ask" module="deck::ask" accent slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col gap-10 min-h-[50vh] justify-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Raising [INSERT $] seed.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[700px]">
          {[
            { label: "Round", value: "Seed" },
            { label: "Amount", value: "[INSERT $]" },
            { label: "Instrument", value: "[INSERT: SAFE, priced round, token warrant, etc.]" },
            { label: "Use of funds", value: "[INSERT: X% engineering, X% HELIOS R&D, X% BD, X% ops]" },
            { label: "Runway", value: "[INSERT X months]" },
            { label: "Key milestones", value: "[INSERT 3 milestones]" },
          ].map((item) => (
            <div key={item.label} className="border-l-2 border-accent/20 pl-6 py-2">
              <span className="font-mono text-label-sm text-accent/60 tracking-splice-wide uppercase block mb-2">
                {item.label}
              </span>
              <p className="text-sm text-foreground/80">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-4">
          <div className="h-10 px-6 bg-accent/20 border border-accent/30 flex items-center">
            <span className="font-mono text-label text-accent tracking-splice-wide uppercase">[INSERT email]</span>
          </div>
          <div className="h-10 px-6 border border-surface-border flex items-center">
            <span className="font-mono text-label text-muted-foreground/50 tracking-splice-wide uppercase">
              [INSERT scheduling link]
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-auto">
          <span className="w-8 h-px bg-accent/30" />
          <span className="font-mono text-label text-muted-foreground/30">Confidential · Splice Labs</span>
          <span className="flex-1 h-px bg-surface-border" />
        </div>
      </div>
    </Slide>
  );
}
