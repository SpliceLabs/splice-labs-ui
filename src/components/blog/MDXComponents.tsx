import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Callout } from "./Callout";
import { CoverTile } from "./CoverTile";
import { FigureBlock } from "./FigureBlock";
import { HairlineDivider } from "./HairlineDivider";
import { IconPlate } from "./IconPlate";
import { LabelChip } from "./LabelChip";
import { ModuleLabel } from "./ModuleLabel";
import { QuickTakeaways } from "./QuickTakeaways";

/**
 * Maps MDX output to the Splice Labs blog brand system. Pass to an
 * <MDXProvider components={blogMdxComponents}> or directly to a post:
 * `<Post components={blogMdxComponents} />`.
 *
 * Heading id slugs are supplied by rehype-slug (see vite.config.ts), so
 * the TableOfContents component can scan h2/h3 and build deep links.
 *
 * The blog components are also exposed by name — MDX authors can write
 * `<Callout tone="warn">…</Callout>` without importing anything.
 */
export const blogMdxComponents: MDXComponents = {
  h1: (props: ComponentProps<"h1">) => (
    <h1
      {...props}
      className="mt-12 font-display text-4xl font-semibold leading-[1.1] tracking-[-0.03em] md:text-5xl"
    />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2
      {...props}
      className="mb-3 mt-14 scroll-mt-24 font-display text-2xl font-semibold tracking-[-0.02em]"
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      {...props}
      className="mb-2 mt-8 scroll-mt-24 font-display text-xl font-semibold tracking-[-0.02em]"
    />
  ),
  h4: (props: ComponentProps<"h4">) => (
    <h4
      {...props}
      className="mb-2 mt-6 font-display text-lg font-semibold tracking-[-0.01em]"
    />
  ),
  p: (props: ComponentProps<"p">) => (
    <p {...props} className="mt-4 font-display text-[18px] leading-[1.75]" />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul
      {...props}
      className="mt-4 flex list-none flex-col gap-2 pl-6 font-display text-[18px] leading-[1.6] [&>li]:before:absolute [&>li]:before:-ml-6 [&>li]:before:content-['—'] [&>li]:relative"
    />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol
      {...props}
      className="mt-4 flex list-decimal flex-col gap-2 pl-6 font-display text-[18px] leading-[1.6]"
    />
  ),
  blockquote: ({ children }: ComponentProps<"blockquote">) => (
    <Callout tone="quote" className="my-6">
      {children}
    </Callout>
  ),
  a: (props: ComponentProps<"a">) => (
    <a
      {...props}
      className="font-medium text-blog-text-graphite underline decoration-blog-link-underline decoration-1 underline-offset-2 transition-colors hover:text-blog-link-underline"
    />
  ),
  hr: () => <HairlineDivider surface="paper" className="my-10" />,
  code: ({ className, ...props }: ComponentProps<"code">) =>
    className ? (
      // Fenced code block — `pre` provides the surface.
      <code {...props} className={cn("font-mono text-[13px]", className)} />
    ) : (
      <code
        {...props}
        className="bg-blog-surface-muted px-1.5 py-0.5 font-mono text-[0.92em]"
      />
    ),
  pre: (props: ComponentProps<"pre">) => (
    <pre
      {...props}
      className="my-6 overflow-x-auto border border-blog-hairline-paper bg-blog-surface-muted p-4 font-mono text-[13px] leading-relaxed"
    />
  ),
  img: ({ alt, ...props }: ComponentProps<"img">) => (
    <FigureBlock caption={alt || undefined}>
      <img {...props} alt={alt ?? ""} className="w-full" />
    </FigureBlock>
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table
        {...props}
        className="w-full border-collapse border border-blog-hairline-paper text-left font-display text-sm"
      />
    </div>
  ),
  th: (props: ComponentProps<"th">) => (
    <th
      {...props}
      className="border border-blog-hairline-paper bg-blog-surface-muted px-3 py-2 font-mono text-[11px] uppercase tracking-[0.06em]"
    />
  ),
  td: (props: ComponentProps<"td">) => (
    <td
      {...props}
      className="border border-blog-hairline-paper px-3 py-2"
    />
  ),

  // Blog components — usable as bare JSX inside .mdx files.
  Callout,
  FigureBlock,
  QuickTakeaways,
  LabelChip,
  ModuleLabel,
  CoverTile,
  IconPlate,
  HairlineDivider,
};
