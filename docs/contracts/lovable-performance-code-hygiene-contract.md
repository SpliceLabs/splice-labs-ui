# Performance & Code Hygiene Contract

> **STATUS**: ACTIVE  
> **VERSION**: 1.0.0  
> **LAST UPDATED**: 2026-03-04

---

## 1. Lighthouse Performance Gates

### 1.1 Score Thresholds (PASS/FAIL)

| Metric | Threshold | Scope | Verdict |
|--------|-----------|-------|---------|
| Lighthouse Performance | >= 95 | Mobile | FAIL if < 95 |
| Lighthouse Performance | >= 95 | Desktop | FAIL if < 95 |
| Cumulative Layout Shift (CLS) | <= 0.10 | Mobile & Desktop | FAIL if > 0.10 |
| Largest Contentful Paint (LCP) | <= 2.5 s | Mobile & Desktop | FAIL if > 2.5 s |
| First Input Delay (FID) / INP | <= 200 ms | Mobile & Desktop | FAIL if > 200 ms |
| Time to First Byte (TTFB) | <= 800 ms | Mobile & Desktop | FAIL if > 800 ms |
| Total Blocking Time (TBT) | <= 200 ms | Mobile | FAIL if > 200 ms |

### 1.2 LHCI Configuration Requirements

- LHCI MUST be configured with **deterministic runs**: 3 runs per URL, median result used.
- LHCI config MUST be pinned at: `/config/lighthouserc.json`
- The audited URL list MUST be maintained at: `/config/lighthouse-urls.txt` (one URL path per line).
- LHCI assertion config MUST enforce all thresholds in §1.1.
- LHCI collect script MUST be at: `/scripts/lighthouse-ci.sh`

### 1.3 Non-Regression Rule

No pull request or task MAY merge if it causes any metric in §1.1 to regress below threshold compared to the prior passing baseline.

---

## 2. Render-Blocking Rules

- No render-blocking CSS or JS MUST be introduced without explicit justification documented in the PR.
- All above-the-fold fonts MUST use `font-display: swap` or `font-display: optional`.
- Third-party scripts MUST be loaded with `async` or `defer`.

---

## 3. Console Error Policy

- Production builds MUST produce **zero** `console.error` output on any audited route.
- `console.warn` MUST NOT exceed 5 unique warnings per route.
- Verification: Run the app and check browser console on every audited route. Any `console.error` is a FAIL.

---

## 4. Code-Splitting Rules

- Each route defined in the router MUST use `React.lazy()` for its page component.
- Shared UI components (`src/components/ui/`) MUST NOT be lazy-loaded (they are part of the core bundle).
- Any component tree exceeding 50 KB gzipped MUST be split into a separate chunk.

---

## 5. DOM Tightness Rules

- No page MUST render more than **1500 DOM nodes** at initial load.
- Deeply nested DOM trees (> 32 levels) are a FAIL.
- Unused wrapper `<div>` elements with no styling or semantic purpose MUST be removed.

---

## 6. Required Artifacts

The following files MUST exist for this contract to be satisfied:

| Artifact | Path | Status |
|----------|------|--------|
| LHCI config | `/config/lighthouserc.json` | MUST be created when CI is wired |
| URL list | `/config/lighthouse-urls.txt` | MUST be created when CI is wired |
| CI script | `/scripts/lighthouse-ci.sh` | MUST be created when CI is wired |

Until these artifacts exist, `quality.lighthouseCIConfigured` in `/config/project-gates.json` MUST remain `false`.

---

## 7. Acceptance Criteria

- [ ] All audited routes score >= 95 Performance on Mobile and Desktop.
- [ ] CLS <= 0.10 on all audited routes.
- [ ] Zero `console.error` in production build on all audited routes.
- [ ] All route pages use `React.lazy()`.
- [ ] DOM node count <= 1500 on initial load for all pages.
- [ ] LHCI artifacts exist at specified paths (when CI is wired).
