"use client";

import { useIsActiveSection } from "./useActiveSection";
import type { SectionAlign } from "./sectionLayout";

interface JunctionNodeProps {
  sectionId: string;
  align: SectionAlign;
  /** Use larger node style (like Helios) */
  large?: boolean;
}

/**
 * Junction node that pulses when its section is active.
 * Automatically positions based on section alignment.
 */
export function JunctionNode({ sectionId, align, large = false }: JunctionNodeProps) {
  const isActive = useIsActiveSection(sectionId);
  const isLeft = align === "left";

  const sizeClass = large ? "w-3 h-3" : "w-2 h-2";
  const marginClass = large
    ? isLeft ? "md:-ml-[calc(3rem+6px)]" : "md:-mr-[calc(3rem+6px)]"
    : isLeft ? "md:-ml-[calc(3rem+4px)]" : "md:-mr-[calc(3rem+4px)]";

  const baseClass = large
    ? "border border-ember/60 bg-ember/10"
    : "bg-ember/40";

  return (
    <div
      className={`${sizeClass} ${marginClass} ${baseClass} ${isActive ? "junction-pulse" : ""}`}
    />
  );
}
