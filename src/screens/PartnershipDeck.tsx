"use client";

/**
 * Splice Labs — Partnership Model Deck (scaffold). Standalone route:
 * /deck-partnership
 */
import { DeckShell } from "@/components/deck/DeckShell";
import {
  Part_CoverSlide,
  Part_OpportunitySlide,
  Part_ModelSlide,
  Part_HowItWorksSlide,
  Part_ValueSlide,
  Part_ProofSlide,
  Part_WhySpliceSlide,
  Part_TermsSlide,
  Part_TeamSlide,
  Part_NextStepsSlide,
  TOTAL_SLIDES_PARTNERSHIP,
} from "@/components/deck/PartnershipDeckSlides";

const T = TOTAL_SLIDES_PARTNERSHIP;

export default function PartnershipDeck() {
  return (
    <DeckShell title="Splice Labs · Partnership Model">
      <Part_CoverSlide slideNumber={1} totalSlides={T} />
      <Part_OpportunitySlide slideNumber={2} totalSlides={T} />
      <Part_ModelSlide slideNumber={3} totalSlides={T} />
      <Part_HowItWorksSlide slideNumber={4} totalSlides={T} />
      <Part_ValueSlide slideNumber={5} totalSlides={T} />
      <Part_ProofSlide slideNumber={6} totalSlides={T} />
      <Part_WhySpliceSlide slideNumber={7} totalSlides={T} />
      <Part_TermsSlide slideNumber={8} totalSlides={T} />
      <Part_TeamSlide slideNumber={9} totalSlides={T} />
      <Part_NextStepsSlide slideNumber={10} totalSlides={T} />
    </DeckShell>
  );
}
