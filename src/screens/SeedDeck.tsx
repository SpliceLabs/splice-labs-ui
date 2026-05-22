"use client";

/**
 * Splice Labs — Seed Deck (scaffold). Standalone route: /deck-seed
 */
import { DeckShell } from "@/components/deck/DeckShell";
import {
  Seed_CoverSlide,
  Seed_ProblemSlide,
  Seed_SolutionSlide,
  Seed_WhyNowSlide,
  Seed_TractionSlide,
  Seed_MarketSlide,
  Seed_ModelSlide,
  Seed_AdvantageSlide,
  Seed_TeamSlide,
  Seed_AskSlide,
  TOTAL_SLIDES_SEED,
} from "@/components/deck/SeedDeckSlides";

const T = TOTAL_SLIDES_SEED;

export default function SeedDeck() {
  return (
    <DeckShell title="Splice Labs · Seed Round">
      <Seed_CoverSlide slideNumber={1} totalSlides={T} />
      <Seed_ProblemSlide slideNumber={2} totalSlides={T} />
      <Seed_SolutionSlide slideNumber={3} totalSlides={T} />
      <Seed_WhyNowSlide slideNumber={4} totalSlides={T} />
      <Seed_TractionSlide slideNumber={5} totalSlides={T} />
      <Seed_MarketSlide slideNumber={6} totalSlides={T} />
      <Seed_ModelSlide slideNumber={7} totalSlides={T} />
      <Seed_AdvantageSlide slideNumber={8} totalSlides={T} />
      <Seed_TeamSlide slideNumber={9} totalSlides={T} />
      <Seed_AskSlide slideNumber={10} totalSlides={T} />
    </DeckShell>
  );
}
