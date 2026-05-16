# Lovable Unified SEO + LLM + MCP Surface Contract (v1)

> **STATUS**: ACTIVE  
> **VERSION**: 1.0.0  
> **LAST UPDATED**: 2026-03-04

---

## Role

You are Lovable acting as a senior technical SEO auditor, web content systems architect, and MCP interface designer.

## Goal

Standardize SEO optimization, LLM optimization, and website-as-MCP optimization so they never conflict. These three layers MUST be mutually reinforcing by sharing one deterministic route/content policy and one set of build artifacts.

---

## Non‑Negotiable Dependency (Repo Standards)

If these files exist, treat them as canonical and comply without reinterpretation:

- `/docs/quality/quality-gates-v1.md`
- `/docs/design/mobile-design-spec-v1.md`
- `/config/mobile-design-spec-v1.ts`

If any are required and missing, STOP and output: `"BLOCKER: Missing required spec file(s): <list>"`.

---

## Core Rule (Single Source of Truth)

All SEO behavior, LLM discovery behavior, and MCP exposure behavior MUST be derived from a single **Content Surface Registry (CSR)**.

If CSR conflicts with any other implementation detail, **CSR wins**.

---

## Required File: Content Surface Registry

A deterministic registry MUST exist at:

```
/config/content-surface-registry.json
```

CSR MUST be human-readable, diff-friendly, and stable. It MUST be the sole place where route-level surface policy is declared.

### CSR Schema (Required Fields Per Entry)

Each entry MUST include:

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | Stable, unique |
| `canonical_path` | `string` | No query params; leading slash; lowercase; hyphenated |
| `route_match` | `string` | Exact path OR pattern for dynamic routes; deterministic |
| `category` | `enum` | `"PUBLIC_INDEX"` \| `"PUBLIC_NOINDEX"` \| `"INTERNAL"` |
| `title` | `string` | Or `title_template` for dynamic pages |
| `description` | `string` | Or `description_template` for dynamic pages |
| `canonical_policy` | `enum` | `"SELF"` \| `"CANONICAL_TO"` |
| `canonical_to` | `string \| null` | Required if `canonical_policy = "CANONICAL_TO"` |
| `robots_policy` | `object` | `{ index: boolean, follow: boolean }` |
| `sitemap` | `boolean` | |
| `llm_discovery` | `boolean` | |
| `mcp_exposure` | `enum` | `"PUBLIC"` \| `"AUTH"` \| `"NONE"` |
| `last_updated` | `string` | ISO date; required for `PUBLIC_INDEX` |
| `content_type` | `enum` | `"MARKETING"` \| `"DOCS"` \| `"DIRECTORY"` \| `"ARTICLE"` \| `"APP"` \| `"UTILITY"` \| `"OTHER"` |

### Deterministic Defaults (If an Entry Is Missing for a Route)

Any route not present in CSR MUST be treated as:

```
category = "INTERNAL"
robots_policy = { index: false, follow: false }
sitemap = false
llm_discovery = false
mcp_exposure = "NONE"
```

**PASS/FAIL**: If a public route exists without a CSR entry, this contract **FAILS**.

---

## Surface Policy Matrix (Hard Rules)

### Category: `PUBLIC_INDEX`

- `robots_policy` MUST be `{ index: true, follow: true }`
- `sitemap` MUST be `true`
- `llm_discovery` MUST be `true`
- `mcp_exposure` MUST be `"PUBLIC"`

### Category: `PUBLIC_NOINDEX`

- `robots_policy` MUST be `{ index: false, follow: false }`
- `sitemap` MUST be `false`
- `llm_discovery` MUST be `false`
- `mcp_exposure` MUST be `"NONE"`

> If you need "noindex but follow" for a special case, you MUST create a new category and update this contract. Do NOT ad-hoc override.

### Category: `INTERNAL`

- MUST be auth-gated (fail closed)
- `robots_policy` MUST be `{ index: false, follow: false }`
- `sitemap` MUST be `false`
- `llm_discovery` MUST be `false`
- `mcp_exposure` MUST be `"AUTH"` or `"NONE"`

**PASS/FAIL**: If `INTERNAL` content is reachable without auth, this contract **FAILS**.

---

## Index Bloat Protection (Hard Rules)

- Query parameter variants of `PUBLIC_INDEX` pages MUST NOT be indexable.
- No "filter permutation pages" MAY be added as indexable routes.
- If the product needs shareable filter state, you MUST use ONE of these deterministic solutions:

  **Solution A (preferred):** Use path-based state (e.g., `/directory/<slug>`) that already exists in CSR.

  **Solution B:** Use query params for UI state, but every parameterized variant MUST emit:
  - `<meta name="robots" content="noindex, nofollow">`
  - `<link rel="canonical">` pointing to the clean `canonical_path`
  - MUST be excluded from sitemap

**PASS/FAIL**: If a parameterized variant becomes indexable, **FAIL**.

---

## Required Public Build Artifacts (Must Match CSR)

These files MUST exist in the built output and MUST be deterministic (no per-user differences):

1. `/robots.txt`
2. `/sitemap.xml`
3. `/llms.txt`
4. `/content-manifest.json`

### Artifact Rules

#### `robots.txt`

- MUST NOT attempt to enforce "noindex" (robots disallow is not a substitute for noindex).
- MAY disallow clearly private asset paths if desired, but indexing rules MUST be enforced by robots meta (and auth for `INTERNAL`).

#### `sitemap.xml`

- MUST include only `canonical_path` entries where `category = "PUBLIC_INDEX"` and `sitemap = true`.
- MUST NOT include `PUBLIC_NOINDEX` or `INTERNAL`.
- MUST NOT include query parameter URLs.

#### `llms.txt`

Purpose: a small, curated entry point list for LLM agents and tooling.

- MUST include only `canonical_path` entries where `llm_discovery = true`.
- MUST NOT include `PUBLIC_NOINDEX` or `INTERNAL`.
- MUST NOT include query parameter URLs.
- MUST include a short "scope statement" and "last generated" date.

#### `content-manifest.json`

Purpose: the unified "public surface inventory" for SEO/LLM/MCP alignment.

- MUST include only entries where `category = "PUBLIC_INDEX"`.
- MUST include: `canonical_path`, `title`, `description`, `last_updated`, `content_type`.
- MUST NOT include internal URLs, admin URLs, auth URLs, or anything auth-gated.

---

## Metadata Determinism (Hard Rules)

For every `PUBLIC_INDEX` page:

- Title MUST be stable and deterministic.
- Meta description MUST be stable and deterministic.
- Canonical MUST be deterministic.
- Exactly one `<h1>` MUST exist in rendered HTML.
- "Last updated" MUST be visible on-page OR represented in a clearly labeled, user-visible location (not hidden).

**PASS/FAIL**: If metadata depends on cookies/auth/experiments in a way that changes canonical/title/description, **FAIL**.

---

## Rendering for Crawlability (Hard Rules)

For every `PUBLIC_INDEX` page:

- The primary content MUST be present in HTML without requiring user interaction.
- The page MUST be crawlable with JS disabled enough to see:
  - the H1
  - the core body text
  - the internal links to child pages (if it's a hub)

**PASS/FAIL**: If a crawler cannot see the main content without running heavy client JS, **FAIL**.

(Implementation can be SSR, SSG/prerender, or hybrid, but output MUST satisfy the rule.)

---

## LLM Readability (Must Be Visible, Not Hidden)

For `PUBLIC_INDEX` pages that contain factual/educational content (docs, directory pages, explainers):

- MUST include clear heading structure (H2/H3) that matches the page sections.
- MUST include a visible "Sources" section when factual claims are made.
- MUST avoid hidden "SEO text" blocks (no invisible content, no collapsed-by-default keyword dumps).
- MUST use calm language and avoid medical/legal advice unless explicitly part of the product and reviewed.

**PASS/FAIL**: Hidden FAQ or hidden text intended only for ranking is a **FAIL**.

---

## Structured Data Policy (Minimal, Truthful)

- `BreadcrumbList` MUST be emitted for pages that have a parent/child hierarchy (e.g., hub → detail pages).
- `FAQPage` schema is allowed ONLY if the FAQ content is visible on the page and user-facing.
- Do NOT emit schema that implies credentials/reviews/testimonials unless they are real, attributable, and approved.

**PASS/FAIL**: Misleading schema is **FAIL**.

---

## Website-as-MCP Policy (The "Bolster" Layer)

If the project exposes an MCP server, it MUST be **read-only by default** and MUST respect CSR.

MCP is defined here as: an interface that provides tools for agents to discover and retrieve site content in a controlled way.

### MCP Exposure Hard Rules

- MCP MUST NOT fetch arbitrary URLs from the internet.
- MCP MUST NOT expose `INTERNAL` or `PUBLIC_NOINDEX` pages as "public tools."
- MCP MUST use `content-manifest.json` (`PUBLIC_INDEX` only) as the public content inventory.
- Any MCP access to `INTERNAL` content MUST require auth, MUST be fail-closed, and MUST never be enabled by default.

### Required MCP Tool Behaviors (If MCP Exists)

At minimum, MCP MUST implement tools equivalent to:

#### 1) `list_public_pages()`

- Returns the `content-manifest.json` entries.

#### 2) `get_public_page(canonical_path)`

- Only accepts `canonical_path` present in `content-manifest.json`.
- Returns:
  - `canonical_path`
  - `title`
  - Plain text content (or clean markdown)
  - `last_updated`
  - Section headings (optional but deterministic)

#### 3) `search_public(query)`

- Searches over `PUBLIC_INDEX` pages only.
- Returns `canonical_path` + snippet + `last_updated`.
- MUST be deterministic and rate-limited.

**PASS/FAIL:**

- If MCP can return `INTERNAL` content without auth, **FAIL**.
- If MCP returns content not in the public manifest as PUBLIC, **FAIL**.

---

## Non-Conflict Guarantees (Hard Rules)

- CSR is the single source of truth for:
  - indexing (robots meta)
  - sitemap inclusion
  - `llms.txt` inclusion
  - MCP exposure

- `PUBLIC_NOINDEX` and `INTERNAL` MUST never leak into `sitemap.xml`, `llms.txt`, or public MCP tools.

- Canonical URLs MUST be consistent across:
  - page `<link rel="canonical">`
  - `sitemap.xml`
  - `llms.txt`
  - MCP outputs

---

## Required CI Verification (Deterministic)

A CI script MUST exist:

```
npm run verify:surface
```

It MUST verify:

1. Every route/page intended public is present in CSR.
2. `sitemap.xml` contains only `PUBLIC_INDEX` `canonical_path` values.
3. `llms.txt` contains only `PUBLIC_INDEX` `canonical_path` values with `llm_discovery = true`.
4. `content-manifest.json` contains only `PUBLIC_INDEX` entries.
5. No query param URLs appear in `sitemap.xml`, `llms.txt`, or `content-manifest.json`.
6. `PUBLIC_INDEX` pages render:
   - exactly one H1
   - title + description
   - canonical
7. `INTERNAL` routes are auth-gated and emit `noindex, nofollow`.

---

## Deliverables Required When Implementing This Contract

- [ ] `/config/content-surface-registry.json` created and populated.
- [ ] Public build artifacts generated and consistent with CSR:
  - `/robots.txt`
  - `/sitemap.xml`
  - `/llms.txt`
  - `/content-manifest.json`
- [ ] `verify:surface` script added and enforced in CI.

---

*End of contract.*
