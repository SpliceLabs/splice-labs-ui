# Next.js Shell Notes

## Purpose
This document describes the future `apps/web-next/` shell that will be created during the post-GitHub-export migration.

## What It Will Contain

### Directory Structure
```
apps/web-next/
├── app/
│   ├── layout.tsx              # Root layout (providers, fonts, metadata)
│   ├── page.tsx                # Home route → renders @acme/features HomeScreen
│   ├── logos/page.tsx           # Logo comparison → @acme/features
│   ├── decks/page.tsx           # Pitch decks → @acme/features
│   ├── not-found.tsx            # 404 page
│   └── api/
│       └── v1/
│           ├── health/route.ts  # Health check endpoint
│           └── [...]/route.ts   # API route handlers
├── middleware.ts                # Correlation ID, security headers, auth checks
├── server-only/
│   ├── auth.ts                  # Session enforcement
│   ├── rate-limit.ts            # Rate limiting
│   └── audit.ts                 # Audit logging
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

### Key Principles
1. **Thin shell**: Route files only wire `@acme/features` screens to Next.js routes
2. **Server boundary**: All server logic in `app/api/` route handlers or `server-only/`
3. **Same imports**: Uses identical `@acme/*` path aliases pointing to `packages/*`
4. **Security headers**: middleware.ts adds CSP, HSTS, correlation IDs
5. **Auth enforcement**: INTERNAL routes are server-side auth-gated

### Migration Steps
1. `npx create-next-app apps/web-next` with App Router
2. Copy tailwind config and index.css
3. Create route files that import from `@acme/features`
4. Implement middleware.ts with security headers
5. Create API route handlers (move any client-side stubs to proper server routes)
6. Add `server-only` enforcement for secrets/auth

### Security Baseline (Required at Migration)
- [ ] middleware.ts with correlation ID injection
- [ ] CSP headers (strict)
- [ ] HSTS header
- [ ] X-Frame-Options: DENY
- [ ] Rate limiting on API routes
- [ ] Auth session validation on INTERNAL routes
- [ ] Audit event logging for sensitive operations

### Dependencies
- Next.js 14+ (App Router)
- Same `@acme/*` packages
- `server-only` npm package for server boundary enforcement
