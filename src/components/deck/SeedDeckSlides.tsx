/**
 * Splice Labs — Seed Deck
 *
 * Evidence-based seed narrative, converted from the Splice Labs research
 * memos (talking-points, business-model, investor, and OpCo-first memos).
 * Direction: signal-first "10-day formation machine" hook → governed
 * autonomous capital vertical → OpCo-first two-ledger structure. Follows
 * Aaron Harris's seed-deck discipline: one idea per slide, legible, obvious.
 *
 * Figures carry source tags. Live numbers (stablecoin cap, RWA, Carta
 * median, the GENIUS Act status) are date-stamped and should be re-pulled
 * before the deck is sent; modeled figures are labelled as such.
 */
import { Slide } from "./SlideComponents";
import { Eyebrow, SlideTitle, Lead, AccentRule } from "./DeckScaffold";
import {
  Box,
  CapBars,
  CompareTable,
  FundsBars,
  LedgerTimeline,
  Points,
  ProofRows,
  QAGrid,
  Src,
  StatTile,
  ValuationLadder,
} from "./DeckContent";

export const TOTAL_SLIDES_SEED = 16;

type SlideProps = { slideNumber: number; totalSlides: number };

/* 1 — Cover */
export function Seed_CoverSlide(props: SlideProps) {
  return (
    <Slide id="seed-cover" module="seed · confidential" accent {...props}>
      <div className="max-w-[900px]">
        <Eyebrow>Splice Labs</Eyebrow>
        <SlideTitle className="mt-6 text-4xl md:text-6xl">
          The 10-day company-formation machine.
        </SlideTitle>
        <Lead>
          An AI-native venture studio for governed autonomous capital. We turn
          validated ideas into market-facing businesses in ten days or less —
          then recruit founders into the ones that prove real pull.
        </Lead>
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10px] tracking-splice-wide uppercase text-muted-foreground/55">
          <span className="text-accent/80">Seed · ~$5M</span>
          <span className="text-surface-border">/</span>
          <span>$50M post-money SAFE cap · OpCo only</span>
          <span className="text-surface-border">/</span>
          <span>Not a fund — the company that creates companies</span>
        </div>
      </div>
    </Slide>
  );
}

/* 2 — The old bet is broken */
export function Seed_ProblemSlide(props: SlideProps) {
  return (
    <Slide id="seed-problem" module="01 · the problem" {...props}>
      <SlideTitle>The old bet is broken.</SlideTitle>
      <Lead>
        Early-stage forces investors to underwrite a founding team before
        product, market, positioning, and launch speed have ever been tested.
      </Lead>
      <div className="mt-10">
        <CompareTable
          leftTitle="Old incubation model"
          rightTitle="Splice Labs model"
          rows={[
            ["Founder first", "Market signal first, then founder matching"],
            ["MVP built by the founding team", "Validated idea converted into a launch asset by studio + agents"],
            ["Investors bet before evidence", "Investors see launch velocity, signal, and founder-ready assets"],
            ["Static founder allocation", "Large founder seats vest after joining and performing"],
            ["Incubator as a program", "Studio as a company-creation operating system"],
          ]}
        />
      </div>
      <p className="mt-6 text-sm text-foreground/55">
        YC got the founder-first instinct right — but YC was built in 2004,
        before AI-native company formation existed. <Src>YC standard deal</Src>
      </p>
    </Slide>
  );
}

/* 3 — What changed */
export function Seed_WhatChangedSlide(props: SlideProps) {
  return (
    <Slide id="seed-what-changed" module="02 · what changed" {...props}>
      <SlideTitle>AI unbundles the founder bet.</SlideTitle>
      <Lead>
        AI-native operating systems now let a disciplined studio test the right
        product, market, and positioning <em>before</em> allocating a scarce
        founder.
      </Lead>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-[1.1fr_1fr]">
        <Points
          items={[
            "Companies are becoming queryable, closed-loop, artifact-rich systems — knowledge, code, support, and analytics all legible to agents.",
            "The scarce skill is no longer writing the first code. It's testing the right product in the right market faster than anyone else.",
            "Founder-level equity should follow market signal, not precede it.",
          ]}
        />
        <div className="space-y-5 border border-surface-border p-6">
          <div className="font-mono text-[9px] tracking-splice-wide uppercase text-muted-foreground/55">
            AI productivity is real — but jagged
          </div>
          <div className="grid grid-cols-3 gap-4">
            <StatTile value="+56%" label="faster coding tasks" src="GitHub Copilot RCT" />
            <StatTile value="+14%" label="support productivity" src="NBER 2023" />
            <StatTile value="−19%" label="experts on familiar code" src="METR 2025" />
          </div>
          <p className="text-sm leading-relaxed text-foreground/65">
            AI accelerates governed, well-scoped work and slows ungoverned
            expert work. That is exactly why our edge is governed repeatability —
            and our metric is cost-of-evidence, not a time-saved fantasy.
          </p>
        </div>
      </div>
    </Slide>
  );
}

/* 4 — The machine (product) */
export function Seed_MachineSlide(props: SlideProps) {
  return (
    <Slide id="seed-machine" module="03 · the machine" {...props}>
      <SlideTitle>Our product is the machine that builds companies.</SlideTitle>
      <Lead>
        Not the first companies it creates — the repeatable system that creates
        them. Agents execute; humans own judgment, sales, and founder selection.
      </Lead>
      <div className="mt-10 grid gap-4 md:grid-cols-5">
        <Box kicker="01" title="Research & validation" body="Market questions → source-linked, testable hypotheses." />
        <Box kicker="02" title="Agentic build + QA" body="Working artifacts with specs, tests, evals, and review." />
        <Box kicker="03" title="GTM & signal" body="Positioning, launch pages, outbound, CRM, analytics." />
        <Box kicker="04" title="Back-office shell" body="Agents maintain assets; humans focus on judgment." />
        <Box kicker="05" title="Founder match" body="Recruit founders into assets that earned signal." />
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-l-2 border-accent/40 pl-5">
        <span className="font-display text-2xl font-bold tracking-splice-tight text-foreground">
          DVL ≤ 10 days
        </span>
        <span className="text-sm text-foreground/65">
          Day 0 validated-idea gate → market-facing asset → decision: kill ·
          iterate · agent-maintain · founder-match.
        </span>
      </div>
    </Slide>
  );
}

/* 5 — Why now (market) */
export function Seed_MarketSlide(props: SlideProps) {
  return (
    <Slide id="seed-market" module="04 · why now" {...props}>
      <SlideTitle>Capital won&apos;t trust autonomous finance until it&apos;s governed.</SlideTitle>
      <Lead>
        The budget and the rails are already here. Trust, control, and
        governance are the bottleneck — exactly where we build.
      </Lead>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile value="$35B→$97B" label="financial-services AI spend, 2023 → projected 2027" src="WEF 2025" />
        <StatTile value="2.7% / 60%" label="trust agents for judgment calls / only within a governed framework" src="Deloitte 2025" />
        <StatTile value=">40%" label="of agentic-AI projects projected cancelled by 2027 — weak cost/value/risk controls" src="Gartner 2025" />
        <StatTile value="~$320B" label="stablecoin market cap (as of May 2026)" src="DeFiLlama" />
      </div>
      <p className="mt-8 text-sm text-foreground/55">
        Regulators agree it&apos;s a control problem: the proposed GENIUS Act
        rule treats stablecoin issuers as financial institutions for AML, and
        FINRA flags GenAI for supervision and recordkeeping.{" "}
        <Src>US Treasury (proposed) · FINRA 2026</Src>
      </p>
    </Slide>
  );
}

/* 6 — The vertical */
export function Seed_VerticalSlide(props: SlideProps) {
  return (
    <Slide id="seed-vertical" module="05 · the wedge" {...props}>
      <SlideTitle>Governed autonomous capital — not trading bots.</SlideTitle>
      <Lead>
        We build the trust and control layer of agentic finance, in a deliberate
        wedge sequence.
      </Lead>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-[1.3fr_1fr]">
        <Points
          items={[
            <><strong className="font-semibold text-foreground">1 · Stablecoin treasury & compliance control</strong> — the clearest first wedge: a budget owner, stablecoin tailwinds, reusable policy primitives.</>,
            <><strong className="font-semibold text-foreground">2 · Onchain risk / guardian agents</strong> — pre-execution simulation, anomaly detection, kill switches, human approvals.</>,
            <><strong className="font-semibold text-foreground">3 · Permissioned agent wallets & provenance</strong> — identity, delegated authority, audit trail, compliance evidence.</>,
            <><strong className="font-semibold text-foreground">AgentEvolve</strong> — the horizontal production-agent layer beneath all three.</>,
          ]}
        />
        <div className="space-y-6 border border-surface-border p-6">
          <StatTile value="$15–35B" label="modeled agentic-finance TAM by 2030" />
          <StatTile value="$0.75–2.2B" label="modeled studio SAM across the first wedges" />
          <p>
            <Src>Internal model — modeled, not observed</Src>
          </p>
        </div>
      </div>
    </Slide>
  );
}

/* 7 — OpCo-first, two ledgers */
export function Seed_StructureSlide(props: SlideProps) {
  return (
    <Slide id="seed-structure" module="06 · structure" accent {...props}>
      <SlideTitle>Seed funds the company. The fund comes later.</SlideTitle>
      <Lead>
        Two ledgers, architected from day one, activated in sequence. Seed
        investors underwrite a company — not a half-formed fund.
      </Lead>
      <div className="mt-10">
        <LedgerTimeline />
      </div>
      <p className="mt-6 text-sm text-foreground/60">
        Fund I capitalizes at Series A — only after 8–12 launches, outside
        financings, clean cap tables, and measured harness ROI.
      </p>
    </Slide>
  );
}

/* 8 — No platform tax / economics */
export function Seed_EconomicsSlide(props: SlideProps) {
  return (
    <Slide id="seed-economics" module="07 · economics" accent {...props}>
      <SlideTitle>Cheaper to build — never more expensive to run.</SlideTitle>
      <Lead>
        Splice earns equity for creating companies, never recurring fees on
        fragile burn. No platform tax.
      </Lead>
      <div className="mt-10 grid items-start gap-12 md:grid-cols-2">
        <div>
          <div className="mb-4 font-mono text-[9px] tracking-splice-wide uppercase text-muted-foreground/55">
            Illustrative formation cap table
          </div>
          <CapBars
            rows={[
              { label: "Founders & team", pct: 60 },
              { label: "Studio common", pct: 18, accent: true },
              { label: "Option pool", pct: 12 },
              { label: "Reserved for outside seed", pct: 10 },
            ]}
          />
        </div>
        <Points
          items={[
            "Studio common by contribution lane: ~7–10% light-touch · 12–22% co-created · 22–30% heavy-build (used sparingly).",
            "Late-founder model: up to two seats vesting up to 33% over four years — a top founder may prefer 33% of a live, de-risked asset over 70% of a blank page.",
            "We stay below ~30% studio common to avoid holding-company optics and keep spinouts VC-fundable.",
          ]}
        />
      </div>
    </Slide>
  );
}

/* 9 — Use of funds */
export function Seed_FundsSlide(props: SlideProps) {
  return (
    <Slide id="seed-funds" module="08 · use of funds" {...props}>
      <SlideTitle>~$5M buys evidence, not headcount.</SlideTitle>
      <Lead>
        100% to the Studio OpCo. Zero to portfolio investment checks at seed — by
        design.
      </Lead>
      <div className="mt-10 grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
        <FundsBars
          rows={[
            { label: "Formation OS & harness", pct: 25 },
            { label: "Core studio pod", pct: 22 },
            { label: "Customer validation budget", pct: 13 },
            { label: "Runway, security & contingency", pct: 13 },
            { label: "Founder pipeline & residency", pct: 11 },
            { label: "Legal / IP / entity stack", pct: 9 },
            { label: "GTM & investor network", pct: 7 },
          ]}
        />
        <div className="space-y-6">
          <StatTile value="$0" label="portfolio investment checks at seed — switches on at Series A / Fund I" />
          <StatTile value="18–24 mo" label="OpCo runway" />
        </div>
      </div>
    </Slide>
  );
}

/* 10 — Proof gates */
export function Seed_ProofSlide(props: SlideProps) {
  return (
    <Slide id="seed-proof" module="09 · proof" {...props}>
      <SlideTitle>Measured by formation capacity, not launch theater.</SlideTitle>
      <Lead>
        The first 18–24 months prove the machine works — with discipline an
        investor can audit.
      </Lead>
      <div className="mt-10 grid items-start gap-12 md:grid-cols-[1.2fr_1fr]">
        <ProofRows
          rows={[
            { metric: "Validated idea → launch (DVL)", target: "≤ 10 days" },
            { metric: "Serious validations killed before incorporation", target: "> 70%" },
            { metric: "Launches", target: "8–12" },
            { metric: "Paid pilots / design partners", target: "3–5" },
            { metric: "Full-time CEOs recruited", target: "≥ 2" },
            { metric: "Outside seed financings", target: "2–4" },
            { metric: "Severe security / compliance failures", target: "0" },
          ]}
        />
        <p className="text-sm leading-relaxed text-foreground/65">
          Cheap, well-documented failure is a feature. The kill archive is a
          diligence asset — it proves we are disciplined, not launch-count
          obsessed.
        </p>
      </div>
    </Slide>
  );
}

/* 11 — The moat */
export function Seed_MoatSlide(props: SlideProps) {
  return (
    <Slide id="seed-moat" module="10 · moat" {...props}>
      <SlideTitle>The moat is shared evaluated learning — not shared prompts.</SlideTitle>
      <Lead>
        A governed portfolio commons: evaluated learning from one company makes
        the next one faster and safer.
      </Lead>
      <div className="mt-10 max-w-[760px]">
        <Points
          items={[
            "The harness is a governed execution system — artifact schemas, an eval registry, telemetry, a skill runtime, and audit logs — not generic prompts.",
            "Company-private data and product IP stay with the spinout; only abstracted, evaluated learning is shared.",
            "The proof is concrete: lower cost per validation, artifact and eval reuse, and a falling governance-defect rate as the studio scales.",
          ]}
        />
      </div>
    </Slide>
  );
}

/* 12 — Series A activation */
export function Seed_SeriesASlide(props: SlideProps) {
  return (
    <Slide id="seed-series-a" module="11 · series a" {...props}>
      <SlideTitle>Proof unlocks the fund.</SlideTitle>
      <Lead>
        When the gates clear, we raise a paired-but-separate OpCo Series A and
        Studio Fund I.
      </Lead>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <Box kicker="OpCo Series A · $15–25M" title="Scale the machine" body="More pods, deeper harness, compliance/IP systems, founder & buyer networks." accent />
        <Box kicker="Studio Fund I · $25–60M" title="Fund the pipeline" body="Cash into spinouts the OpCo has already proven — with reserves for winners." accent />
        <Box kicker="Opportunity / SPV · $5–25M" title="Concentrate on breakouts" body="Capture power-law exposure once nonlinear evidence appears." accent />
      </div>
      <p className="mt-6 text-sm text-foreground/60">
        Fund I is first-look access to a proven formation pipeline — not a blind
        bet on a thesis.
      </p>
    </Slide>
  );
}

/* 13 — Valuation & returns */
export function Seed_ValuationSlide(props: SlideProps) {
  return (
    <Slide id="seed-valuation" module="12 · valuation" accent {...props}>
      <SlideTitle>$50M today. The upside is repeatability, not NAV.</SlideTitle>
      <Lead>
        $35M YC-quality AI-native default + ~$15M studio premium = a $50M
        post-money cap ($40–60M band). <Src>Internal valuation framework</Src>
      </Lead>
      <div className="mt-10 grid items-start gap-12 md:grid-cols-[1.2fr_1fr]">
        <ValuationLadder
          steps={[
            { value: "$50M", when: "seed — formation OS, thesis, first cohort" },
            { value: "$90–125M", when: "after 8–12 launches; repeatability proven" },
            { value: "$150–225M", when: "strong marks, real IP, follow-on rights" },
            { value: "$250M+", when: "a visible category winner" },
          ]}
        />
        <div className="space-y-5 border border-surface-border p-6">
          <div className="font-mono text-[9px] tracking-splice-wide uppercase text-muted-foreground/55">
            Returns follow the power law
          </div>
          <p className="font-mono text-sm text-foreground/80">
            P(≥1 outlier) = 1 − (1 − p)<sup>N</sup>
          </p>
          <p className="text-sm leading-relaxed text-foreground/65">
            At p = 2%, N = 100 → ~87% chance of at least one outlier. More shots
            help only if the process doesn&apos;t filter out the weird founders
            and weird ideas.
          </p>
          <p className="text-sm leading-relaxed text-foreground/55">
            Retained NAV alone is modest — six $100M protocols at 4% is $24M.
            That&apos;s the floor, not the story.
          </p>
        </div>
      </div>
    </Slide>
  );
}

/* 14 — LP sidecar */
export function Seed_SidecarSlide(props: SlideProps) {
  return (
    <Slide id="seed-sidecar" module="13 · lp sidecar" {...props}>
      <SlideTitle>A direct line into protocols, before VC pricing.</SlideTitle>
      <Lead>
        For aligned seed LPs: the 7 / 3 / 4 protocol cohort offers direct early
        exposure most investors can&apos;t access.
      </Lead>
      <div className="mt-10 grid items-start gap-12 md:grid-cols-[1fr_1fr]">
        <Points
          items={[
            "Studio takes 7% gross, distributes 3 percentage points to seed LPs, and retains 4%.",
            "That gives LPs 42.86% of the gross studio-created cohort economics.",
            "Illustrative: a $500K LP in a $5M pool ≈ $900K direct paper value if six protocols average $50M.",
          ]}
        />
        <div className="border border-surface-border p-6">
          <div className="grid grid-cols-3 gap-4">
            <StatTile value="7%" label="studio gross stake" />
            <StatTile value="3pp" label="to seed LPs" />
            <StatTile value="4%" label="studio retained" />
          </div>
          <p className="mt-5">
            <Src>Paper / scenario value — legal mechanics in the data room</Src>
          </p>
        </div>
      </div>
    </Slide>
  );
}

/* 15 — Diligence, pre-answered */
export function Seed_DiligenceSlide(props: SlideProps) {
  return (
    <Slide id="seed-diligence" module="14 · diligence" {...props}>
      <SlideTitle>The hard questions, already answered.</SlideTitle>
      <div className="mt-8">
        <QAGrid
          items={[
            { q: "Fund or company?", a: "Separated ledgers. Seed funds only the OpCo; Fund I capitalizes at Series A." },
            { q: "Is the harness real IP?", a: "A governed execution system — artifacts, evals, telemetry, domain method. Repos and logs in the data room." },
            { q: "Do you have network effects?", a: "We claim compounding evaluated learning first; network effects only once proven cross-company." },
            { q: "Are 10-day launches shallow?", a: "DVL measures validated-idea → market signal, not a mature company. Every launch is governed: QA, evals, kill criteria." },
            { q: "Will founders join later?", a: "Real founder economics in a de-risked asset — up to 33% of a live opportunity beats 70% of a blank page." },
            { q: "Is this an agency?", a: "Only if we sold labor. We retain equity, reusable IP, and spinout economics — and charge no platform tax." },
          ]}
        />
      </div>
    </Slide>
  );
}

/* 16 — The ask / close */
export function Seed_AskSlide(props: SlideProps) {
  return (
    <Slide id="seed-ask" module="15 · the ask" accent {...props}>
      <SlideTitle>Back the machine. The fund follows the proof.</SlideTitle>
      <div className="mt-10 grid items-start gap-12 md:grid-cols-[1fr_1.2fr]">
        <StatTile value="~$5M" label="$50M post-money SAFE cap · Studio OpCo only" />
        <div>
          <div className="mb-4 font-mono text-[9px] tracking-splice-wide uppercase text-accent/60">
            What the round buys
          </div>
          <Points
            items={[
              "A hardened formation OS and governed harness.",
              "A disciplined first cohort — 6–10 launches with real signal.",
              "A founder pipeline and a clean, diligence-ready data room.",
            ]}
          />
        </div>
      </div>
      <div className="mt-12 border-t border-surface-border pt-8">
        <p className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground">
          We make venture creation cheaper without making portfolio companies
          weaker.
        </p>
        <div className="mt-5 flex items-center gap-3">
          <AccentRule />
          <span className="font-mono text-[10px] tracking-splice-wide uppercase text-muted-foreground/55">
            DVL ≤ 10 · Splice Labs · contact · email
          </span>
        </div>
      </div>
    </Slide>
  );
}
