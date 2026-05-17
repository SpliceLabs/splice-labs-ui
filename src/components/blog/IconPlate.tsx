import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface IconPlateProps {
  /** Inline SVG glyph; inherits `currentColor`. */
  icon: ReactNode;
  size?: number;
  /** Shifts the plate down so it half-sits on a tile edge, sticker-style. */
  overlap?: boolean;
  className?: string;
}

/** The black square sticker that anchors covers and article heroes. */
export function IconPlate({
  icon,
  size = 36,
  overlap = false,
  className,
}: IconPlateProps) {
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        marginBottom: overlap ? -18 : undefined,
      }}
      className={cn(
        "relative z-[1] grid shrink-0 place-items-center bg-blog-chip-ink text-blog-chip-text",
        className,
      )}
    >
      {icon}
    </span>
  );
}
