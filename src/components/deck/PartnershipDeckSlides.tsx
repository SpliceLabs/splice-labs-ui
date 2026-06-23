/**
 * Splice Labs — Partnership Model Deck (scaffold)
 *
 * Blank, premium slide set. Aaron Harris's discipline (one idea per slide,
 * legible, obvious) adapted to a partnership narrative: opportunity → model
 * → mechanics → value exchange → proof → terms → next steps. Content slots
 * are <Guide>/<Frame>/<Stat> placeholders.
 */
import { Slide } from "./SlideComponents";
import {
  AccentRule,
  Bullets,
  Eyebrow,
  Frame,
  Guide,
  Lead,
  PersonCard,
  SlideTitle,
  Stat,
} from "./DeckScaffold";

export const TOTAL_SLIDES_PARTNERSHIP = 10;

type SlideProps = { slideNumber: number; totalSlides: number };

/* 1 — Cover */
export function Part_CoverSlide(props: SlideProps) {
  return (
    <Slide id="part-cover" module="partnership · confidential" accent {...props}>
      <div className="max-w-[860px]">
        <Eyebrow>Splice Labs</Eyebrow>
        <SlideTitle className="mt-6 text-5xl md:text-7xl">Partnership Model</SlideTitle>
        <Lead>
          <Guide>one line — why partner with Splice, and what you build together</Guide>
        </Lead>
        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10px] tracking-splice-wide uppercase text-muted-foreground/50">
          <span>Prepared for</span>
          <Guide>partner name</Guide>
          <span className="text-surface-border">/</span>
          <Guide>contact · email</Guide>
        </div>
      </div>
    </Slide>
  );
}

/* 2 — The Opportunity */
export function Part_OpportunitySlide(props: SlideProps) {
  return (
    <Slide id="part-opportunity" module="01 · the opportunity" {...props}>
      <SlideTitle>The Opportunity</SlideTitle>
      <Lead>
        <Guide>the shared opening — what&apos;s on the table, and why now</Guide>
      </Lead>
      <div className="mt-12 grid items-start gap-10 md:grid-cols-[1.3fr_1fr]">
        <Bullets items={["the gap in the market", "why it's open now", "what's at stake"]} />
        <Stat label="opportunity size" />
      </div>
    </Slide>
  );
}

/* 3 — The Model */
export function Part_ModelSlide(props: SlideProps) {
  return (
    <Slide id="part-model" module="02 · the model" {...props}>
      <SlideTitle>The Model</SlideTitle>
      <Lead>
        <Guide>our preferred partnership structure, in one picture</Guide>
      </Lead>
      <div className="mt-12">
        <Frame label="Model diagram" className="aspect-[16/9] w-full" />
      </div>
    </Slide>
  );
}

/* 4 — How It Works */
export function Part_HowItWorksSlide(props: SlideProps) {
  return (
    <Slide id="part-how" module="03 · how it works" {...props}>
      <SlideTitle>How It Works</SlideTitle>
      <Lead>
        <Guide>the path from handshake to shipped — the fewest steps possible</Guide>
      </Lead>
      <div className="mt-12 grid gap-6 md:grid-cols-4">
        {["intake", "build", "launch", "scale"].map((s, i) => (
          <div
            key={i}
            className="flex min-h-[170px] flex-col justify-between border border-surface-border p-6"
          >
            <span className="font-mono text-[10px] tracking-splice-wide text-accent/50">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Guide>{s}</Guide>
          </div>
        ))}
      </div>
    </Slide>
  );
}

/* 5 — The Value Exchange */
export function Part_ValueSlide(props: SlideProps) {
  return (
    <Slide id="part-value" module="04 · value exchange" {...props}>
      <SlideTitle>The Value Exchange</SlideTitle>
      <Lead>
        <Guide>what each side brings, and what each side gets</Guide>
      </Lead>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div>
          <div className="mb-5 font-mono text-[10px] tracking-splice-wide uppercase text-accent/50">
            What Splice brings
          </div>
          <Bullets items={["HELIOS + infrastructure", "studio + capital", "operators on day one"]} />
        </div>
        <div className="md:border-l md:border-surface-border md:pl-10">
          <div className="mb-5 font-mono text-[10px] tracking-splice-wide uppercase text-accent/50">
            What you bring
          </div>
          <Bullets items={["domain + market access", "distribution", "commitment / capital"]} />
        </div>
      </div>
    </Slide>
  );
}

/* 6 — Proof */
export function Part_ProofSlide(props: SlideProps) {
  return (
    <Slide id="part-proof" module="05 · proof" {...props}>
      <SlideTitle>Proof</SlideTitle>
      <Lead>
        <Guide>track record — what we&apos;ve already built and shipped</Guide>
      </Lead>
      <div className="mt-12 grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
        <Frame label="Portfolio / logo wall" className="aspect-[16/9]" />
        <div className="space-y-8">
          <Stat label="companies built" />
          <Stat label="shipped to production" />
          <Stat label="capital deployed" />
        </div>
      </div>
    </Slide>
  );
}

/* 7 — Why Splice */
export function Part_WhySpliceSlide(props: SlideProps) {
  return (
    <Slide id="part-why" module="06 · why splice" {...props}>
      <SlideTitle>Why Splice</SlideTitle>
      <Lead>
        <Guide>the edge no other partner can match</Guide>
      </Lead>
      <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
        <Bullets
          items={[
            "HELIOS — inherited agent-native infra",
            "specs → working systems in days",
            "security & audit posture from day one",
          ]}
        />
        <Frame label="Edge / comparison" className="aspect-[4/3]" />
      </div>
    </Slide>
  );
}

/* 8 — Structure & Terms */
export function Part_TermsSlide(props: SlideProps) {
  const terms = [
    "equity / split",
    "governance",
    "IP & licensing",
    "term length",
    "exclusivity",
  ];
  return (
    <Slide id="part-terms" module="07 · structure & terms" {...props}>
      <SlideTitle>Structure &amp; Terms</SlideTitle>
      <Lead>
        <Guide>the deal in plain terms — no surprises later</Guide>
      </Lead>
      <div className="mt-12 divide-y divide-surface-border border-y border-surface-border">
        {terms.map((t, i) => (
          <div key={i} className="flex items-center justify-between gap-6 py-4">
            <span className="font-mono text-[10px] tracking-splice-wide uppercase text-accent/55">
              {t}
            </span>
            <Guide>terms</Guide>
          </div>
        ))}
      </div>
    </Slide>
  );
}

/* 9 — Team */
export function Part_TeamSlide(props: SlideProps) {
  return (
    <Slide id="part-team" module="08 · team" {...props}>
      <SlideTitle>Team</SlideTitle>
      <Lead>
        <Guide>who you&apos;ll actually work with</Guide>
      </Lead>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        <PersonCard role="partner lead · role" />
        <PersonCard role="founder · role" />
        <PersonCard role="engineering · role" />
        <PersonCard role="operations · role" />
      </div>
    </Slide>
  );
}

/* 10 — Next Steps */
export function Part_NextStepsSlide(props: SlideProps) {
  return (
    <Slide id="part-next" module="09 · next steps" accent {...props}>
      <SlideTitle>Next Steps</SlideTitle>
      <Lead>
        <Guide>the single, obvious action you want them to take next</Guide>
      </Lead>
      <div className="mt-12 max-w-[640px]">
        <Bullets items={["step one — this week", "step two", "step three → kickoff"]} />
      </div>
      <div className="mt-12 flex items-center gap-3">
        <AccentRule />
        <span className="font-mono text-[10px] tracking-splice-wide uppercase text-muted-foreground/50">
          <Guide>contact · email · calendar link</Guide>
        </span>
      </div>
    </Slide>
  );
}
