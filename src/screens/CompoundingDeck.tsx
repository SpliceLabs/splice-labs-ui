"use client";

/**
 * Splice Labs — From Compounding to Network Effects.
 * Standalone route: /deck-compounding
 */
import { DeckShell } from "@/components/deck/DeckShell";
import {
  Comp_CoverSlide,
  Comp_TrapSlide,
  Comp_TwoClaimsSlide,
  Comp_UnitSlide,
  Comp_LoopSlide,
  Comp_StackSlide,
  Comp_ArchitectureSlide,
  Comp_TestSlide,
  Comp_FlywheelSlide,
  Comp_MemorySlide,
  Comp_MeasurementSlide,
  Comp_BoundariesSlide,
  Comp_ProofSlide,
  Comp_ClaimsSlide,
  Comp_CloseSlide,
  TOTAL_SLIDES_COMPOUNDING,
} from "@/components/deck/CompoundingSlides";

const T = TOTAL_SLIDES_COMPOUNDING;

export default function CompoundingDeck() {
  return (
    <DeckShell title="Splice Labs · Compounding → Network Effects">
      <Comp_CoverSlide slideNumber={1} totalSlides={T} />
      <Comp_TrapSlide slideNumber={2} totalSlides={T} />
      <Comp_TwoClaimsSlide slideNumber={3} totalSlides={T} />
      <Comp_UnitSlide slideNumber={4} totalSlides={T} />
      <Comp_LoopSlide slideNumber={5} totalSlides={T} />
      <Comp_StackSlide slideNumber={6} totalSlides={T} />
      <Comp_ArchitectureSlide slideNumber={7} totalSlides={T} />
      <Comp_TestSlide slideNumber={8} totalSlides={T} />
      <Comp_FlywheelSlide slideNumber={9} totalSlides={T} />
      <Comp_MemorySlide slideNumber={10} totalSlides={T} />
      <Comp_MeasurementSlide slideNumber={11} totalSlides={T} />
      <Comp_BoundariesSlide slideNumber={12} totalSlides={T} />
      <Comp_ProofSlide slideNumber={13} totalSlides={T} />
      <Comp_ClaimsSlide slideNumber={14} totalSlides={T} />
      <Comp_CloseSlide slideNumber={15} totalSlides={T} />
    </DeckShell>
  );
}
