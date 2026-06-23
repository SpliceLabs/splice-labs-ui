/**
 * Splice Labs — The Harness Is the Asset (strongman deck)
 *
 * Hardened strongman case from the harness-IP / harness-GDP corpus
 * (agentic_harness_as_valuable_ip, bullcase_harness_production_ip_memory_ip,
 * harness_gdp_research_prompt, MEMO_02_MEMORY_AS_IP, harness_patentability_
 * rubric, human_knowhow_as_ip_moat, harness_brain_telemetry_skills_ip) and
 * the skeptical commons memo. One thesis, two pillars, one flywheel:
 * the harness produces measurable output (Harness GDP) and is defensible IP.
 * Every claim is the conditional, diligence-proof version — the guardrails
 * are the persuasion.
 */
import { Slide } from "./SlideComponents";
import { Eyebrow, SlideTitle, Lead, AccentRule } from "./DeckScaffold";
import { Box, CompareTable, Flow, Matrix, Points, StatTile } from "./DeckContent";

export const TOTAL_SLIDES_HARNESS = 16;

type SlideProps = { slideNumber: number; totalSlides: number };

/* 1 — Cover */
export function Harness_CoverSlide(props: SlideProps) {
  return (
    <Slide id="harness-cover" module="thesis · confidential" accent {...props}>
      <div className="max-w-[920px]">
        <Eyebrow>Splice Labs · the strongman case</Eyebrow>
        <SlideTitle className="mt-6 text-4xl md:text-6xl">
          The harness is the asset.
        </SlideTitle>
        <Lead>
          A governed agentic harness produces output we can measure — Harness
          GDP — and is defensible IP that <em>appreciates</em> with use. One
          appreciating production asset, argued at its strongest and hardened
          against diligence.
        </Lead>
      </div>
    </Slide>
  );
}

/* 2 — Rent vs own */
export function Harness_RentOwnSlide(props: SlideProps) {
  return (
    <Slide id="harness-rent-own" module="01 · rent vs own" {...props}>
      <SlideTitle>Subscriptions rent intelligence. A harness owns production.</SlideTitle>
      <Lead>
        The harness doesn&apos;t win on a better model — models change. It wins
        by organizing models, tools, memory, procedure, and review into a
        durable production system.
      </Lead>
      <div className="mt-9">
        <CompareTable
          leftTitle="Rent intelligence"
          rightTitle="Own production capacity"
          rows={[
            ["Session output that vanishes", "Durable artifacts in version control"],
            ["Prompting from scratch each time", "Versioned, tested skills"],
            ["Per-user chat memory", "Governed memory namespaces"],
            ["Activity logs", "A production ledger — measured yield"],
            ["A subscription cost", "A compounding, owned asset"],
          ]}
        />
      </div>
    </Slide>
  );
}

/* 3 — What a harness is */
export function Harness_WhatSlide(props: SlideProps) {
  return (
    <Slide id="harness-what" module="02 · what a harness is" {...props}>
      <SlideTitle>A harness is operating discipline, not a feature.</SlideTitle>
      <Lead>
        The model creates capability; the harness turns it into governed work
        through five disciplines.
      </Lead>
      <div className="mt-9 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Box kicker="01" title="Evidence-anchoring" body="Outputs trace to source; no unsupported claims." />
        <Box kicker="02" title="Fail-closed on ambiguity" body="When unsure, the system stops — it doesn't guess." />
        <Box kicker="03" title="Separated approval rights" body="Who executes and who approves are different roles." />
        <Box kicker="04" title="Phase gates" body="Named approvals between research, draft, review, deploy." />
        <Box kicker="05" title="Durable artifacts" body="Work lands in version control, not a chat scrollback." />
        <Box kicker="→" title="The result" body="Auditable, repeatable, ownable work product." accent />
      </div>
    </Slide>
  );
}

/* 4 — The operating stack */
export function Harness_StackSlide(props: SlideProps) {
  return (
    <Slide id="harness-stack" module="03 · the operating stack" {...props}>
      <SlideTitle>Every layer is an owned asset.</SlideTitle>
      <div className="mt-8">
        <Matrix
          headers={["Owned layer", "Why it's an asset"]}
          rows={[
            ["Execution kernel", "The governed runtime that routes, gates, and enforces"],
            ["Artifact model", "Durable, versioned, source-linked work product"],
            ["Skill runtime", "Versioned, tested procedures — not prompt snippets"],
            ["Memory architecture", "Governed namespaces that compound with use"],
            ["Governance & lineage", "Approvals, provenance, declassification, withdrawal"],
            ["Telemetry", "Accumulated traces of real executions — hard to copy"],
            ["Domain packs + performance data", "Reusable domain knowledge + proprietary eval history"],
          ]}
        />
      </div>
    </Slide>
  );
}

/* 5 — Two pillars, one flywheel */
export function Harness_FlywheelSlide(props: SlideProps) {
  return (
    <Slide id="harness-flywheel" module="04 · the flywheel" accent {...props}>
      <SlideTitle>Two pillars, one flywheel.</SlideTitle>
      <Lead>
        Output and ownership are the same asset seen twice. Production creates
        artifacts, artifacts become memory, memory improves skills, better
        skills raise production — and proven production strengthens the IP.
      </Lead>
      <div className="mt-8">
        <Flow
          steps={[
            "governed artifacts",
            "measured in the ledger",
            "artifacts → memory",
            "memory → better skills",
            "better, cheaper work",
            "higher net yield",
            "proves value → strengthens IP",
          ]}
        />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Box kicker="Production" title="proves the value" body="Harness Production Accounting (GDP)." accent />
        <Box kicker="IP" title="protects the system" body="Trade secret, data moat, governance, narrow patents." accent />
        <Box kicker="Memory" title="compounds the advantage" body="Governed memory appreciates with use." accent />
      </div>
    </Slide>
  );
}

/* 6 — Harness GDP */
export function Harness_GDPSlide(props: SlideProps) {
  return (
    <Slide id="harness-gdp" module="05 · harness gdp" {...props}>
      <SlideTitle>Harness GDP: the output, measured as value.</SlideTitle>
      <Lead>
        The annualized productive value a governed harness generates — accepted,
        useful, governed output, <em>not</em> agent activity.
      </Lead>
      <div className="mt-8 border border-surface-border bg-surface/30 px-6 py-5">
        <p className="font-mono text-[13px] leading-relaxed text-foreground/85">
          Harness GDP = time saved + simulated labor replaced + net-new output +
          quality / rework avoided + cycle-time compression + governance value
          <span className="text-accent/70"> − </span>
          supervision − compute − harness-caused rework − discarded output
        </p>
      </div>
      <div className="mt-8 grid items-center gap-8 md:grid-cols-[1fr_1.4fr]">
        <StatTile value="260 hrs" label="one 30-min/week skill × 10 = 6.5 work weeks returned per year" />
        <p className="text-sm leading-relaxed text-foreground/65">
          The intuition is simple; the framework makes it defensible — gross vs.
          net, confidence-adjusted, governance-adjusted, attribution-weighted.
        </p>
      </div>
    </Slide>
  );
}

/* 7 — The six yield classes */
export function Harness_YieldClassesSlide(props: SlideProps) {
  return (
    <Slide id="harness-yield-classes" module="06 · yield classes" {...props}>
      <SlideTitle>Six kinds of yield — the durable ones aren&apos;t labor savings.</SlideTitle>
      <div className="mt-9 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Box kicker="Displacement" title="Work a human would have done" body="The obvious, smallest, most-contested class." />
        <Box kicker="Capability" title="Work that wouldn't exist" body="The alternative isn't 'a human would have' — it's 'this never gets done.'" accent />
        <Box kicker="Acceleration" title="Cycle-time compression" body="A 10-day research pack delivered in one." />
        <Box kicker="Quality / rework" title="Errors and redo avoided" body="Fewer defects, less downstream cleanup." />
        <Box kicker="Governance" title="Defensibility itself" body="The buyer buys audit trails and provenance, not just speed." accent />
        <Box kicker="Memory" title="Compounding reuse" body="Each governed object makes the next run cheaper." />
      </div>
    </Slide>
  );
}

/* 8 — The yield statement */
export function Harness_YieldStatementSlide(props: SlideProps) {
  return (
    <Slide id="harness-yield-statement" module="07 · the yield statement" {...props}>
      <SlideTitle>We report net yield in ranges — not a vanity number.</SlideTitle>
      <div className="mt-8 grid items-start gap-10 md:grid-cols-[1.3fr_1fr]">
        <Matrix
          headers={["Monthly", "Low", "Base", "High"]}
          rows={[
            ["Gross production value", "$77K", "$163K", "$280K"],
            ["− Harness cost", "−$25K", "−$25K", "−$25K"],
            ["− Harness debt / rework", "incl.", "incl.", "incl."],
            ["Net harness yield", "$47K", "$123K", "$220K"],
          ]}
          accentCol={2}
        />
        <div className="space-y-6">
          <StatTile value="5 : 1" label="output leverage — simulated human cost ÷ harness cost" />
          <StatTile value="10 : 1" label="time compression — 10-day work delivered in one" />
        </div>
      </div>
      <p className="mt-6 text-sm text-foreground/60">
        Single-point claims are secondary; ranges with explicit deductions are
        primary. That is what survives a CFO.
      </p>
    </Slide>
  );
}

/* 9 — Measured honestly */
export function Harness_MeasuredSlide(props: SlideProps) {
  return (
    <Slide id="harness-measured" module="08 · measured honestly" {...props}>
      <SlideTitle>The framework is credible because it refuses to overclaim.</SlideTitle>
      <Lead>
        An &ldquo;Agent-Secretary of Commerce&rdquo; exists to keep the
        organization from lying to itself — via forked review, adversarial
        review, append-only records, and confidence bands.
      </Lead>
      <div className="mt-9 grid gap-x-10 gap-y-2 md:grid-cols-2">
        <Points
          items={[
            "Net of cost — minus review, rework, failed runs, compute, harness debt.",
            "Confidence-adjusted — every estimate carries a band, never a point.",
          ]}
        />
        <Points
          items={[
            "Governance-adjusted — reward source-linked, reviewed, accepted output.",
            "Attribution-weighted — no double-counting; credit only vs. a counterfactual.",
          ]}
        />
      </div>
      <p className="mt-7 border-l-2 border-accent/40 pl-5 text-sm text-foreground/70">
        Don&apos;t count hours saved unless the work would have happened anyway
        and the freed capacity was redeployed. Time saved ≠ value created.
      </p>
    </Slide>
  );
}

/* 10 — Harness as IP */
export function Harness_IPSlide(props: SlideProps) {
  return (
    <Slide id="harness-ip" module="09 · harness as ip" {...props}>
      <SlideTitle>Defensible across five overlapping regimes.</SlideTitle>
      <div className="mt-8">
        <Matrix
          headers={["Regime", "Strength", "What it protects"]}
          rows={[
            ["Trade secret + private corpus", "Strongest", "Confidential methods & outcome-linked know-how"],
            ["Data & eval moat", "Strong", "Telemetry, eval histories, failure libraries"],
            ["Governance & lineage", "Strong", "Declassification, provenance, withdrawal, curation"],
            ["Copyright", "Floor", "Code, schemas, prompts, written skills"],
            ["Patent", "Narrow", "Specific qualifying mechanisms only"],
          ]}
          accentCol={1}
        />
      </div>
      <p className="mt-6 text-sm text-foreground/60">
        The claim ladder: not &ldquo;we have agents,&rdquo; not &ldquo;the
        harness is our IP&rdquo; — but &ldquo;we own a governed agentic OS that
        produces measurable yield, improves through proprietary telemetry,
        accumulates reusable memory, and contains confidential methods a
        competitor cannot cheaply reproduce.&rdquo;
      </p>
    </Slide>
  );
}

/* 11 — What's actually patentable */
export function Harness_PatentSlide(props: SlideProps) {
  return (
    <Slide id="harness-patent" module="10 · patentability" {...props}>
      <SlideTitle>We don&apos;t patent the category. We hold specific mechanisms.</SlideTitle>
      <div className="mt-9 grid items-start gap-10 md:grid-cols-2">
        <div>
          <div className="mb-4 font-mono text-[10px] tracking-splice-wide uppercase text-muted-foreground/55">
            Not patentable — common patterns
          </div>
          <Points
            items={[
              "Markdown memory, RAG, human-in-the-loop, role-based agents, prompt libraries.",
              "Any broad claim over “agents + tools + memory + review.”",
            ]}
          />
        </div>
        <div>
          <div className="mb-4 font-mono text-[10px] tracking-splice-wide uppercase text-accent/60">
            File only what clears the kill-gates (score ≥ 70)
          </div>
          <Points
            items={[
              "Policy-scoped stale-memory retrieval controller.",
              "Pre-execution comprehension verifier.",
              "Source-linked provenance graph with publication gates.",
              "Fail-closed execution controller; telemetry-driven skill promotion.",
            ]}
          />
        </div>
      </div>
      <p className="mt-6 text-sm text-foreground/60">
        Claims are technical, not economic: &ldquo;reduces context-assembly
        tokens 42% while preserving source-link accuracy&rdquo; beats
        &ldquo;saves employee time.&rdquo;
      </p>
    </Slide>
  );
}

/* 12 — Memory as appreciating IP */
export function Harness_MemorySlide(props: SlideProps) {
  return (
    <Slide id="harness-memory" module="11 · memory as ip" accent {...props}>
      <SlideTitle>Software depreciates. Governed memory appreciates.</SlideTitle>
      <Lead>
        A skill is versioned text + a continuously-updated memory namespace —
        behavior isn&apos;t fixed at release. It appreciates per-user,
        cross-user, and through curation.
      </Lead>
      <div className="mt-9 grid items-start gap-10 md:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <StatTile value="−91% / −90%" label="selective memory: p95 latency and tokens cut, for ~6 pts accuracy (LOCOMO)" />
          <p className="text-sm leading-relaxed text-foreground/65">
            No unauditable compaction — artifacts, not lossy summaries — is the
            enterprise-audit edge competitors using summarization can&apos;t
            match.
          </p>
        </div>
        <div className="border-l-2 border-accent/40 pl-5">
          <div className="mb-2 font-mono text-[10px] tracking-splice-wide uppercase text-accent/60">
            The honest half
          </div>
          <p className="text-sm leading-relaxed text-foreground/75">
            Appreciation is claimed only <strong className="font-semibold text-foreground">net of curation, staleness, and incident cost</strong>. A depreciation
            model is mandatory: freshness dates, quarantine, withdrawal cascades.
            Stale memory doesn&apos;t fade — it becomes confidently wrong.
          </p>
        </div>
      </div>
    </Slide>
  );
}

/* 13 — The moat */
export function Harness_MoatSlide(props: SlideProps) {
  return (
    <Slide id="harness-moat" module="12 · the moat" {...props}>
      <SlideTitle>The model knows the manual. The company knows the machine.</SlideTitle>
      <Lead>
        Models commoditize public knowledge. Private operating know-how —
        captured, structured, telemetry-validated — is the moat.
      </Lead>
      <div className="mt-9 max-w-[820px]">
        <Points
          items={[
            "Telemetry is proprietary learning: a competitor can copy the visible architecture but not the accumulated traces of thousands of real executions.",
            "Skills are productized expertise — tested inputs, outputs, failure modes, evals — not prompt snippets.",
            "Trade-secret protection holds only if you behave secret: NDAs, invention assignment, access controls, offboarding. A departing expert removes a contributor, not the compounding corpus.",
          ]}
        />
      </div>
    </Slide>
  );
}

/* 14 — Claim discipline */
export function Harness_ClaimsSlide(props: SlideProps) {
  const cols: { head: string; tone: string; items: string[] }[] = [
    {
      head: "Say today",
      tone: "text-accent/70",
      items: [
        "“Operational leverage, measured net of cost, in ranges.”",
        "“We own a governed kernel, telemetry, domain packs, and confidential know-how.”",
        "“The moat is shared evaluated learning, not shared prompts.”",
      ],
    },
    {
      head: "Needs proof first",
      tone: "text-foreground/55",
      items: [
        "“We have data / knowledge network effects.”",
        "“Memory is appreciating IP.”",
        "Any specific patent grant (after kill-gates + counsel).",
      ],
    },
    {
      head: "Never say",
      tone: "text-foreground/40",
      items: [
        "“The harness gets smarter every run.”",
        "“Memory is an appreciating balance-sheet asset.”",
        "“Time saved = value created.” / “We patented our harness.”",
      ],
    },
  ];
  return (
    <Slide id="harness-claims" module="13 · claim discipline" {...props}>
      <SlideTitle>We say less, and prove more.</SlideTitle>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {cols.map((c) => (
          <div key={c.head} className="border-t border-surface-border pt-4">
            <div className={`mb-4 font-mono text-[10px] tracking-splice-wide uppercase ${c.tone}`}>
              {c.head}
            </div>
            <div className="space-y-3">
              {c.items.map((it, i) => (
                <p key={i} className="text-sm leading-relaxed text-foreground/75">
                  {it}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

/* 15 — Diligence Q&A */
export function Harness_DiligenceSlide(props: SlideProps) {
  return (
    <Slide id="harness-diligence" module="14 · diligence" {...props}>
      <SlideTitle>The hard questions, answered.</SlideTitle>
      <div className="mt-8">
        <Matrix
          headers={["Objection", "Hardened answer"]}
          rows={[
            ["“Harness GDP is time-saved theater.”", "Headline is Net Yield in ranges, net of cost; only accepted, reused, source-linked output counts."],
            ["“You can't patent a harness.”", "Correct — patent is the thinnest layer; we file only mechanisms that clear kill-gates."],
            ["“This is consulting / leverage, not IP.”", "The IP (kernel, telemetry, domain packs, know-how) exists independent of any network claim."],
            ["“Attribution is unprovable.”", "Counterfactuals required — ablation, holdout, negative controls; confidence intervals, never point lift."],
            ["“Memory depreciates, not appreciates.”", "Depreciation model is mandatory; appreciation claimed only net of staleness and incident cost."],
            ["“It evaporates when staff leave.”", "The owned, governed corpus stays; a departing expert removes a contributor, not the asset."],
          ]}
        />
      </div>
    </Slide>
  );
}

/* 16 — Close */
export function Harness_CloseSlide(props: SlideProps) {
  return (
    <Slide id="harness-close" module="15 · synthesis" accent {...props}>
      <SlideTitle>A governed harness is an appreciating production asset.</SlideTitle>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-[1.1fr_1fr]">
        <Points
          items={[
            "Production accounting proves the value (Harness GDP, net and in ranges).",
            "IP protects the system (trade secret + data moat + governance; copyright floor; narrow patents).",
            "Memory compounds the advantage — where it's governed against staleness.",
          ]}
        />
        <StatTile value="produce · measure · own" label="a serious harness does all three at once — and converts them into compounding advantage" />
      </div>
      <div className="mt-10 border-t border-surface-border pt-7">
        <p className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground">
          A measurable, ownable, memory-bearing system for compounding human
          expertise into auditable work product.
        </p>
        <div className="mt-5 flex items-center gap-3">
          <AccentRule />
          <span className="font-mono text-[10px] tracking-splice-wide uppercase text-muted-foreground/55">
            Splice Labs · the harness is the asset
          </span>
        </div>
      </div>
    </Slide>
  );
}
