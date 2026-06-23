import { cn } from "@/lib/utils";
import { useState } from "react";
import { LabelChip } from "./LabelChip";
import { ModuleLabel } from "./ModuleLabel";
import type { Surface } from "./types";

export interface NewsletterCardProps {
  title?: string;
  blurb?: string;
  surface?: Surface;
  /** Optional async submit handler. Resolves → success state. */
  onSubmit?: (email: string) => void | Promise<void>;
  className?: string;
}

/** Email capture card — renders on paper or graphite. */
export function NewsletterCard({
  title = "The Foundry Log",
  blurb = "Operational notes on agent-native infrastructure. No marketing.",
  surface = "paper",
  onSubmit,
  className,
}: NewsletterCardProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "done" | "error"
  >("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await onSubmit?.(email);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      className={cn(
        "flex flex-col gap-4 border p-6",
        surface === "paper"
          ? "border-blog-hairline-paper bg-blog-surface-muted text-blog-text-graphite"
          : "border-blog-hairline bg-blog-surface-elevated text-blog-text-paper",
        className,
      )}
    >
      <ModuleLabel dot>Subscribe</ModuleLabel>
      <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
        {title}
      </h3>
      <p className="font-display text-sm leading-relaxed text-blog-text-muted">
        {blurb}
      </p>

      {status === "done" ? (
        <LabelChip size="sm" variant="notched">
          Subscribed
        </LabelChip>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="founder@yourdomain.com"
              disabled={status === "submitting"}
              aria-invalid={status === "error"}
              className="w-full border border-current/20 bg-transparent px-3 py-2 font-mono text-label-lg outline-none placeholder:text-blog-text-muted focus-visible:ring-2 focus-visible:ring-blog-ring-teal disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="shrink-0 bg-blog-chip-ink px-4 py-2 font-mono text-[12px] uppercase tracking-[0.06em] text-blog-chip-text transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blog-ring-teal disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "submitting" ? "Requesting…" : "Request access"}
            </button>
          </div>
          <p
            aria-live="polite"
            className="min-h-[1rem] font-mono text-label tracking-[0.04em]"
          >
            {status === "error" && "Something went wrong — please try again."}
          </p>
        </form>
      )}
    </section>
  );
}
