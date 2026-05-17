# Splice Labs — Deck Source Package

## Overview

This package contains the complete content, structure, and asset specifications for four Splice Labs pitch decks plus shared appendix modules. **Content only — no visual design.**

## Source of Truth Format

**Option B: Markdown slide source** — Each deck and appendix is defined as structured Markdown with per-slide copy, speaker notes, and asset callouts. This format was chosen because:

- Human-readable and editable in any text editor
- Version-controllable via git
- Convertible to PPTX via PptxGenJS, Marp, or manual import
- No proprietary tool dependencies

## Folder Structure

```
SpliceLabs/Brand/PitchDecks/
├── Deck_A_Investor_OnePager/
│   ├── deck-content.md          # Full slide content
│   ├── slide-notes.md           # Speaker notes only
│   ├── appendix-outline.md      # Appendix plan
│   └── assets/                  # (logos, diagrams — to be added)
├── Deck_B_Investor_YC_8-12/
│   ├── deck-content.md
│   ├── slide-notes.md
│   └── appendix-outline.md
├── Deck_C_Vision_Partners/
│   ├── deck-content.md
│   ├── slide-notes.md
│   └── appendix-outline.md
├── Deck_D_Sales_Clients/
│   ├── deck-content.md
│   ├── slide-notes.md
│   └── appendix-outline.md
├── Appendices/
│   ├── HELIOS/
│   │   ├── appendix-content.md
│   │   ├── appendix-slides.md
│   │   └── assets/diagram-specs.md
│   └── CaseStudies/
│       ├── CrownFutures/appendix-content.md
│       ├── Agave/appendix-content.md
│       ├── SilentMarkets/appendix-content.md
│       ├── Poolhouse/appendix-content.md
│       └── diagram-specs-all.md
├── SRC/
│   ├── manifest.json            # Complete deck metadata
│   └── README.md                # This file
└── Exports/                     # (PPTX + PDF — generated separately)
```

## Editing Instructions

### Content Editing
1. Open any `deck-content.md` in your editor.
2. Each slide is delineated by `## Slide X — Title`.
3. Edit "On-Slide Copy" for presentation text. Max 6 bullets per slide.
4. Edit "Speaker Notes" for presenter guidance.
5. Update `[INSERT ...]` placeholders with real data.

### Adding Assets
1. Place logo PNGs/SVGs in the relevant `assets/` folder.
2. Update `manifest.json` asset inventory with filenames and usage locations.
3. Reference assets in slide content via the "Assets Needed" checklist.

### Building PPTX (Future)
A PptxGenJS build script can be added to programmatically generate `.pptx` from these Markdown sources. The `manifest.json` provides all metadata needed for automated builds.

### Font Licensing
- **Space Grotesk** — SIL Open Font License. Can be bundled freely.
- **Space Mono** — SIL Open Font License. Can be bundled freely.
- Both are available via Google Fonts or the `@fontsource` npm packages already installed.

## Dimensions
- Aspect ratio: 16:9
- Slide size: 13.333 × 7.5 inches (1920 × 1080 px)

## Color Tokens
See `manifest.json` → `color_tokens` for exact HSL values in both dark and light mode.

## Changelog

| Date | Change |
|------|--------|
| 2026-02-23 | Initial content pack: 4 decks + HELIOS appendix + 4 case studies |
