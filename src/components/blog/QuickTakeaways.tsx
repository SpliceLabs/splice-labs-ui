import { cn } from "@/lib/utils";
import { ModuleLabel } from "./ModuleLabel";
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
      <ModuleLabel className="mb-4">{title}</ModuleLabel>
      <ol className="flex flex-col gap-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span
              data-md-skip
              className="font-mono text-[12px] leading-relaxed tracking-[0.06em] text-blog-text-muted"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-[15px] leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
