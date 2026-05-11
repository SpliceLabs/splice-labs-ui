# Workflow & Gates Contract

> **STATUS**: ACTIVE  
> **VERSION**: 1.0.0  
> **LAST UPDATED**: 2026-03-04

---

## 1. Deterministic Workflow Stages

Every task MUST be evaluated against the following ordered gates. A task MUST NOT proceed past a gate that is not satisfied.

### Gate 1: Contracts Installed

- **Check**: All files listed in `/docs/contracts/lovable-contracts-index.md` exist in the repo.
- **PASS**: All files present → proceed.
- **FAIL**: Any file missing → output `BLOCKER: Missing required contract file(s): <list>`. STOP.

### Gate 2: Brand Approval

- **Check**: `/config/project-gates.json` values:
  - `brand.logoApproved` MUST be `true`
  - `brand.brandGuideApproved` MUST be `true`
- **Scope**: This gate applies ONLY to tasks involving:
  - Marketing page design or content
  - App UI styling decisions (colors, typography, component visual design)
  - Brand asset creation or modification
- **PASS**: Both flags `true` → proceed with design work.
- **FAIL**: Either flag `false` → design work is BLOCKED.
- **Allowed before brand approval**: CI configuration, routing scaffolding, data plumbing, contract authoring, backend logic, database schema, edge functions, testing infrastructure.

### Gate 3: Brand Portal Publication

- **Check**: `/config/project-gates.json` → `brand.brandPortalPublished`
- **Requirement**: After brand approval, brand documentation MUST be published to a password-protected footer page.
- **Publication Rules**:
  - Page MUST include `<meta name="robots" content="noindex, nofollow">`.
  - Page MUST be excluded from `sitemap.xml`.
  - Page MUST be accessible only via a footer link (not in primary navigation).
  - Page MUST be password-protected.

### Gate 4: UI Library Maintenance

- After every UI change (new component, modified component, deleted component):
  - The UI component library documentation MUST be updated.
  - A changelog entry MUST be added.
- Location: UI library docs path TBD (to be defined in brand contract).

### Gate 5: Post-Build Verification

After every build that modifies audited routes, the following MUST be verified:

| Check | Tool | Criteria | Verdict |
|-------|------|----------|---------|
| Lighthouse CI | LHCI (3 runs, median) | Performance >= 95, CLS <= 0.10 | FAIL if not met |
| Responsive Sweep | Manual or automated viewport check | All 7 viewports pass | FAIL if any break |
| Console Errors | Browser devtools | Zero `console.error` | FAIL if any present |

---

## 2. Task Classification

### 2.1 Pre-Brand-Approval Work (ALLOWED)

- Repository configuration (linting, formatting, CI)
- Routing scaffolding and page stubs
- Data layer (database schema, API hooks, services)
- Contract authoring and updates
- Testing infrastructure
- Backend / edge functions
- Performance optimization

### 2.2 Post-Brand-Approval Work (BLOCKED until Gate 2 passes)

- Marketing page visual design and content
- Component visual styling (colors, typography, shadows, gradients)
- Logo placement and brand asset integration
- App theme implementation

---

## 3. Acceptance Criteria

- [ ] All 5 gates are enforced in order for every task.
- [ ] `/config/project-gates.json` is the single source of truth for gate status.
- [ ] Brand-blocked work does not proceed when gates are `false`.
- [ ] Post-build verification is performed after every audited-route change.
- [ ] UI library docs are updated after every UI component change.
