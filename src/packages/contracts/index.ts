/**
 * @acme/contracts — Zod schemas for API request/response/event contracts.
 * This is the SINGLE SOURCE OF TRUTH for all API shapes.
 * No runtime logic here — only type definitions and validators.
 *
 * POST-EXPORT: becomes packages/contracts/
 */

import { z } from "zod";

// ─── Standard API Error Shape ───────────────────────────────────────
export const ApiErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    correlationId: z.string().uuid(),
  }),
});
export type ApiError = z.infer<typeof ApiErrorSchema>;

// ─── Standard API Success Envelope ──────────────────────────────────
export const ApiSuccessSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    meta: z
      .object({
        correlationId: z.string().uuid(),
        timestamp: z.string().datetime(),
      })
      .optional(),
  });

// ─── Health / Ping ──────────────────────────────────────────────────
export const HealthResponseSchema = z.object({
  status: z.literal("ok"),
  correlationId: z.string().uuid(),
  timestamp: z.string().datetime(),
});
export type HealthResponse = z.infer<typeof HealthResponseSchema>;

// ─── Example Entity Contract (proves the pattern) ───────────────────
export const ExampleEntitySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
  status: z.enum(["draft", "active", "archived"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type ExampleEntity = z.infer<typeof ExampleEntitySchema>;

export const CreateExampleEntityRequestSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
});
export type CreateExampleEntityRequest = z.infer<typeof CreateExampleEntityRequestSchema>;

export const UpdateExampleEntityRequestSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().max(2000).optional(),
  status: z.enum(["draft", "active", "archived"]).optional(),
});
export type UpdateExampleEntityRequest = z.infer<typeof UpdateExampleEntityRequestSchema>;

export const ListExampleEntitiesResponseSchema = ApiSuccessSchema(
  z.array(ExampleEntitySchema)
);
export type ListExampleEntitiesResponse = z.infer<typeof ListExampleEntitiesResponseSchema>;
