import { cn } from "@/lib/utils";
import { BlogEyebrow } from "./BlogEyebrow";
import type { Surface } from "./types";

export interface QuickTakeawaysProps {
  items: string[];
  title?: string;
  surface?: Surface;
  className?: string;
}

/** Numbered summary list inside a hairline frame with `01 · 02 · 03` ordinals. */
export function QuickTakeaways({
  items,
  title = "Quick Takeaways",
  surface = "paper",
  className,
}: QuickTakeawaysProps) {
  return (
    <section
      className={cn(
        "border p-6",
        surface === "paper"
          ? "border-blog-hairline-paper bg-blog-surface-muted text-blog-text-graphite"
          : "border-blog-hairline bg-blog-surface-elevated text-blog-text-paper",
        className,
      )}
    >
      <BlogEyebrow className="mb-4">{title}</BlogEyebrow>
      <ol className="flex flex-col gap-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span
              data-md-skip
              className="font-mono text-xs leading-relaxed tracking-splice-label text-blog-text-muted"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-prose leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
