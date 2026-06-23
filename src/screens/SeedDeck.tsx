"use client";

/**
 * Splice Labs — Seed Deck. Standalone route: /deck-seed
 * Evidence-based narrative converted from the Splice Labs research memos.
 */
import { DeckShell } from "@/components/deck/DeckShell";
import {
  Seed_CoverSlide,
  Seed_ProblemSlide,
  Seed_WhatChangedSlide,
  Seed_MachineSlide,
  Seed_MarketSlide,
  Seed_VerticalSlide,
  Seed_StructureSlide,
  Seed_EconomicsSlide,
  Seed_FundsSlide,
  Seed_ProofSlide,
  Seed_MoatSlide,
  Seed_SeriesASlide,
  Seed_ValuationSlide,
  Seed_SidecarSlide,
  Seed_DiligenceSlide,
  Seed_AskSlide,
  TOTAL_SLIDES_SEED,
} from "@/components/deck/SeedDeckSlides";

const T = TOTAL_SLIDES_SEED;

export default function SeedDeck() {
  return (
    <DeckShell title="Splice Labs · Seed Round">
      <Seed_CoverSlide slideNumber={1} totalSlides={T} />
      <Seed_ProblemSlide slideNumber={2} totalSlides={T} />
      <Seed_WhatChangedSlide slideNumber={3} totalSlides={T} />
      <Seed_MachineSlide slideNumber={4} totalSlides={T} />
      <Seed_MarketSlide slideNumber={5} totalSlides={T} />
      <Seed_VerticalSlide slideNumber={6} totalSlides={T} />
      <Seed_StructureSlide slideNumber={7} totalSlides={T} />
      <Seed_EconomicsSlide slideNumber={8} totalSlides={T} />
      <Seed_FundsSlide slideNumber={9} totalSlides={T} />
      <Seed_ProofSlide slideNumber={10} totalSlides={T} />
      <Seed_MoatSlide slideNumber={11} totalSlides={T} />
      <Seed_SeriesASlide slideNumber={12} totalSlides={T} />
      <Seed_ValuationSlide slideNumber={13} totalSlides={T} />
      <Seed_SidecarSlide slideNumber={14} totalSlides={T} />
      <Seed_DiligenceSlide slideNumber={15} totalSlides={T} />
      <Seed_AskSlide slideNumber={16} totalSlides={T} />
    </DeckShell>
  );
}
