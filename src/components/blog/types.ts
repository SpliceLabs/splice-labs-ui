/** Shared types for the Splice Labs blog component system. */

export type TileTone = "teal" | "amber" | "bone" | "graphite";
export type TileTexture = "none" | "halftone" | "engraving";
export type Surface = "graphite" | "paper";

export interface CrumbSegment {
  label: string;
  href?: string;
}
