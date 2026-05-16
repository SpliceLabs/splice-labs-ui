/**
 * Deck C — Partnership Deck
 * 8-slide partnership narrative, independent from other decks.
 */
import { Slide, Placeholder } from "./SlideComponents";
import splicePlatformDiagram from "@/assets/diagrams/splice-platform-diagram.png";
import silentMarketsLogo from "@/assets/logos/silent-markets.png";
import crownFuturesLogo from "@/assets/logos/crown-futures.png";

interface SlideProps {
  slideNumber: number;
  totalSlides: number;
}

/* ─── C1 — Title ─── */
export function C_TitleSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="c-title" module="title" accent slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col gap-10 min-h-[60vh] justify-center">
        <span className="font-mono text-[9px] text-accent/50 tracking-splice-ultra uppercase border border-accent/20 px-2 py-0.5 self-start">
          Partnership Brief
        </span>
        {/* Logo — Terminal VA */}
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
          <span className="font-mono text-[11px] text-muted-foreground/30">Confidential · Splice Labs</span>
        </div>
      </div>
    </Slide>
  );
}

/* ─── C2 — The Opportunity ─── */
export function C_OpportunitySlide({ slideNumber, totalSlides }: SlideProps) {
  const gaps = [
    {
      title: "No institutional-grade infrastructure",
      desc: "Protocols built for retail don't meet compliance, risk, or audit requirements at institutional scale.",
    },
    {
      title: "No agent-native architecture",
      desc: "Autonomous execution requires purpose-built infrastructure — not scripts on top of existing protocols.",
    },
    {
      title: "No cross-chain coherence",
      desc: "Multi-chain deployment remains fragmented. Bridge-based approaches create risk, not interoperability.",
    },
  ];

  return (
    <Slide id="c-opportunity" module="opportunity" slideNumber={slideNumber} totalSlides={totalSlides}>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
        The infrastructure gap is the partnership opportunity.
      </h2>
      <p className="text-md text-muted-foreground/60 mb-12 max-w-[600px]">
        Institutional capital is exploring DeFi. The infrastructure to serve it doesn't exist at scale.
      </p>
      <div className="space-y-6">
        {gaps.map((g, i) => (
          <div key={i} className="border-l-2 border-accent/20 pl-6 py-2">
            <h3 className="font-display text-md font-semibold text-foreground mb-1">{g.title}</h3>
            <p className="text-sm text-muted-foreground/70 leading-relaxed">{g.desc}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

/* ─── C3 — Who We Are ─── */
export function C_IdentitySlide({ slideNumber, totalSlides }: SlideProps) {
  const weAre = [
    {
      title: "HELIOS-native",
      desc: "Every protocol is agent-paired from day one. HELIOS is our agentic operating system for autonomous onchain operations.",
    },
    {
      title: "Cross-chain by design",
      desc: "Protocol and systems design across Ethereum, Solana, and Stacks. Not bridges — native multi-chain architecture.",
    },
    {
      title: "Committing to Stacks",
      desc: "Agave (Papaya spinoff) is our first Stacks protocol. More coming.",
    },
  ];

  const edge = [
    {
      title: "Speed",
      desc: "HELIOS enables rapid prototyping. Specs to working demo in days.",
    },
    {
      title: "Security",
      desc: "SOC2/ISO trajectory. Hardware-level security posture for institutional trust.",
    },
    {
      title: "Systems thinking",
      desc: "Protocol + agent architecture designed as integrated systems, not bolt-ons.",
    },
  ];

  return (
    <Slide id="c-identity" module="identity" slideNumber={slideNumber} totalSlides={totalSlides}>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        Agent-paired protocol foundry
      </h2>
      <p className="text-md text-muted-foreground/80 mb-10 max-w-[600px]">with agentic OS at our core</p>

      {/* We are */}
      <div className="mb-10">
        <span className="font-mono text-[12px] text-bold text-accent/50 tracking-splice-ultra uppercase block mb-5">
          We are
        </span>
        <div className="space-y-4">
          {weAre.map((item, i) => (
            <div key={i} className="border-l-2 border-accent/20 pl-6 py-1">
              <h3 className="font-display text-md font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Built on three pillars */}
      <span className="font-mono text-[12px] text-bold text-accent/50 tracking-splice-ultra uppercase block mb-5">
        Built on three pillars
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {edge.map((e, i) => (
          <div key={i} className="border border-surface-border p-5">
            <h3 className="font-display text-md font-semibold text-foreground mb-2">{e.title}</h3>
            <p className="text-sm text-muted-foreground/70 leading-relaxed">{e.desc}</p>
          </div>
        ))}
      </div>

      {/* Chain badges */}
      <div className="flex items-center gap-4 mt-10">
        {["Ethereum", "Solana", "Stacks"].map((chain) => (
          <span
            key={chain}
            className="font-mono text-[12px] text-bold  text-accent/60 tracking-splice-wide uppercase border border-accent/20 px-3 py-1"
          >
            {chain}
          </span>
        ))}
      </div>
    </Slide>
  );
}

/* ─── C4 — What We Bring ─── */
export function C_CapabilitiesSlide({ slideNumber, totalSlides }: SlideProps) {
  const pillars = [
    {
      title: "Protocol Engineering",
      desc: "DeFi protocols, stablecoins, and token systems designed for institutional deployment.",
    },
    {
      title: "HELIOS AgenticOS",
      desc: "Autonomous onchain agents for execution, risk management, and cross-chain operation.",
    },
    {
      title: "Cross-Chain Architecture",
      desc: "Native multi-chain protocol design. Not bridges — protocol-level interoperability.",
    },
  ];

  return (
    <Slide id="c-capabilities" module="capabilities" accent slideNumber={slideNumber} totalSlides={totalSlides}>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        Three capabilities a partner gets access to.
      </h2>
      <p className="text-sm text-accent/60 mb-12">Protocol Engineering · HELIOS AgenticOS · Cross-Chain Architecture</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p, i) => (
          <div key={i} className="border border-surface-border p-6">
            <span className="font-mono text-[9px] text-accent/50 tracking-splice-ultra uppercase block mb-4">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-sm font-semibold text-foreground mb-3">{p.title}</h3>
            <p className="text-xs text-muted-foreground/70 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

/* ─── C4 — HELIOS as Partnership Infrastructure ─── */
export function C_HeliosSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="c-helios" module="helios" slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-[9px] text-accent/50 tracking-splice-ultra uppercase border border-accent/20 px-2 py-0.5">
          Core IP
        </span>
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
        HELIOS is infrastructure you build on, not compete with.
      </h2>
      <p className="text-sm text-muted-foreground/60 mb-12 max-w-[600px]">
        Partners who integrate HELIOS gain autonomous execution without building their own agent infrastructure. Every
        deployment compounds the agent layer's intelligence.
      </p>

      {/* Architecture */}
      <div className="border border-surface-border p-6">
        <span className="font-mono text-[9px] text-accent/50 tracking-splice-ultra uppercase block mb-6">
          Architecture
        </span>
        <div className="flex flex-col gap-0">
          <div className="border border-accent/30 bg-accent/5 px-5 py-3 flex items-center justify-between">
            <span className="font-mono text-[10px] text-accent tracking-splice-wide uppercase">L1 — Orchestration</span>
            <span className="text-xs text-muted-foreground/60">AgenticOS Core</span>
          </div>
          <div className="flex justify-center">
            <div className="w-px h-4 bg-surface-border" />
          </div>
          <div className="grid grid-cols-3 gap-px">
            <div className="border border-surface-border px-4 py-3 text-center">
              <span className="font-mono text-[10px] text-foreground/70 tracking-splice-wide uppercase">
                Agent Core
              </span>
            </div>
            <div className="border border-accent/20 bg-accent/5 px-4 py-3 text-center">
              <span className="font-mono text-[10px] text-accent/80 tracking-splice-wide uppercase">Risk Engine</span>
            </div>
            <div className="border border-surface-border px-4 py-3 text-center">
              <span className="font-mono text-[10px] text-foreground/70 tracking-splice-wide uppercase">
                Compliance
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-px h-4 bg-surface-border" />
          </div>
          <div className="border border-surface-border px-5 py-3 flex items-center justify-between">
            <span className="font-mono text-[10px] text-foreground/70 tracking-splice-wide uppercase">
              L3 — Execution
            </span>
            <span className="text-xs text-muted-foreground/60">Cross-chain settlement & routing</span>
          </div>
          <div className="flex justify-center">
            <div className="w-px h-4 bg-surface-border" />
          </div>
          <div className="border border-surface-border/50 px-5 py-3 flex items-center justify-between">
            <span className="font-mono text-[10px] text-muted-foreground/50 tracking-splice-wide uppercase">
              L4 — Target Chains
            </span>
            <span className="text-xs text-muted-foreground/40">Stacks · EVM · Solana</span>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ─── C5 — Portfolio Proof ─── */
export function C_PortfolioSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="c-portfolio" module="portfolio" accent slideNumber={slideNumber} totalSlides={totalSlides}>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Built before. Building now.</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-border">
              <th className="text-left font-mono text-[10px] text-accent/60 tracking-splice-wide uppercase py-3 pr-6">
                Protocol
              </th>
              <th className="text-left font-mono text-[10px] text-accent/60 tracking-splice-wide uppercase py-3 pr-6">
                Domain
              </th>
              <th className="text-left font-mono text-[10px] text-accent/60 tracking-splice-wide uppercase py-3">
                {" "}
                What It Does
              </th>
            </tr>
          </thead>
          <tbody className="text-xs text-muted-foreground/80">
            {[
              {
                name: "Agave",
                domain: "Stablecoin AMM on Stacks",
                helios:
                  "RL agents dynamically adjust fees based on market conditions. Curve-style liquidity, autonomous operation.",
                logo: null,
              },
              {
                name: "Crown Futures",
                domain: "Derivatives",
                helios:
                  "Web3-native prop firm with automated trader evaluation and risk-enforced capital allocation for futures trading.",
                logo: crownFuturesLogo,
              },
              {
                name: "Silent Markets",
                domain: "Trading Intelligence Platform",
                helios:
                  "Autonomous AI agents that analyze behavioral patterns, identify trading edges, and compound discipline through proactive insights.",
                logo: silentMarketsLogo,
              },
              {
                name: "Poolhouse",
                domain: "Agentic Treasury & Yield Management",
                helios:
                  "Autonomous agents optimize community pool yields across protocols while enabling internal lending and transparent accounting",
                logo: null,
              },
            ].map((r) => (
              <tr key={r.name} className="border-b border-surface-border/50">
                <td className="py-3 pr-6 font-display font-medium text-foreground whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    {r.logo ? (
                      <img src={r.logo} alt={r.name} className="w-5 h-5 rounded object-contain flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded bg-accent/10 border border-surface-border/50 flex-shrink-0" />
                    )}
                    <span>{r.name}</span>
                  </div>
                </td>
                <td className="py-3 pr-6">{r.domain}</td>
                <td className="py-3">{r.helios}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Slide>
  );
}

/* ─── C6 — Partnership Models ─── */
export function C_ModelsSlide({ slideNumber, totalSlides }: SlideProps) {
  const models = [
    {
      title: "Co-build",
      desc: "Joint protocol development with shared IP ownership.",
      fit: "L1/L2 chains, foundations",
    },
    {
      title: "Integration",
      desc: "HELIOS agent deployment on partner protocols. Licensing model.",
      fit: "Existing DeFi protocols, DAOs",
    },
    {
      title: "Infrastructure",
      desc: "White-label protocol components. Design + deploy + maintain.",
      fit: "Institutions, custodians, funds",
    },
  ];

  return (
    <Slide id="c-models" module="models" slideNumber={slideNumber} totalSlides={totalSlides}>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Three partnership models.</h2>
      <p className="text-sm text-muted-foreground/60 mb-12 max-w-[600px]">
        We don't compete with our partners. We build the layer underneath.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {models.map((m, i) => (
          <div key={i} className="border border-surface-border p-6 flex flex-col">
            <span className="font-mono text-[9px] text-accent/50 tracking-splice-ultra uppercase block mb-3">
              Model {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-sm font-semibold text-foreground mb-3">{m.title}</h3>
            <p className="text-xs text-muted-foreground/70 leading-relaxed mb-4 flex-1">{m.desc}</p>
            <div className="border-t border-surface-border pt-3">
              <span className="font-mono text-[9px] text-accent/40 tracking-splice-wide uppercase">Best fit: </span>
              <span className="text-xs text-muted-foreground/60">{m.fit}</span>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

/* ─── C7 — Ecosystem Vision ─── */
export function C_VisionSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="c-vision" module="vision" accent slideNumber={slideNumber} totalSlides={totalSlides}>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10">Where we're going.</h2>
      <div className="w-full max-w-[700px] mb-10">
        <img
          src={splicePlatformDiagram}
          alt="Network diagram: Splice Platform at center connecting Partner Protocols, HELIOS Agents, and Cross-Chain Ecosystem"
          className="w-full h-auto rounded border border-surface-border"
        />
      </div>
      <div className="space-y-6 max-w-[700px]">
        {[
          "A network of institutional-grade protocols sharing a common agent layer.",
          "Cross-chain by design. Protocol-native composability. Autonomous operation.",
          "Partners contribute to and benefit from the shared intelligence of the agent network.",
        ].map((line, i) => (
          <div key={i} className="flex items-start gap-4">
            <span className="w-1.5 h-1.5 bg-accent/50 mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground/80 leading-relaxed">{line}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 border-t border-surface-border pt-6 max-w-[700px]">
        <p className="text-sm text-foreground font-display font-semibold">
          Our mission: Make DeFi infrastructure worthy of institutional trust.
        </p>
      </div>
    </Slide>
  );
}

/* ─── C8 — Next Steps ─── */
export function C_NextStepsSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="c-next" module="next-steps" accent slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex flex-col gap-10 min-h-[50vh] justify-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Let's build together.</h2>
        <p className="text-sm text-muted-foreground/70 max-w-[560px]">
          Technical deep-dive · Joint design sprint · Partnership term sheet
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[700px]">
          {[
            { label: "Next step", value: "[]" },
            { label: "Timeline", value: "[]" },
            { label: "Contact", value: "[]" },
            {
              label: "Materials",
              value: "HELIOS technical appendix, case studies, partnership term sheet on request.",
            },
          ].map((item) => (
            <div key={item.label} className="border-l-2 border-accent/20 pl-6 py-2">
              <span className="font-mono text-[10px] text-accent/60 tracking-splice-wide uppercase block mb-2">
                {item.label}
              </span>
              <p className="text-sm text-foreground/80">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-auto">
          <span className="w-8 h-px bg-accent/30" />
          <span className="font-mono text-[11px] text-muted-foreground/30">Confidential · Splice Labs</span>
        </div>
      </div>
    </Slide>
  );
}

/* ─── Appendix 1 — HELIOS Executive Overview ─── */
export function C_HeliosExecAppendix({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="c-helios-exec" module="appendix::ip · helios" slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-[9px] text-accent/50 tracking-splice-ultra uppercase border border-accent/20 px-2 py-0.5">
          Proprietary IP
        </span>
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10">
        HELIOS — AgenticOS for institutional DeFi
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="border border-surface-border p-6">
          <span className="font-mono text-[9px] text-accent/50 tracking-splice-ultra uppercase block mb-4">
            What HELIOS Is
          </span>
          <p className="text-sm text-foreground/90 leading-relaxed">
            An autonomous operating system for institutional DeFi — not a tool, but infrastructure that executes,
            constrains, and scales onchain operations.
          </p>
        </div>
        <div className="border border-surface-border p-6">
          <span className="font-mono text-[9px] text-accent/50 tracking-splice-ultra uppercase block mb-4">
            What HELIOS Does
          </span>
          <ul className="space-y-2">
            {[
              "Autonomous cross-chain execution",
              "Real-time risk enforcement",
              "Immutable compliance logging",
              "Multi-chain routing and settlement",
            ].map((item) => (
              <li key={item} className="text-sm text-foreground/90 leading-relaxed flex items-start gap-2">
                <span className="w-1 h-1 bg-accent/50 mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-surface-border p-6">
          <span className="font-mono text-[9px] text-accent/50 tracking-splice-ultra uppercase block mb-4">
            Why It Matters
          </span>
          <p className="text-sm text-foreground/90 leading-relaxed">
            Institutions operate at scale without governance bottlenecks or manual intervention. Every deployment
            compounds the agent layer's intelligence.
          </p>
        </div>
      </div>

      <div className="border border-surface-border p-6">
        <span className="font-mono text-[9px] text-accent/50 tracking-splice-ultra uppercase block mb-6">
          Architecture
        </span>
        <div className="flex flex-col gap-0">
          <div className="border border-accent/30 bg-accent/5 px-5 py-3 flex items-center justify-between">
            <span className="font-mono text-[10px] text-accent tracking-splice-wide uppercase">L1 — Orchestration</span>
            <span className="text-xs text-muted-foreground/60">AgenticOS Core</span>
          </div>
          <div className="flex justify-center">
            <div className="w-px h-4 bg-surface-border" />
          </div>
          <div className="grid grid-cols-3 gap-px">
            <div className="border border-surface-border px-4 py-3 text-center">
              <span className="font-mono text-[10px] text-foreground/70 tracking-splice-wide uppercase">
                Agent Core
              </span>
            </div>
            <div className="border border-accent/20 bg-accent/5 px-4 py-3 text-center">
              <span className="font-mono text-[10px] text-accent/80 tracking-splice-wide uppercase">Risk Engine</span>
            </div>
            <div className="border border-surface-border px-4 py-3 text-center">
              <span className="font-mono text-[10px] text-foreground/70 tracking-splice-wide uppercase">
                Compliance
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-px h-4 bg-surface-border" />
          </div>
          <div className="border border-surface-border px-5 py-3 flex items-center justify-between">
            <span className="font-mono text-[10px] text-foreground/70 tracking-splice-wide uppercase">
              L3 — Execution
            </span>
            <span className="text-xs text-muted-foreground/60">Cross-chain settlement & routing</span>
          </div>
          <div className="flex justify-center">
            <div className="w-px h-4 bg-surface-border" />
          </div>
          <div className="border border-surface-border/50 px-5 py-3 flex items-center justify-between">
            <span className="font-mono text-[10px] text-muted-foreground/50 tracking-splice-wide uppercase">
              L4 — Target Chains
            </span>
            <span className="text-xs text-muted-foreground/40">Stacks · EVM · Solana</span>
          </div>
        </div>
      </div>
    </Slide>
  );
}
