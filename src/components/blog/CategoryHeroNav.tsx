import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { CoverTile } from "./CoverTile";
import { IconPlate } from "./IconPlate";
import { LabelChip } from "./LabelChip";
import type { TileTone } from "./types";

export interface CategoryEntry {
  label: string;
  href: string;
  tone: TileTone;
  icon: ReactNode;
  blurb?: string;
}

export interface CategoryHeroNavProps {
  categories: CategoryEntry[];
  className?: string;
}

/** Top-of-blog category band — a 4-up grid of tile entries. */
export function CategoryHeroNav({
  categories,
  className,
}: CategoryHeroNavProps) {
  return (
    <nav
      aria-label="Categories"
      className={cn(
        "grid grid-cols-2 gap-4 md:grid-cols-4",
        className,
      )}
    >
      {categories.map((cat) => (
        <a
          key={cat.label}
          href={cat.href}
          className="group block [--tile-texture-opacity:0.08] hover:[--tile-texture-opacity:0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blog-ring-teal"
        >
          <CoverTile tone={cat.tone} texture="halftone" ratio="4/3">
            <IconPlate icon={cat.icon} overlap />
            <LabelChip size="sm" variant="notched">
              {cat.label}
            </LabelChip>
          </CoverTile>
          {cat.blurb && (
            <p className="mt-3 font-display text-sm leading-relaxed text-blog-text-muted">
              {cat.blurb}
            </p>
          )}
        </a>
      ))}
    </nav>
  );
}
