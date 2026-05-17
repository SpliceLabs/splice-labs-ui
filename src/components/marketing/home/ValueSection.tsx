import { SwarmSlot } from "./swarm/SwarmSlot";
import { SectionHeading } from "../ui/SectionHeading";
import { ModuleLabel } from "../ui/ModuleLabel";
import { cn } from "@/lib/utils";

const VALUES = [
  { title: "Real Systems, Fast", body: "We ship working prototypes. Not slide decks." },
  { title: "Agent-Native Architecture", body: "Agents execute. Humans approve. Policies are explicit." },
  { title: "Cross-Chain Infrastructure", body: "Ethereum + L2s. Solana. Stacks. Designed for interoperability." },
  { title: "Enterprise-Grade Without Enterprise Overhead", body: "Advanced systems design without Fortune-500 friction." },
  { title: "Trust nothing. Audit everything.", body: "Security isn't a feature. It's the architecture. Zero trust, by default." },
];

export function ValueSection() {
  return (
    <section id="value" className="border-t border-surface-border relative">
      {/* Swarm slot: left half on md+; full width on mobile. */}
      <SwarmSlot id="value" className="absolute inset-0 md:right-1/3" />
      {/* Mirrored splice line — right gutter */}
      <div className="absolute right-6 md:right-8 top-0 bottom-0 w-px bg-surface-border" />

      <div className="container-wide py-20 md:py-28">
        <div className="md:w-1/2 md:ml-auto flex justify-center md:justify-end mask-fade-from-right">
         <div className="w-full max-w-[600px]">
          <ModuleLabel variant="eyebrow" spine="right" name="value" className="mb-10" />

          <SectionHeading className="mb-12">
            Why Splice Labs
          </SectionHeading>

          {/* Asymmetric staggered grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {VALUES.map((v, i) => (
              <div
                key={i}
                className={cn(
                  "group relative border-l-2 border-accent/20 pl-6 py-2 card-lift",
                  i % 2 === 1 && "md:mt-8",
                )}
              >
                <span
                  aria-hidden
                  className="absolute right-0 top-2 font-mono text-eyebrow tracking-splice-wide text-muted-foreground/40 transition-colors duration-200 group-hover:text-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-base font-semibold text-foreground mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed transition-colors duration-200 group-hover:text-foreground/80">
                  {v.body}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-10">
            <span className="w-12 h-px bg-accent/15" />
            <span className="text-code text-foreground/60 italic">
              If it needs to be real, not theoretical, we can help.
            </span>
          </div>
         </div>
        </div>
      </div>
    </section>
  );
}
