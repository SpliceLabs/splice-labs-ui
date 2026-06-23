"use client";

/**
 * Deck E — Agentic Trading Research
 * Standalone route: /deck-e
 */
import { useState } from "react";
import {
  E_CoverSlide,
  E_MomentSlide,
  E_GapSlide,
  E_AdvantagSlide,
  E_ProductSlide,
  E_OperationSlide,
  E_TeamSlide,
  E_AskSlide,
  E_ReturnsSlide,
  E_WhyNowSlide,
  TOTAL_SLIDES_E,
} from "@/components/deck/DeckESlides";

export default function DeckE() {
  const [lightMode, setLightMode] = useState(false);

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={
        lightMode
          ? {
              backgroundColor: "hsl(210 20% 96%)",
              color: "hsl(210 14% 12%)",
              ["--foreground" as string]: "210 14% 12%",
              ["--background" as string]: "210 20% 96%",
              ["--surface-border" as string]: "210 10% 82%",
              ["--muted-foreground" as string]: "210 10% 40%",
              ["--accent" as string]: "174 100% 30%",
            }
          : {}
      }
    >
      {/* Top nav bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-surface-border transition-colors duration-300"
        style={
          lightMode
            ? { backgroundColor: "hsla(210, 20%, 96%, 0.85)" }
            : { backgroundColor: "hsla(210, 14%, 6%, 0.8)" }
        }
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex items-center justify-between h-12">
          <span className="font-mono text-label-sm text-accent/60 tracking-splice-ultra uppercase">
            Splice Labs · Deck E — Agentic Trading Research
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLightMode((v) => !v)}
              className="font-mono text-label-xs tracking-splice-wide uppercase border border-surface-border px-2 py-0.5 hover:text-foreground transition-colors"
              style={lightMode ? { color: "hsl(210 14% 12%)" } : { color: "hsl(210 10% 48%)" }}
            >
              {lightMode ? "Dark" : "Light"}
            </button>
            <a
              href="/decks"
              className="font-mono text-label-xs text-muted-foreground/40 tracking-splice-wide uppercase hover:text-foreground transition-colors"
            >
              ← All Decks
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-12" />

      {/* Slides */}
      <E_CoverSlide slideNumber={1} totalSlides={TOTAL_SLIDES_E} />
      <E_MomentSlide slideNumber={2} totalSlides={TOTAL_SLIDES_E} />
      <E_GapSlide slideNumber={3} totalSlides={TOTAL_SLIDES_E} />
      <E_AdvantagSlide slideNumber={4} totalSlides={TOTAL_SLIDES_E} />
      <E_ProductSlide slideNumber={5} totalSlides={TOTAL_SLIDES_E} />
      <E_OperationSlide slideNumber={6} totalSlides={TOTAL_SLIDES_E} />
      <E_TeamSlide slideNumber={7} totalSlides={TOTAL_SLIDES_E} />
      <E_AskSlide slideNumber={8} totalSlides={TOTAL_SLIDES_E} />
      <E_ReturnsSlide slideNumber={9} totalSlides={TOTAL_SLIDES_E} />
      <E_WhyNowSlide slideNumber={10} totalSlides={TOTAL_SLIDES_E} />
    </div>
  );
}
