import { cn } from "@/lib/utils";
import type { MouseEventHandler, ReactNode } from "react";

export interface TerminalButtonProps {
  variant?: "primary" | "ghost";
  /** `md` for hero CTAs, `sm` for the compact nav CTA. */
  size?: "sm" | "md";
  /** Renders an <a> (default) or a <button> with identical styling. */
  as?: "a" | "button";
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  /** Analytics hook, e.g. "cta_apply_founder". */
  "data-event"?: string;
  className?: string;
  children: ReactNode;
}

/**
 * The marketing CTA button. Mono uppercase; on hover the label nudges right
 * and a trailing caret appears; presses scale slightly. Motion is
 * reduced-motion gated.
 */
export function TerminalButton({
  variant = "primary",
  size = "md",
  as = "a",
  href,
  type = "button",
  disabled = false,
  onClick,
  target,
  rel,
  "aria-label": ariaLabel,
  "data-event": dataEvent,
  className,
  children,
}: TerminalButtonProps) {
  const classes = cn(
    "group inline-flex min-h-[2.5rem] items-center justify-center gap-1",
    "font-mono uppercase tracking-splice-wide",
    size === "sm" ? "px-4 py-2 text-meta" : "px-6 py-3 text-xs",
    "transition-[color,background-color,border-color,box-shadow,transform] duration-150 ease-[cubic-bezier(0.165,0.84,0.44,1)]",
    "focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2",
    variant === "primary"
      ? "bg-accent text-accent-foreground"
      : "border border-surface-border text-muted-foreground",
    !disabled && "motion-safe:active:scale-[0.985]",
    !disabled &&
      (variant === "primary"
        ? "hover:bg-accent/90 hover:ring-1 hover:ring-inset hover:ring-accent-foreground/15"
        : "hover:border-foreground/30 hover:text-foreground"),
    disabled && "cursor-not-allowed opacity-40",
    className,
  );

  const inner = (
    <>
      <span className="motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-hover:translate-x-0.5">
        {children}
      </span>
      <span
        aria-hidden
        className="-translate-x-1 opacity-0 motion-safe:transition-[opacity,transform] motion-safe:duration-150 group-hover:translate-x-0 group-hover:opacity-100"
      >
        ›
      </span>
    </>
  );

  if (as === "button") {
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        data-event={dataEvent}
        className={classes}
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      // When disabled, drop href + remove from tab order so the anchor is
      // not keyboard-activatable (pointer-events-none only blocks the mouse).
      href={disabled ? undefined : href}
      onClick={onClick}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      data-event={dataEvent}
      className={classes}
    >
      {inner}
    </a>
  );
}
