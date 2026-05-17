declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { MDXComponents } from "mdx/types";

  /** Frontmatter exported by remark-mdx-frontmatter-style posts, if present. */
  export const frontmatter: Record<string, unknown> | undefined;

  const MDXContent: ComponentType<{ components?: MDXComponents }>;
  export default MDXContent;
}
