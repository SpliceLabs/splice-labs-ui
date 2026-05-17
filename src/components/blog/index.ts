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

// Reader experience (Pass 5)
export {
  ArticleActions,
  type ArticleActionsProps,
} from "./ArticleActions";
export {
  ListenButton,
  type ListenButtonProps,
  type ListenStatus,
} from "./ListenButton";
export { ShareMenu, type ShareMenuProps } from "./ShareMenu";
export { ReadingProgress, type ReadingProgressProps } from "./ReadingProgress";
export {
  TableOfContents,
  type TableOfContentsProps,
  type TocItem,
} from "./TableOfContents";
export { AuthorRow, type AuthorRowProps, type Author } from "./AuthorRow";
export { NewsletterCard, type NewsletterCardProps } from "./NewsletterCard";
export { EbookCard, type EbookCardProps } from "./EbookCard";
export { SearchInput, type SearchInputProps } from "./SearchInput";
export { Pagination, type PaginationProps } from "./Pagination";
export { ViewToggle, type ViewToggleProps, type BlogView } from "./ViewToggle";
export { ListPostRow, type ListPostRowProps } from "./ListPostRow";
export {
  CategoryHeroNav,
  type CategoryHeroNavProps,
  type CategoryEntry,
} from "./CategoryHeroNav";

// Markdown utilities
export {
  nodeToMarkdown,
  buildFrontmatter,
  postToMarkdown,
  downloadMarkdown,
  copyToClipboard,
  slugify,
} from "./utils/markdown";

// MDX → brand component mapping
export { blogMdxComponents } from "./MDXComponents";
