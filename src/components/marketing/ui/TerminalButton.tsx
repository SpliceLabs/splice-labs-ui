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
    "group relative inline-flex items-center justify-center gap-1",
    "font-mono font-bold uppercase tracking-splice-wide",
    size === "sm" ? "px-4 py-2 text-[13px]" : "px-6 py-3 text-sm",
    "transition-[color,background-color,border-color,transform,box-shadow] duration-150 ease-out",
    "focus-visible:outline focus-visible:outline-1 focus-visible:outline-ember focus-visible:outline-offset-2",
    !disabled && "motion-safe:active:scale-[0.985]",
    variant === "primary"
      ? [
          "bg-accent text-accent-foreground",
          "hover:bg-ember hover:text-ember-foreground",
          "motion-safe:hover:shadow-[0_0_20px_-4px_hsl(20_100%_55%/0.4)]",
        ]
      : [
          "border border-surface-border text-muted-foreground",
          "hover:border-ember/50 hover:text-ember",
          "motion-safe:hover:shadow-[0_0_12px_-4px_hsl(20_100%_55%/0.25)]",
        ],
    disabled && "pointer-events-none opacity-40",
    className,
  );

  const inner = (
    <>
      <span className="motion-safe:transition-transform motion-safe:duration-150 motion-safe:group-hover:translate-x-0.5">
        {children}
      </span>
      <span
        aria-hidden
        className="-translate-x-1 opacity-0 transition-[opacity,transform] duration-150 group-hover:translate-x-0 group-hover:opacity-100"
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
