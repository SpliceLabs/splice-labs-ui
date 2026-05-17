import type { MDXComponents } from "mdx/types";
import { blogMdxComponents } from "@/components/blog";

/**
 * Next.js (@next/mdx) calls this to resolve components for every .mdx file.
 * Wires the Splice Labs blog brand mapping globally; per-render overrides
 * still take precedence.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...blogMdxComponents, ...components };
}
