# Unused Components Audit

Date: 2026-05-08
Scope: `splice-identity-foundry/src/`
Method: static import-graph trace from `src/main.tsx` → `src/App.tsx` → routed pages → leaf modules. Files reached by no entry point listed as unused. Test files (`src/test/**`) and ambient types (`src/vite-env.d.ts`) treated as build-tooling entry points.

---

## 1. `src/pages/Index.tsx` — direct reachability

`Index.tsx` imports only:

| Import | Source |
|---|---|
| `SiteNav` | `src/components/marketing/SiteNav.tsx` |
| `SiteFooter` | `src/components/marketing/SiteFooter.tsx` |
| `VersionD` | `src/components/marketing/version-d/VersionD.tsx` |

Transitive closure from `Index.tsx` (12 files):

- `src/components/marketing/SiteNav.tsx` (no internal deps)
- `src/components/marketing/SiteFooter.tsx` (no internal deps)
- `src/components/marketing/version-d/VersionD.tsx`
  - `version-d/HeroSection.tsx`
  - `version-d/ValueSection.tsx`
  - `version-d/CommitmentsSection.tsx`
  - `version-d/ProjectsSection.tsx`
  - `version-d/HeliosSection.tsx`
  - `version-d/AgentsSection.tsx`
  - `version-d/SecuritySection.tsx`
  - `version-d/FoundersSection.tsx`
  - `version-d/ContactSection.tsx`

`Index.tsx` does NOT touch:
- any logo file
- any `@/components/ui/*`
- any other `version-*` tree
- any deck slide
- any package or app barrel

Note: `Index.tsx` declares `useState("d")` + `activeVersion` but never uses the setter. Cosmetic dead state; not a separate file.

---

## 2. Reachable from full `App.tsx` route tree

Listed for context — these are NOT unused. Anchors the unused set in §3.

Routed pages: `Index`, `LogoComparison`, `PitchDeck`, `Helios`, `Dataroom`, `BrandGuide`, `DeckE`, `NotFound`.

App-level UI deps (via `App.tsx`):
- `components/ui/toaster.tsx` → `hooks/use-toast.ts`, `components/ui/toast.tsx`
- `components/ui/sonner.tsx`
- `components/ui/tooltip.tsx`

Page-specific deps:
- `LogoComparison` → `components/VariantSection.tsx` + `logos/{Junction,Blueprint,Cross,Terminal,Conduit}Variants.tsx`
- `PitchDeck` / `DeckE` → `components/deck/{SlideComponents,CoreSlides,DeckCSlides,DeckESlides,AppendixSlides,StyleGuideSlide}.tsx` → `logos/TerminalLogo.tsx`
- `BrandGuide` → `logos/{TerminalLogo,ConduitLogo,AxisLogo}.tsx`
- `Helios`, `Dataroom`, `NotFound` → no extra component deps

Lib reached via `cn`: `src/lib/utils.ts`.

---

## 3. Unused — not reached from any entry

### 3.1 Stray top-level components
| File | Note |
|---|---|
| `src/components/DirectionSection.tsx` | Exports `DirectionSection`. Zero importers. |
| `src/components/NavLink.tsx` | Exports `NavLink` shim over `react-router-dom`. Zero importers. |

### 3.2 Marketing version-A tree (entire subtree dead — `VersionA` never imported)
- `src/components/marketing/version-a/VersionA.tsx`
- `src/components/marketing/version-a/HeroSection.tsx`
- `src/components/marketing/version-a/HeroBackground.tsx` (only consumer was `version-a/HeroSection`)
- `src/components/marketing/version-a/ValueSection.tsx`
- `src/components/marketing/version-a/CommitmentsSection.tsx`
- `src/components/marketing/version-a/ProjectsSection.tsx`
- `src/components/marketing/version-a/HeliosSection.tsx`
- `src/components/marketing/version-a/AgentsSection.tsx`
- `src/components/marketing/version-a/SecuritySection.tsx`
- `src/components/marketing/version-a/FoundersSection.tsx`
- `src/components/marketing/version-a/ContactSection.tsx`

### 3.3 Marketing version-B tree (entire subtree dead — `VersionB` never imported)
- `src/components/marketing/version-b/VersionB.tsx`
- `src/components/marketing/version-b/HeroSection.tsx`
- `src/components/marketing/version-b/ValueSection.tsx`
- `src/components/marketing/version-b/CommitmentsSection.tsx`
- `src/components/marketing/version-b/ProjectsSection.tsx`
- `src/components/marketing/version-b/HeliosSection.tsx`
- `src/components/marketing/version-b/AgentsSection.tsx`
- `src/components/marketing/version-b/SecuritySection.tsx`
- `src/components/marketing/version-b/FoundersSection.tsx`
- `src/components/marketing/version-b/ContactSection.tsx`

### 3.4 Marketing version-C tree (entire subtree dead — `VersionC` never imported)
- `src/components/marketing/version-c/VersionC.tsx`
- `src/components/marketing/version-c/HeroSection.tsx`
- `src/components/marketing/version-c/ValueSection.tsx`
- `src/components/marketing/version-c/CommitmentsSection.tsx`
- `src/components/marketing/version-c/ProjectsSection.tsx`
- `src/components/marketing/version-c/HeliosSection.tsx`
- `src/components/marketing/version-c/AgentsSection.tsx`
- `src/components/marketing/version-c/SecuritySection.tsx`
- `src/components/marketing/version-c/FoundersSection.tsx`
- `src/components/marketing/version-c/ContactSection.tsx`

### 3.5 Unused logo files
Variants files for all five directions ARE used by `LogoComparison`. Raw single-direction logo files below are NOT.

| File | Note |
|---|---|
| `src/components/logos/BlueprintLogo.tsx` | Variants used; base file unused. |
| `src/components/logos/BracketLogo.tsx` | Zero importers. |
| `src/components/logos/CrossLogo.tsx` | Variants used; base file unused. |
| `src/components/logos/InciseLogo.tsx` | Zero importers. |
| `src/components/logos/JunctionLogo.tsx` | Variants used; base file unused. |
| `src/components/logos/MeridianLogo.tsx` | Zero importers. |
| `src/components/logos/SeamLogo.tsx` | Zero importers. |

Used logos retained: `AxisLogo.tsx`, `ConduitLogo.tsx`, `TerminalLogo.tsx`, plus all `*Variants.tsx`.

### 3.6 Unused shadcn UI components
Only `toaster`, `sonner`, `tooltip`, `toast` (via toaster) reach the running app. Everything else under `src/components/ui/` is dead. Many form internal cycles (e.g. `sidebar` imports `button`, `input`, `separator`, `sheet`, `skeleton`, `tooltip`) — none reachable from a route.

Unused (45 files):

- `accordion.tsx`
- `alert-dialog.tsx`
- `alert.tsx`
- `aspect-ratio.tsx`
- `avatar.tsx`
- `badge.tsx`
- `breadcrumb.tsx`
- `button.tsx`
- `calendar.tsx`
- `card.tsx`
- `carousel.tsx`
- `chart.tsx`
- `checkbox.tsx`
- `collapsible.tsx`
- `command.tsx`
- `context-menu.tsx`
- `dialog.tsx`
- `drawer.tsx`
- `dropdown-menu.tsx`
- `form.tsx`
- `hover-card.tsx`
- `input-otp.tsx`
- `input.tsx`
- `label.tsx`
- `menubar.tsx`
- `navigation-menu.tsx`
- `pagination.tsx`
- `popover.tsx`
- `progress.tsx`
- `radio-group.tsx`
- `resizable.tsx`
- `scroll-area.tsx`
- `select.tsx`
- `separator.tsx`
- `sheet.tsx`
- `sidebar.tsx`
- `skeleton.tsx`
- `slider.tsx`
- `switch.tsx`
- `table.tsx`
- `tabs.tsx`
- `textarea.tsx`
- `toggle-group.tsx`
- `toggle.tsx`
- `use-toast.ts` — re-export shim of `@/hooks/use-toast`. No consumer imports `@/components/ui/use-toast`.

Used UI retained: `toaster.tsx`, `sonner.tsx`, `tooltip.tsx`, `toast.tsx`.

### 3.7 Unused hooks
| File | Note |
|---|---|
| `src/hooks/use-mobile.tsx` | Only consumer is unused `ui/sidebar.tsx`. |

Used hook retained: `src/hooks/use-toast.ts` (consumed by `ui/toaster`).

### 3.8 Unused barrels — `src/packages/*` and `src/apps/*`
None referenced from anywhere outside their own subtrees. Internal `@acme/*` aliases don't resolve in `tsconfig.app.json` paths. Entire directories are dead from the app perspective:

- `src/apps/web-vite/index.ts` (re-exports `App` — no importer)
- `src/packages/api-client/index.ts`
- `src/packages/config/index.ts`
- `src/packages/contracts/index.ts`
- `src/packages/core/index.ts`
- `src/packages/features/index.ts` (body is fully commented-out re-exports)
- `src/packages/observability/index.ts`
- `src/packages/platform/index.ts`
- `src/packages/ui-universal/index.ts`

---

## 4. Summary counts

| Bucket | Files |
|---|---|
| Reachable from `Index.tsx` | 12 |
| Reachable from full `App.tsx` (incl. above) | ~35 |
| Stray top-level components | 2 |
| `version-a` tree | 11 |
| `version-b` tree | 10 |
| `version-c` tree | 10 |
| Unused base logos | 7 |
| Unused UI components | 45 |
| Unused hooks | 1 |
| Dead `packages/`+`apps/` barrels | 9 |
| **Total unused files** | **95** |

---

## 5. Caveats

- Static analysis only. Does not catch dynamic imports (`import()`), runtime path resolution, or files referenced from outside `src/`. Spot-checked: `index.html` + Vite config import only `src/main.tsx`.
- `src/test/setup.ts` and `src/test/example.test.ts` are vitest entry points (`vitest.config.ts:setupFiles` + `include`), kept.
- `src/vite-env.d.ts` is ambient types, kept.
- Removing entire `version-a/b/c` trees and dead UI subset is safe. `packages/` + `apps/` subtrees look like an in-progress monorepo split; confirm with owner before deleting — `@acme/*` aliases unresolved suggests intent to split into a real workspace.
- `Index.tsx` retains vestigial `useState("d")` whose setter is never called. Inline cleanup, not file-level.
