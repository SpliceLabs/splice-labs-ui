/**
 * @acme/observability — Audit event builder, correlation IDs, logging.
 * Pure TypeScript. No framework dependencies.
 *
 * POST-EXPORT: becomes packages/observability/
 */

import { generateCorrelationId } from "@acme/core";

// ─── Correlation ID Management ──────────────────────────────────────

let _currentCorrelationId: string | null = null;

export function getCorrelationId(): string {
  if (!_currentCorrelationId) {
    _currentCorrelationId = generateCorrelationId();
  }
  return _currentCorrelationId;
}

export function setCorrelationId(id: string): void {
  _currentCorrelationId = id;
}

export function resetCorrelationId(): string {
  _currentCorrelationId = generateCorrelationId();
  return _currentCorrelationId;
}

// ─── Structured Logger ──────────────────────────────────────────────

export type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  correlationId: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

function createLogEntry(level: LogLevel, message: string, context?: Record<string, unknown>): LogEntry {
  return {
    level,
    message,
    correlationId: getCorrelationId(),
    timestamp: new Date().toISOString(),
    context,
  };
}

export const logger = {
  debug: (message: string, context?: Record<string, unknown>) => {
    const entry = createLogEntry("debug", message, context);
    console.debug(`[${entry.correlationId}]`, message, context ?? "");
    return entry;
  },
  info: (message: string, context?: Record<string, unknown>) => {
    const entry = createLogEntry("info", message, context);
    console.info(`[${entry.correlationId}]`, message, context ?? "");
    return entry;
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    const entry = createLogEntry("warn", message, context);
    console.warn(`[${entry.correlationId}]`, message, context ?? "");
    return entry;
  },
  error: (message: string, context?: Record<string, unknown>) => {
    const entry = createLogEntry("error", message, context);
    console.error(`[${entry.correlationId}]`, message, context ?? "");
    return entry;
  },
};

// ─── Audit Event Builder ────────────────────────────────────────────

export interface AuditEvent {
  eventType: string;
  actor: string;
  resource: string;
  action: string;
  correlationId: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export function buildAuditEvent(
  eventType: string,
  actor: string,
  resource: string,
  action: string,
  metadata?: Record<string, unknown>,
): AuditEvent {
  return {
    eventType,
    actor,
    resource,
    action,
    correlationId: getCorrelationId(),
    timestamp: new Date().toISOString(),
    metadata,
  };
}
