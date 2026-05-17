import { cn } from "@/lib/utils";
import { Check, ClipboardCopy, Download, Sparkles } from "lucide-react";
import { useState, type RefObject } from "react";
import { ListenButton } from "./ListenButton";
import { ShareMenu } from "./ShareMenu";
import type { PostFrontmatter } from "./types";
import { actionButtonClass } from "./styles";
import {
  copyToClipboard,
  downloadMarkdown,
  postToMarkdown,
  slugify,
} from "./utils/markdown";

export interface ArticleActionsProps {
  /** Ref to the rendered article body element. */
  articleRef: RefObject<HTMLElement>;
  frontmatter: PostFrontmatter;
  /** Optional remote TTS endpoint passed through to ListenButton. */
  ttsEndpoint?: string;
  /** Hook the host app's agent / chat drawer. */
  onAskAI?: () => void;
  className?: string;
}


/** The article action bar — copy / download / listen / share / ask AI. */
export function ArticleActions({
  articleRef,
  frontmatter,
  ttsEndpoint,
  onAskAI,
  className,
}: ArticleActionsProps) {
  const [copied, setCopied] = useState(false);

  const getMarkdown = () =>
    articleRef.current
      ? postToMarkdown(articleRef.current, frontmatter)
      : "";

  const onCopy = async () => {
    await copyToClipboard(getMarkdown());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const onDownload = () =>
    downloadMarkdown(slugify(frontmatter.title), getMarkdown());

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <button type="button" onClick={onCopy} className={actionButtonClass}>
        {copied ? <Check size={14} /> : <ClipboardCopy size={14} />}
        {copied ? "Copied" : "Copy as Markdown"}
      </button>

      <button type="button" onClick={onDownload} className={actionButtonClass}>
        <Download size={14} />
        Download .md
      </button>

      <ListenButton
        text={() => articleRef.current?.innerText ?? ""}
        endpoint={ttsEndpoint}
      />

      <ShareMenu url={frontmatter.url ?? ""} title={frontmatter.title} />

      {onAskAI && (
        <button type="button" onClick={onAskAI} className={actionButtonClass}>
          <Sparkles size={14} />
          Ask AI
        </button>
      )}
    </div>
  );
}
