import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import type { TileTone, TileTexture } from "./types";
import { CardSwarm } from "./CardSwarm";

export interface CoverTileProps extends HTMLAttributes<HTMLDivElement> {
  tone?: TileTone;
  texture?: TileTexture;
  ratio?: "16/10" | "4/3";
  /** Opt-in ambient particle layer — blog index grid cards only. */
  swarm?: boolean;
  /** Reveal stagger for the swarm, in ms. */
  swarmDelay?: number;
}

const toneClasses: Record<TileTone, string> = {
  teal: "bg-blog-tile-teal",
  amber: "bg-blog-tile-amber",
  bone: "bg-blog-tile-bone",
  graphite: "bg-blog-tile-graphite",
};

/**
 * Texture overlays are pure CSS — monochrome on the tile color, never
 * full-color photography (blog design memo §2.3).
 */
const textureStyle: Record<Exclude<TileTexture, "none">, React.CSSProperties> = {
  halftone: {
    backgroundImage: "radial-gradient(currentColor 1px, transparent 1.6px)",
    backgroundSize: "8px 8px",
  },
  engraving: {
    backgroundImage:
      "repeating-linear-gradient(0deg, currentColor 0 1px, transparent 1px 7px)",
  },
};

/** Flat-color cover rectangle for cards and article heroes. 0px radius. */
export function CoverTile({
  tone = "teal",
  texture = "none",
  ratio = "16/10",
  swarm = false,
  swarmDelay,
  className,
  children,
  ...rest
}: CoverTileProps) {
  return (
    <div
      {...rest}
      className={cn(
        "relative grid place-items-center overflow-hidden p-6",
        ratio === "16/10" ? "aspect-[16/10]" : "aspect-[4/3]",
        toneClasses[tone],
        className,
      )}
    >
      {/* Particle layer sits below the CSS texture and above the tile fill. */}
      {swarm && <CardSwarm tone={tone} delay={swarmDelay} />}
      {texture !== "none" && (
        <span
          aria-hidden
          style={{
            ...textureStyle[texture],
            opacity: "var(--tile-texture-opacity, 0.08)",
          }}
          className="pointer-events-none absolute inset-0 text-blog-chip-ink transition-opacity duration-200"
        />
      )}
      <div className="relative flex flex-col items-center">{children}</div>
    </div>
  );
}
