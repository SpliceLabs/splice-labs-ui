import { cn } from "@/lib/utils";
import { ModuleLabel } from "./ModuleLabel";
import type { ReactNode } from "react";
import type { TileTone } from "./types";

export interface CTABandProps {
  eyebrow?: string;
  title: string;
  body?: string;
  /** Any node — typically a button or link. */
  action?: ReactNode;
  tone?: TileTone;
  className?: string;
}

const toneClasses: Record<TileTone, string> = {
  teal: "bg-blog-tile-teal text-blog-text-graphite",
  amber: "bg-blog-tile-amber text-blog-text-graphite",
  bone: "bg-blog-tile-bone text-blog-text-graphite",
  graphite: "bg-blog-tile-graphite text-blog-text-paper",
};

/** Full-width closing band. One tile tone, one headline, one action. */
export function CTABand({
  eyebrow,
  title,
  body,
  action,
  tone = "teal",
  className,
}: CTABandProps) {
  return (
    <section className={cn(toneClasses[tone], className)}>
      <div className="mx-auto flex max-w-[1040px] flex-col gap-5 px-8 py-20">
        {eyebrow && <ModuleLabel className="text-current/70">{eyebrow}</ModuleLabel>}
        <h2 className="max-w-[720px] font-display text-3xl font-semibold leading-tight tracking-[-0.03em] md:text-4xl">
          {title}
        </h2>
        {body && (
          <p className="max-w-[560px] font-display text-base leading-relaxed text-current/80">
            {body}
          </p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
    </section>
  );
}
