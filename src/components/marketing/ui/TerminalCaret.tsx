import { cn } from "@/lib/utils";

export interface TerminalCaretProps {
  /** Blink cadence — `nav` (1s) or the slower ambient `footer` (2.1s). */
  rate?: "nav" | "footer";
  className?: string;
}

/**
 * The blinking cursor block of the `splice_` wordmark. Extracted so the nav
 * and footer share one caret. Static for reduced-motion users.
 */
export function TerminalCaret({ rate = "nav", className }: TerminalCaretProps) {
  return (
    <span
      aria-hidden
      style={rate === "footer" ? { animationDuration: "2.12s" } : undefined}
      className={cn(
        "inline-block h-4 w-2 bg-accent motion-safe:animate-blink-cursor",
        className,
      )}
    />
  );
}
