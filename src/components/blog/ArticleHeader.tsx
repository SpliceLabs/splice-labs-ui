import { cn } from "@/lib/utils";
import { CoverTile } from "./CoverTile";
import { Crumb } from "./Crumb";
import { IconPlate } from "./IconPlate";
import type { ArticleMeta, CrumbSegment, TileTone, TileTexture } from "./types";

export interface ArticleHeaderProps {
  crumbs: CrumbSegment[];
  title: string;
  /** One-paragraph summary under the headline. */
  deck?: string;
  tileTone?: TileTone;
  tileTexture?: TileTexture;
  tileIcon?: React.ReactNode;
  meta?: ArticleMeta[];
  className?: string;
}

/** Paper-surface article hero: crumb → cover tile → headline → deck → meta. */
export function ArticleHeader({
  crumbs,
  title,
  deck,
  tileTone = "bone",
  tileTexture = "none",
  tileIcon,
  meta,
  className,
}: ArticleHeaderProps) {
  return (
    <header
      className={cn(
        "mx-auto flex max-w-[1040px] flex-col gap-8 text-blog-text-graphite",
        className,
      )}
    >
      <Crumb segments={crumbs} className="text-blog-text-graphite" />

      <CoverTile tone={tileTone} texture={tileTexture} className="w-full">
        {tileIcon && <IconPlate icon={tileIcon} size={48} />}
      </CoverTile>

      <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
        {title}
      </h1>

      {deck && (
        <p className="max-w-[680px] font-display text-lg leading-[1.6] text-blog-text-graphite/80">
          {deck}
        </p>
      )}

      {meta && meta.length > 0 && (
        <dl className="flex flex-wrap gap-x-10 gap-y-3">
          {meta.map((m) => (
            <div key={m.label} className="flex flex-col gap-1">
              <dt className="font-mono text-label uppercase tracking-[0.18em] text-blog-text-muted">
                {m.label}
              </dt>
              <dd className="flex items-center gap-1.5 font-display text-sm">
                {m.icon}
                {m.href ? (
                  <a href={m.href} className="underline underline-offset-2">
                    {m.value}
                  </a>
                ) : (
                  m.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}
