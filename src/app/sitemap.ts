import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Public, indexable routes. Internal pages (dataroom, decks, brand,
    logos, the primitives showcase) are excluded. */
const ROUTES = ["/", "/helios", "/blog/index-demo", "/blog/article-demo"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
  }));
}
