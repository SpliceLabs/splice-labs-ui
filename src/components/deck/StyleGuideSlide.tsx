import { Slide } from "./SlideComponents";

interface SlideProps {
  slideNumber: number;
  totalSlides: number;
}

const DARK_COLORS = [
  { token: "--background", value: "210 14% 6%", label: "Background" },
  { token: "--foreground", value: "210 20% 92%", label: "Foreground" },
  { token: "--surface", value: "210 12% 9%", label: "Surface" },
  { token: "--surface-raised", value: "210 10% 12%", label: "Surface Raised" },
  { token: "--surface-border", value: "210 10% 16%", label: "Border" },
  { token: "--accent", value: "174 100% 42%", label: "Accent (Teal)" },
  { token: "--muted-foreground", value: "210 10% 48%", label: "Muted Text" },
];

const LIGHT_COLORS = [
  { token: "--background", value: "210 20% 96%", label: "Background" },
  { token: "--foreground", value: "210 14% 12%", label: "Foreground" },
  { token: "--surface-border", value: "210 10% 82%", label: "Border" },
  { token: "--accent", value: "174 100% 30%", label: "Accent (Teal)" },
  { token: "--muted-foreground", value: "210 10% 40%", label: "Muted Text" },
];

function Swatch({ hsl, label, token }: { hsl: string; label: string; token: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 border border-surface-border shrink-0"
        style={{ backgroundColor: `hsl(${hsl})` }}
      />
      <div className="min-w-0">
        <span className="font-mono text-[11px] text-foreground/80 block leading-tight">{label}</span>
        <span className="font-mono text-[9px] text-muted-foreground/50 block leading-tight">{token}</span>
        <span className="font-mono text-[9px] text-muted-foreground/40 block leading-tight">hsl({hsl})</span>
      </div>
    </div>
  );
}

export function StyleGuideSlide({ slideNumber, totalSlides }: SlideProps) {
  return (
    <Slide id="style-guide" module="appendix::style guide" slideNumber={slideNumber} totalSlides={totalSlides}>
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-[9px] text-accent/50 tracking-splice-ultra uppercase border border-accent/20 px-2 py-0.5">
          Design Reference
        </span>
      </div>

      <div className="h-8 w-64 bg-foreground/8 mb-2 flex items-center">
        <span className="font-mono text-[10px] text-accent/60 tracking-splice-wide uppercase">
          Typography & Color System
        </span>
      </div>
      <div className="h-4 w-[60%] max-w-[480px] bg-foreground/5 mb-10 flex items-center">
        <span className="font-mono text-[9px] text-muted-foreground/50">
          Reference sheet for human editors — do not deviate from these tokens.
        </span>
      </div>

      {/* Typography */}
      <div className="border border-surface-border p-6 mb-8">
        <span className="font-mono text-[9px] text-accent/60 tracking-splice-ultra uppercase block mb-5">
          Fonts
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <span className="font-display text-2xl tracking-splice-tight block mb-1">
              Space Grotesk
            </span>
            <span className="font-mono text-[10px] text-muted-foreground/50 block mb-3">
              Display & Body · Weights: 400, 500, 600, 700
            </span>
            <div className="space-y-1">
              <span className="font-display text-sm font-normal block">Regular 400 — The quick brown fox</span>
              <span className="font-display text-sm font-medium block">Medium 500 — The quick brown fox</span>
              <span className="font-display text-sm font-semibold block">Semibold 600 — The quick brown fox</span>
              <span className="font-display text-sm font-bold block">Bold 700 — The quick brown fox</span>
            </div>
          </div>
          <div>
            <span className="font-mono text-2xl tracking-splice-tight block mb-1">
              Space Mono
            </span>
            <span className="font-mono text-[10px] text-muted-foreground/50 block mb-3">
              Code, Labels & Captions · Weights: 400, 700
            </span>
            <div className="space-y-1">
              <span className="font-mono text-sm font-normal block">Regular 400 — The quick brown fox</span>
              <span className="font-mono text-sm font-bold block">Bold 700 — The quick brown fox</span>
            </div>
            <div className="mt-3 border-l-2 border-accent/20 pl-4">
              <span className="font-mono text-[10px] text-muted-foreground/50 block">
                Letter-spacing tokens:
              </span>
              <span className="font-mono text-[10px] text-muted-foreground/40 block">
                splice-tight: -0.04em · splice-wide: 0.18em · splice-ultra: 0.28em
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Dark mode */}
        <div className="border border-surface-border p-6" style={{ backgroundColor: "hsl(210 14% 6%)", color: "hsl(210 20% 92%)" }}>
          <span className="font-mono text-[9px] tracking-splice-ultra uppercase block mb-5" style={{ color: "hsl(174 100% 42% / 0.6)" }}>
            Dark Mode (Default)
          </span>
          <div className="space-y-3">
            {DARK_COLORS.map((c) => (
              <Swatch key={c.token + "-dark"} hsl={c.value} label={c.label} token={c.token} />
            ))}
          </div>
        </div>

        {/* Light mode */}
        <div className="border p-6" style={{ backgroundColor: "hsl(210 20% 96%)", color: "hsl(210 14% 12%)", borderColor: "hsl(210 10% 82%)" }}>
          <span className="font-mono text-[9px] tracking-splice-ultra uppercase block mb-5" style={{ color: "hsl(174 100% 30% / 0.6)" }}>
            Light Mode
          </span>
          <div className="space-y-3">
            {LIGHT_COLORS.map((c) => (
              <Swatch key={c.token + "-light"} hsl={c.value} label={c.label} token={c.token} />
            ))}
          </div>
        </div>
      </div>

      {/* Geometry note */}
      <div className="border-l-2 border-accent/20 pl-6 py-2">
        <span className="font-mono text-[10px] text-muted-foreground/50 block">
          Geometry: Zero-radius (sharp corners) · All border-radius: 0.125rem max · No rounded elements
        </span>
        <span className="font-mono text-[10px] text-muted-foreground/40 block mt-1">
          Accent usage: Single electric teal only — no secondary accent colors permitted
        </span>
      </div>
    </Slide>
  );
}
