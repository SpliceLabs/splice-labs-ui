# Lovable Project Contracts (Generic Root)

> **STATUS**: ACTIVE  
> **VERSION**: 2.0.0  
> **LAST UPDATED**: 2026-03-04

This file is the single source of truth for how we evolve any Lovable-built experience (marketing site, product UI, tools, landing pages, docs). Every change must preserve brand consistency, clarity, accessibility, and a coherent interaction system across pages.

## Prompt Header Requirement (Non‑Negotiable)

Every prompt sent to Lovable for this project MUST start with the following header exactly:

```
REQUIRED: Before starting, load and comply with /docs/contracts/lovable-contracts-index.md and all contracts it references. If any file is missing, STOP with BLOCKER.
```

## No External References

This contract intentionally does not reference other files so it can be dropped into any new project without missing-file failures. If you add additional contract files later, list them in a dedicated "References" section at the bottom of this file and ensure they exist.

---

## Contract 0 — Required Preflight (STOP with BLOCKER if missing)

Before making ANY design/UI changes, identify and confirm all of the following:

### A) Brand Palette Source of Truth

- A brand guide page, design tokens, CSS variables, or a documented palette.
- If the palette cannot be found, STOP with BLOCKER (do not invent colors).

### B) Typography Rules

- Primary font(s), heading scale, body sizes/line-heights, and link styling.

### C) Brand Tone Adjectives (pick 3 and use them as the decision filter)

Examples: calm, clinical, friendly, bold, playful, premium, direct, warm, technical.

- If tone is not specified anywhere, STOP with BLOCKER and request tone adjectives.

### D) Primary Conversions and Hierarchy

- For each page, identify the single primary CTA (and any secondary CTAs).

### E) Components in Scope

- Cards, buttons, links, accordions, tabs/pills, tables, data viz (maps/charts), forms, nav/footer.

**Acceptance check:**

- You can point to where the palette lives.
- You can state the tone adjectives.
- You can name the primary CTA on each page being edited.

---

## Contract 1 — Tone-First, Clarity-First Visual Principles (Non‑Negotiables)

1. **Tone > decoration.** The UI MUST feel like the brand (based on the 3 tone adjectives), not like a generic template.
2. **Clarity over cleverness.** Reduce visual noise and avoid "busy" layouts.
3. **Avoid "stack of rectangles."** Do NOT rely on repeated hard boxes, heavy borders, and prominent dividers to structure the page.
4. **Affordance without anxiety.** Interactivity MUST be clear via subtle motion, shadow, cursor, and focus rings—without harsh outlines.
5. **Use whitespace and typography first.** Add color and shape only to improve comprehension and hierarchy.

**Acceptance check:**

- Scrolling feels like a coherent narrative, not a pile of modules.
- Primary CTA is obvious; secondary elements don't compete.

---

## Contract 2 — Brand Palette Usage and Color Discipline

### Rules

- Use ONLY approved brand colors from the project's palette source of truth. Do NOT invent new hex values.
- Prefer defining CSS tokens/variables for:
  - Primary (ink / brand)
  - Accent(s)
  - Neutrals
  - Semantic states (success/warn/error) only if defined by the brand system
- Use tints for large backgrounds. Reserve full-saturation accents for small, intentional moments.
- Maintain readable contrast (especially body text, links, and form labels).

### Implementation Standard

- Centralize brand colors in tokens and reuse consistently across components.
- If a new "one-off" color is needed, STOP with BLOCKER and request approval from the brand palette owner.

**Acceptance check:**

- Color usage is consistent across pages and components.
- Accents guide attention; they don't overwhelm content.

---

## Contract 3 — Layout, Section Flow, and Spacing Cadence

### Goal

A consistent vertical rhythm across sections that feels intentional, not irregular.

### Rules

- Establish a limited set of section padding sizes and reuse them consistently.
- Avoid abrupt jumps in vertical spacing unless there is a clear narrative reason.
- Prefer soft transitions between sections:
  - subtle background tint shifts
  - gentle gradients/fades
  - whitespace

  instead of prominent horizontal rules.
- If separation is necessary, keep dividers extremely subtle.

### Implementation Guidance

- Standardize a "Section wrapper" pattern so each page uses the same cadence primitives.

**Acceptance check:**

- The page reads smoothly on scroll.
- Section boundaries are felt, not shouted.

---

## Contract 4 — Interaction + Motion System (Global)

All interactive elements MUST share a consistent hover/focus/active system.

### Applies to

- Buttons, text links
- Cards, list rows, tiles
- Accordions, tabs, pills/filters
- Form controls
- Tables and data visualizations

### Hover Rules

- Cursor: `pointer` on clickable elements.
- Motion: subtle lift (1–2 px max) and/or gentle shadow increase.
- Transitions: consistent duration/easing across the entire site (no random snappiness).
- Avoid "multi-signal overload" (don't stack strong border + strong shadow + bright fill).

### Focus + Keyboard Rules

- Every interactive element MUST have a visible, consistent focus style.
- Focus rings MUST harmonize with the brand palette and remain clearly visible.

### Reduced Motion

- Respect `prefers-reduced-motion`. Motion MUST degrade gracefully (shadow-only or no-motion).

**Acceptance check:**

- Hover/focus feels uniform everywhere.
- Keyboard navigation is usable and obvious.

---

## Contract 5 — Card System (Calm, Breathable, Consistent)

Cards MUST communicate clickability without looking like boxed widgets.

### Rules

- Default state: minimal chrome. Prefer soft shadow and spacing over borders.
- Hover state: slight shadow increase + minimal lift.
- Selected/active state: use ONE primary indicator (subtle tint OR subtle outline OR icon change).
- Keep corner radius consistent across the site.

### Recommended Tactic When Pages Feel Cluttered

- Remove always-on card borders and rely on soft shadow + hover feedback.

**Acceptance check:**

- Cards "breathe" and don't create a cluttered grid effect.

---

## Contract 6 — Interactive Data Components (Maps, Tables, Charts)

Interactive tools MUST feel product-quality and on-brand.

### Rules

- Hover/selected states MUST use approved brand colors (often via subtle tints + a clear stroke/outline).
- Selected state MUST be distinct from hover and from "filtered/matching" states.
- Tooltips, legends, and labels MUST match typography and spacing system.
- Table row hover/selected MUST match card hover/selected logic.

### Do

- Keep interactions consistent between the visualization (map/chart) and the supporting UI (table/filters).

### Don't

- Use default browser blues or harsh outlines that break the brand system.

**Acceptance check:**

- The tool feels cohesive, intentional, and easy to interpret.

---

## Contract 7 — Copy and Naming Consistency (Tone-Aligned)

### Rules

- Copy MUST match the project's tone adjectives.
- Prefer plain language and clarity in headings.
- Avoid hype, urgency, or anxiety-inducing phrasing unless the brand explicitly calls for it.
- Use consistent naming for recurring concepts across pages.

**Acceptance check:**

- Headings and CTAs feel like the same voice across the site.

---

## Contract 8 — Secondary Conversion Modules (Newsletter / Waitlist / Subscribe)

Any secondary conversion module MUST NOT compete with the primary CTA.

### Rules

- Secondary modules MUST be visually subordinate:
  - lower contrast than primary CTA
  - smaller typographic emphasis
  - calmer background treatment
- Choose ONE button label convention site-wide (e.g., "Sign up" vs "Subscribe") and apply consistently.
- Support text MUST be calm and informative (frequency expectations, what users get, no pressure).

**Acceptance check:**

- Primary CTA remains dominant.
- Secondary modules feel optional, not pushy.

---

## Contract 9 — Cross-Surface Consistency (Marketing ↔ Product UI)

### Goal

Marketing pages and product UI MUST feel like one family.

### Rules

- Reuse the same typography, spacing cadence, color tokens, buttons, and hover/focus patterns.
- Nav/footer patterns MUST be consistent across marketing pages.
- Avoid page-by-page reinvention of component styles.

**Acceptance check:**

- Users can move between pages/surfaces without perceiving a different "design system."

---

## Contract 10 — SEO + AI Discoverability Baseline (Code + On‑Page)

These are minimum standards for any public marketing/content page.

### Semantic Structure

- One clear H1 per page, followed by a logical H2/H3 hierarchy.
- Use real HTML semantics (`header`/`nav`/`main`/`footer`, `section`, `article`) instead of div-only structure.
- Ensure primary content is server-rendered or otherwise indexable (avoid hiding key copy behind heavy client-only rendering).

### Metadata

- Unique, descriptive `<title>` and meta description per page.
- Canonical tags where appropriate (especially if variants exist).
- Open Graph and Twitter metadata for share previews.

### Internal Linking + IA

- Ensure key pages are reachable within a few clicks from the homepage/nav/footer.
- Use descriptive anchor text (avoid "click here").
- Add contextual links between related pages/tools/resources.

### Performance + Accessibility

- Optimize images (responsive sizes, lazy-load below the fold).
- Use descriptive alt text for meaningful images (avoid keyword stuffing).
- Maintain accessible forms and labels (improves both UX and machine parsing).

### Structured Data (When Relevant)

- Add Schema.org markup where it naturally applies (Organization, WebSite, FAQPage, Article).
- Only include structured data that matches visible content.

### AI/LLM Readiness

- Put the "what is this / who is it for / what does it do" answer in plain text near the top of each page.
- Prefer scannable sections (short paragraphs, clear headings, simple lists) that are easy to extract.

**Acceptance check:**

- Headings are correct and unique per page.
- Metadata is present and page-specific.
- Content is easy to parse for humans and machines.

---

## QA Checklist (Required Before "Done")

- [ ] Desktop + mobile: layout and rhythm feel intentional.
- [ ] Primary CTA is dominant; secondary CTAs are clearly secondary.
- [ ] Hover/focus states are consistent across all interactive components.
- [ ] Keyboard navigation works and focus is visible.
- [ ] Contrast sanity check for text and controls.
- [ ] "Clutter test": if it feels busy, remove borders/dividers first, reduce competing accents, and simplify hierarchy.
- [ ] SEO basics: title/description, H1, heading order, indexable main content.

---

## References

Additional contract files (ensure these exist before referencing):

| Order | Path | Status |
|-------|------|--------|
| 1 | `/docs/contracts/lovable-performance-code-hygiene-contract.md` | ACTIVE |
| 2 | `/docs/contracts/lovable-mobile-rn-portability-contract.md` | ACTIVE |
| 3 | `/docs/contracts/lovable-workflow-and-gates.md` | ACTIVE |
| 4 | `/docs/contracts/lighthouse-notes.md` | ACTIVE |
| 5 | `/docs/contracts/TODO-brand-contract.md` | TODO |
| 6 | `/docs/contracts/lovable-seo-llm-mcp-surface-contract.md` | ACTIVE |
| 8 | `/config/project-gates.json` | ACTIVE — runtime gates |
