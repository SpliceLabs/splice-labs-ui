/**
 * Unified Deck Experience — /decks
 * Deck switcher bar + per-deck content
 */
import { useState } from "react";
import {
  TitleSlide,
  ProblemSlide,
  SolutionSlide,
  ProductSlide,
  HowItWorksSlide,
  MarketSlide,
  TractionSlide,
  TeamSlide,
  TeamFoundersSlide,
  AskSlide,
} from "@/components/deck/CoreSlides";
import {
  C_TitleSlide,
  C_OpportunitySlide,
  C_IdentitySlide,
  C_CapabilitiesSlide,
  C_HeliosSlide,
  C_PortfolioSlide,
  C_ModelsSlide,
  C_VisionSlide,
  C_NextStepsSlide,
  C_HeliosExecAppendix,
} from "@/components/deck/DeckCSlides";
import {
  HeliosAppendix,
  AgaveAppendix,
  SilentMarketsAppendix,
  
  CrownFuturesAppendix,
  OrdoVenturiAppendix,
  KenomicAppendix,
} from "@/components/deck/AppendixSlides";
import { StyleGuideSlide } from "@/components/deck/StyleGuideSlide";

const DECKS = [
  { id: "a", label: "A — Investor One-Pager" },
  { id: "b", label: "B — Investors (YC Seed)" },
  { id: "c", label: "C — Partnership" },
  { id: "d", label: "D — Sales Clients" },
  { id: "e", label: "E — Agentic Trading", href: "/deck-e" },
];

const TOTAL_SLIDES_B = 17;
const TOTAL_SLIDES_C = 16;

/* ─── Placeholder deck shell for decks not yet built ─── */
function DeckPlaceholder({ deckId, deckLabel }: { deckId: string; deckLabel: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6">
      <span className="font-mono text-[10px] text-accent/40 tracking-splice-ultra uppercase">
        Deck {deckId.toUpperCase()}
      </span>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center">{deckLabel}</h2>
      <p className="text-sm text-muted-foreground/60 max-w-[480px] text-center">
        This deck is in development. Content will be populated from the source-of-truth markdown files.
      </p>
      <div className="flex items-center gap-3 mt-4">
        <span className="w-8 h-px bg-accent/30" />
        <span className="font-mono text-[10px] text-muted-foreground/30 tracking-splice-wide">Coming soon</span>
        <span className="w-8 h-px bg-accent/30" />
      </div>
    </div>
  );
}

/* ─── Deck B content (existing full build) ─── */
function DeckBContent() {
  return (
    <>
      <TitleSlide slideNumber={1} totalSlides={TOTAL_SLIDES_B} />
      <ProblemSlide slideNumber={2} totalSlides={TOTAL_SLIDES_B} />
      <SolutionSlide slideNumber={3} totalSlides={TOTAL_SLIDES_B} />
      <ProductSlide slideNumber={4} totalSlides={TOTAL_SLIDES_B} />
      <HowItWorksSlide slideNumber={5} totalSlides={TOTAL_SLIDES_B} />
      <MarketSlide slideNumber={6} totalSlides={TOTAL_SLIDES_B} />
      <TractionSlide slideNumber={7} totalSlides={TOTAL_SLIDES_B} />
      <TeamSlide slideNumber={8} totalSlides={TOTAL_SLIDES_B} />
      <TeamFoundersSlide slideNumber={9} totalSlides={TOTAL_SLIDES_B} />
      <AskSlide slideNumber={10} totalSlides={TOTAL_SLIDES_B} />

      <div className="border-b border-surface-border py-8 flex items-center justify-center">
        <span className="font-mono text-[10px] text-accent/40 tracking-splice-ultra uppercase">── Appendices ──</span>
      </div>

      <HeliosAppendix slideNumber={11} totalSlides={TOTAL_SLIDES_B} />
      <AgaveAppendix slideNumber={12} totalSlides={TOTAL_SLIDES_B} />
      <CrownFuturesAppendix slideNumber={13} totalSlides={TOTAL_SLIDES_B} />
      <SilentMarketsAppendix slideNumber={14} totalSlides={TOTAL_SLIDES_B} />
      <OrdoVenturiAppendix slideNumber={15} totalSlides={TOTAL_SLIDES_B} />
      <KenomicAppendix slideNumber={16} totalSlides={TOTAL_SLIDES_B} />
      <StyleGuideSlide slideNumber={17} totalSlides={TOTAL_SLIDES_B} />
    </>
  );
}

/* ─── Deck C content — Partnership deck ─── */
function DeckCContent() {
  return (
    <>
      <C_TitleSlide slideNumber={1} totalSlides={TOTAL_SLIDES_C} />
      <C_OpportunitySlide slideNumber={2} totalSlides={TOTAL_SLIDES_C} />
      <C_IdentitySlide slideNumber={3} totalSlides={TOTAL_SLIDES_C} />
      <C_PortfolioSlide slideNumber={4} totalSlides={TOTAL_SLIDES_C} />
      <C_VisionSlide slideNumber={5} totalSlides={TOTAL_SLIDES_C} />
      <C_ModelsSlide slideNumber={6} totalSlides={TOTAL_SLIDES_C} />
      <C_NextStepsSlide slideNumber={7} totalSlides={TOTAL_SLIDES_C} />

      <div className="border-b border-surface-border py-8 flex items-center justify-center">
        <span className="font-mono text-[10px] text-accent/40 tracking-splice-ultra uppercase">── Appendices ──</span>
      </div>

      <C_HeliosExecAppendix slideNumber={8} totalSlides={TOTAL_SLIDES_C} />
      <AgaveAppendix slideNumber={9} totalSlides={TOTAL_SLIDES_C} />
      <CrownFuturesAppendix slideNumber={10} totalSlides={TOTAL_SLIDES_C} />
      <SilentMarketsAppendix slideNumber={11} totalSlides={TOTAL_SLIDES_C} />
      <OrdoVenturiAppendix slideNumber={12} totalSlides={TOTAL_SLIDES_C} />
      <KenomicAppendix slideNumber={13} totalSlides={TOTAL_SLIDES_C} />
      <C_HeliosSlide slideNumber={14} totalSlides={TOTAL_SLIDES_C} />
      <C_CapabilitiesSlide slideNumber={15} totalSlides={TOTAL_SLIDES_C} />
      <StyleGuideSlide slideNumber={16} totalSlides={TOTAL_SLIDES_C} />
    </>
  );
}

export default function PitchDeck() {
  const [activeDeck, setActiveDeck] = useState("c");
  const [lightMode, setLightMode] = useState(false);

  const activeDeckMeta = DECKS.find((d) => d.id === activeDeck)!;

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
          lightMode ? { backgroundColor: "hsla(210, 20%, 96%, 0.85)" } : { backgroundColor: "hsla(210, 14%, 6%, 0.8)" }
        }
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex items-center justify-between h-12">
          <span className="font-mono text-[10px] text-accent/60 tracking-splice-ultra uppercase">
            Splice Labs · Decks
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLightMode((v) => !v)}
              className="font-mono text-[9px] tracking-splice-wide uppercase border border-surface-border px-2 py-0.5 hover:text-foreground transition-colors"
              style={lightMode ? { color: "hsl(210 14% 12%)" } : { color: "hsl(210 10% 48%)" }}
            >
              {lightMode ? "Dark" : "Light"}
            </button>
            <a
              href="/"
              className="font-mono text-[9px] text-muted-foreground/40 tracking-splice-wide uppercase hover:text-foreground transition-colors"
            >
              ← Back
            </a>
          </div>
        </div>
      </nav>

      {/* Deck switcher bar */}
      <div
        className="fixed top-12 left-0 right-0 z-40 border-b border-surface-border transition-colors duration-300"
        style={
          lightMode ? { backgroundColor: "hsla(210, 20%, 96%, 0.85)" } : { backgroundColor: "hsla(210, 14%, 6%, 0.8)" }
        }
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex items-center gap-0 overflow-x-auto">
          {DECKS.map((d) => {
            if ((d as any).href) {
              return (
                <a
                  key={d.id}
                  href={(d as any).href}
                  className="font-mono text-[10px] tracking-splice-wide uppercase px-4 py-2.5 border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors shrink-0"
                >
                  {d.label}
                </a>
              );
            }
            return (
              <button
                key={d.id}
                onClick={() => setActiveDeck(d.id)}
                className={`font-mono text-[10px] tracking-splice-wide uppercase px-4 py-2.5 border-b-2 transition-colors shrink-0 ${
                  activeDeck === d.id
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Spacer for fixed nav + switcher */}
      <div className="h-[calc(3rem+2.5rem)]" />

      {/* Active deck content */}
      {activeDeck === "b" && <DeckBContent />}
      {activeDeck === "c" && <DeckCContent />}
      {activeDeck !== "b" && activeDeck !== "c" && (
        <DeckPlaceholder deckId={activeDeckMeta.id} deckLabel={activeDeckMeta.label} />
      )}
    </div>
  );
}
