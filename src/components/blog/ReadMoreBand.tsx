import { cn } from "@/lib/utils";
import { HairlineDivider } from "./HairlineDivider";
import { BlogEyebrow } from "./BlogEyebrow";
import { PostCard } from "./PostCard";
import type { PostCardData } from "./types";

export interface ReadMoreBandProps {
  posts: PostCardData[];
  title?: string;
  className?: string;
}

/** Full-width dark band of related posts. Re-anchors discovery after an article. */
export function ReadMoreBand({
  posts,
  title = "Read More",
  className,
}: ReadMoreBandProps) {
  return (
    <section
      className={cn("bg-blog-graphite text-blog-text-paper", className)}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-8 py-16">
        <BlogEyebrow dot caret>
          {title}
        </BlogEyebrow>
        <HairlineDivider surface="graphite" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <PostCard key={`${post.href}-${i}`} surface="graphite" {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}
