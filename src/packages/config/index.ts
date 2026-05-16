/**
 * @acme/config — Environment configuration with Zod validation.
 * Strict separation: PUBLIC_* (safe for client) vs SERVER_* (server-only).
 *
 * POST-EXPORT: becomes packages/config/
 */

import { z } from "zod";

// ─── Public Config (safe for client bundles) ────────────────────────

const PublicConfigSchema = z.object({
  PUBLIC_API_BASE_URL: z.string().url().default("http://localhost:3001"),
  PUBLIC_APP_ENV: z.enum(["development", "staging", "production"]).default("development"),
  PUBLIC_APP_NAME: z.string().default("Splice Labs"),
  PUBLIC_ENABLE_DEV_TOOLS: z.coerce.boolean().default(false),
});

export type PublicConfig = z.infer<typeof PublicConfigSchema>;

// ─── Server Config (NEVER include in client bundles) ────────────────
// These are stubs. In Next.js, they'll be validated in server-only modules.

const ServerConfigSchema = z.object({
  SERVER_DATABASE_URL: z.string().optional(),
  SERVER_AUTH_SECRET: z.string().optional(),
  SERVER_RATE_LIMIT_RPM: z.coerce.number().default(60),
});

export type ServerConfig = z.infer<typeof ServerConfigSchema>;

// ─── Getters ────────────────────────────────────────────────────────

let _publicConfig: PublicConfig | null = null;

export function getPublicConfig(): PublicConfig {
  if (_publicConfig) return _publicConfig;

  const raw: Record<string, string | undefined> = {};
  // Vite exposes env vars via import.meta.env
  if (typeof import.meta !== "undefined" && import.meta.env) {
    for (const [key, value] of Object.entries(import.meta.env)) {
      if (key.startsWith("VITE_PUBLIC_") || key.startsWith("PUBLIC_")) {
        // Normalize: strip VITE_ prefix if present
        const normalizedKey = key.replace(/^VITE_/, "");
        raw[normalizedKey] = value as string;
      }
    }
  }

  // Apply defaults for missing values
  const result = PublicConfigSchema.safeParse({
    PUBLIC_API_BASE_URL: raw.PUBLIC_API_BASE_URL,
    PUBLIC_APP_ENV: raw.PUBLIC_APP_ENV ?? (import.meta.env?.MODE === "production" ? "production" : "development"),
    PUBLIC_APP_NAME: raw.PUBLIC_APP_NAME,
    PUBLIC_ENABLE_DEV_TOOLS: raw.PUBLIC_ENABLE_DEV_TOOLS ?? (import.meta.env?.DEV ? "true" : "false"),
  });

  if (!result.success) {
    console.error("[config] Public config validation failed:", result.error.issues);
    throw new Error("Invalid public configuration");
  }

  _publicConfig = result.data;
  return _publicConfig;
}

/**
 * Server config is a STUB in the Vite shell.
 * In Next.js, this will read process.env and enforce server-only.
 */
export function getServerConfig(): ServerConfig {
  console.warn("[config] getServerConfig() called in client context — returning defaults only");
  return ServerConfigSchema.parse({});
}

/**
 * Unified getConfig() — returns public config in client, full config on server.
 * For now, always returns public config since we're in a SPA.
 */
export function getConfig() {
  return {
    public: getPublicConfig(),
    // server: only available in Next.js server context
  };
}
