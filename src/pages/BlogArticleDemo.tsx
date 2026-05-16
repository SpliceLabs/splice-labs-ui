"use client";

import { useRef } from "react";
import { Workflow } from "lucide-react";
import {
  ArticleActions,
  ArticleHeader,
  AuthorRow,
  Callout,
  CTABand,
  FigureBlock,
  HairlineDivider,
  NewsletterCard,
  QuickTakeaways,
  ReadingProgress,
  ReadMoreBand,
  TableOfContents,
  TLDRRail,
  type PostFrontmatter,
} from "@/components/blog";
import { posts } from "./blog/data";

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
            <QuickTakeaways
              items={[
                "Deterministic replay is the precondition for auditable agent trading.",
                "Policy compiles into contract code — not model prompts.",
                "A cross-chain ledger lets one attestation cover many chains.",
              ]}
              className="mb-10"
            />

            <h2
              id="the-runtime-gap"
              className="font-display text-2xl font-semibold tracking-[-0.02em]"
            >
              The runtime gap
            </h2>
            <p className="mt-3 font-display text-[18px] leading-[1.75]">
              Most agent stacks treat execution as an afterthought. The model
              decides, an SDK fires a transaction, and the trail ends there. For
              a trading desk that is not good enough — you cannot audit what you
              cannot reconstruct.
            </p>

            <Callout tone="note" className="my-6">
              A runtime is deterministic when the same inputs always produce the
              same execution trace. Without that property, replay is fiction.
            </Callout>

            <h2
              id="policy-as-code"
              className="mt-10 font-display text-2xl font-semibold tracking-[-0.02em]"
            >
              Policy as code
            </h2>
            <p className="mt-3 font-display text-[18px] leading-[1.75]">
              Compiled policies live in contracts, not prompts. An approval gate
              is a typed, signed object — the agent proposes, the gate decides,
              and both halves are recorded.
            </p>

            <h3
              id="approval-gates"
              className="mt-6 font-display text-xl font-semibold tracking-[-0.02em]"
            >
              Approval gates
            </h3>
            <p className="mt-3 font-display text-[18px] leading-[1.75]">
              Each gate names the human or contract that owns it. Timeouts are
              explicit. Nothing executes on a maybe.
            </p>

            <FigureBlock
              number={1}
              caption="The deterministic execution lifecycle — intent, gate, replay."
            >
              <pre className="overflow-x-auto font-mono text-[13px] leading-relaxed text-blog-text-graphite">
                {`const policy = await helios.compile({
  agent: 'opentrade.v2',
  gates: ['human.approval', 'replay.attest'],
});`}
              </pre>
            </FigureBlock>

            <h2
              id="replay-attestation"
              className="mt-10 font-display text-2xl font-semibold tracking-[-0.02em]"
            >
              Replay attestation
            </h2>
            <p className="mt-3 font-display text-[18px] leading-[1.75]">
              Every decision an agent makes is reconstructable from its trace.
              Auditors verify the attestation; they do not trust the operator.
            </p>

            <Callout tone="quote" className="my-6">
              Trust nothing. Audit everything.
            </Callout>

            <h2
              id="cross-chain-ledger"
              className="mt-10 font-display text-2xl font-semibold tracking-[-0.02em]"
            >
              Cross-chain ledger
            </h2>
            <p className="mt-3 font-display text-[18px] leading-[1.75]">
              Stacks-anchored, EVM-fluent. One attestation ledger spans every
              chain the agent touches, so a single proof covers a multi-chain
              run.
            </p>

            <Callout tone="warn" className="my-6">
              Chain heterogeneity is a feature, not a tax — but only if the
              ledger is unified.
            </Callout>
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
            className="inline-flex bg-blog-chip-ink px-6 py-3 font-mono text-[13px] uppercase tracking-[0.06em] text-blog-chip-text transition-opacity hover:opacity-90"
          >
            Request access
          </a>
        }
      />
    </article>
  );
}
