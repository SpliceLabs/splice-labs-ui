import { cn } from "@/lib/utils";

export interface Author {
  name: string;
  role?: string;
  href?: string;
}

export interface AuthorRowProps {
  authors: Author[];
  date?: string;
  readingTime?: string;
  className?: string;
}

/** Text-only author byline — no headshots (blog primitives guide §3.3). */
export function AuthorRow({
  authors,
  date,
  readingTime,
  className,
}: AuthorRowProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-sm",
        className,
      )}
    >
      {authors.map((author, i) => (
        <span key={author.name} className="flex items-center gap-1.5">
          {author.href ? (
            <a href={author.href} className="font-medium underline underline-offset-2">
              {author.name}
            </a>
          ) : (
            <span className="font-medium">{author.name}</span>
          )}
          {author.role && (
            <span className="text-blog-text-muted">· {author.role}</span>
          )}
          {i < authors.length - 1 && (
            <span aria-hidden className="text-blog-text-muted">
              ,
            </span>
          )}
        </span>
      ))}
      {(date || readingTime) && (
        <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-blog-text-muted">
          {[date, readingTime].filter(Boolean).join("  ·  ")}
        </span>
      )}
    </div>
  );
}
