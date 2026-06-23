"use client";

/**
 * Splice Labs — The Harness Is the Asset (strongman deck).
 * Standalone route: /deck-harness
 */
import { DeckShell } from "@/components/deck/DeckShell";
import {
  Harness_CoverSlide,
  Harness_RentOwnSlide,
  Harness_WhatSlide,
  Harness_StackSlide,
  Harness_FlywheelSlide,
  Harness_GDPSlide,
  Harness_YieldClassesSlide,
  Harness_YieldStatementSlide,
  Harness_MeasuredSlide,
  Harness_IPSlide,
  Harness_PatentSlide,
  Harness_MemorySlide,
  Harness_MoatSlide,
  Harness_ClaimsSlide,
  Harness_DiligenceSlide,
  Harness_CloseSlide,
  TOTAL_SLIDES_HARNESS,
} from "@/components/deck/HarnessSlides";

const T = TOTAL_SLIDES_HARNESS;

export default function HarnessDeck() {
  return (
    <DeckShell title="Splice Labs · The Harness Is the Asset">
      <Harness_CoverSlide slideNumber={1} totalSlides={T} />
      <Harness_RentOwnSlide slideNumber={2} totalSlides={T} />
      <Harness_WhatSlide slideNumber={3} totalSlides={T} />
      <Harness_StackSlide slideNumber={4} totalSlides={T} />
      <Harness_FlywheelSlide slideNumber={5} totalSlides={T} />
      <Harness_GDPSlide slideNumber={6} totalSlides={T} />
      <Harness_YieldClassesSlide slideNumber={7} totalSlides={T} />
      <Harness_YieldStatementSlide slideNumber={8} totalSlides={T} />
      <Harness_MeasuredSlide slideNumber={9} totalSlides={T} />
      <Harness_IPSlide slideNumber={10} totalSlides={T} />
      <Harness_PatentSlide slideNumber={11} totalSlides={T} />
      <Harness_MemorySlide slideNumber={12} totalSlides={T} />
      <Harness_MoatSlide slideNumber={13} totalSlides={T} />
      <Harness_ClaimsSlide slideNumber={14} totalSlides={T} />
      <Harness_DiligenceSlide slideNumber={15} totalSlides={T} />
      <Harness_CloseSlide slideNumber={16} totalSlides={T} />
    </DeckShell>
  );
}
