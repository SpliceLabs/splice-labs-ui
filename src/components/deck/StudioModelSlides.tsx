/**
 * Splice Labs — Studio Model / Incubation Architecture deck
 *
 * Converted from the Toggleable Three-Model Incubation Architecture memo
 * (+ the OpCo-first and business-model memos). Audience: seed & downstream
 * VCs (founders secondary). Purpose: show that ownership is matched to
 * formation work by a rules-based system — so every spinout reads as
 * clean, founder-led, and VC-fundable. Aaron Harris discipline.
 */
import { Slide } from "./SlideComponents";
import { Eyebrow, SlideTitle, Lead, AccentRule } from "./DeckScaffold";
import { Box, Matrix, Points, QAGrid, StatTile } from "./DeckContent";

export const TOTAL_SLIDES_STUDIO = 13;

type SlideProps = { slideNumber: number; totalSlides: number };

/* 1 — Cover */
export function Studio_CoverSlide(props: SlideProps) {
  return (
    <Slide id="studio-cover" module="incubation architecture · confidential" accent {...props}>
      <div className="max-w-[900px]">
        <Eyebrow>Splice Labs · how ownership works</Eyebrow>
        <SlideTitle className="mt-6 text-4xl md:text-6xl">
          Three models. One rule book.
        </SlideTitle>
        <Lead>
          Splice matches ownership, founder economics, and IP to the actual
          work of forming each company — through a rules-based incubation
          architecture, not a negotiable menu. The result: every spinout stays
          founder-led and VC-fundable.
        </Lead>
      </div>
    </Slide>
  );
}

/* 2 — The tension */
export function Studio_TensionSlide(props: SlideProps) {
  return (
    <Slide id="studio-tension" module="01 · the tension" {...props}>
      <SlideTitle>One fixed model can&apos;t build every company.</SlideTitle>
      <Lead>
        The hardest tension in the venture-studio model: different opportunities
        need fundamentally different ownership.
      </Lead>
      <div className="mt-10">
        <Points
          items={[
            "Some opportunities need founder autonomy — a clean, founder-majority cap table from day one.",
            "Some are parent-core infrastructure — worth more inside Splice than spun out.",
            "Some need Splice to create the market first, then recruit founders into proven assets.",
            <span key="k">
              Force all three into one structure and the studio looks
              opportunistic, founder-unfriendly, or like a holding company.{" "}
              <strong className="font-semibold text-foreground">
                A rules-based toggle handles all three.
              </strong>
            </span>,
          ]}
        />
      </div>
    </Slide>
  );
}

/* 3 — The frame */
export function Studio_FrameSlide(props: SlideProps) {
  return (
    <Slide id="studio-frame" module="02 · the frame" accent {...props}>
      <SlideTitle>Two ledgers, then a classification system.</SlideTitle>
      <Lead>
        Studio OpCo creates companies and owns the formation OS; the Studio Fund
        invests cash later. The three models sit beneath that frame.
      </Lead>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <Box kicker="Ledger 1 · OpCo" title="Creates & owns the machine" body="Earns common equity for company creation; owns the Venture Production OS." accent />
        <Box kicker="Ledger 2 · Fund (Series A)" title="Invests cash later" body="SAFEs, preferred, token warrants — only after the system is proven." />
        <Box kicker="The rule" title="Equity, never fees" body="Value via equity, tokens, sidecars, pro-rata & parent IP — never a platform tax on portfolio burn." accent />
      </div>
    </Slide>
  );
}

/* 4 — Three models at a glance */
export function Studio_OverviewSlide(props: SlideProps) {
  return (
    <Slide id="studio-overview" module="03 · the three models" {...props}>
      <SlideTitle>The three models, at a glance.</SlideTitle>
      <div className="mt-8">
        <Matrix
          headers={["", "Model 1 · 93/7", "Model 2 · Wholly owned", "Model 3 · Delayed founder"]}
          rows={[
            ["Core idea", "Founder-led NewCo from day one", "Product stays inside Splice as parent infra", "Splice builds through infancy, then recruits founders"],
            ["Initial ownership", "Founders 93% · Splice 7%", "Splice 100%", "Founders 67% · Splice 26% · LP 7%"],
            ["Best for", "Founder/partner-originated, YC-track", "AgentEvolve, Venture Production OS, Web4 kernel", "Splice-originated, no founder yet"],
            ["Founder fit", "Highest", "n/a — parent product", "High, if the slots are real"],
            ["VC fundability", "Highest — cleanest cap table", "On spinout only", "Fundable: founders incentivized, no fees"],
          ]}
        />
      </div>
    </Slide>
  );
}

/* 5 — Model 1 */
export function Studio_Model1Slide(props: SlideProps) {
  return (
    <Slide id="studio-model-1" module="model 1 · 93/7 co-incubation" {...props}>
      <SlideTitle>Model 1 — founder-led, day one.</SlideTitle>
      <Lead>
        Founders own 93%, Splice earns a 7% studio stake (4% if a 3pp LP sidecar
        applies). The default for founder- or partner-originated, YC-track
        companies.
      </Lead>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-[1fr_1fr]">
        <Points
          items={[
            "Splice contributes research, architecture, product scaffolding, GTM, and fundraising support — then steps back.",
            "The cleanest cap table and the strongest downstream-VC story.",
            "Preserve upside through pro-rata, token, and follow-on rights — never operating fees.",
          ]}
        />
        <div>
          <div className="mb-3 font-mono text-[9px] tracking-splice-wide uppercase text-muted-foreground/55">
            Founder ownership stays founder-grade
          </div>
          <Matrix
            headers={["Holder", "Formation", "Post-seed", "Post-A"]}
            rows={[
              ["Founders", "93%", "60.5%", "45.4%"],
              ["Splice (retained)", "7%", "2.6%", "2.0%"],
            ]}
          />
        </div>
      </div>
    </Slide>
  );
}

/* 6 — Model 2 */
export function Studio_Model2Slide(props: SlideProps) {
  return (
    <Slide id="studio-model-2" module="model 2 · wholly owned" {...props}>
      <SlideTitle>Model 2 — the machine stays inside.</SlideTitle>
      <Lead>
        Parent-core infrastructure — AgentEvolve, the Venture Production OS, the
        Web4 finance kernel — stays 100% Splice-owned.
      </Lead>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-[1fr_1fr]">
        <Points
          items={[
            <span key="r">
              The decision rule:{" "}
              <strong className="font-semibold text-foreground">
                if a product makes every future Splice company cheaper, safer,
                faster, or more fundable, it belongs in Model 2.
              </strong>
            </span>,
            "Valued as parent platform value — direct ARR, IP, data moat — not as portfolio NAV.",
            "Portfolio companies get access bundled into formation equity, at no fee or at cost — never a recurring platform tax.",
          ]}
        />
        <div className="space-y-6 border border-surface-border p-6">
          <StatTile value="100%" label="Splice-owned — the asset that supports valuation beyond retained NAV" />
          <p className="text-sm leading-relaxed text-foreground/60">
            Keep the system inside Splice. Spin out the business only when
            founder ownership and outside capital raise the odds of a power-law
            outcome.
          </p>
        </div>
      </div>
    </Slide>
  );
}

/* 7 — Model 3 */
export function Studio_Model3Slide(props: SlideProps) {
  return (
    <Slide id="studio-model-3" module="model 3 · delayed founder" {...props}>
      <SlideTitle>Model 3 — Splice carries it, then hands it over.</SlideTitle>
      <Lead>
        When Splice originates and builds through market infancy, it recruits
        operators into <em>real, vesting founder slots</em> — not employee
        grants.
      </Lead>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-[1fr_1fr]">
        <Points
          items={[
            "Fully allocated pre-financing: Founder Slot 1 ≤34%, Slot 2 ≤33%, Splice 26%, LP 7%.",
            "26% is defensible only where Splice did founder-like work — thesis, MVP, customers, recruiting — and charges no ongoing fees.",
            "A Founder-Slot Admission Memo gates every slot, so no one is a phantom founder.",
          ]}
        />
        <div>
          <div className="mb-3 font-mono text-[9px] tracking-splice-wide uppercase text-muted-foreground/55">
            Founders stay majority through Series A
          </div>
          <Matrix
            headers={["Holder", "Formation", "Post-seed", "Post-A"]}
            rows={[
              ["Founder slots (×2)", "67%", "43.6%", "32.7%"],
              ["Splice (retained)", "26%", "16.9%", "12.7%"],
              ["LP sidecar", "7%", "4.6%", "3.4%"],
            ]}
            accentCol={1}
          />
        </div>
      </div>
    </Slide>
  );
}

/* 8 — Decision tree */
export function Studio_DecisionSlide(props: SlideProps) {
  const steps: [string, string][] = [
    ["Is the product core parent infrastructure?", "Yes → Model 2"],
    ["Would spinning it out weaken the Production OS / kernel?", "Yes → Model 2"],
    ["Is there a credible founder who can own it — psychologically and operationally?", "No → keep going"],
    ["Did that founder originate it, or join before Splice-built proof?", "Yes → Model 1"],
    ["Did Splice build the MVP and carry it through infancy?", "Yes → Model 3"],
    ["Too early for great founders now, but founder-led later?", "Yes → Model 3"],
    ["Direct parent value without taxing portfolios?", "Yes → Model 2 / else pause"],
    ["Would downstream VCs accept the resulting cap table?", "No → revise or don't form"],
  ];
  return (
    <Slide id="studio-decision" module="04 · classification" {...props}>
      <SlideTitle>Every opportunity is classified before any build.</SlideTitle>
      <Lead>
        A written decision tree — run before material work begins — picks the
        model. Flexibility, governed.
      </Lead>
      <div className="mt-9 space-y-2.5">
        {steps.map(([q, out], i) => (
          <div
            key={i}
            className="flex items-start gap-4 border-l-2 border-accent/30 py-1 pl-4"
          >
            <span className="mt-0.5 w-5 shrink-0 font-mono text-[10px] text-accent/55">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1 text-sm text-foreground/80">{q}</span>
            <span className="mt-0.5 whitespace-nowrap font-mono text-[10px] tracking-splice-wide uppercase text-foreground/55">
              {out}
            </span>
          </div>
        ))}
      </div>
    </Slide>
  );
}

/* 9 — Founder-first by rule */
export function Studio_FounderFirstSlide(props: SlideProps) {
  return (
    <Slide id="studio-founder-first" module="05 · founder-first" {...props}>
      <SlideTitle>Founder-first, by rule — not by promise.</SlideTitle>
      <div className="mt-9 max-w-[820px]">
        <Points
          items={[
            "Every spinout is VC-fundable from day one: founder majority, clean cap table, independent IP, no related-party drag.",
            "Studio common stays in the 12–22% lane (22–30% only for heavy builds). Above ~30–35% a company starts to look like a holding-company asset — we don't cross it.",
            "No platform tax. Splice is paid in equity, tokens, sidecars, and pro-rata — never recurring fees on a company's burn.",
            "Model 3 slots vest into real founder common with real authority and standard vesting, gated by a Founder-Slot Admission Memo.",
          ]}
        />
      </div>
    </Slide>
  );
}

/* 10 — IP boundary */
export function Studio_IPSlide(props: SlideProps) {
  return (
    <Slide id="studio-ip" module="06 · ip boundary" {...props}>
      <SlideTitle>Parent owns the machine. The spinout owns its product.</SlideTitle>
      <Lead>
        A clean IP line is what lets spinouts raise independently — and what
        protects Splice&apos;s compounding asset.
      </Lead>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Box kicker="Splice owns" title="The reusable machine" body="Venture Production OS, evals, memory, provenance, the Web4 finance kernel — licensed to spinouts narrowly, no-fee or at-cost." accent />
        <Box kicker="Spinout owns" title="The product" body="Product-specific code, brand, customer contracts, and the IP a downstream VC needs to underwrite." />
      </div>
      <p className="mt-6 text-sm text-foreground/60">
        Three memory zones keep it clean: company-private (raw data, code,
        pipeline) · studio-shared abstracted (de-identified, evaluated learning)
        · public (open standards, benchmarks).
      </p>
    </Slide>
  );
}

/* 11 — Governance */
export function Studio_GovernanceSlide(props: SlideProps) {
  return (
    <Slide id="studio-governance" module="07 · governance" {...props}>
      <SlideTitle>Flexibility is only valuable if it&apos;s rules-based.</SlideTitle>
      <Lead>
        The toggle is governed — so it never looks arbitrary, opportunistic, or
        self-serving.
      </Lead>
      <div className="mt-9 max-w-[820px]">
        <Points
          items={[
            "Every product gets a one-page Model Selection Memo before material build begins.",
            "A Model Selection Committee approves the model; the board approves incorporation, IP transfer, LP grants, and founder-slot issuance.",
            "A Model Registry tracks each product's model, cap table, IP schedule, conversions, and approvals — diligence-ready.",
            "A written related-party policy governs every toggle: disclosure, fairness review, affected-party consent, no retroactive changes.",
          ]}
        />
      </div>
    </Slide>
  );
}

/* 12 — What downstream VCs see */
export function Studio_DiligenceSlide(props: SlideProps) {
  return (
    <Slide id="studio-diligence" module="08 · diligence" {...props}>
      <SlideTitle>What downstream VCs see.</SlideTitle>
      <div className="mt-8">
        <QAGrid
          items={[
            { q: "Are you a fund or a company?", a: "Two separated ledgers. OpCo earns common for creation; the Fund invests cash at Series A." },
            { q: "Is 26% (Model 3) too much?", a: "Only where Splice originated, built the MVP, and carried early risk — with no ongoing fees. Otherwise it's Model 1." },
            { q: "Is this an agency?", a: "No. Splice is paid in equity, IP, and spinout economics — never labor or platform fees." },
            { q: "Are these phantom founders?", a: "Slots vest into real founder common with real authority, gated by an admission memo." },
            { q: "Will LP stakes clutter the cap table?", a: "LP exposure sits in one sidecar/SPV — passive, disclosed, non-controlling." },
            { q: "Will spinouts depend on Splice?", a: "Clean IP, graduation rules, and no mandatory infrastructure use — independence by design." },
          ]}
        />
      </div>
    </Slide>
  );
}

/* 13 — Why it strengthens the studio */
export function Studio_CloseSlide(props: SlideProps) {
  return (
    <Slide id="studio-close" module="09 · why it works" accent {...props}>
      <SlideTitle>One studio. Three models. One rule book.</SlideTitle>
      <Lead>
        Each model strengthens the studio in a different way — and the mix is
        what carries the valuation.
      </Lead>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <Box kicker="Model 1" title="Repeatability" body="Many clean, founder-led launches prove the formation engine works." accent />
        <Box kicker="Model 2" title="Platform / IP value" body="Parent-owned infrastructure investors can underwrite directly — beyond retained NAV." accent />
        <Box kicker="Model 3" title="Formation alpha" body="Higher ownership in the Splice-originated companies most likely to break out." accent />
      </div>
      <div className="mt-10 border-t border-surface-border pt-7">
        <p className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground">
          A single fixed model can&apos;t handle all three. A rules-based,
          toggleable one can.
        </p>
        <div className="mt-5 flex items-center gap-3">
          <AccentRule />
          <span className="font-mono text-[10px] tracking-splice-wide uppercase text-muted-foreground/55">
            Splice Labs · incubation architecture
          </span>
        </div>
      </div>
    </Slide>
  );
}
