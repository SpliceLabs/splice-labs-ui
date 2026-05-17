/** Shared types for the Splice Labs blog component system. */

import type { ReactNode } from "react";

export type TileTone = "teal" | "amber" | "bone" | "graphite";
export type TileTexture = "none" | "halftone" | "engraving";
export type Surface = "graphite" | "paper";

export interface CrumbSegment {
  label: string;
  href?: string;
}

/** A row in the ArticleHeader meta list. */
export interface ArticleMeta {
  label: string;
  value: string;
  href?: string;
  icon?: ReactNode;
}

/** The data a PostCard (and ReadMoreBand) needs to render one post. */
export interface PostCardData {
  href: string;
  title: string;
  date: string;
  category: string;
  tone?: TileTone;
  texture?: TileTexture;
  icon?: ReactNode;
  chipLabel?: string;
}

/** Canonical post metadata — drives Markdown export, OG, schema.org. */
export interface PostFrontmatter {
  title: string;
  date: string;
  category?: string;
  product?: string;
  author?: string;
  readingTime?: string;
  url?: string;
  tags?: string[];
}
