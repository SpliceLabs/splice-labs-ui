import { cn } from "@/lib/utils";
import { Fragment } from "react";
import type { CrumbSegment } from "./types";

export interface CrumbProps {
  /** Ordered path segments. The last segment renders as the current page. */
  segments: CrumbSegment[];
  className?: string;
}

/** Breadcrumb row — `BLOG / ENGINEERING`. Mono caps, muted slash separators. */
export function Crumb({ segments, className }: CrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex flex-wrap items-center gap-2 font-mono text-[12px] uppercase leading-none tracking-[0.06em]",
        className,
      )}
    >
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        return (
          <Fragment key={`${seg.label}-${i}`}>
            {seg.href && !isLast ? (
              <a
                href={seg.href}
                className="text-blog-text-muted transition-colors hover:text-current"
              >
                {seg.label}
              </a>
            ) : (
              <span aria-current={isLast ? "page" : undefined}>
                {seg.label}
              </span>
            )}
            {!isLast && (
              <span aria-hidden className="text-blog-text-muted">
                /
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
