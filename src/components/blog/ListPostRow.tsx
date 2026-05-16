import { cn } from "@/lib/utils";
import type { PostCardData } from "./types";

export interface ListPostRowProps extends PostCardData {
  /** Short TL;DR snippet shown after the title. */
  snippet?: string;
  className?: string;
}

/** Single list-view row — date · category · title · snippet. */
export function ListPostRow({
  href,
  title,
  date,
  category,
  snippet,
  className,
}: ListPostRowProps) {
  return (
    <a
      href={href}
      className={cn(
        "group flex flex-col gap-2 py-5 transition-colors md:flex-row md:items-baseline md:gap-6",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blog-ring-teal",
        className,
      )}
    >
      <span className="flex shrink-0 gap-3 font-mono text-[12px] uppercase tracking-[0.06em] text-blog-text-muted md:w-56">
        <span>{date}</span>
        <span aria-hidden>·</span>
        <span>{category}</span>
      </span>
      <span className="flex flex-col gap-1">
        <span className="font-display text-lg font-semibold leading-snug tracking-[-0.02em]">
          <span className="relative inline">
            {title}
            <span
              aria-hidden
              className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-200 ease-out group-hover:scale-x-100"
            />
          </span>
        </span>
        {snippet && (
          <span className="font-display text-sm leading-relaxed text-blog-text-muted">
            {snippet}
          </span>
        )}
      </span>
    </a>
  );
}
