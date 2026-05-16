/**
 * Splice Labs blog component system — public surface.
 * Single import point for the `@/components/blog` library.
 */

// Shared types
export type {
  TileTone,
  TileTexture,
  Surface,
  CrumbSegment,
  ArticleMeta,
  PostCardData,
  PostFrontmatter,
} from "./types";

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

// Composed blocks (Pass 4)
export { PostCard, type PostCardProps } from "./PostCard";
export { FilterRail, type FilterRailProps, type FilterGroup } from "./FilterRail";
export { ArticleHeader, type ArticleHeaderProps } from "./ArticleHeader";
export { QuickTakeaways, type QuickTakeawaysProps } from "./QuickTakeaways";
export { FigureBlock, type FigureBlockProps } from "./FigureBlock";
export { Callout, type CalloutProps } from "./Callout";
export { TLDRRail, type TLDRRailProps, type TLDRSource } from "./TLDRRail";
export { ReadMoreBand, type ReadMoreBandProps } from "./ReadMoreBand";
export { CTABand, type CTABandProps } from "./CTABand";
