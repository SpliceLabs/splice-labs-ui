"use client";

/**
 * Splice Labs — Studio Model / Incubation Architecture deck.
 * Standalone route: /deck-studio-model
 */
import { DeckShell } from "@/components/deck/DeckShell";
import {
  Studio_CoverSlide,
  Studio_TensionSlide,
  Studio_FrameSlide,
  Studio_OverviewSlide,
  Studio_Model1Slide,
  Studio_Model2Slide,
  Studio_Model3Slide,
  Studio_DecisionSlide,
  Studio_FounderFirstSlide,
  Studio_IPSlide,
  Studio_GovernanceSlide,
  Studio_DiligenceSlide,
  Studio_CloseSlide,
  TOTAL_SLIDES_STUDIO,
} from "@/components/deck/StudioModelSlides";

const T = TOTAL_SLIDES_STUDIO;

export default function StudioModelDeck() {
  return (
    <DeckShell title="Splice Labs · Studio Model">
      <Studio_CoverSlide slideNumber={1} totalSlides={T} />
      <Studio_TensionSlide slideNumber={2} totalSlides={T} />
      <Studio_FrameSlide slideNumber={3} totalSlides={T} />
      <Studio_OverviewSlide slideNumber={4} totalSlides={T} />
      <Studio_Model1Slide slideNumber={5} totalSlides={T} />
      <Studio_Model2Slide slideNumber={6} totalSlides={T} />
      <Studio_Model3Slide slideNumber={7} totalSlides={T} />
      <Studio_DecisionSlide slideNumber={8} totalSlides={T} />
      <Studio_FounderFirstSlide slideNumber={9} totalSlides={T} />
      <Studio_IPSlide slideNumber={10} totalSlides={T} />
      <Studio_GovernanceSlide slideNumber={11} totalSlides={T} />
      <Studio_DiligenceSlide slideNumber={12} totalSlides={T} />
      <Studio_CloseSlide slideNumber={13} totalSlides={T} />
    </DeckShell>
  );
}
