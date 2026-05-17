import { cn } from "@/lib/utils";

/** Shared action button styling for blog article actions. */
export const actionButtonClass = cn(
  "inline-flex items-center gap-2 border border-current/20 px-3 py-2",
  "font-mono text-xs uppercase tracking-splice-label",
  "transition-colors hover:border-current/40",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blog-ring-teal",
);
