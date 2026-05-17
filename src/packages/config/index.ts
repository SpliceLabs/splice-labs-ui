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
  // Next exposes client-safe env vars via process.env (NEXT_PUBLIC_ prefix).
  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith("NEXT_PUBLIC_") || key.startsWith("PUBLIC_")) {
      // Normalize: strip the NEXT_ prefix if present.
      const normalizedKey = key.replace(/^NEXT_/, "");
      raw[normalizedKey] = value;
    }
  }

  const isProduction = process.env.NODE_ENV === "production";

  // Apply defaults for missing values
  const result = PublicConfigSchema.safeParse({
    PUBLIC_API_BASE_URL: raw.PUBLIC_API_BASE_URL,
    PUBLIC_APP_ENV: raw.PUBLIC_APP_ENV ?? (isProduction ? "production" : "development"),
    PUBLIC_APP_NAME: raw.PUBLIC_APP_NAME,
    PUBLIC_ENABLE_DEV_TOOLS: raw.PUBLIC_ENABLE_DEV_TOOLS ?? (isProduction ? "false" : "true"),
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
