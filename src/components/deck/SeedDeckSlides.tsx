/**
 * Splice Labs — Seed Deck (scaffold)
 *
 * Blank, premium slide set following Aaron Harris's YC seed-deck model:
 * one idea per slide, legible, obvious. Content slots are <Guide>/<Frame>/
 * <Stat> placeholders — drop real copy and numbers in to finish.
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

export const TOTAL_SLIDES_SEED = 10;

type SlideProps = { slideNumber: number; totalSlides: number };

/* 1 — Cover */
export function Seed_CoverSlide(props: SlideProps) {
  return (
    <Slide id="seed-cover" module="seed round · confidential" accent {...props}>
      <div className="max-w-[860px]">
        <Eyebrow>Splice Labs</Eyebrow>
        <SlideTitle className="mt-6 text-5xl md:text-7xl">Splice Labs</SlideTitle>
        <Lead>
          <Guide>one-line positioning — what Splice is, for whom, why it matters</Guide>
        </Lead>
        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[10px] tracking-splice-wide uppercase text-muted-foreground/50">
          <span>Seed Round</span>
          <span className="text-surface-border">/</span>
          <Guide>raise amount</Guide>
          <span className="text-surface-border">/</span>
          <Guide>contact · email</Guide>
        </div>
      </div>
    </Slide>
  );
}

/* 2 — Problem */
export function Seed_ProblemSlide(props: SlideProps) {
  return (
    <Slide id="seed-problem" module="01 · problem" {...props}>
      <SlideTitle>The Problem</SlideTitle>
      <Lead>
        <Guide>the wound — who hurts, how badly, and what it costs them</Guide>
      </Lead>
      <div className="mt-12 grid items-start gap-10 md:grid-cols-[1.3fr_1fr]">
        <Bullets items={["pain point one", "pain point two", "pain point three"]} />
        <Stat label="cost of the problem / year" />
      </div>
    </Slide>
  );
}

/* 3 — Solution */
export function Seed_SolutionSlide(props: SlideProps) {
  return (
    <Slide id="seed-solution" module="02 · solution" {...props}>
      <SlideTitle>The Solution</SlideTitle>
      <Lead>
        <Guide>how the product solves exactly that — in one clear line</Guide>
      </Lead>
      <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
        <Bullets items={["what it does", "the concrete benefit", "why it's 10x, not 10%"]} />
        <Frame label="Product visual" className="aspect-[4/3]" />
      </div>
    </Slide>
  );
}

/* 4 — Why Now */
export function Seed_WhyNowSlide(props: SlideProps) {
  return (
    <Slide id="seed-why-now" module="03 · why now" {...props}>
      <SlideTitle>Why Now</SlideTitle>
      <Lead>
        <Guide>the shift that makes this inevitable today, not five years ago</Guide>
      </Lead>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {["the shift", "the enabler", "the urgency"].map((g, i) => (
          <div
            key={i}
            className="flex min-h-[180px] flex-col justify-between border border-surface-border p-6"
          >
            <span className="font-mono text-[10px] tracking-splice-wide text-accent/50">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Guide>{g}</Guide>
          </div>
        ))}
      </div>
    </Slide>
  );
}

/* 5 — Traction */
export function Seed_TractionSlide(props: SlideProps) {
  return (
    <Slide id="seed-traction" module="04 · traction" {...props}>
      <SlideTitle>Traction</SlideTitle>
      <Lead>
        <Guide>proof it works — the line that goes up and to the right</Guide>
      </Lead>
      <div className="mt-12 grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
        <Frame label="Growth chart" className="aspect-[16/9]" />
        <div className="space-y-8">
          <Stat label="revenue / MRR" />
          <Stat label="users / customers" />
          <Stat label="growth rate" />
        </div>
      </div>
    </Slide>
  );
}

/* 6 — Market */
export function Seed_MarketSlide(props: SlideProps) {
  return (
    <Slide id="seed-market" module="05 · market" {...props}>
      <SlideTitle>Market</SlideTitle>
      <Lead>
        <Guide>how big, how fast — credibly bottom-up, not a fantasy TAM</Guide>
      </Lead>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Stat label="TAM" />
        <Stat label="SAM" />
        <Stat label="SOM · year 1–3" />
      </div>
    </Slide>
  );
}

/* 7 — Business Model */
export function Seed_ModelSlide(props: SlideProps) {
  return (
    <Slide id="seed-model" module="06 · business model" {...props}>
      <SlideTitle>Business Model</SlideTitle>
      <Lead>
        <Guide>how you make money — pricing, who pays, unit economics</Guide>
      </Lead>
      <div className="mt-12 grid items-start gap-10 md:grid-cols-2">
        <Bullets items={["pricing / packaging", "revenue streams"]} />
        <div className="space-y-8">
          <Stat label="ACV / price point" />
          <Stat label="gross margin" />
        </div>
      </div>
    </Slide>
  );
}

/* 8 — Why We Win */
export function Seed_AdvantageSlide(props: SlideProps) {
  return (
    <Slide id="seed-advantage" module="07 · why we win" {...props}>
      <SlideTitle>Why We Win</SlideTitle>
      <Lead>
        <Guide>the unique insight or asset competitors can&apos;t copy</Guide>
      </Lead>
      <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
        <Bullets
          items={[
            "the non-obvious insight",
            "the moat — tech / data / distribution",
            "what we have that they don't",
          ]}
        />
        <Frame label="Moat / competitive map" className="aspect-[4/3]" />
      </div>
    </Slide>
  );
}

/* 9 — Team */
export function Seed_TeamSlide(props: SlideProps) {
  return (
    <Slide id="seed-team" module="08 · team" {...props}>
      <SlideTitle>Team</SlideTitle>
      <Lead>
        <Guide>why this team is the one to build this — founder–market fit</Guide>
      </Lead>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        <PersonCard role="founder · role" />
        <PersonCard role="founder · role" />
        <PersonCard role="founder · role" />
        <PersonCard role="advisor / hire" />
      </div>
    </Slide>
  );
}

/* 10 — The Ask */
export function Seed_AskSlide(props: SlideProps) {
  return (
    <Slide id="seed-ask" module="09 · the ask" accent {...props}>
      <SlideTitle>The Ask</SlideTitle>
      <Lead>
        <Guide>how much you&apos;re raising and what it unlocks</Guide>
      </Lead>
      <div className="mt-12 grid items-start gap-10 md:grid-cols-[1fr_1.3fr]">
        <Stat label="raising — round size" />
        <div>
          <div className="mb-5 font-mono text-[10px] tracking-splice-wide uppercase text-accent/50">
            Use of funds → next 18 months
          </div>
          <Bullets items={["milestone one", "milestone two", "milestone three"]} />
        </div>
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
