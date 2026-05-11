# Mobile & React Native Portability Contract

> **STATUS**: ACTIVE  
> **VERSION**: 1.0.0  
> **LAST UPDATED**: 2026-03-04

---

## 1. Responsive Sweep Viewports (PASS/FAIL)

Every audited route MUST pass a visual and functional check at each of the following viewport widths:

| Viewport Width | Device Class | Verdict |
|----------------|-------------|---------|
| 320 px | Small phone (iPhone SE) | FAIL if layout breaks, text overflows, or controls are unreachable |
| 360 px | Android baseline | FAIL if layout breaks, text overflows, or controls are unreachable |
| 390 px | iPhone 14 | FAIL if layout breaks, text overflows, or controls are unreachable |
| 768 px | Tablet portrait | FAIL if layout breaks, text overflows, or controls are unreachable |
| 1024 px | Tablet landscape / small desktop | FAIL if layout breaks, text overflows, or controls are unreachable |
| 1280 px | Desktop | FAIL if layout breaks, text overflows, or controls are unreachable |
| 1440 px | Large desktop | FAIL if layout breaks, text overflows, or controls are unreachable |

### 1.1 "Layout breaks" Definition

A layout break is any of:
- Horizontal scroll appearing on the viewport
- Content clipped or hidden unintentionally
- Overlapping elements that obscure interactive controls
- Text truncated without ellipsis or readable alternative

---

## 2. Single Responsive DOM Tree

- The app MUST use a **single DOM tree** that adapts via CSS (Tailwind responsive classes) to all viewports.
- There MUST NOT be separate mobile vs desktop component trees rendered conditionally (e.g., `{isMobile ? <MobileNav /> : <DesktopNav />}` with entirely different DOM structures is a FAIL unless the shared component contract below is met).
- Exception: Render-switching is allowed ONLY if both branches share the same props interface and the same view-model.

---

## 3. Touch-First Interaction

- All interactive elements MUST be operable via touch (tap, swipe where applicable).
- Mouse-only interactions (`hover` as the sole activation method) MUST NOT be used for critical functionality.
- Hover states MAY enhance but MUST NOT gate access to information or actions.

---

## 4. Tap Target Size

- All tap targets (buttons, links, form controls) MUST have a minimum touch area of **44 × 44 CSS pixels**.
- Adjacent tap targets MUST have at least **8 px** spacing between their touch areas.
- Verification: Lighthouse "Tap targets" audit MUST pass.

---

## 5. Scroll Trap Prevention

- Normal page content MUST NOT produce nested scrollable regions that trap touch scrolling.
- Exception: Modals, drawers, and explicitly scrollable panels (e.g., code blocks, data tables) MAY have independent scroll, but MUST include a visible close/dismiss mechanism.
- A scroll trap is defined as: a nested scrollable container where the user cannot scroll the parent page by swiping within the child container's bounds.

---

## 6. React Native Readiness Rules

### 6.1 No Browser Globals in Shared UI

- Components under `src/components/` (excluding `src/components/ui/`) MUST NOT directly reference `window`, `document`, `navigator`, `localStorage`, or `sessionStorage`.
- If browser APIs are needed, they MUST be accessed through a centralized utility (e.g., `src/lib/platform.ts`) that can be swapped for RN equivalents.

### 6.2 Centralized Breakpoints

- All responsive breakpoint values MUST be defined in `tailwind.config.ts` (or a shared constants file).
- Hardcoded pixel values for breakpoints in component files are a FAIL.

### 6.3 Token-Only Styling

- Components MUST use Tailwind semantic tokens (from `index.css` / `tailwind.config.ts`) for all colors, spacing, and typography.
- Hardcoded color values (hex, rgb, named colors) in component files are a FAIL.
- Exception: SVG `fill`/`stroke` using `currentColor` is allowed.

### 6.4 Typed Stable Props

- All shared components MUST have explicitly typed props via TypeScript interfaces or type aliases.
- Props interfaces MUST be exported from the component file.
- `any` type in props is a FAIL.

### 6.5 View-Model Boundary

- UI components MUST NOT contain business logic (API calls, data transformations, state machines).
- Business logic MUST reside in hooks (`src/hooks/`), services (`src/services/`), or stores.
- A component that directly calls `fetch`, `supabase`, or equivalent is a FAIL unless it is a page-level container.

---

## 7. Acceptance Criteria

- [ ] All 7 viewport widths pass visual/functional sweep on every audited route.
- [ ] Single responsive DOM tree (no conditional mobile/desktop trees without shared interface).
- [ ] All tap targets >= 44×44 px with >= 8 px spacing.
- [ ] No scroll traps on normal page content.
- [ ] No `window`/`document` references in shared UI components.
- [ ] All breakpoints centralized in config.
- [ ] All styling uses semantic tokens only.
- [ ] All shared component props are typed (no `any`).
- [ ] View-model boundary enforced (no direct API calls in UI components).
