# UI Polish Working Group Audit

> Splice Labs website — Next.js 14 App Router · React 18 · Tailwind · shadcn/ui · React Three Fiber
> Reviewed branch: `feat/track4-qa-fixes` (= `staging` + Track 4 QA fix)
> Method: five independent reviewer personas, code-based audit, strict A–F grading.
> Standard: "Would this feel at home in a top-tier, VC-backed, design-led AI product?"

---

## Executive Summary

The Splice Labs site has a **genuinely premium ceiling and a launch-blocked floor**. The marketing home page and the `@/components/blog` primitive library are A-grade work — disciplined token layer, hairline/0-radius/no-shadow restraint, a confident alternating "splice spine" layout, motion treated as instrumentation rather than decoration, and exemplary focus-ring and `aria-*` coverage on the blog components.

That ceiling is not reached site-wide. Four problems keep the product out of premium tier:

1. **A 90%-dead component library.** 43 of 48 shadcn/ui primitives are unused scaffolding, and the default `<Button>`/`<Badge>`/`<Input>` ship rounded, shadowed styling that contradicts the brand. The real UI runs on hand-rolled components — good ones — but the "library" is a trap, not a system.
2. **No feedback states.** The flagship contact ("request a demo") form `preventDefault`s into a void — no loading, success, error, or validation. `NewsletterCard` reports success even when its submit promise rejects.
3. **Accessibility defects that gate launch.** The desktop nav dropdown is keyboard-unreachable; the blog "paper" surface fails WCAG AA contrast on body text and link-hover; the full-viewport R3F swarm ignores `prefers-reduced-motion`.
4. **Premium follow-through stops after the home page.** Secondary screens (Helios, Dataroom) and the deck system hand-roll CTAs and eyebrows that purpose-built primitives already exist for; the blog runs a parallel, un-tokenized type system; container widths drift across pages.

The craft is real. The discipline is not yet enforced by structure — it is held together by copy-paste, and it has launch-blocking holes.

---

## Overall Grade

### **B− — launch-gated to C+ until the P0 cluster is resolved.**

The home page and blog primitives are individually A-tier; the product as a whole is dragged to B− by dead scaffolding, missing states, accessibility failures, and inconsistent follow-through. It is **not demo-ready** until the six P0 items below are fixed — at which point the honest grade rises toward B+/A−, because the underlying craftsmanship is there.

---

## Working Group Findings

### 1. Design Systems Lead

Component-library utilization is the headline problem. Of 48 shadcn/ui primitives in `src/components/ui/`, exactly **five are imported anywhere** (`toast`, `toaster`, `sonner`, `tooltip`, `dropdown-menu`). The other **43 are dead scaffolding** — `button.tsx`, `badge.tsx`, `input.tsx`, `card.tsx`, `dialog.tsx`, `tabs.tsx`, etc. — never referenced. This is an unpruned `npx shadcn add` dump masquerading as a library, and it misleads anyone navigating the repo.

The dead components also contradict the brand: `button.tsx:8` ships `rounded-md`, `badge.tsx:7` `rounded-full`, `input.tsx:11` `rounded-md` — none themed to the 0px-radius / hairline / no-shadow brand. Harmless only because unused; a future engineer reaching for the obvious `<Button>` gets brand-violating styling. Tellingly, the *real* components (`TerminalButton`, `LabelChip`, `CoverTile`, `TagPill`) are disciplined — zero stray radius classes, zero `shadow-*` across `marketing/`, `blog/`, `screens/`.

`src/index.css:52` sets `--radius: 0.125rem` (2px); the spec mandates **0px** ("No exceptions, anywhere" — `splicelabs-blog-primitives-guide.md:609`). Latent token bug.

Variant systems on the shipped components are coherent (`TerminalButton`, `LabelChip`, `CoverTile` all have well-documented `variant`/`size`/`tone` APIs). But there are **two different `ModuleLabel` components** — `marketing/ui/ModuleLabel.tsx` and `blog/ModuleLabel.tsx` — same name, divergent props, divergent token namespaces, no shared base: a fragmentation trap.

Token discipline is mostly strong — the `--blog-*` namespace genuinely extends the core palette — but three non-identical teals coexist: `--primary` (174 100% 42%), `--blog-tile-teal` (174 100% 38%), and a raw `#00D4B4` in `BrandGuide.tsx:133`, quietly violating the "single electric-teal accent" promise. Raw hex also leaks into the swarm (`SwarmCanvas.tsx:24`, `SwarmEngine.tsx:275`).

### 2. Premium UI / Product Designer

The marketing home is the strongest surface. Nine sections share one disciplined skeleton (`max-w-[1700px] · px-6 md:px-8 · py-20 md:py-28`, `border-t` divider, mono `module::*` eyebrow, alternating "splice spine" with junction nodes). Padding is *perfectly* uniform across all nine. The `mask-fade-from-*` treatment (`index.css:163-194`) is a craftsman-level touch. This is a real design system.

But typography is where premium slips. There is no shared heading component — every section re-declares `font-display text-2xl md:text-3xl font-semibold tracking-splice-tight` by hand. Consistent *today* by copy-paste, not structure. H1 sizing is genuinely arbitrary across page types: home `text-[4.5rem]` (`HeroSection.tsx:33`), Helios `text-[3.75rem]` (`Helios.tsx:74`), Dataroom `md:text-5xl` (`Dataroom.tsx:119`), blog `text-4xl md:text-5xl` (`ArticleHeader.tsx:43`). Body-copy opacity sprawls `/50`–`/60`–`/70`–`/85` with no system.

The blog and marketing layers do not feel like one product up close. Marketing uses the named `tracking-splice-*` scale; the blog ignores it and hard-codes `tracking-[0.06em]` (×15), `tracking-[-0.02em]`, etc. — reinventing values that already have token names, and drifting them. Two type systems wearing the same fonts.

Component reuse breaks off the home page: `Helios.tsx` and `Dataroom.tsx` hand-roll the exact CTA and eyebrow that `TerminalButton`/`ModuleLabel` exist for. `SiteNav` — the first thing every visitor sees — uses raw `tracking-widest` instead of the token. Container width is the most visible cross-page tell: home `1700px`, Helios/Dataroom `1200px`, decks `1400px`, nav `1200px` — the nav is narrower than the home content beneath it.

Empty/feedback states are absent — the contact form `preventDefault`s into nothing. For a foundry selling rigor, a dead-end form is the wrong final impression.

### 3. Interaction Designer

The blog primitive system is genuinely premium. `PostCard` (`PostCard.tsx:30-64`) layers a hover correctly — texture opacity `0.08→0.14`, a `scale-x-0` underline drawing over 200ms, an `active:scale-[0.992]` press — and the whole card is one `<a>` with a real focus ring. `ListPostRow`/`CategoryHeroNav` reuse the exact pattern. `ListenButton` is a standout: a full `idle/loading/playing/paused` machine with visible feedback. The blog surface earns an A on its own.

The marketing surface is where it falls apart — and the most-used button is the worst offender. `TerminalButton` does not match its own spec (prompt pack §7): no inset hover ring, plain `ease-out` instead of the mandated ease-out-quart, no `cursor-not-allowed` on disabled. The single most-clicked element on the site is under-spec.

The contact form is a dead end (`ContactSection.tsx:49`) — no loading, success, error, or disabled-while-submitting; its submit button is a raw element, not `TerminalButton`. `NewsletterCard` *does* handle submit but has no loading state and treats a rejected promise as success (no `catch`).

`motion-safe:` gating is inconsistent: `PostCard.tsx:60`, `ListPostRow.tsx:39`, `TerminalButton`'s caret reveal are ungated, while `SiteFooter.tsx:47`'s identical underline *is* gated. The `draw` keyframe runs 480ms — outside the spec's 120–320ms ceiling. The nav dropdown opens on hover only — keyboard users can't reach it.

### 4. Frontend Engineer

Build health is genuinely good: `npm run build` clean (14 routes, 87.5 KB shared JS), `npm run lint` 0 errors / 1 benign warning, types pass. The tooling will not rot.

Component reuse is the central failure. `ModuleLabel`'s own docstring says it *"Replaces the hand-rolled eyebrow spans across the marketing sections"* — it does not. Only `HeroSection` consumes it; the other 8 sections plus `Helios`, `Dataroom`, and `SlideComponents` hand-roll the identical "junction node + `module::x` + hairline" block — **~14 inline copies** of a component built to eliminate them, and the negative-margin offsets already diverge between copies.

CSS/Tailwind discipline is weak: **497 arbitrary-value brackets**, of which **255 are arbitrary font sizes** (`text-[10px]` ×102, `text-[9px]` ×79, …). `tailwind.config.ts` defines bespoke `letterSpacing` tokens but **no `fontSize` scale** — the most-repeated value in the codebase is the least tokenized.

Interactions are soundly implemented where the primitives are used (`TerminalButton` disabled handling on both `<a>` and `<button>` paths is correct; underline-draws are properly `motion-safe`-gated). But coverage is partial — contact-form inputs have no `focus-visible` ring, mobile-nav buttons have none at all and lack `type="button"`. Mobile: touch targets under 40px, `AgentsSection` uses `grid-cols-2` with no breakpoint, and negative-margin junction nodes risk horizontal scroll with no `overflow-x` guard.

### 5. Accessibility Reviewer

A tale of two design systems. The marketing/graphite surface is genuinely strong; the blog "paper" surface fails.

**Contrast** — graphite passes comfortably (`foreground` 15.97:1, `accent` 10.41:1). The blog paper surface **fails hard**: `--blog-text-muted` → **2.93:1** (used as visible text in `AuthorRow.tsx:40,50`, `Crumb.tsx:28`), `--blog-text-subtle` → **1.86:1**, in-prose link hover `--blog-link-underline` → **2.0:1** (`MDXComponents.tsx:72`). Tokens were tuned for the graphite surface and reused on paper without re-checking.

**Keyboard** — blog components are exemplary (`focus-visible` rings, `aria-pressed`, `aria-current` everywhere). But the **desktop nav dropdown is mouse-only** (`SiteNav.tsx:88`) — opens on `onMouseEnter` with no `onClick`, no `aria-expanded`/`haspopup`, no Escape; dropdown children (HELIOS, Security, Founders, Commitments) are **keyboard-unreachable**. Contact-form fields and the mobile hamburger have no `focus-visible` style.

**Semantics** — strong `aria-hidden`/`aria-pressed`/`aria-current` discipline; the R3F canvas is correctly `aria-hidden`. Loses points for two `<h1>`s in the hero, no `aria-expanded` on the hamburger, and no skip-link.

**Touch** — `Pagination` (36px), `ViewToggle` (36px), `TerminalButton size="sm"` (~30px), `TagPill` (~28px) all fail the project's own ≥40px contract.

**Reduced motion** — disciplined `motion-safe:` gating everywhere *except* the single most prominent motion on the site: the **R3F swarm has no `prefers-reduced-motion` check** and runs `frameloop="always"`.

---

## Category Grades

| Category | Grade | Rationale | Evidence |
|---|---:|---|---|
| 1. Microinteractions | B+ | Blog primitives are A-tier layered hovers; marketing CTA misses its own spec and `draw` exceeds the motion ceiling. | `PostCard.tsx:30-64`, `TerminalButton.tsx:47-53`, `tailwind.config.ts:153` |
| 2. Hover / focus / active / disabled | B− | Focus-visible strong within each surface; three different input focus treatments, nav dropdown has no keyboard affordance. | `ui/input.tsx:11`, `ContactSection.tsx:58`, `SearchInput.tsx:42`, `SiteNav.tsx:91-98` |
| 3. Loading / empty / error / success | D | Flagship contact form has zero feedback states; `NewsletterCard` reports success on a rejected promise; no async action shows loading. | `ContactSection.tsx:49`, `NewsletterCard.tsx:27-31` |
| 4. Component-library utilization | D+ | 43 of 48 shadcn primitives dead and brand-contradicting; `ModuleLabel` orphaned while its pattern is duplicated ~14×. | `src/components/ui/*`, `marketing/ui/ModuleLabel.tsx`, 8 `home/*Section.tsx` |
| 5. Component variant consistency | C+ | Shipped primitives have coherent variant APIs; two same-named `ModuleLabel`s, divergent negative-margin offsets, no `disabled` on chips. | `marketing/ui/ModuleLabel.tsx` vs `blog/ModuleLabel.tsx`, `TagPill.tsx`, `LabelChip.tsx` |
| 6. Primary / secondary palette usage | B+ | Disciplined graphite + teal; `--blog-*` namespace extends cleanly; docked for three non-identical teals. | `index.css:25,96`, `BrandGuide.tsx:133` |
| 7. Semantic color usage | B | Good semantic aliasing and tone maps; raw hex in swarm components; extended warm palette defined but barely wired. | `Callout.tsx:9`, `CoverTile.tsx:11`, `SwarmCanvas.tsx:24`, `index.css:37-43` |
| 8. Typography hierarchy | C+ | Right fonts and a tracking scale, but no shared heading component, four arbitrary H1 sizes, 255 arbitrary `text-[Npx]`, body-opacity sprawl. | `HeroSection.tsx:33`, `Helios.tsx:74`, `Dataroom.tsx:119`, `tailwind.config.ts` (no `fontSize`) |
| 9. Spacing / layout rhythm | B | Home page rhythm is premium and uniform; capped by container-width drift across pages and arbitrary calc offsets. | all `home/*Section.tsx` (`py-20 md:py-28`), `Helios.tsx:60`, `Dataroom.tsx:106`, `SiteNav.tsx:78` |
| 10. Mobile polish | C+ | Layouts reflow but several adapt poorly; sub-40px touch targets; `grid-cols-2` with no breakpoint; horizontal-overflow risk. | `SiteNav.tsx:136,155`, `AgentsSection.tsx:38`, `HomePage.tsx:33` |
| 11. Accessibility polish | C | Blog components exemplary, graphite contrast strong — but keyboard-unreachable nav, sub-AA paper text, ungated swarm. | `SiteNav.tsx:88`, `index.css:88-89,109`, `SwarmCanvas.tsx` |
| 12. Overall premium feel | B− | The home page and blog read as a design-led product; follow-through fails on secondary screens, dead scaffolding, and missing states. | `Helios.tsx:98-115`, `src/components/ui/*`, `ContactSection.tsx:49` |

---

## Component Library Utilization Assessment

**Verdict: D+ — a library in name only.**

- **shadcn/ui (`src/components/ui/`, 48 components):** only `toast`, `toaster`, `sonner`, `tooltip`, `dropdown-menu` are imported. The remaining 43 are unpruned scaffolding. They are not themed — they ship default `rounded-md`/`rounded-full` and `ring-2`/shadow styling that contradicts the 0px-radius, hairline, no-shadow brand. **Decision required:** either delete them, or properly theme + adopt them. Leaving them is the worst option — the obvious `<Button>` is a brand-violating booby trap.
- **Bespoke components are good but under-reused.** `TerminalButton`, `ModuleLabel`, `TagChip`, `TerminalCaret`, `ScrollProgress` (marketing) and the ~30-component `@/components/blog` library are well-built with coherent variant APIs. But `ModuleLabel` is orphaned (1 of ~14 call sites), and `Helios`/`Dataroom`/`ContactSection` hand-roll CTAs the primitives already provide.
- **Naming collision:** two `ModuleLabel` components with divergent props and token namespaces. One must be renamed or merged.
- **Three parallel "button-ish" systems:** shadcn `button` (dead), marketing `TerminalButton`, blog chips (`TagPill`/`LabelChip`). The latter two are justified (different surfaces); shadcn `button` as a silent third is not.

---

## Primary and Secondary Palette Assessment

**Verdict: B+ — disciplined, with reconcilable cracks.**

- **Primary (graphite + electric teal):** consistent and restrained. The core `:root` palette and the `--blog-*` namespace are well-organized; both the graphite and paper surfaces are first-class.
- **Three teals problem:** `--primary`/`--accent` at `174 100% 42%`, `--blog-tile-teal` at `174 100% 38%`, and a raw `#00D4B4` in `BrandGuide.tsx:133`. The brand promises a *single* electric-teal accent — pick one luminance and reconcile.
- **`--primary` === `--accent`** — a duplicate token; collapse or document the intent.
- **Secondary / extended palette** (`--amber`, `--gold`, `--rust`, `index.css:37-43`) is defined but barely wired into semantic roles — either assign it real roles or trim it.
- **Raw hex leakage:** `SwarmCanvas.tsx:24` (`#0D0F11`), `SwarmEngine.tsx:275` (`#FFB800`), `BrandGuide.tsx:133` (`#00D4B4`). R3F can read CSS variables at mount — route these through tokens.
- **Semantic color** is otherwise sound: `Callout` tone map, `--blog-link-underline`, `--blog-highlight-amber`, `STATUS_COLORS` in Dataroom.

---

## Microinteraction Assessment

**Verdict: B+ ceiling, B− consistency.**

- **Best-in-class:** `PostCard` / `ListPostRow` / `CategoryHeroNav` layered hover (texture ramp + underline draw + press scale, single `<a>`, real focus ring); `ListenButton` full state machine; `ArticleActions`/`ShareMenu` copy→"Copied" success revert; `TagPill`/`ViewToggle`/`Pagination` `aria-pressed`/`aria-current` + consistent disabled.
- **Under-spec:** `TerminalButton` — the primary site CTA — omits the spec'd inset hover ring, uses plain `ease-out` not ease-out-quart, and lacks `cursor-not-allowed` on disabled.
- **Inconsistent gating:** `PostCard.tsx:60`, `ListPostRow.tsx:39`, `TerminalButton.tsx:64` caret, `ScrollProgress` transitions are *not* `motion-safe:`-gated; `SiteFooter.tsx:47` (same interaction) is.
- **Out-of-band motion:** `draw` keyframe at 480ms exceeds the 120–320ms ceiling.
- **Missing entirely:** loading states on every async action; hover/press feedback on the contact submit button (raw element); keyboard affordance on the nav dropdown.

---

## Page-by-Page Findings

- **Home (`/`)** — Strongest surface. Nine sections, uniform rhythm, splice-spine layout, staggered hero reveal, scroll progress. Gaps: 8 of 9 eyebrows hand-rolled; contact form dead-ends; `AgentsSection` 2-col with no mobile breakpoint; swarm ungated for reduced motion.
- **`/helios`** — Hand-rolls CTA (`Helios.tsx:98-115,228-239`) and eyebrow (`:67`) instead of primitives; container `1200px` vs home's `1700px` (visible jump); H1 at `text-[3.75rem]` — a third H1 size.
- **`/dataroom`** — Same hand-rolled CTA/eyebrow duplication (`:262,112`); `1200px` container; H1 at `md:text-5xl` — a fourth H1 size; `STATUS_COLORS` map is a good semantic-color example.
- **`/decks`, `/deck-e`** — `1400px` container (third width); `SlideComponents.tsx:58` re-duplicates the eyebrow; internal `noindex` pages, lower priority.
- **`/logos`, `/brand`** — Internal `noindex`. `BrandGuide` carries a raw `#00D4B4` teal and an internal "Aakanksha/Akanksha" spelling inconsistency; otherwise fine post the recent SVG-font fix.
- **`/blog/index-demo`** — Premium. Real empty state, filter rail, grid/list toggle, pagination. Paper-surface contrast failures apply here.
- **`/blog/article-demo`** — Premium reading experience (TOC, callouts, MDX, TLDR rail). In-prose link hover color fails AA on paper.
- **`/blog/primitives`** — Internal showcase; solid.

---

## Component-by-Component Findings

- **`TerminalButton`** — Good prop API and disabled handling; misses spec'd hover ring, easing curve, `cursor-not-allowed`. Not adopted by `ContactSection`/`Helios`/`Dataroom`.
- **`ModuleLabel` (×2)** — Two components, same name, divergent APIs/tokens. The marketing one is orphaned (1 of ~14 sites).
- **`PostCard` / `ListPostRow` / `CategoryHeroNav`** — A-grade. Only nit: underline transition not `motion-safe`-gated.
- **`ListenButton` / `ArticleActions` / `ShareMenu`** — A-grade state handling.
- **`NewsletterCard`** — No loading state; rejected promise renders as success (no `catch`).
- **`ContactSection` form** — No states at all; inputs have no `focus-visible` ring; submit button is a raw element.
- **`SiteNav`** — Dropdown mouse-only / keyboard-unreachable; mobile buttons lack `focus-visible`, `type="button"`, `aria-expanded`; uses `tracking-widest` off-token; dead `Dropdown` component (`:36-64`).
- **`Pagination` / `ViewToggle` / `TagPill`** — Good `aria-*`; touch targets under 40px.
- **shadcn `ui/*`** — 43 dead; the 5 used (`tooltip`, `dropdown-menu`, toasts) still ship default radius.
- **Blog `Callout` / `CoverTile` / `LabelChip`** — Coherent variant systems; chips lack a `disabled` variant.

---

## Missing States and Interactions

- **Loading states** — absent on *every* async action (contact submit, newsletter submit, `ListenButton` remote endpoint aside).
- **Error states** — contact form has none; `NewsletterCard` has no error path.
- **Success states** — contact form has none (`NewsletterCard` has one, but reachable on failure too).
- **Validation states** — no inline field validation anywhere.
- **Disabled-while-submitting** — no form disables its submit during flight.
- **Keyboard-open state** — nav dropdown has no keyboard-driven open/close.
- **`aria-expanded`** — missing on the mobile hamburger and dropdown triggers.

---

## Premium Polish Gaps

- No shared `<Display>` / `<SectionHeading>` component — heading styles are copy-pasted; four arbitrary H1 sizes.
- No `fontSize` token scale — 255 arbitrary `text-[Npx]` values.
- Body-text opacity sprawls `/50`–`/85` with no system.
- Container width drifts across pages (`1700` / `1400` / `1200`); nav narrower than home content.
- Blog runs a parallel, un-tokenized type system (`tracking-[*]`, `leading-[*]` instead of `tracking-splice-*`).
- `text-[8px]` micro-labels below a legible floor.
- Internal content QA: "Aakanksha/Akanksha Mahajan" inconsistency.
- Dead code: unused `Dropdown` (`SiteNav.tsx:36`), `App.css` `logo-spin`.

---

## Accessibility and Keyboard Interaction Gaps

- **P0** Desktop nav dropdown keyboard-unreachable — no `onClick`, `aria-expanded`, `aria-haspopup`, Escape (`SiteNav.tsx:88-115`).
- **P0** Blog paper-surface contrast fails AA — `--blog-text-muted` 2.93:1, `--blog-text-subtle` 1.86:1, link-hover teal 2.0:1 (`index.css:88-89,109`; `AuthorRow.tsx:40,50`; `Crumb.tsx:28`; `MDXComponents.tsx:72`).
- **P0** R3F swarm ignores `prefers-reduced-motion` — `frameloop="always"`, full-viewport (`SwarmCanvas.tsx`).
- **P1** Contact-form inputs and mobile-nav buttons/hamburger have no `focus-visible` ring (`ContactSection.tsx:58,70,82`; `SiteNav.tsx:136,153,165,178`).
- **P1** Touch targets under the project's ≥40px contract — `Pagination` (36px), `ViewToggle` (36px), `TerminalButton size="sm"` (~30px), `TagPill` (~28px).
- **P1** No `aria-expanded` on the hamburger; no skip-to-content link.
- **P2** Two `<h1>`s in the hero (`HeroSection.tsx:32,38`); form helper text at 4.0:1 opacity.

---

## Mobile and Responsive Polish Gaps

- Touch targets under 40px across mobile nav, hamburger, pagination, toggle, chips, `sm` button.
- `AgentsSection.tsx:38` — `grid-cols-2` with no responsive breakpoint; ~140px cards at 320px.
- No `overflow-x-hidden` guard — absolute negative-margin junction nodes (`-ml-[calc(2rem+4px)]`) risk horizontal scroll on small viewports.
- No fluid type — headings jump `text-2xl → md:text-3xl` in one discrete step.
- Mobile nav rows are bare `py-2` text — ~32px, no padded hit area.

---

## Prioritized Remediation Plan

### P0 — Must Fix Before Demo / Launch

1. **Contact form feedback states.** Add loading / success / error / inline validation and disabled-while-submitting; wire `aria-live="polite"`; replace the raw submit `<button>` with `TerminalButton as="button" type="submit"`. `ContactSection.tsx:49-95`.
2. **Keyboard-accessible nav dropdown.** Add `onClick` toggle, `aria-expanded`, `aria-haspopup="menu"`, `aria-controls`, Escape-to-close, focus management. `SiteNav.tsx:88-115`.
3. **Blog paper-surface contrast.** Darken `--blog-text-muted` / `--blog-text-subtle` to ≥4.5:1 on paper (and re-verify on graphite), and fix the in-prose link-hover color. `index.css:88-89,109`; `MDXComponents.tsx:72`.
4. **Reduced-motion gate on the swarm.** Check `prefers-reduced-motion` and skip the canvas or freeze `frameloop`. `SwarmCanvas.tsx`.
5. **`NewsletterCard` failure path.** Add a `try/catch` so a rejected `onSubmit` doesn't render "Subscribed"; add a loading state. `NewsletterCard.tsx:27-31`.
6. **Horizontal-overflow guard.** Add `overflow-x-hidden` at the layout/home-wrapper level; verify the negative-margin junction nodes at 320px. `layout.tsx`, `HomePage.tsx:33`.

### P1 — Should Fix for Premium Polish

1. Resolve the shadcn library: delete the 43 unused primitives, or theme + adopt them (0px radius, no shadow). `src/components/ui/*`.
2. Fix `--radius: 0.125rem` → `0`. `index.css:52`.
3. Replace all ~14 hand-rolled eyebrows with `<ModuleLabel>`; extend it with the junction-node variant. 8 `home/*Section.tsx`, `Helios.tsx:67`, `Dataroom.tsx:112`, `SlideComponents.tsx:58`.
4. Replace hand-rolled CTAs on secondary screens with `TerminalButton`. `Helios.tsx:98-115,228-239`, `Dataroom.tsx:262`, `ContactSection.tsx:86`.
5. Bring `TerminalButton` to spec: inset hover ring, ease-out-quart easing, `disabled:cursor-not-allowed`. `TerminalButton.tsx:47-53`.
6. `focus-visible` rings on contact-form inputs and all mobile-nav controls; `type="button"` on nav buttons. `ContactSection.tsx:58,70,82`, `SiteNav.tsx:91,136,153`.
7. Touch targets ≥40px — `Pagination`, `ViewToggle`, `TagPill`, `TerminalButton size="sm"`, mobile nav rows/hamburger.
8. Unify container width to one (or a documented two — marketing-wide vs reader) via a shared `<Container>`.
9. `motion-safe:` gating on `PostCard`/`ListPostRow`/`TerminalButton`/`ScrollProgress` transitions; bring `draw` within 320ms. `tailwind.config.ts:153`.
10. `aria-expanded` on the hamburger; gate `AgentsSection` `grid-cols-2` behind `sm:`.

### P2 — Nice-to-Have Enhancements

1. Add a `fontSize` token scale to `tailwind.config.ts`; migrate the 255 `text-[Npx]` values.
2. Introduce shared `<Display>` / `<SectionHeading>` components; define one H1 scale for all page types.
3. Standardize body-text opacity to 2–3 named steps.
4. Migrate the blog to the `tracking-splice-*` scale and a fixed leading set.
5. Merge the two `ModuleLabel` components; reconcile the three teals; collapse `--primary`/`--accent`.
6. Route swarm raw hex through tokens; wire or trim the extended warm palette.
7. Add a skip-to-content link; collapse the hero's two `<h1>`s.
8. Remove dead code (`Dropdown`, `App.css` `logo-spin`); fix the "Aakanksha" spelling; raise `text-[8px]` labels to ≥10px.
9. Fluid `clamp()` heading sizes; standardize `transition-colors` easing.

---

## Specific Implementation Recommendations

- **Form states pattern.** Adopt the `NewsletterCard` model (resolve → success chip) but corrected: `idle | submitting | success | error` state, button `disabled` + label swap during `submitting`, `try/catch`, `aria-live` region for the result. Make it a shared `useFormSubmit` hook so contact + newsletter share one implementation.
- **Eyebrow consolidation.** Extend `marketing/ui/ModuleLabel` with a `junction` boolean that renders the node + negative-margin offset, so the offset lives in exactly one file. Rename `blog/ModuleLabel` (e.g. `BlogEyebrow`) to end the name collision.
- **Type scale.** Add `fontSize` to `tailwind.config.ts` with named steps (`micro`, `label`, `eyebrow`, `body`, `h3`…`display`); codemod `text-[Npx]` → scale. Pair with `<Display>`/`<SectionHeading>` components.
- **shadcn decision.** This site's bespoke components are strong enough that the cleanest path is to **delete the 43 unused primitives** and keep only the 5 in use — then theme those 5 to 0px radius. If shadcn is wanted as a foundation, that is a larger, deliberate theming project, not a default.
- **Contrast.** Re-derive `--blog-text-muted`/`--blog-text-subtle` per surface — they need different luminance on paper vs graphite. Consider surface-scoped token overrides rather than one shared value.
- **Container.** One `<Container size="wide" | "reader">` component; replace every `max-w-[…] mx-auto px-…` literal.

---

## Acceptance Criteria for Completion

This audit is satisfied when:

1. **All six P0 items are resolved** and re-verified — contact + newsletter forms have full state coverage; the nav dropdown is fully keyboard-operable; all paper-surface text meets WCAG AA (≥4.5:1 body, ≥3:1 large/UI); the swarm honors `prefers-reduced-motion`; no horizontal scroll at 320px.
2. **`npm run build` passes and `npm run lint` exits 0** with no new warnings.
3. **No dead component scaffolding** — `src/components/ui/` contains only themed, used components, or the shadcn adoption is a documented, completed decision.
4. **`--radius` is `0`** and no shipped component renders a non-zero radius or a drop shadow.
5. **Every interactive element** has visible hover, `focus-visible`, active, and (where applicable) disabled and loading states — verified by keyboard walkthrough of every route.
6. **Every async action** shows a loading state and handles failure.
7. **Touch targets ≥40px** on all interactive elements at mobile widths.
8. **One type scale, one container system, one eyebrow component** — no arbitrary `text-[Npx]`, no per-page container widths, no hand-rolled eyebrows.
9. **Category grades re-audited at B+ or above** across all 12 categories, with categories 3, 4, and 11 specifically clearing C+.
10. **A re-run of this working-group review** produces no new P0 findings.
