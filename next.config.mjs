import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeSlug from "rehype-slug";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // .mdx files can be route segments and are compiled as pages.
  pageExtensions: ["ts", "tsx", "mdx"],
  reactStrictMode: true,
  // next/image: serve AVIF first, WebP fallback (perf contract §3.1).
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkUnwrapImages],
    rehypePlugins: [rehypeSlug],
  },
});

export default withMDX(nextConfig);
