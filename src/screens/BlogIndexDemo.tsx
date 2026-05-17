"use client";

import { useMemo, useState } from "react";
import {
  CategoryHeroNav,
  FilterRail,
  HairlineDivider,
  ListPostRow,
  ModuleLabel,
  Pagination,
  PostCard,
  SearchInput,
  ViewToggle,
  type BlogView,
} from "@/components/blog";
import { categories, posts } from "./blog/data";

const filterGroups = [
  { label: "CATEGORY", options: ["All", "Research", "Engineering", "Security", "Thesis"] },
  { label: "PRODUCT", options: ["All", "HELIOS", "Agave"] },
  { label: "SORT BY", options: ["Newest", "Most-read"] },
];

/** Full blog index — exercises every Pass 4/5 index component. */
export default function BlogIndexDemo() {
  const [view, setView] = useState<BlogView>("grid");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({
    CATEGORY: "All",
    PRODUCT: "All",
    "SORT BY": "Newest",
  });

  const visible = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory =
        filters.CATEGORY === "All" || p.category === filters.CATEGORY;
      const matchesQuery =
        query.trim() === "" ||
        p.title.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [filters, query]);

  return (
    <main className="min-h-screen bg-blog-graphite text-blog-text-paper">
      <div className="mx-auto max-w-[1200px] px-8 py-16">
        <div className="flex flex-col gap-3">
          <ModuleLabel dot caret>
            SPLICE_LABS :: FOUNDRY LOG
          </ModuleLabel>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.03em]">
            The Foundry Log
          </h1>
          <p className="max-w-[520px] font-display text-blog-text-muted">
            Operational notes on agent-native infrastructure — research,
            engineering, and security from the Splice Labs team.
          </p>
        </div>

        <div className="my-12">
          <CategoryHeroNav categories={categories} />
        </div>

        <HairlineDivider surface="graphite" />

        <section className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[200px_1fr]">
          <FilterRail
            groups={filterGroups}
            active={filters}
            onChange={(group, value) =>
              setFilters((f) => ({ ...f, [group]: value }))
            }
          />

          <div>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <SearchInput
                value={query}
                onChange={setQuery}
                className="sm:w-72"
              />
              <ViewToggle value={view} onChange={setView} />
            </div>

            {visible.length === 0 ? (
              <p className="py-16 text-center font-mono text-sm uppercase tracking-[0.06em] text-blog-text-muted">
                No posts match.
              </p>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {visible.map((p) => (
                  <PostCard key={p.title} surface="graphite" {...p} />
                ))}
              </div>
            ) : (
              <div className="divide-y divide-blog-hairline">
                {visible.map((p) => (
                  <ListPostRow key={p.title} {...p} />
                ))}
              </div>
            )}

            <Pagination
              page={page}
              totalPages={4}
              onChange={setPage}
              className="mt-12"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
