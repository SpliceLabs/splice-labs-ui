/**
 * @acme/api-client — The ONLY place UI code may call fetch().
 * All network access MUST go through apiFetch().
 *
 * Features:
 * - Timeout support
 * - JSON parsing with Zod validation
 * - Standardized error handling
 * - Idempotency-Key header for writes
 * - Correlation ID propagation
 *
 * POST-EXPORT: becomes packages/api-client/
 */

import { z } from "zod";
import { ApiErrorSchema, type ApiError } from "@acme/contracts";

// ─── Types ──────────────────────────────────────────────────────────

export interface ApiFetchOptions<T extends z.ZodTypeAny = z.ZodTypeAny> {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  schema?: T;
  timeoutMs?: number;
  idempotencyKey?: string;
  headers?: Record<string, string>;
}

export class ApiClientError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code: string,
    public readonly correlationId: string | null,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

// ─── Config ─────────────────────────────────────────────────────────

let baseUrl = "";

export function setApiBaseUrl(url: string) {
  baseUrl = url.replace(/\/$/, "");
}

// ─── Core Fetch ─────────────────────────────────────────────────────

export async function apiFetch<T extends z.ZodTypeAny>(
  path: string,
  options: ApiFetchOptions<T> = {},
): Promise<z.infer<T>> {
  const {
    method = "GET",
    body,
    schema,
    timeoutMs = 10_000,
    idempotencyKey,
    headers: extraHeaders = {},
  } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...extraHeaders,
  };

  if (idempotencyKey) {
    headers["Idempotency-Key"] = idempotencyKey;
  }

  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    if (!response.ok) {
      let apiError: ApiError | null = null;
      try {
        const errorBody = await response.json();
        const parsed = ApiErrorSchema.safeParse(errorBody);
        if (parsed.success) apiError = parsed.data;
      } catch {
        // non-JSON error body
      }

      throw new ApiClientError(
        apiError?.error.message ?? `HTTP ${response.status}`,
        response.status,
        apiError?.error.code ?? "UNKNOWN",
        apiError?.error.correlationId ?? null,
      );
    }

    const json = await response.json();

    if (schema) {
      const result = schema.safeParse(json);
      if (!result.success) {
        console.error("[api-client] Response validation failed:", result.error.issues);
        throw new ApiClientError(
          "Response validation failed",
          response.status,
          "VALIDATION_ERROR",
          null,
        );
      }
      return result.data;
    }

    return json;
  } catch (error) {
    if (error instanceof ApiClientError) throw error;
    if ((error as Error).name === "AbortError") {
      throw new ApiClientError("Request timed out", 0, "TIMEOUT", null);
    }
    throw new ApiClientError(
      (error as Error).message ?? "Network error",
      0,
      "NETWORK_ERROR",
      null,
    );
  } finally {
    clearTimeout(timeout);
  }
}

// ─── Convenience Methods ────────────────────────────────────────────

export const api = {
  get: <T extends z.ZodTypeAny>(path: string, schema?: T, opts?: Omit<ApiFetchOptions<T>, "method" | "schema">) =>
    apiFetch(path, { ...opts, method: "GET", schema }),

  post: <T extends z.ZodTypeAny>(path: string, body: unknown, schema?: T, opts?: Omit<ApiFetchOptions<T>, "method" | "schema" | "body">) =>
    apiFetch(path, { ...opts, method: "POST", body, schema }),

  put: <T extends z.ZodTypeAny>(path: string, body: unknown, schema?: T, opts?: Omit<ApiFetchOptions<T>, "method" | "schema" | "body">) =>
    apiFetch(path, { ...opts, method: "PUT", body, schema }),

  patch: <T extends z.ZodTypeAny>(path: string, body: unknown, schema?: T, opts?: Omit<ApiFetchOptions<T>, "method" | "schema" | "body">) =>
    apiFetch(path, { ...opts, method: "PATCH", body, schema }),

  delete: <T extends z.ZodTypeAny>(path: string, schema?: T, opts?: Omit<ApiFetchOptions<T>, "method" | "schema">) =>
    apiFetch(path, { ...opts, method: "DELETE", schema }),
};

// ─── Binary endpoints ───────────────────────────────────────────────

/**
 * POSTs a JSON body to an absolute URL and returns the raw response Blob.
 * For non-JSON endpoints — audio (TTS), file downloads, etc. Keeps direct
 * fetch() inside the api-client boundary.
 */
export async function apiPostBlob(
  url: string,
  body: unknown,
  timeoutMs = 15_000,
): Promise<Blob> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new ApiClientError(
        `HTTP ${response.status}`,
        response.status,
        "HTTP_ERROR",
        null,
      );
    }

    return await response.blob();
  } catch (error) {
    if (error instanceof ApiClientError) throw error;
    if ((error as Error).name === "AbortError") {
      throw new ApiClientError("Request timed out", 0, "TIMEOUT", null);
    }
    throw new ApiClientError(
      (error as Error).message ?? "Network error",
      0,
      "NETWORK_ERROR",
      null,
    );
  } finally {
    clearTimeout(timeout);
  }
}
