"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Tip {
  tag: string;
  tip: string;
}

/**
 * Fallback tips — used while loading or if API fails.
 * Variety across tech, health, habits, and pop culture wisdom.
 */
const FALLBACK_TIPS: Tip[] = [
  // Tech
  { tag: "ai_native", tip: "AI-native apps treat models as first-class compute, not bolt-on features." },
  { tag: "context", tip: "Context is the new RAM — the more you can pass, the smarter the system." },
  { tag: "agents", tip: "Agents = LLMs + tools + loops. Autonomy emerges from iteration." },
  // Health
  { tag: "omega3", tip: "Your brain is 60% fat. Feed it the right fats — wild salmon, sardines, walnuts." },
  { tag: "turmeric", tip: "Curcumin + black pepper + fat = bioavailability. Science validates tradition." },
  { tag: "sleep", tip: "8 hours isn't a luxury. It's when your glymphatic system clears brain waste." },
  // Habits
  { tag: "walk", tip: "A 20-minute walk beats an hour of scrolling. Your best ideas come mid-stride." },
  { tag: "habits", tip: "Motivation fades. Habits compound. Build the rails, then ride them." },
  { tag: "compound", tip: "Small daily improvements compound. 1% better daily = 37x better yearly." },
  // Star Wars
  { tag: "star_wars", tip: "Do or do not. There is no try. — Commitment precedes capability." },
  { tag: "star_wars", tip: "Your focus determines your reality. Choose where you point attention." },
  // Disney & Pixar
  { tag: "pixar", tip: "Adventure is out there. But first, you have to open the door." },
  { tag: "disney", tip: "The past can hurt. But you can either run from it or learn from it." },
  { tag: "pixar", tip: "Anyone can cook. Talent can come from anywhere. Stay open." },
  // Tolkien & Marvel
  { tag: "tolkien", tip: "All we have to decide is what to do with the time given us." },
  { tag: "marvel", tip: "With great power comes great responsibility. Scale demands ethics." },
];

export interface TipsTickerProps {
  /** Interval between tips in ms. Default 8000 (8s). */
  interval?: number;
  className?: string;
}

/**
 * Subtle rotating tips ticker — the silence between the notes.
 * Fetches AI-generated tips from /api/tips, falls back to static tips.
 */
export function TipsTicker({ interval = 8000, className }: TipsTickerProps) {
  const [tips, setTips] = useState<Tip[]>(FALLBACK_TIPS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Fetch tips from API on mount
  useEffect(() => {
    async function fetchTips() {
      try {
        const res = await fetch("/api/tips");
        if (!res.ok) throw new Error("Failed to fetch tips");
        const data = await res.json();
        if (data.tips?.length > 0) {
          setTips(data.tips);
        }
      } catch {
        // Keep using fallback tips
      }
    }
    fetchTips();
  }, []);

  // Rotate through tips
  useEffect(() => {
    const timer = setInterval(() => {
      // Fade out
      setIsVisible(false);

      // After fade out, change tip and fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % tips.length);
        setIsVisible(true);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, tips.length]);

  const current = tips[currentIndex];

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-2.5",
        "rounded-full border border-ember/60",
        "bg-surface/40 backdrop-blur-sm",
        "transition-all duration-300",
        "hover:border-ember hover:bg-surface/60",
        className
      )}
    >
      {/* Pulsing dot */}
      <span
        aria-hidden
        className="size-2 shrink-0 rounded-full bg-ember animate-pulse"
      />

      {/* Tag */}
      <span className="shrink-0 font-mono text-[10px] uppercase tracking-splice-wide text-ember">
        {current.tag}
      </span>

      {/* Separator */}
      <span
        aria-hidden
        className="h-3 w-px bg-ember/40"
      />

      {/* Tip text with crossfade */}
      <span
        className={cn(
          "font-mono text-[11px] text-foreground/80 leading-relaxed",
          "transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {current.tip}
      </span>
    </div>
  );
}
