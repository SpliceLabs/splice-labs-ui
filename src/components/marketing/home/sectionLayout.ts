/**
 * Section Layout Utility
 *
 * Provides consistent left/right alignment classes for homepage sections.
 * Change alignment in one place (HomePage config) and it maps automatically.
 */

export type SectionAlign = "left" | "right";

interface LayoutClasses {
  /** SwarmSlot className - positions swarm on opposite side of content */
  swarmSlot: string;
  /** Vertical accent line position */
  accentLine: string;
  /** Content container alignment */
  contentWrapper: string;
  /** Header flex direction */
  headerFlex: string;
  /** Junction node margin */
  junctionMargin: string;
}

/**
 * Returns all the classes needed to align a section left or right.
 *
 * @param align - "left" puts content on left, swarm on right
 *              - "right" puts content on right, swarm on left
 */
export function getSectionLayout(align: SectionAlign): LayoutClasses {
  const isLeft = align === "left";

  return {
    swarmSlot: isLeft
      ? "absolute inset-0 md:left-1/3"
      : "absolute inset-0 md:right-1/3",

    accentLine: isLeft
      ? "absolute left-20 top-0 bottom-0 w-px bg-foreground/10"
      : "absolute right-20 top-0 bottom-0 w-px bg-foreground/10",

    contentWrapper: isLeft
      ? "md:w-1/2 md:mr-auto flex justify-center md:justify-start mask-fade-from-left pl-4 md:pl-0"
      : "md:w-1/2 md:ml-auto flex justify-center md:justify-end mask-fade-from-right px-4 md:px-0",

    headerFlex: isLeft
      ? "flex items-center gap-4 mb-6"
      : "flex flex-row-reverse items-center gap-4 mb-6",

    junctionMargin: isLeft
      ? "md:-ml-[calc(3rem+4px)]"
      : "md:-mr-[calc(3rem+4px)]",
  };
}

/**
 * Helper to get accent line position for special elements (like Contact's terminal line)
 */
export function getAccentLinePosition(align: SectionAlign) {
  return align === "left" ? "left-20" : "right-20";
}

/**
 * Helper to get calc position for special elements
 */
export function getCalcPosition(align: SectionAlign) {
  return align === "left" ? "left-[calc(5rem-3px)]" : "right-[calc(5rem-3px)]";
}
