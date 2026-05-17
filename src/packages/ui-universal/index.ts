/**
 * @acme/ui — Portable UI primitives and design system tokens.
 *
 * HARD RULE: NO DOM intrinsics (div, span, a, button, input, etc.)
 * This package must be portable to React Native.
 *
 * For now, export design tokens, type definitions, and utility functions.
 * Actual universal components (Tamagui/RN) will be added post-export.
 *
 * POST-EXPORT: becomes packages/ui-universal/
 */

// ─── Design Tokens (platform-agnostic) ──────────────────────────────

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
} as const;

export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
} as const;

export const FONT_FAMILIES = {
  display: "Space Grotesk",
  mono: "Space Mono",
  body: "Space Grotesk",
} as const;

export const RADII = {
  none: 0,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12,
  full: 9999,
} as const;

// ─── Color Palette (HSL values, platform-agnostic) ──────────────────

export const PALETTE = {
  background: { h: 210, s: 14, l: 6 },
  foreground: { h: 210, s: 10, l: 82 },
  primary: { h: 174, s: 100, l: 42 },
  primaryForeground: { h: 210, s: 14, l: 6 },
  accent: { h: 174, s: 100, l: 42 },
  muted: { h: 210, s: 10, l: 14 },
  mutedForeground: { h: 210, s: 15, l: 73 },
  destructive: { h: 0, s: 72, l: 51 },
} as const;

export function hslToString(color: { h: number; s: number; l: number }): string {
  return `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
}

// ─── Typography Variants ────────────────────────────────────────────

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body"
  | "bodySmall"
  | "caption"
  | "mono"
  | "monoSmall";

export interface TypographyStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
  letterSpacing?: number;
}

export const TYPOGRAPHY: Record<TypographyVariant, TypographyStyle> = {
  h1: { fontFamily: FONT_FAMILIES.display, fontSize: FONT_SIZES["4xl"], fontWeight: "700", lineHeight: 1.1 },
  h2: { fontFamily: FONT_FAMILIES.display, fontSize: FONT_SIZES["2xl"], fontWeight: "600", lineHeight: 1.2 },
  h3: { fontFamily: FONT_FAMILIES.display, fontSize: FONT_SIZES.xl, fontWeight: "600", lineHeight: 1.3 },
  h4: { fontFamily: FONT_FAMILIES.display, fontSize: FONT_SIZES.lg, fontWeight: "500", lineHeight: 1.4 },
  body: { fontFamily: FONT_FAMILIES.body, fontSize: FONT_SIZES.base, fontWeight: "400", lineHeight: 1.6 },
  bodySmall: { fontFamily: FONT_FAMILIES.body, fontSize: FONT_SIZES.sm, fontWeight: "400", lineHeight: 1.5 },
  caption: { fontFamily: FONT_FAMILIES.body, fontSize: FONT_SIZES.xs, fontWeight: "400", lineHeight: 1.4 },
  mono: { fontFamily: FONT_FAMILIES.mono, fontSize: FONT_SIZES.sm, fontWeight: "400", lineHeight: 1.5, letterSpacing: 0.5 },
  monoSmall: { fontFamily: FONT_FAMILIES.mono, fontSize: FONT_SIZES.xs, fontWeight: "400", lineHeight: 1.4, letterSpacing: 0.8 },
};
