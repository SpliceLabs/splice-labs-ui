import { cn } from "@/lib/utils";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

/** Builds a numeric window of up to 5 pages centered on the current page. */
function pageWindow(page: number, total: number): number[] {
  const size = Math.min(5, total);
  let start = Math.max(1, page - 2);
  start = Math.min(start, total - size + 1);
  return Array.from({ length: size }, (_, i) => start + i);
}

/** Mono-caps pagination — `← PREV` / `NEXT →` with a 5-pill window. */
export function Pagination({
  page,
  totalPages,
  onChange,
  className,
}: PaginationProps) {
  const cell =
    "grid h-10 min-w-10 place-items-center px-2 font-mono text-xs uppercase tracking-splice-label transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blog-ring-teal disabled:opacity-30";

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
    >
      <button
        type="button"
        className={cell}
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        ← Prev
      </button>
      {pageWindow(page, totalPages).map((p) => (
        <button
          key={p}
          type="button"
          aria-current={p === page ? "page" : undefined}
          onClick={() => onChange(p)}
          className={cn(
            cell,
            p === page
              ? "bg-blog-chip-ink text-blog-chip-text"
              : "text-blog-text-muted hover:text-current",
          )}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className={cell}
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next →
      </button>
    </nav>
  );
}
