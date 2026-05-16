/**
 * Splice Labs blog component system — public surface.
 * Single import point for the `@/components/blog` library.
 */

// Shared types
export type { TileTone, TileTexture, Surface, CrumbSegment } from "./types";

// Hooks
export { useInViewOnce } from "./hooks/useInViewOnce";

// Primitives (Pass 3)
export { LabelChip, type LabelChipProps } from "./LabelChip";
export { IconPlate, type IconPlateProps } from "./IconPlate";
export { CoverTile, type CoverTileProps } from "./CoverTile";
export { ModuleLabel, type ModuleLabelProps } from "./ModuleLabel";
export { HairlineDivider, type HairlineDividerProps } from "./HairlineDivider";
export { TagPill, type TagPillProps } from "./TagPill";
export { Crumb, type CrumbProps } from "./Crumb";
