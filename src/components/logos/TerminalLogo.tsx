// Direction 08: TERMINAL — Monospace CLI Mark
// Now with optional typing animation for "labs"

import { useState, useEffect, useCallback } from "react";

const WORD = "labs";
const TYPE_SPEED = 160;
const DELETE_SPEED = 120;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 600;
const CURSOR_BLINK_RATE = 530;

type Phase = "typing" | "pause-typed" | "deleting" | "pause-deleted";

function useTypingAnimation(enabled: boolean) {
  const [displayed, setDisplayed] = useState(enabled ? "" : WORD);
  const [phase, setPhase] = useState<Phase>("pause-deleted");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    if (phase === "pause-typed" || phase === "pause-deleted") {
      const interval = setInterval(() => setCursorVisible((v) => !v), CURSOR_BLINK_RATE);
      return () => clearInterval(interval);
    }
    setCursorVisible(true);
  }, [phase, enabled]);

  const tick = useCallback(() => {
    switch (phase) {
      case "pause-deleted":
        setPhase("typing");
        break;
      case "typing":
        setDisplayed((prev) => {
          const next = WORD.slice(0, prev.length + 1);
          if (next.length === WORD.length) setPhase("pause-typed");
          return next;
        });
        break;
      case "pause-typed":
        setPhase("deleting");
        break;
      case "deleting":
        setDisplayed((prev) => {
          const next = prev.slice(0, -1);
          if (next.length === 0) setPhase("pause-deleted");
          return next;
        });
        break;
    }
  }, [phase]);

  useEffect(() => {
    if (!enabled) return;
    const delay =
      phase === "pause-typed" ? PAUSE_AFTER_TYPE
      : phase === "pause-deleted" ? PAUSE_AFTER_DELETE
      : phase === "deleting" ? DELETE_SPEED
      : TYPE_SPEED;
    const timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [tick, phase, displayed, enabled]);

  return { displayed, cursorVisible };
}

interface TerminalProps {
  accent?: boolean;
  scale?: "favicon" | "header" | "product";
  animated?: boolean;
}

export function TerminalFavicon({ accent = false }: { accent?: boolean }) {
  const acc = "#00D4B4";
  const base = "#E8EAF0";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="3" width="9" height="10" fill={accent ? acc : base} />
      <rect x="1" y="3" width="9" height="2.5" fill={accent ? acc : base} />
      <rect x="1" y="10.5" width="9" height="2.5" fill={accent ? acc : base} />
      <rect x="1" y="6.5" width="9" height="2" fill={accent ? acc : base} />
      <rect x="11" y="11" width="4" height="2" fill={base} opacity="0.4" />
    </svg>
  );
}

export function TerminalWordmark({ accent = false, scale = "header", animated = false }: TerminalProps) {
  const { displayed, cursorVisible } = useTypingAnimation(animated);
  const base = "#E8EAF0";
  const acc = "#00D4B4";
  const cursorColor = accent ? acc : base;

  if (scale === "favicon") {
    return <TerminalFavicon accent={accent} />;
  }

  if (scale === "product") {
    return (
      <div className="inline-flex items-baseline font-mono text-code">
        <span style={{ color: base, opacity: 0.35 }}>›</span>
        <span style={{ color: base }} className="ml-1">splice</span>
        <span style={{ color: cursorColor }}>_</span>
        <span
          className="inline-block ml-0.5"
          style={{
            width: 8, height: 13,
            backgroundColor: cursorColor,
            opacity: animated ? (cursorVisible ? 1 : 0) : 1,
            transition: "opacity 100ms",
          }}
        />
        {animated ? (
          <span style={{ color: base, opacity: 0.4, fontSize: 6, letterSpacing: "0.14em" }} className="ml-1 self-end">
            {displayed}
          </span>
        ) : (
          <span style={{ color: base, opacity: 0.4, fontSize: 6, letterSpacing: "0.14em" }} className="ml-1 self-end">
            labs
          </span>
        )}
      </div>
    );
  }

  // Header — full monospace wordmark with optional typing animation
  return (
    <div className="inline-flex items-baseline font-mono">
      <span className="text-[42px] font-normal" style={{ color: base, opacity: 0.25 }}>›</span>
      <span className="text-[42px] font-normal ml-1" style={{ color: base, letterSpacing: "-0.01em" }}>splice</span>
      <span className="text-[42px] font-bold" style={{ color: cursorColor }}>_</span>
      <span
        className="inline-block ml-0.5 align-baseline"
        style={{
          width: 26, height: 40,
          backgroundColor: cursorColor,
          opacity: animated ? (cursorVisible ? 1 : 0) : 1,
          transition: "opacity 100ms",
          verticalAlign: "-0.05em",
          boxShadow: animated ? `0 0 12px ${acc}80, 0 0 24px ${acc}33` : "none",
        }}
      />
      {animated ? (
        <span className="text-label self-end ml-1" style={{ color: base, opacity: 0.4, letterSpacing: "0.18em" }}>
          {displayed}
        </span>
      ) : (
        <span className="text-label self-end ml-1" style={{ color: base, opacity: 0.4, letterSpacing: "0.18em" }}>
          labs
        </span>
      )}
    </div>
  );
}

export function TerminalBW() {
  return <TerminalWordmark accent={false} scale="header" />;
}

export function TerminalAccent() {
  return <TerminalWordmark accent={true} scale="header" />;
}
