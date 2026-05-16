// SwarmSlot: invisible DOM anchor that controls where the swarm renders.
//
// The swarm canvas is fixed full-viewport, but the swarm itself (a 3D group)
// is positioned + scaled so its on-screen footprint matches the slot's
// bounding rect. SwarmEngine reads the active section's slot via
// getBoundingClientRect each frame and projects center + size to world
// coords. CSS owns the spatial layout — flex/grid/absolute positioning,
// responsive breakpoints, dev tweaks all live in the className.
//
// Missing slot for a section ⇒ engine falls back to viewport center + scale 1.

import { useEffect, useRef } from "react";
import type { SectionId } from "./swarmRefs";
import { useSwarmContext } from "./swarmRefs";

export function SwarmSlot({
  id,
  className = "",
}: {
  id: SectionId;
  className?: string;
}) {
  const refs = useSwarmContext();
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    refs.slotRefs.current[id] = elRef.current;
    return () => {
      if (refs.slotRefs.current[id] === elRef.current) {
        refs.slotRefs.current[id] = null;
      }
    };
  }, [id, refs]);

  // Two-layer structure — scroll-with-section model (no sticky):
  //   - Outer:   positioned by caller (absolute / inset / breakpoints).
  //              Defines the section column the swarm lives in.
  //   - Inner:   the measured box, absolutely centered within outer.
  //              Aspect-square w/ bounded width so the engine targets a tight,
  //              swarm-friendly rect. The slot rides at the section's vertical
  //              center — as the user scrolls, the rect moves with the section
  //              and the engine's posY follows it (no viewport-pin).
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <div
        ref={elRef}
        data-swarm-slot={id}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-[min(85%,70vh)]"
      />
    </div>
  );
}
