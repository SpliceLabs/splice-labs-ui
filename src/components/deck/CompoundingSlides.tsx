/**
 * Splice Labs — From Compounding to Network Effects
 *
 * Thesis deck converted from two research memos: the skeptical harness-
 * commons network-effects memo and its adversarial "AI-native compounding"
 * sister memo. Position: lead with compounding (defensible at every layer);
 * treat network effects as an earned proof tier; the bridge is a governed
 * cross-harness projection architecture. Aaron Harris discipline.
 */
import { Slide } from "./SlideComponents";
import { Eyebrow, SlideTitle, Lead, AccentRule } from "./DeckScaffold";
import { Box, Flow, Matrix, Points, StatTile } from "./DeckContent";

export const TOTAL_SLIDES_COMPOUNDING = 15;

type SlideProps = { slideNumber: number; totalSlides: number };

/* 1 — Cover */
export function Comp_CoverSlide(props: SlideProps) {
  return (
    <Slide id="comp-cover" module="thesis · confidential" accent {...props}>
      <div className="max-w-[920px]">
        <Eyebrow>Splice Labs · how we think about defensibility</Eyebrow>
        <SlideTitle className="mt-6 text-4xl md:text-6xl">
          From compounding to network effects.
        </SlideTitle>
        <Lead>
          How an AI-native company designs cross-harness systems where work
          compounds into a moat — and earns network effects as a proof tier,
          not a premise.
        </Lead>
      </div>
    </Slide>
  );
}

/* 2 — The trap */
export function Comp_TrapSlide(props: SlideProps) {
  return (
    <Slide id="comp-trap" module="01 · the trap" {...props}>
      <SlideTitle>&ldquo;We have network effects&rdquo; is usually theater.</SlideTitle>
      <Lead>
        &ldquo;Every company uses the same AI tools, so we have network
        effects&rdquo; is the claim a sharp investor dismantles in one question.
      </Lead>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-2">
        <Points
          items={[
            "A workspace that gets better for the same customer is personalization — not a network effect.",
            "A studio that launches faster is operational leverage — not a network effect.",
            "A shared skill library is an economy of scope — not a network effect.",
          ]}
        />
        <div className="border-l-2 border-accent/40 pl-6">
          <p className="text-base md:text-lg leading-relaxed text-foreground/80">
            The honest, stronger claim is{" "}
            <strong className="font-semibold text-foreground">
              AI-native compounding
            </strong>
            . It is true at every scale, and far harder to dismiss than
            network-effect theater.
          </p>
        </div>
      </div>
    </Slide>
  );
}

/* 3 — Two claims */
export function Comp_TwoClaimsSlide(props: SlideProps) {
  return (
    <Slide id="comp-two-claims" module="02 · two different claims" {...props}>
      <SlideTitle>Compounding is the premise. Network effects are earned.</SlideTitle>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Box
          kicker="The claim we make now"
          title="AI-native compounding"
          body="Work today becomes a reusable, evaluated, versioned capability object that measurably improves future work — net of maintenance and governance cost. True at every scale."
          accent
        />
        <Box
          kicker="The claim we earn later"
          title="Network effect"
          body="One runtime's approved learning measurably improves a DIFFERENT runtime's outcome — recurring and net-positive. A subset of compounding, proven with evidence."
        />
      </div>
      <p className="mt-8 text-base md:text-lg text-foreground/75">
        Put plainly:{" "}
        <strong className="font-semibold text-foreground">
          shared agents are not the moat — shared evaluated learning is.
        </strong>
      </p>
    </Slide>
  );
}

/* 4 — The unit */
export function Comp_UnitSlide(props: SlideProps) {
  return (
    <Slide id="comp-unit" module="03 · the unit" {...props}>
      <SlideTitle>The unit of compounding is the capability object.</SlideTitle>
      <Lead>
        Not runs. Not raw memory. Compounding happens only when work becomes a
        durable, reusable object — and that object is reused.
      </Lead>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Box title="Skills & workflow patches" body="Reusable procedures with triggers, scope, and version." />
        <Box title="Evals & failure-mode cards" body="A failure becomes a test that prevents the next one." />
        <Box title="Memory projections" body="De-identified, approved patterns — not raw tenant data." />
        <Box title="Domain packs" body="Reusable domain knowledge: compliance notes, buyer maps." />
        <Box title="Governance rules" body="Incidents become safer defaults and permission gates." />
        <Box title="Source-linked artifacts" body="Templates and claim graphs reusable as evidence." />
      </div>
    </Slide>
  );
}

/* 5 — The loop */
export function Comp_LoopSlide(props: SlideProps) {
  return (
    <Slide id="comp-loop" module="04 · the loop" {...props}>
      <SlideTitle>One-off work becomes operating infrastructure.</SlideTitle>
      <Lead>
        The compounding loop industrializes what great operators do by hand.
      </Lead>
      <div className="mt-10">
        <Flow
          steps={[
            "one-off work",
            "captured trace",
            "extracted pattern",
            "evaluated object",
            "registered & routed",
            "reused",
            "measured lift",
          ]}
        />
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Box kicker="The pattern to import" title="Thin harness, fat skills, fat memory, hard evals" body="Borrowed from personal AI-native operating systems: the harness routes; the skills and memory carry the value; evals keep it honest." />
        <Box kicker="What enterprise & studio use must add" title="Hard boundaries, hard lineage, hard depreciation, hard attribution" body="Cross-tenant context turns into privacy, IP, and competitive-data risk without them." accent />
      </div>
    </Slide>
  );
}

/* 6 — The stack */
export function Comp_StackSlide(props: SlideProps) {
  return (
    <Slide id="comp-stack" module="05 · the compounding stack" {...props}>
      <SlideTitle>Compounding has layers. Only the top ones are network effects.</SlideTitle>
      <div className="mt-8">
        <Matrix
          headers={["Layer", "What compounds", "Network effect?"]}
          rows={[
            ["Private memory", "A runtime improves for the same customer", "No — personalization"],
            ["Skills / evals / workflows", "Repeated work becomes reusable, tested objects", "No — by itself"],
            ["Governance", "Incidents become safer defaults", "No — by itself"],
            ["Domain packs", "Reusable domain knowledge improves related work", "Possible across participants"],
            ["Portfolio", "One company's approved learning improves another", "Yes — if recurring & net-positive"],
            ["Marketplace", "More contributors improve discovery & supply", "Yes — if two-sided dynamics emerge"],
            ["Protocol / developer", "External complements reinforce a standard", "Yes — if external adoption grows"],
          ]}
        />
      </div>
      <p className="mt-6 text-sm text-foreground/60">
        A studio can be enormously valuable at the lower layers before it proves
        the top ones — which is exactly why compounding leads and network effects
        follow.
      </p>
    </Slide>
  );
}

/* 7 — Cross-harness architecture (centerpiece) */
export function Comp_ArchitectureSlide(props: SlideProps) {
  return (
    <Slide id="comp-architecture" module="06 · cross-harness design" accent {...props}>
      <SlideTitle>The bridge: a governed projection architecture.</SlideTitle>
      <Lead>
        Cross-harness compounding is not &ldquo;all data flows into one
        brain.&rdquo; It is a governed pipeline that moves <em>projected
        learning</em> between runtimes — never raw tenant data.
      </Lead>
      <div className="mt-10 grid gap-4 md:grid-cols-4">
        <Box kicker="01 · per tenant" title="Private runtimes" body="Tenant-isolated memory, agents, data, decision logs, local evals." />
        <Box kicker="02 · gate" title="Governed abstraction" body="De-identify, classify, legal/privacy/IP review, human approval, withdrawal paths." accent />
        <Box kicker="03 · shared" title="Harness commons" body="Skill, eval, workflow, memory-projection & domain registries — approved objects only." accent />
        <Box kicker="04 · plane" title="Eval & governance" body="Lineage, audit, attribution, regression & risk dashboards." />
      </div>
      <p className="mt-6 font-mono text-[11px] tracking-splice-wide uppercase text-accent/60">
        Principle: the commons receives projected learning, not raw tenant data.
      </p>
    </Slide>
  );
}

/* 8 — The formal test */
export function Comp_TestSlide(props: SlideProps) {
  return (
    <Slide id="comp-test" module="07 · the test" {...props}>
      <SlideTitle>When does compounding become a network effect?</SlideTitle>
      <Lead>
        Only when a contribution from one runtime creates measured value for a{" "}
        <em>different</em> one, after every cost.
      </Lead>
      <div className="mt-9 border border-surface-border bg-surface/30 px-6 py-5">
        <p className="font-mono text-sm md:text-base text-foreground/90">
          E[ ΔV<sub>j</sub> | reuse( G(C<sub>i</sub>) ) ] − E[ ΔK ] &gt; 0
          &nbsp;&nbsp;for j ≠ i
        </p>
        <p className="mt-3 text-sm text-foreground/60">
          The expected lift to a non-origin runtime <em>j</em> from reusing
          runtime <em>i</em>&apos;s governed learning, minus governance/curation
          cost, is positive — and recurs.
        </p>
      </div>
      <div className="mt-8 grid gap-x-10 gap-y-2 md:grid-cols-2">
        <Points
          items={[
            "Cross-participant externality + governed portability",
            "Reusable object + independent evaluation",
          ]}
        />
        <Points
          items={[
            "Credible attribution + positive net value",
            "Recurrence + contributor incentive + defensibility",
          ]}
        />
      </div>
    </Slide>
  );
}

/* 9 — Flywheel and brake */
export function Comp_FlywheelSlide(props: SlideProps) {
  return (
    <Slide id="comp-flywheel" module="08 · flywheel & brake" {...props}>
      <SlideTitle>The flywheel is only real if the brake is real.</SlideTitle>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Box
          kicker="The good flywheel"
          title="Evidence → better objects → trust"
          body="More serious work → more traces, failures, review decisions → more evaluated objects → better future work → more usage."
          accent
        />
        <Box
          kicker="The bad flywheel"
          title="Noise → contamination → distrust"
          body="More work → noisy memory, overfit skills, stale assumptions → confident-wrong outputs → higher review burden → stalled adoption."
        />
      </div>
      <div className="mt-8">
        <Points
          items={[
            "Brakes are first-class: quarantine, rollback, deprecation, confidence states, independent evals, human gates, regression suites.",
            <strong key="k" className="font-semibold text-foreground">
              A system that compounds without brakes is not an asset — it is a
              liability with momentum.
            </strong>,
          ]}
        />
      </div>
    </Slide>
  );
}

/* 10 — Memory */
export function Comp_MemorySlide(props: SlideProps) {
  return (
    <Slide id="comp-memory" module="09 · memory" {...props}>
      <SlideTitle>Memory appreciates — and depreciates.</SlideTitle>
      <Lead>
        &ldquo;Memory is an appreciating asset&rdquo; is half the truth. Memory
        also goes stale, contradicts itself, or turns toxic — so it is managed as
        a living asset class.
      </Lead>
      <div className="mt-8">
        <Matrix
          headers={["State", "Meaning", "Action"]}
          rows={[
            ["Fresh / mature", "Recently or repeatedly validated", "Usable, high confidence"],
            ["Stale-risk", "Time / domain / model change may have invalidated it", "Freshness check before use"],
            ["Contradicted", "A later source conflicts with it", "Require reconciliation"],
            ["Deprecated", "Superseded by a newer object", "Suppress except for history"],
            ["Quarantined / expunged", "Unsafe, contaminated, or legally restricted", "Block / remove + cascade withdrawals"],
          ]}
        />
      </div>
      <p className="mt-6 text-sm text-foreground/60">
        Net memory value = validated reuse + proven lift + risk reduction −
        curation − review − depreciation − incident/legal cost.
      </p>
    </Slide>
  );
}

/* 11 — Measurement */
export function Comp_MeasurementSlide(props: SlideProps) {
  return (
    <Slide id="comp-measurement" module="10 · measurement" {...props}>
      <SlideTitle>Measured honestly — or it&apos;s an inflation vector.</SlideTitle>
      <Lead>
        Value claims climb an evidence ladder. Assertion and &ldquo;time
        saved&rdquo; don&apos;t count; controlled lift does.
      </Lead>
      <div className="mt-8">
        <Matrix
          headers={["Tier", "Evidence", "Counts as"]}
          rows={[
            ["0–1", "Assertion / object was loaded or cited", "Exposure, not lift"],
            ["2–3", "Reviewer says it helped / reused in accepted work", "Provisional / reuse"],
            ["4–5", "Ablation or holdout vs. a control", "Controlled causal lift"],
            ["6", "Customer, market, or production validates it", "Highest-confidence lift"],
          ]}
          accentCol={3}
        />
      </div>
      <p className="mt-6 text-sm text-foreground/60">
        Net compounding yield = (reuse × lift × confidence × shareability ×
        freshness × attribution) − (creation + review + curation + governance +
        maintenance + regression + contamination). Never report gross yield
        without the deduction line.
      </p>
    </Slide>
  );
}

/* 12 — Boundaries */
export function Comp_BoundariesSlide(props: SlideProps) {
  return (
    <Slide id="comp-boundaries" module="11 · boundaries" {...props}>
      <SlideTitle>What makes cross-harness sharing legal and trusted.</SlideTitle>
      <Lead>
        Tenant isolation is the default. Cross-tenant compounding is an exception
        earned by review — across four zones.
      </Lead>
      <div className="mt-8">
        <Matrix
          headers={["Zone", "Default permission", "Claim type"]}
          rows={[
            ["Private runtime memory", "Isolated", "Personalization / private compounding"],
            ["Abstracted learning objects", "Restricted after approval", "Possible knowledge compounding"],
            ["Aggregate metrics", "Thresholded + privacy-protected", "Benchmark compounding"],
            ["Public / ecosystem", "Publishable after review", "Developer / protocol compounding"],
          ]}
        />
      </div>
      <p className="mt-6 text-sm text-foreground/60">
        Raw data, credentials, pricing, named-buyer feedback, and competitive-
        sensitive facts never cross by default — the IP claim is the doctrine,
        schemas, and governance process, not &ldquo;everything the harness
        touches.&rdquo;
      </p>
    </Slide>
  );
}

/* 13 — Proof ladder */
export function Comp_ProofSlide(props: SlideProps) {
  return (
    <Slide id="comp-proof" module="12 · proof ladder" {...props}>
      <SlideTitle>The proof ladder: 30 / 60 / 90.</SlideTitle>
      <Lead>
        The claim upgrades only when the evidence does. The bridge from
        compounding to a network effect is one concrete case.
      </Lead>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <Box kicker="Days 0–30" title="Instrument" body="Run-event schema, artifact & version IDs, review status, source links, the proposed-learning-object field." />
        <Box kicker="Days 31–60" title="Object cards & ablations" body="Skill/eval/memory cards, depreciation states, v1→v2 regression — show one object lifts future work vs. a baseline." />
        <Box kicker="Days 61–90" title="Cross-runtime proof" body="A declassified object from Runtime A measurably improves Runtime B — no prohibited data crosses." accent />
      </div>
      <p className="mt-6 text-sm text-foreground/60">
        Three such cases across distinct workflows, net-positive after
        governance cost, is the first defensible network-effect claim.
      </p>
    </Slide>
  );
}

/* 14 — Claim discipline */
export function Comp_ClaimsSlide(props: SlideProps) {
  const cols: { head: string; tone: string; items: string[] }[] = [
    {
      head: "Say today",
      tone: "text-accent/70",
      items: [
        "“Our moat is shared evaluated learning, not shared prompts.”",
        "“Network effects are a proof tier, not a premise.”",
        "“We measure net yield after governance cost.”",
      ],
    },
    {
      head: "Needs proof first",
      tone: "text-foreground/55",
      items: [
        "“We have data / knowledge network effects.”",
        "“The skill commons is a marketplace.”",
        "“Memory is appreciating IP.”",
      ],
    },
    {
      head: "Never say",
      tone: "text-foreground/40",
      items: [
        "“Every run improves the system.”",
        "“Network effects because everyone uses the same tools.”",
        "“The data compounds / the harness gets smarter.”",
      ],
    },
  ];
  return (
    <Slide id="comp-claims" module="13 · claim discipline" {...props}>
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

/* 15 — Close / the bridge */
export function Comp_CloseSlide(props: SlideProps) {
  return (
    <Slide id="comp-close" module="14 · the bridge" accent {...props}>
      <SlideTitle>We don&apos;t claim network effects. We engineer the system that earns them.</SlideTitle>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-[1fr_1.1fr]">
        <StatTile value="A → B" label="the canonical proof: one runtime's governed learning measurably lifts another, net of cost" />
        <Points
          items={[
            "Compounding is defensible today, at every layer of the stack.",
            "The cross-harness governed-projection architecture is the bridge.",
            "Network effects arrive as an earned upgrade — proven, not asserted.",
          ]}
        />
      </div>
      <div className="mt-10 border-t border-surface-border pt-7">
        <p className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground">
          A compounding system without brakes is a liability with momentum. A
          governed one is a moat.
        </p>
        <div className="mt-5 flex items-center gap-3">
          <AccentRule />
          <span className="font-mono text-[10px] tracking-splice-wide uppercase text-muted-foreground/55">
            Splice Labs · compounding → network effects
          </span>
        </div>
      </div>
    </Slide>
  );
}
