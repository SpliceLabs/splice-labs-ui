import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Link2, Share2 } from "lucide-react";
import { useState } from "react";
import { actionButtonClass } from "./styles";

export interface ShareMenuProps {
  url: string;
  title?: string;
  className?: string;
}

/** Lightweight share dropdown: copy URL, X, LinkedIn, native share. */
export function ShareMenu({ url, title = "", className }: ShareMenuProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const native = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ url, title });
      } catch {
        /* dismissed */
      }
    }
  };

  const itemClass =
    "flex cursor-pointer items-center gap-2 font-mono text-[12px] uppercase tracking-[0.06em]";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(actionButtonClass, className)}>
        <Share2 size={14} />
        Share
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-none">
        <DropdownMenuItem className={itemClass} onSelect={copy}>
          {copied ? <Check size={14} /> : <Link2 size={14} />}
          {copied ? "Copied" : "Copy link"}
        </DropdownMenuItem>
        <DropdownMenuItem className={itemClass} asChild>
          <a
            href={`https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noreferrer"
          >
            Share on X
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className={itemClass} asChild>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noreferrer"
          >
            Share on LinkedIn
          </a>
        </DropdownMenuItem>
        {typeof navigator !== "undefined" && "share" in navigator && (
          <DropdownMenuItem className={itemClass} onSelect={native}>
            More…
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
