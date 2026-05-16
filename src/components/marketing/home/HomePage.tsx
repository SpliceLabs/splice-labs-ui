import { HeroSection } from "./HeroSection";
import { ValueSection } from "./ValueSection";
import { CommitmentsSection } from "./CommitmentsSection";
import { ProjectsSection } from "./ProjectsSection";
import { HeliosSection } from "./HeliosSection";
import { AgentsSection } from "./AgentsSection";
import { SecuritySection } from "./SecuritySection";
import { FoundersSection } from "./FoundersSection";
import { ContactSection } from "./ContactSection";
import { SwarmCanvas } from "./swarm/SwarmCanvas";
import { SectionRegimeController } from "./swarm/SectionRegimeController";
import { SwarmDevPanel } from "./swarm/SwarmDevPanel";
import { SwarmRefsProvider, useSwarmRefs } from "./swarm/swarmRefs";
import { ScrollProgress } from "../ui/ScrollProgress";

export function HomePage() {
  // Single source of refs for the swarm system. Canvas + controller share
  // the same refs object — engine reads scroll/section state, controller
  // writes it from DOM events. See swarmRefs.ts for the contract.
  // SwarmRefsProvider also exposes the same refs object to deeply-nested
  // <SwarmSlot> components so they can register their DOM anchors.
  const swarmRefs = useSwarmRefs();

  return (
    <SwarmRefsProvider value={swarmRefs}>
      <ScrollProgress />
      <SwarmCanvas refs={swarmRefs} />
      <SectionRegimeController refs={swarmRefs}>
        {/* Sections render above canvas (z-10). Wrapper is pointer-events-none
            so pointermove falls through to the canvas (drives the cursor-ray
            flock perturbation in SwarmV7). Interactive elements opt back in
            via the [&_*] descendants so links/buttons/inputs stay clickable. */}
        <div className="relative z-10 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto [&_textarea]:pointer-events-auto [&_select]:pointer-events-auto [&_label]:pointer-events-auto">
          <HeroSection />
          <ValueSection />
          <CommitmentsSection />
          <ProjectsSection />
          <HeliosSection />
          <AgentsSection />
          <SecuritySection />
          <FoundersSection />
          <ContactSection />
        </div>
      </SectionRegimeController>
      <SwarmDevPanel refs={swarmRefs} />
    </SwarmRefsProvider>
  );
}
