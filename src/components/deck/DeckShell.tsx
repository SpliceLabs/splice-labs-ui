"use client";

import { useState } from "react";
import type { ReactNode } from "react";

/**
 * Standalone deck chrome — fixed top bar with the deck title, a light/dark
 * toggle, and a link back to the deck index. Mirrors the /deck-e shell so
 * the new scaffolds feel native. Slides are passed as children.
 */
export function DeckShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [lightMode, setLightMode] = useState(false);

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={
        lightMode
          ? {
              backgroundColor: "hsl(210 20% 96%)",
              color: "hsl(210 14% 12%)",
              ["--foreground" as string]: "210 14% 12%",
              ["--background" as string]: "210 20% 96%",
              ["--surface-border" as string]: "210 10% 82%",
              ["--muted-foreground" as string]: "210 10% 40%",
              ["--accent" as string]: "174 100% 30%",
            }
          : {}
      }
    >
      {/* Top nav bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-surface-border transition-colors duration-300"
        style={
          lightMode
            ? { backgroundColor: "hsla(210, 20%, 96%, 0.85)" }
            : { backgroundColor: "hsla(210, 14%, 6%, 0.8)" }
        }
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex items-center justify-between h-12">
          <span className="font-mono text-[10px] text-accent/60 tracking-splice-ultra uppercase">
            {title}
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLightMode((v) => !v)}
              className="font-mono text-[9px] tracking-splice-wide uppercase border border-surface-border px-2 py-0.5 hover:text-foreground transition-colors"
              style={
                lightMode
                  ? { color: "hsl(210 14% 12%)" }
                  : { color: "hsl(210 10% 48%)" }
              }
            >
              {lightMode ? "Dark" : "Light"}
            </button>
            <a
              href="/decks"
              className="font-mono text-[9px] text-muted-foreground/40 tracking-splice-wide uppercase hover:text-foreground transition-colors"
            >
              ← All Decks
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-12" />

      {children}
    </div>
  );
}
