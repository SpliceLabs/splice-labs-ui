import { cn } from "@/lib/utils";
import { ModuleLabel } from "./ModuleLabel";
import type { Surface } from "./types";

export interface TLDRSource {
  label: string;
  href: string;
}

export interface TLDRRailProps {
  summary: string;
  sources?: TLDRSource[];
  surface?: Surface;
  className?: string;
}

/** Sticky summary box with a source-link list. Teal underline draws on hover. */
export function TLDRRail({
  summary,
  sources,
  surface = "paper",
  className,
}: TLDRRailProps) {
  return (
    <aside
      className={cn(
        "sticky top-24 flex flex-col gap-4 border p-5",
        surface === "paper"
          ? "border-blog-hairline-paper bg-blog-surface-muted text-blog-text-graphite"
          : "border-blog-hairline bg-blog-surface-elevated text-blog-text-paper",
        className,
      )}
    >
      <ModuleLabel dot>TL;DR</ModuleLabel>
      <p className="font-display text-sm leading-relaxed">{summary}</p>

      {sources && sources.length > 0 && (
        <div className="flex flex-col gap-2">
          <ModuleLabel>Sources</ModuleLabel>
          <ul className="flex flex-col gap-1.5">
            {sources.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  className="group inline-flex flex-col font-display text-sm"
                >
                  {s.label}
                  <span
                    aria-hidden
                    className="h-px w-full origin-left scale-x-0 bg-blog-link-underline transition-transform duration-150 ease-out group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
