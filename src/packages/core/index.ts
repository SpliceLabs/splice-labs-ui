/**
 * @acme/core — Domain logic, route IDs, query keys.
 * Pure TypeScript. NO framework imports (no React, no router, no DOM).
 *
 * POST-EXPORT: becomes packages/core/
 */

// ─── Route Registry ─────────────────────────────────────────────────

export const ROUTE_IDS = {
  HOME: "home",
  LOGOS: "logos",
  DECKS: "decks",
  NOT_FOUND: "not-found",
} as const;

export type RouteId = (typeof ROUTE_IDS)[keyof typeof ROUTE_IDS];

interface RouteConfig {
  id: RouteId;
  path: string;
  title: string;
}

export const ROUTES: Record<RouteId, RouteConfig> = {
  [ROUTE_IDS.HOME]: { id: ROUTE_IDS.HOME, path: "/", title: "Home" },
  [ROUTE_IDS.LOGOS]: { id: ROUTE_IDS.LOGOS, path: "/logos", title: "Logo Comparison" },
  [ROUTE_IDS.DECKS]: { id: ROUTE_IDS.DECKS, path: "/decks", title: "Pitch Decks" },
  [ROUTE_IDS.NOT_FOUND]: { id: ROUTE_IDS.NOT_FOUND, path: "*", title: "Not Found" },
};

/**
 * Type-safe href builder. Shared packages use this instead of
 * hard-coding paths or importing router libraries.
 */
export function href(routeId: RouteId, params?: Record<string, string>): string {
  let path = ROUTES[routeId].path;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`:${key}`, encodeURIComponent(value));
    }
  }
  return path;
}

// ─── Query Keys (for TanStack Query) ────────────────────────────────

export const QUERY_KEYS = {
  health: ["health"] as const,
  exampleEntities: {
    all: ["example-entities"] as const,
    list: (filters?: Record<string, unknown>) => ["example-entities", "list", filters] as const,
    detail: (id: string) => ["example-entities", "detail", id] as const,
  },
} as const;

// ─── Domain Utilities (pure functions) ──────────────────────────────

export function generateCorrelationId(): string {
  return crypto.randomUUID();
}

export function generateIdempotencyKey(action: string): string {
  return `${action}-${crypto.randomUUID()}`;
}
