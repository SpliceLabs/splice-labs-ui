import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BlogEyebrow } from "./BlogEyebrow";

export interface TocItem {
  id: string;
  label: string;
  level: 2 | 3;
}

export interface TableOfContentsProps {
  /** Id of the element to scan for h2/h3 headings. */
  scopeId: string;
  title?: string;
  className?: string;
}

/** Sticky rail — auto-builds from h2/h3 and highlights the active section. */
export function TableOfContents({
  scopeId,
  title = "In this article",
  className,
}: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const scope = document.getElementById(scopeId);
    if (!scope) return;

    const headings = Array.from(
      scope.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]"),
    );
    setItems(
      headings.map((h) => ({
        id: h.id,
        label: h.textContent ?? "",
        level: h.tagName === "H2" ? 2 : 3,
      })),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-10% 0px -75% 0px" },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [scopeId]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn("sticky top-24 flex flex-col gap-3", className)}
    >
      <BlogEyebrow>{title}</BlogEyebrow>
      <ul className="flex flex-col gap-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block font-mono text-xs leading-snug tracking-splice-label transition-opacity",
                item.level === 3 && "pl-4",
                activeId === item.id
                  ? "text-current opacity-100"
                  : "text-blog-text-muted opacity-60 hover:opacity-100",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
