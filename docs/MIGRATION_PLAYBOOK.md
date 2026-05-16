# Migration Playbook: Lovable → GitHub → Production

## Overview
This playbook describes the deterministic pipeline for migrating from the Lovable Vite SPA to a production-grade monorepo with Next.js and optional React Native.

---

## Stage 1: Export from Lovable to GitHub

### Steps
1. Push Lovable project to GitHub (Lovable native integration)
2. Clone the repository locally
3. Verify all `@acme/*` imports resolve correctly
4. Run `npm run build` — must succeed

### Checklist
- [ ] All files exported cleanly
- [ ] No Lovable-specific runtime dependencies
- [ ] `.env.example` created with all `PUBLIC_*` vars documented
- [ ] `docs/` directory included in export

---

## Stage 2: Restructure to True Monorepo

### Mechanical moves (deterministic)
```bash
# Create monorepo root
mkdir -p apps packages

# Move Vite shell
mv src/apps/web-vite apps/web-vite
# Move remaining src/ into web-vite as its source
mv src apps/web-vite/src

# Extract packages
mv apps/web-vite/src/packages/contracts packages/contracts
mv apps/web-vite/src/packages/api-client packages/api-client
mv apps/web-vite/src/packages/core packages/core
mv apps/web-vite/src/packages/ui-universal packages/ui-universal
mv apps/web-vite/src/packages/features packages/features
mv apps/web-vite/src/packages/platform packages/platform
mv apps/web-vite/src/packages/config packages/config
mv apps/web-vite/src/packages/observability packages/observability
```

### Add workspace tooling
```bash
# Option A: Turborepo
npx create-turbo@latest --skip-install
# turbo.json with build/lint/test pipelines

# Option B: Nx
npx nx@latest init
```

### Update each package
- Add `package.json` with name `@acme/<pkg>`
- Add `tsconfig.json` extending root config
- Ensure `main`/`types` fields point to `index.ts`

### Update path aliases
- `@acme/*` now resolves via workspace protocol (no path aliases needed)
- Remove Vite alias overrides; use standard TS project references

### Checklist
- [ ] `npm install` succeeds at monorepo root
- [ ] `turbo build` or `nx build` succeeds for all packages
- [ ] All `@acme/*` imports resolve via workspace protocol
- [ ] No circular dependencies between packages

---

## Stage 3: Create Next.js Shell

### Steps
1. `npx create-next-app apps/web-next` (App Router, TypeScript, Tailwind)
2. Copy design system (index.css, tailwind.config.ts) from web-vite
3. Create route files importing from `@acme/features`
4. Implement `middleware.ts` (see docs/next-shell-notes.md)
5. Create API route handlers in `app/api/v1/`
6. Add `server-only` package for server boundary enforcement

### Checklist
- [ ] `npm run build` succeeds for web-next
- [ ] All PUBLIC_INDEX routes render correctly
- [ ] middleware.ts injects correlation ID + security headers
- [ ] API health endpoint returns 200

---

## Stage 4: Security Hardening

### Required implementations
1. **Security headers** (middleware.ts):
   - Content-Security-Policy (strict)
   - Strict-Transport-Security
   - X-Frame-Options: DENY
   - X-Content-Type-Options: nosniff
   - Referrer-Policy: strict-origin-when-cross-origin

2. **Auth enforcement**:
   - INTERNAL routes: server-side session check, fail-closed
   - API routes: validate auth token, attach user context

3. **Rate limiting**:
   - API routes: per-IP or per-user RPM limits
   - Use upstash/ratelimit or similar

4. **Audit logging**:
   - Use `@acme/observability` `buildAuditEvent()` for sensitive operations
   - Ship to structured logging service

5. **Input validation**:
   - All API inputs validated with `@acme/contracts` Zod schemas
   - Reject on validation failure with standard error shape

### Checklist
- [ ] All security headers present (verify with securityheaders.com)
- [ ] No secrets in client bundle (verify with source map analysis)
- [ ] INTERNAL routes return 401/403 without valid session
- [ ] Rate limiting active on all write endpoints
- [ ] Audit events emitted for auth, data mutation, admin actions

---

## Stage 5: Production Deploy

### Environment setup
1. Configure production env vars (Vercel/Railway/etc.)
2. Set `PUBLIC_APP_ENV=production`
3. Configure server-only secrets via platform secrets manager

### Pre-deploy checklist
- [ ] `npm run build` passes (all packages)
- [ ] `npm run verify:surface` passes (SEO contract)
- [ ] Lighthouse score ≥ 95 (performance contract)
- [ ] Mobile responsive across 7 viewports (mobile contract)
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] No ESLint boundary violations
- [ ] Security scan clean

### Post-deploy verification
- [ ] Health endpoint returns 200
- [ ] All PUBLIC_INDEX routes accessible
- [ ] robots.txt / sitemap.xml / llms.txt served correctly
- [ ] Security headers present on all responses
- [ ] Error tracking configured and receiving events
