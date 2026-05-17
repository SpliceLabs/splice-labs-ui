import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { CoverTile } from "./CoverTile";
import { IconPlate } from "./IconPlate";
import { LabelChip } from "./LabelChip";
import { BlogEyebrow } from "./BlogEyebrow";
import type { Surface, TileTone } from "./types";

export interface EbookCardProps {
  title: string;
  blurb?: string;
  href: string;
  ctaLabel?: string;
  chipLabel?: string;
  tone?: TileTone;
  icon?: ReactNode;
  surface?: Surface;
  className?: string;
}

/** Lead-magnet card — cover tile + chip + download CTA. */
export function EbookCard({
  title,
  blurb,
  href,
  ctaLabel = "Download",
  chipLabel = "Field Guide",
  tone = "amber",
  icon,
  surface = "paper",
  className,
}: EbookCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "group flex flex-col border transition-colors",
        surface === "paper"
          ? "border-blog-hairline-paper bg-blog-surface-muted text-blog-text-graphite hover:border-blog-text-graphite/40"
          : "border-blog-hairline bg-blog-surface-elevated text-blog-text-paper hover:border-blog-text-paper/40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blog-ring-teal",
        className,
      )}
    >
      <CoverTile tone={tone} texture="halftone" ratio="4/3">
        {icon && <IconPlate icon={icon} overlap />}
        <LabelChip size="sm" variant="notched">
          {chipLabel}
        </LabelChip>
      </CoverTile>
      <div className="flex flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-semibold leading-snug tracking-splice-snug">
          {title}
        </h3>
        {blurb && (
          <p className="font-display text-sm leading-relaxed text-blog-text-muted">
            {blurb}
          </p>
        )}
        <BlogEyebrow caret className="mt-1">
          {ctaLabel}
        </BlogEyebrow>
      </div>
    </a>
  );
}
