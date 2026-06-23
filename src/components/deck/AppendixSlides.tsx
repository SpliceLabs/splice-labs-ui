import { Slide, Placeholder } from "./SlideComponents";
// Next resolves image imports to StaticImageData — take .src for <img>.
import crownFuturesLogoImg from "@/assets/logos/crown-futures.png";
import silentMarketsLogoImg from "@/assets/logos/silent-markets.png";
import ordoVenturiLogoImg from "@/assets/logos/ordo-venturi.png";
import kenomicLogoImg from "@/assets/logos/kenomic.png";

const crownFuturesLogo = crownFuturesLogoImg.src;
const silentMarketsLogo = silentMarketsLogoImg.src;
const ordoVenturiLogo = ordoVenturiLogoImg.src;
const kenomicLogo = kenomicLogoImg.src;

interface SlideProps {
  slideNumber: number;
  totalSlides: number;
}

/* ─── Shared metric block ─── */
function MetricBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-surface-border p-4">
      <span className="font-mono text-[18px] font-bold text-foreground block mb-1">{value}</span>
      <span className="font-mono text-label-xs text-accent/50 tracking-splice-wide uppercase">{label}</span>
    </div>
  );
}

function Ins({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-accent/60 bg-accent/5 border border-accent/15 px-1.5 py-0.5 font-mono text-label-sm">
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   IP — HELIOS (generic, used by Deck B)
   ═══════════════════════════════════════════════ */
export function HeliosAppendix(props: SlideProps) {
  return (
    <Slide id="helios" module="appendix::ip · helios" {...props}>
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase border border-accent/20 px-2 py-0.5">
          Proprietary IP
        </span>
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">HELIOS — System Overview</h2>
      <p className="text-sm text-muted-foreground/70 mb-10 max-w-[600px]">
        Autonomous operating system for institutional DeFi. Executes, constrains, records, and scales onchain
        operations.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <MetricBlock label="Execution" value="Cross-chain" />
        <MetricBlock label="Risk" value="Real-time" />
        <MetricBlock label="Compliance" value="Immutable" />
      </div>
      <Placeholder
        label="HELIOS architecture: L1 Orchestration → L2 Agent Core / Risk / Compliance → L3 Execution → L4 Chains"
        className="w-full h-[160px]"
      />
    </Slide>
  );
}

/* ═══════════════════════════════════════════════
   PORTFOLIO — AGAVE
   ═══════════════════════════════════════════════ */
export function AgaveAppendix(props: SlideProps) {
  const constraints = [
    {
      title: "Composability vs. security",
      desc: "Lending primitives must be composable without introducing attack surface.",
    },
    {
      title: "Yield optimization",
      desc: "Institutional-grade yield requires active management. Manual doesn't scale.",
    },
    {
      title: "Cross-collateral risk",
      desc: "Multi-asset collateral pools create correlated risk. Non-trivial to model.",
    },
  ];

  return (
    <Slide id="agave" module="appendix::portfolio · agave" {...props}>
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase border border-accent/20 px-2 py-0.5">
          Portfolio
        </span>
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Agave</h2>
      <p className="text-sm text-muted-foreground/60 mb-10 max-w-[600px]">
        Institutional lending and yield infrastructure for onchain capital markets. Lending infrastructure built for
        composability and institutional trust.
      </p>

      {/* Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase block mb-4">
            System Architecture
          </span>
          <div className="space-y-2">
            {[
              "Lending Pools — Isolated & cross-collateralized modes",
              "Rate Engine — Dynamic curves, HELIOS-optimized",
              "Agent-Managed Yield — Autonomous rebalancing across chains",
              "Risk Framework — Per-pool + portfolio-level monitoring",
              "Composable API — Standardized interfaces for 3rd-party integration",
            ].map((line) => (
              <div key={line} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-accent/50 mt-2 shrink-0" />
                <p className="text-xs text-foreground/80 leading-relaxed">{line}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase block mb-4">
            Constraints Navigated
          </span>
          <div className="space-y-3">
            {constraints.map((c) => (
              <div key={c.title} className="border-l-2 border-accent/20 pl-4 py-1">
                <h4 className="text-xs font-semibold text-foreground mb-0.5">{c.title}</h4>
                <p className="text-label text-muted-foreground/60 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics */}
      {/* <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <MetricBlock label="TVL" value={`$`} />
        <MetricBlock label="Yield" value="—" />
        <MetricBlock label="Pools" value="—" />
        <MetricBlock label="Chains" value="—" />
        <MetricBlock label="Integrations" value="—" />
      </div> */}
    </Slide>
  );
}

/* ═══════════════════════════════════════════════
   PORTFOLIO — SILENT MARKETS
   ═══════════════════════════════════════════════ */
export function SilentMarketsAppendix(props: SlideProps) {
  const constraints = [
    {
      title: "Reactive vs. Proactive Intelligence",
      desc: "Traditional journals are passive logbooks. Agents make the system proactive—researching alongside you, surfacing patterns you miss.",
    },
    {
      title: "Competitive Moat",
      desc: " Competitors can copy UI. They can't copy: agent framework, behavioral intelligence (requires user data), feedback-tuned insight quality.",
    },
    {
      title: "Scaling Intelligence Without Headcount ",
      desc: "Framework-based architecture: Build once , deploy specialized agents vs. building features individually.",
    },
  ];

  return (
    <Slide id="silent-markets" module="appendix::portfolio · silent markets" {...props}>
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase border border-accent/20 px-2 py-0.5">
          Portfolio
        </span>
      </div>

      <div className="flex items-center gap-4 mb-2">
        <img src={silentMarketsLogo} alt="Silent Markets" className="h-10 w-auto" />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Silent Markets</h2>
      </div>
      <p className="text-sm text-muted-foreground/60 mb-10 max-w-[600px]">
        Privacy-preserving dark pool execution for institutional onchain order flow. Institutional execution without
        footprint.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase block mb-4">
            Intelligence Flow
          </span>
          <div className="flex flex-col gap-0">
            {[
              "Trade Logging & Context Aggregation",
              "Agent Orchestration",
              "Insight Generation",
              "Adaptive Delivery",
              "Feedback Loop Learning",
            ].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <span className="font-mono text-label-sm text-accent/60 w-5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="border border-surface-border px-4 py-2 flex-1">
                  <span className="text-xs text-foreground/80">{step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase block mb-4">
            Constraints Navigated
          </span>
          <div className="space-y-3">
            {constraints.map((c) => (
              <div key={c.title} className="border-l-2 border-accent/20 pl-4 py-1">
                <h4 className="text-xs font-semibold text-foreground mb-0.5">{c.title}</h4>
                <p className="text-label text-muted-foreground/60 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <MetricBlock label="Volume" value="$—" />
        <MetricBlock label="Avg Order" value="$—" />
        <MetricBlock label="MEV Blocked" value="—%" />
        <MetricBlock label="Price Improvement" value="— bps" />
        <MetricBlock label="Chains" value="—" />
      </div> */}
    </Slide>
  );
}

/* ═══════════════════════════════════════════════
   PORTFOLIO — ANON CAPITAL (Poolhouse rebrand)
   ═══════════════════════════════════════════════ */
export function AnonCapitalAppendix(props: SlideProps) {
  const constraints = [
    {
      title: "Fragmented liquidity",
      desc: "Liquidity scattered across chains, DEXs, and pools. No unified management layer.",
    },
    {
      title: "Rebalancing latency",
      desc: "Cross-chain rebalancing is slow and expensive. Imbalance = lost efficiency.",
    },
    { title: "Impermanent loss", desc: "Active management must account for IL. Naive rebalancing amplifies losses." },
  ];

  return (
    <Slide id="anon-capital" module="appendix::portfolio · anon capital" {...props}>
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase border border-accent/20 px-2 py-0.5">
          Portfolio
        </span>
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Anon Capital</h2>
      <p className="text-sm text-muted-foreground/60 mb-10 max-w-[600px]">
        Cross-protocol liquidity orchestration and automated rebalancing infrastructure. Liquidity management that never
        sleeps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase block mb-4">
            System Architecture
          </span>
          <div className="space-y-2">
            {[
              "Liquidity Aggregation — Unified view across chains & venues",
              "HELIOS Rebalancing Agents — Autonomous, strategy-configurable",
              "IL Mitigation Engine — Active hedging & timing optimization",
              "Cross-Chain Routing — Cost and speed optimized movement",
              "Dashboard & Reporting — Real-time state, P&L, agent activity",
            ].map((line) => (
              <div key={line} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-accent/50 mt-2 shrink-0" />
                <p className="text-xs text-foreground/80 leading-relaxed">{line}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase block mb-4">
            Constraints Navigated
          </span>
          <div className="space-y-3">
            {constraints.map((c) => (
              <div key={c.title} className="border-l-2 border-accent/20 pl-4 py-1">
                <h4 className="text-xs font-semibold text-foreground mb-0.5">{c.title}</h4>
                <p className="text-label text-muted-foreground/60 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <MetricBlock label="Liquidity Managed" value="$—" />
        <MetricBlock label="Venues" value="—" />
        <MetricBlock label="Chains" value="—" />
        <MetricBlock label="Rebal. Efficiency" value="—%" />
        <MetricBlock label="IL Reduction" value="— bps" />
      </div> */}
    </Slide>
  );
}

/* ═══════════════════════════════════════════════
   PORTFOLIO — CROWN FUTURES
   ═══════════════════════════════════════════════ */
export function CrownFuturesAppendix(props: SlideProps) {
  const constraints = [
    {
      title: "Latency vs. decentralization",
      desc: "Derivatives need fast execution. Onchain means block time constraints.",
    },
    { title: "Cross-chain settlement", desc: "Positions on one chain, settled on another. No reliable infra existed." },
    {
      title: "Protocol-level risk mgmt",
      desc: "Liquidation engines, margin systems, circuit breakers — all autonomous.",
    },
  ];

  return (
    <Slide id="crown-futures" module="appendix::portfolio · crown futures" {...props}>
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase border border-accent/20 px-2 py-0.5">
          Portfolio
        </span>
      </div>

      <div className="flex items-center gap-4 mb-2">
        <img src={crownFuturesLogo} alt="Crown Futures" className="h-10 w-auto" />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Crown Futures</h2>
      </div>
      <p className="text-sm text-muted-foreground/60 mb-10 max-w-[600px]">
        Institutional-grade derivatives protocol for onchain futures and structured products. Serious derivatives
        infrastructure for serious participants.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase block mb-4">
            System Architecture
          </span>
          <div className="space-y-2">
            {[
              "Matching Engine — Onchain order matching",
              "Margin System — Cross-collateralized, real-time mark-to-market",
              "Liquidation Engine — HELIOS-powered, configurable",
              "Settlement Layer — Cross-chain via native execution",
              "Risk Dashboard — Real-time portfolio risk, P&L, exposure",
            ].map((line) => (
              <div key={line} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-accent/50 mt-2 shrink-0" />
                <p className="text-xs text-foreground/80 leading-relaxed">{line}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase block mb-4">
            Constraints Navigated
          </span>
          <div className="space-y-3">
            {constraints.map((c) => (
              <div key={c.title} className="border-l-2 border-accent/20 pl-4 py-1">
                <h4 className="text-xs font-semibold text-foreground mb-0.5">{c.title}</h4>
                <p className="text-label text-muted-foreground/60 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <MetricBlock label="TVL" value="$—" />
        <MetricBlock label="Daily Volume" value="$—" />
        <MetricBlock label="Chains" value="—" />
        <MetricBlock label="Uptime" value="—%" />
        <MetricBlock label="Liq. Accuracy" value="—%" />
      </div> */}
    </Slide>
  );
}

/* ═══════════════════════════════════════════════
   PORTFOLIO — POOLHOUSE
   ═══════════════════════════════════════════════ */
export function PoolhouseAppendix(props: SlideProps) {
  const constraints = [
    {
      title: "Multi-venue complexity",
      desc: "Each DEX and chain has different mechanics. Orchestration must abstract without losing precision.",
    },
    {
      title: "Rebalancing latency",
      desc: "Cross-chain rebalancing is slow and expensive. Every minute of imbalance is lost efficiency.",
    },
    {
      title: "Impermanent loss",
      desc: "Active liquidity management must account for IL across positions. Naive rebalancing amplifies losses.",
    },
    {
      title: "Fragmented liquidity",
      desc: "Liquidity scattered across chains, DEXs, and pools. No unified management layer exists.",
    },
  ];

  return (
    <Slide id="poolhouse" module="appendix::portfolio · poolhouse" {...props}>
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase border border-accent/20 px-2 py-0.5">
          Portfolio
        </span>
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Poolhouse</h2>
      <p className="text-sm text-muted-foreground/60 mb-10 max-w-[600px]">
        Cross-protocol liquidity orchestration and automated rebalancing infrastructure. Liquidity management that never
        sleeps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase block mb-4">
            System Architecture
          </span>
          <Placeholder
            label="Hub-and-spoke: Poolhouse orchestration (HELIOS) at center → DEXs/chains as spokes with bi-directional liquidity flows"
            className="w-full h-[80px] mb-4"
          />
          <div className="space-y-2">
            {[
              "Liquidity Aggregation Layer — Unified view across chains & venues",
              "HELIOS Rebalancing Agents — Autonomous monitoring, analysis & rebalancing",
              "IL Mitigation Engine — Hedging & timing optimization",
              "Cross-Chain Routing — Cost & speed optimized liquidity movement",
              "Dashboard & Reporting — Real-time state, P&L, agent activity",
            ].map((line) => (
              <div key={line} className="flex items-start gap-2">
                <span className="w-1 h-1 bg-accent/50 mt-2 shrink-0" />
                <p className="text-xs text-foreground/80 leading-relaxed">{line}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase block mb-4">
            Constraints Navigated
          </span>
          <div className="space-y-3">
            {constraints.map((c) => (
              <div key={c.title} className="border-l-2 border-accent/20 pl-4 py-1">
                <h4 className="text-xs font-semibold text-foreground mb-0.5">{c.title}</h4>
                <p className="text-label text-muted-foreground/60 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <MetricBlock label="Liquidity Managed" value="$—" />
        <MetricBlock label="Venues Connected" value="—" />
        <MetricBlock label="Chains Supported" value="—" />
        <MetricBlock label="Rebal. Efficiency" value="—%" />
        <MetricBlock label="IL Reduction" value="— bps" />
      </div> */}
    </Slide>
  );
}

/* ═══════════════════════════════════════════════
   PARTNERSHIP — ORDO VENTURI
   ═══════════════════════════════════════════════ */
export function OrdoVenturiAppendix(props: SlideProps) {
  return (
    <Slide id="ordo-venturi" module="appendix::partnership · ordo venturi" {...props}>
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase border border-accent/20 px-2 py-0.5">
          Partnership
        </span>
      </div>

      <div className="flex items-center gap-4 mb-2">
        <img src={ordoVenturiLogo} alt="Ordo Venturi" className="h-10 w-auto" />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Ordo Venturi</h2>
      </div>
      <p className="text-sm text-muted-foreground/60 mb-10 max-w-[600px]">
        Strategic ecosystem partnership for institutional DeFi distribution and co-development.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="border border-surface-border p-6">
          <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase block mb-4">
            Partnership Type
          </span>
          <p className="text-sm text-foreground/80">
            Co-build & integration. Joint protocol development with HELIOS deployment.
          </p>
        </div>
        <div className="border border-surface-border p-6">
          <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase block mb-4">Scope</span>
          <ul className="space-y-2">
            {["Protocol co-development", "HELIOS agent integration", "Cross-chain infrastructure"].map((item) => (
              <li key={item} className="text-xs text-foreground/80 flex items-start gap-2">
                <span className="w-1 h-1 bg-accent/50 mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-l-2 border-accent/20 pl-6 py-2">
        <p className="text-xs text-muted-foreground/60 leading-relaxed">
          Strategic alignment details and partnership terms available under NDA.
        </p>
      </div>
    </Slide>
  );
}

/* ═══════════════════════════════════════════════
   PARTNERSHIP — KENOMIC
   ═══════════════════════════════════════════════ */
export function KenomicAppendix(props: SlideProps) {
  return (
    <Slide id="kenomic" module="appendix::partnership · kenomic" {...props}>
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase border border-accent/20 px-2 py-0.5">
          Partnership
        </span>
      </div>

      <div className="flex items-center gap-4 mb-2">
        <img src={kenomicLogo} alt="Kenomic logo" className="w-10 h-10 object-contain" />
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Kenomic</h2>
      </div>
      <p className="text-sm text-muted-foreground/60 mb-10 max-w-[600px]">
        Infrastructure partnership for tokenomics design and economic security modeling.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="border border-surface-border p-6">
          <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase block mb-4">
            Partnership Type
          </span>
          <p className="text-sm text-foreground/80">
            Infrastructure & integration. White-label economic modeling with HELIOS risk layer.
          </p>
        </div>
        <div className="border border-surface-border p-6">
          <span className="font-mono text-label-xs text-accent/50 tracking-splice-ultra uppercase block mb-4">Scope</span>
          <ul className="space-y-2">
            {["Tokenomics modeling", "Economic security analysis", "HELIOS risk integration"].map((item) => (
              <li key={item} className="text-xs text-foreground/80 flex items-start gap-2">
                <span className="w-1 h-1 bg-accent/50 mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-l-2 border-accent/20 pl-6 py-2">
        <p className="text-xs text-muted-foreground/60 leading-relaxed">
          Partnership terms and integration specifications available under NDA.
        </p>
      </div>
    </Slide>
  );
}
