"use client";

import { useRef } from "react";
import { Workflow } from "lucide-react";
import {
  ArticleActions,
  ArticleHeader,
  AuthorRow,
  CTABand,
  HairlineDivider,
  NewsletterCard,
  ReadingProgress,
  ReadMoreBand,
  TableOfContents,
  TLDRRail,
  type PostFrontmatter,
} from "@/components/blog";
import { posts } from "./blog/data";
import PostBody from "@/posts/deterministic-runtimes.mdx";

const frontmatter: PostFrontmatter = {
  title: "Deterministic Runtimes for Cross-Chain Agent Execution",
  date: "2026-05-12",
  category: "Research",
  product: "HELIOS",
  author: "Aakanksha Mahajan",
  readingTime: "9 min",
  url: "https://splicelabs.ai/blog/deterministic-runtimes",
  tags: ["runtime", "cross-chain", "agents"],
};

/** Full article reader — exercises every Pass 4/5 article component. */
export default function BlogArticleDemo() {
  const articleRef = useRef<HTMLElement>(null);

  return (
    <article id="article-body" className="bg-blog-paper text-blog-text-graphite">
      <ReadingProgress targetId="article-body" />

      <div className="mx-auto max-w-[1040px] px-8 pt-16">
        <ArticleHeader
          crumbs={[
            { label: "Blog", href: "/blog/index-demo" },
            { label: "Research", href: "/blog/index-demo?c=research" },
            { label: "Deterministic Runtimes" },
          ]}
          title={frontmatter.title}
          deck="Agentic systems will dominate on-chain trading volume by 2027–2029. The firms with proven strategies built now win — this is infrastructure-layer timing."
          tileTone="bone"
          tileTexture="engraving"
          tileIcon={<Workflow size={48} />}
        />

        <div className="mt-8 flex flex-col gap-6">
          <AuthorRow
            authors={[
              {
                name: "Aakanksha Mahajan",
                role: "Engineering Lead",
                href: "/team/aakanksha",
              },
            ]}
            date="May 12, 2026"
            readingTime="9 min read"
          />
          <ArticleActions
            articleRef={articleRef}
            frontmatter={frontmatter}
            onAskAI={() => window.alert("Host app opens the agent drawer here.")}
          />
        </div>

        <HairlineDivider surface="paper" className="my-10" />

        <div className="grid grid-cols-1 gap-12 pb-20 lg:grid-cols-[200px_1fr_260px]">
          <TableOfContents scopeId="article-prose" />

          <main ref={articleRef} id="article-prose" className="flex flex-col">
            <PostBody />
          </main>

          <div className="flex flex-col gap-8">
            <TLDRRail
              summary="Deterministic runtimes make agent trading auditable: replay-able traces, policy compiled into contracts, and one cross-chain attestation ledger."
              sources={[
                { label: "HELIOS spec", href: "/helios" },
                { label: "Replay attestation RFC", href: "#replay-attestation" },
              ]}
            />
            <NewsletterCard />
          </div>
        </div>
      </div>

      <ReadMoreBand posts={posts.slice(1, 4)} />

      <CTABand
        eyebrow="Build with Splice Labs"
        title="Give your agents a runtime you can audit."
        body="HELIOS is the control plane between intent and execution. Deterministic. Replayable."
        action={
          <a
            href="/contact"
            className="inline-flex bg-blog-chip-ink px-6 py-3 font-mono text-code uppercase tracking-splice-label text-blog-chip-text transition-opacity hover:opacity-90"
          >
            Request access
          </a>
        }
      />
    </article>
  );
}
