import { cn } from "@/lib/utils";
import { CoverTile } from "./CoverTile";
import { IconPlate } from "./IconPlate";
import { LabelChip } from "./LabelChip";
import type { PostCardData, Surface } from "./types";

export interface PostCardProps extends PostCardData {
  surface?: Surface;
  className?: string;
  /**
   * Reveal-stagger index for the cover-tile particle swarm, in ms.
   * When set, the card opts into the ambient swarm (blog index grid only).
   */
  swarmDelay?: number;
}

/**
 * Mem0-style index card. The whole card is a single <a> for accessibility.
 * Hover lifts the tile texture 8%→14%, draws the title underline, and
 * flashes the chip caret.
 */
export function PostCard({
  href,
  title,
  date,
  category,
  tone = "teal",
  texture = "halftone",
  icon,
  chipLabel,
  surface = "graphite",
  className,
  swarmDelay,
}: PostCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "group block [--tile-texture-opacity:0.08] hover:[--tile-texture-opacity:0.14]",
        "transition-transform duration-100 active:scale-[0.992]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blog-ring-teal",
        surface === "graphite" ? "text-blog-text-paper" : "text-blog-text-graphite",
        className,
      )}
    >
      <CoverTile
        tone={tone}
        texture={texture}
        swarm={swarmDelay !== undefined}
        swarmDelay={swarmDelay}
      >
        {icon && <IconPlate icon={icon} overlap />}
        {chipLabel && (
          <LabelChip size="sm" variant="notched" caret>
            {chipLabel}
          </LabelChip>
        )}
      </CoverTile>

      <div className="mt-4 flex items-center gap-2 font-mono text-[12px] uppercase leading-none tracking-[0.06em] text-blog-text-muted">
        <span>{date}</span>
        <span aria-hidden>·</span>
        <span>{category}</span>
      </div>

      <h3 className="mt-2 font-display text-xl font-semibold leading-tight tracking-[-0.02em]">
        <span className="relative inline">
          {title}
          <span
            aria-hidden
            className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-200 ease-out group-hover:scale-x-100"
          />
        </span>
      </h3>
    </a>
  );
}
