import { VariantSection } from "@/components/VariantSection";

// Junction variants
import { JunctionVA_Wordmark, JunctionVA_Icon, JunctionVB_Wordmark, JunctionVB_Icon, JunctionVC_Wordmark, JunctionVC_Icon } from "@/components/logos/JunctionVariants";
// Blueprint variants
import { BlueprintVA_Wordmark, BlueprintVA_Icon, BlueprintVB_Wordmark, BlueprintVB_Icon, BlueprintVC_Wordmark, BlueprintVC_Icon } from "@/components/logos/BlueprintVariants";
// Cross variants
import { CrossVA_Wordmark, CrossVA_Icon, CrossVB_Wordmark, CrossVB_Icon, CrossVC_Wordmark, CrossVC_Icon } from "@/components/logos/CrossVariants";
// Terminal variants
import { TerminalVA_Wordmark, TerminalVB_Wordmark, TerminalVC_Wordmark } from "@/components/logos/TerminalVariants";
// Conduit variants
import { ConduitVA_Wordmark, ConduitVA_Icon, ConduitVB_Wordmark, ConduitVB_Icon, ConduitVC_Wordmark, ConduitVC_Icon } from "@/components/logos/ConduitVariants";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Document header */}
      <header className="border-b border-surface-border">
        <div className="max-w-[1400px] mx-auto px-8 py-8 flex items-start justify-between">
          <div>
            <div className="font-mono text-xs text-muted-foreground tracking-splice-wide uppercase mb-2">Splice Labs — Identity</div>
            <h1 className="font-display text-lg font-semibold text-foreground tracking-splice-tight">
              Variant Comparison — Five Directions × Three Variants
            </h1>
          </div>
          <div className="text-right">
            <div className="font-mono text-xs text-muted-foreground">For clinical evaluation</div>
            <div className="font-mono text-xs text-muted-foreground">Feb 2026 — Pre-decisional</div>
          </div>
        </div>
      </header>

      {/* Brief */}
      <div className="max-w-[1400px] mx-auto px-8 py-10 border-b border-surface-border">
        <p className="text-sm text-foreground/70 leading-relaxed max-w-[700px]">
          Three distinct variants for each of five shortlisted directions. Each variant explores a meaningfully different interpretation of the same conceptual territory. Evaluate across B&W legibility, accent application, favicon clarity, and product-scale presence.
        </p>
      </div>

      <main className="max-w-[1400px] mx-auto px-8">

        {/* ——— JUNCTION ——— */}
        <VariantSection
          direction="JUNCTION"
          directionNumber="02"
          variants={[
            {
              label: "Y-Merge",
              description: "Two angled input rails converge at a circular node, single horizontal output. The classic 'two become one' merge — directional, weighted leftward.",
              bw: <JunctionVA_Wordmark accent={false} scale="header" />,
              accent: <JunctionVA_Wordmark accent={true} scale="header" />,
              favicon: <JunctionVA_Icon accent={false} size={16} />,
              product: <JunctionVA_Wordmark accent={true} scale="product" />,
            },
            {
              label: "T-Split",
              description: "Single vertical input from top drops into a horizontal rail exiting left and right. The node sits at the T-junction. Reads as distribution — one signal, two paths.",
              bw: <JunctionVB_Wordmark accent={false} scale="header" />,
              accent: <JunctionVB_Wordmark accent={true} scale="header" />,
              favicon: <JunctionVB_Icon accent={false} size={16} />,
              product: <JunctionVB_Wordmark accent={true} scale="product" />,
            },
            {
              label: "Trident",
              description: "Three equal-angle rails (120° apart) meeting at center. No hierarchy between arms — pure multi-protocol convergence. Three systems, one junction point.",
              bw: <JunctionVC_Wordmark accent={false} scale="header" />,
              accent: <JunctionVC_Wordmark accent={true} scale="header" />,
              favicon: <JunctionVC_Icon accent={false} size={16} />,
              product: <JunctionVC_Wordmark accent={true} scale="product" />,
            },
          ]}
        />

        {/* ——— BLUEPRINT ——— */}
        <VariantSection
          direction="BLUEPRINT"
          directionNumber="04"
          variants={[
            {
              label: "Fork",
              description: "Horizontal input rail terminates at a ringed node, two angled output arms with terminal dots. Classic schematic fork — one in, two out.",
              bw: <BlueprintVA_Wordmark accent={false} scale="header" />,
              accent: <BlueprintVA_Wordmark accent={true} scale="header" />,
              favicon: <BlueprintVA_Icon accent={false} size={16} />,
              product: <BlueprintVA_Wordmark accent={true} scale="product" />,
            },
            {
              label: "Crosshair",
              description: "Four rails (N/S/E/W) meeting at a ringed node with terminal dots at all endpoints. A schematic crosshair — the junction of four systems.",
              bw: <BlueprintVB_Wordmark accent={false} scale="header" />,
              accent: <BlueprintVB_Wordmark accent={true} scale="header" />,
              favicon: <BlueprintVB_Icon accent={false} size={16} />,
              product: <BlueprintVB_Wordmark accent={true} scale="product" />,
            },
            {
              label: "Cascade",
              description: "Two ringed nodes connected in series. Input → Node₁ → Node₂ → Output. A pipeline diagram — sequential processing, chain logic.",
              bw: <BlueprintVC_Wordmark accent={false} scale="header" />,
              accent: <BlueprintVC_Wordmark accent={true} scale="header" />,
              favicon: <BlueprintVC_Icon accent={false} size={16} />,
              product: <BlueprintVC_Wordmark accent={true} scale="product" />,
            },
          ]}
        />

        {/* ——— CROSS ——— */}
        <VariantSection
          direction="CROSS"
          directionNumber="06"
          variants={[
            {
              label: "Gap Cross",
              description: "Perpendicular rails with hairline gap at center. Upper arm accented and full-weight, lower arm tapered to 50%. The gap is the splice — absence, not presence.",
              bw: <CrossVA_Wordmark accent={false} scale="header" />,
              accent: <CrossVA_Wordmark accent={true} scale="header" />,
              favicon: <CrossVA_Icon accent={false} size={16} />,
              product: <CrossVA_Wordmark accent={true} scale="product" />,
            },
            {
              label: "Offset Cross",
              description: "The two arms don't perfectly align — horizontal shifted up, vertical shifted right. A deliberate near-miss. The splice is the misalignment itself.",
              bw: <CrossVB_Wordmark accent={false} scale="header" />,
              accent: <CrossVB_Wordmark accent={true} scale="header" />,
              favicon: <CrossVB_Icon accent={false} size={16} />,
              product: <CrossVB_Wordmark accent={true} scale="product" />,
            },
            {
              label: "Notched Cross",
              description: "Solid plus-form with a square notch removed from center. Heavy, monumental. The absence at the intersection IS the splice — material removed, not added.",
              bw: <CrossVC_Wordmark accent={false} scale="header" />,
              accent: <CrossVC_Wordmark accent={true} scale="header" />,
              favicon: <CrossVC_Icon accent={false} size={16} />,
              product: <CrossVC_Wordmark accent={true} scale="product" />,
            },
          ]}
        />

        {/* ——— TERMINAL ——— */}
        <VariantSection
          direction="TERMINAL"
          directionNumber="08"
          variants={[
            {
              label: "Prompt + Cursor",
              description: "› splice_ with trailing cursor block. Shell prompt convention. The underscore bridges, the cursor implies a live system. Favicon: solid cursor block.",
              bw: <TerminalVA_Wordmark accent={false} scale="header" />,
              accent: <TerminalVA_Wordmark accent={true} scale="header" />,
              favicon: <TerminalVA_Wordmark accent={false} scale="favicon" />,
              product: <TerminalVA_Wordmark accent={true} scale="product" />,
            },
            {
              label: "Pipe Operator",
              description: "splice|labs — the pipe operator IS the splice. Two system names joined by a single vertical bar. No cursor, no prompt. Pure operator syntax.",
              bw: <TerminalVB_Wordmark accent={false} scale="header" />,
              accent: <TerminalVB_Wordmark accent={true} scale="header" />,
              favicon: <TerminalVB_Wordmark accent={false} scale="favicon" />,
              product: <TerminalVB_Wordmark accent={true} scale="product" />,
            },
            {
              label: "Path Notation",
              description: "/splice/labs — filesystem path. The forward slashes ARE the splice. Reads as a route, an address, a location in a system hierarchy.",
              bw: <TerminalVC_Wordmark accent={false} scale="header" />,
              accent: <TerminalVC_Wordmark accent={true} scale="header" />,
              favicon: <TerminalVC_Wordmark accent={false} scale="favicon" />,
              product: <TerminalVC_Wordmark accent={true} scale="product" />,
            },
          ]}
        />

        {/* ——— CONDUIT ——— */}
        <VariantSection
          direction="CONDUIT"
          directionNumber="09"
          variants={[
            {
              label: "Concentric Rings",
              description: "Two concentric ring pairs (sheath + core) overlapping at center with vertical seam line. End-on cable splice — the full cross-section diagram.",
              bw: <ConduitVA_Wordmark accent={false} scale="header" />,
              accent: <ConduitVA_Wordmark accent={true} scale="header" />,
              favicon: <ConduitVA_Icon accent={false} size={16} />,
              product: <ConduitVA_Wordmark accent={true} scale="product" />,
            },
            {
              label: "Vesica Piscis",
              description: "Two simple circles overlapping to form an almond-shaped vesica. Simpler, bolder, more iconic. The vesica IS the splice zone. Center dot marks the junction.",
              bw: <ConduitVB_Wordmark accent={false} scale="header" />,
              accent: <ConduitVB_Wordmark accent={true} scale="header" />,
              favicon: <ConduitVB_Icon accent={false} size={16} />,
              product: <ConduitVB_Wordmark accent={true} scale="product" />,
            },
            {
              label: "Linear Splice",
              description: "Side view: two parallel horizontal lines converge into one at a merge point. Fiber splice viewed from the side. The merge point is marked with a node.",
              bw: <ConduitVC_Wordmark accent={false} scale="header" />,
              accent: <ConduitVC_Wordmark accent={true} scale="header" />,
              favicon: <ConduitVC_Icon accent={false} size={16} />,
              product: <ConduitVC_Wordmark accent={true} scale="product" />,
            },
          ]}
        />

      </main>

      {/* Footer */}
      <footer className="border-t border-surface-border mt-20">
        <div className="max-w-[1400px] mx-auto px-8 py-8 flex items-center justify-between">
          <div className="font-mono text-xs text-muted-foreground">Splice Labs — Variant Comparison — Pre-decisional</div>
          <div className="font-mono text-xs text-muted-foreground">5 directions × 3 variants. No winner selected.</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
