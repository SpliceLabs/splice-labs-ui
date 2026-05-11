# Brand Contract — TODO

> **STATUS**: TODO — NOT YET APPROVED  
> **VERSION**: 0.0.0  
> **LAST UPDATED**: 2026-03-04

---

## ⛔ BLOCKER

**Marketing page design, app UI styling, and brand asset work MUST NOT proceed until this contract is completed and approved.**

The gate `/config/project-gates.json` → `brand.logoApproved` and `brand.brandGuideApproved` MUST remain `false` until this contract is finalized.

---

## Required Sections (To Be Authored)

### 1. Logo Deliverables & Use Rules

- Approved logo files (SVG, PNG at 1×/2×/3×)
- Minimum size, clear space rules
- Prohibited modifications
- Dark/light/transparent background variants
- Favicon and social meta image specifications

### 2. Color Tokens Naming Policy

- Semantic token naming convention (e.g., `--primary`, `--accent`, `--destructive`)
- Mapping of brand colors to CSS custom properties
- HSL-only requirement for all color values
- Dark mode color mapping
- Contrast ratio requirements (WCAG AA minimum)

### 3. Typography Scale

- Font families (display, body, mono)
- Type scale with exact sizes, weights, line-heights
- Responsive type rules
- Font loading strategy (`font-display` value)

### 4. Voice & Tone

- Brand voice attributes
- Tone variations by context (marketing, error messages, onboarding)
- Prohibited language patterns

### 5. Approval Workflow

- Who approves brand deliverables
- How approval is recorded (flip gates in `/config/project-gates.json`)
- Required sign-off artifacts

### 6. Changelog Requirements

- Every brand asset change MUST be logged with date, author, and description.
- Changelog location: TBD

---

## Acceptance Criteria

- [ ] All sections above are authored with pass/fail requirements.
- [ ] Logo files are committed to repo at agreed paths.
- [ ] Color tokens are defined in `index.css` and `tailwind.config.ts`.
- [ ] Typography scale is implemented and documented.
- [ ] `brand.logoApproved` and `brand.brandGuideApproved` flipped to `true` in `/config/project-gates.json`.
