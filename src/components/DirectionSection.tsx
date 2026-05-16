import { ReactNode } from "react";

interface DirectionSectionProps {
  number: string;
  codename: string;
  intent: string;
  rationale: string[];
  characteristics: string[];
  bwVersion: ReactNode;
  accentVersion: ReactNode;
  faviconVersion: ReactNode;
  productVersion: ReactNode;
  accentColorName: string;
  accentColorHex: string;
  accentColorDesc: string;
  typographyDisplay: string;
  typographyBody: string;
  typographyMono: string;
  radiusPhilosophy: string;
  strokeLogic: string;
  scalingBehavior: string[];
  geometryNotes: string;
}

export function DirectionSection({
  number,
  codename,
  intent,
  rationale,
  characteristics,
  bwVersion,
  accentVersion,
  faviconVersion,
  productVersion,
  accentColorName,
  accentColorHex,
  accentColorDesc,
  typographyDisplay,
  typographyBody,
  typographyMono,
  radiusPhilosophy,
  strokeLogic,
  scalingBehavior,
  geometryNotes,
}: DirectionSectionProps) {
  return (
    <section className="border-t border-surface-border pt-16 pb-20">
      {/* Direction header */}
      <div className="grid grid-cols-12 gap-6 mb-12">
        <div className="col-span-12 md:col-span-1">
          <span className="font-mono text-muted-foreground text-xs tracking-splice-wide">{number}</span>
        </div>
        <div className="col-span-12 md:col-span-11">
          <div className="flex items-baseline gap-4 mb-2">
            <h2 className="font-display text-3xl font-bold tracking-splice-tight text-foreground">{codename}</h2>
            <span className="font-mono text-xs text-muted-foreground tracking-splice-wide uppercase">{intent}</span>
          </div>
        </div>
      </div>

      {/* Logo displays */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-surface-border mb-px">
        {/* B&W */}
        <div className="bg-background p-10 flex flex-col gap-4">
          <span className="font-mono text-xs text-muted-foreground tracking-splice-wide uppercase">Black & White</span>
          <div className="flex items-center min-h-[80px]">
            {bwVersion}
          </div>
        </div>
        {/* Accent */}
        <div className="bg-background p-10 flex flex-col gap-4">
          <span className="font-mono text-xs text-muted-foreground tracking-splice-wide uppercase">Accent Version</span>
          <div className="flex items-center min-h-[80px]">
            {accentVersion}
          </div>
        </div>
      </div>

      {/* Scaling row */}
      <div className="grid grid-cols-3 gap-px bg-surface-border mb-12">
        {/* Favicon */}
        <div className="bg-surface p-8 flex flex-col gap-4">
          <span className="font-mono text-xs text-muted-foreground tracking-splice-wide uppercase">Favicon 16×16</span>
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 flex items-center justify-center">
              {faviconVersion}
            </div>
            <div className="w-6 h-6 bg-surface-raised flex items-center justify-center">
              <div className="scale-150">{faviconVersion}</div>
            </div>
          </div>
        </div>
        {/* Product */}
        <div className="bg-surface p-8 flex flex-col gap-4">
          <span className="font-mono text-xs text-muted-foreground tracking-splice-wide uppercase">Product / App</span>
          <div className="flex items-center">
            {productVersion}
          </div>
        </div>
        {/* App mark */}
        <div className="bg-surface p-8 flex flex-col gap-4">
          <span className="font-mono text-xs text-muted-foreground tracking-splice-wide uppercase">Dark Surface</span>
          <div className="flex items-center bg-[#080c10] rounded p-3 -m-1">
            {productVersion}
          </div>
        </div>
      </div>

      {/* Rationale + specs */}
      <div className="grid grid-cols-12 gap-6">
        {/* Rationale */}
        <div className="col-span-12 md:col-span-5 space-y-6">
          <div>
            <h3 className="font-mono text-xs text-muted-foreground tracking-splice-wide uppercase mb-3">Rationale</h3>
            <div className="space-y-3">
              {rationale.map((p, i) => (
                <p key={i} className="text-sm text-foreground/80 leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-mono text-xs text-muted-foreground tracking-splice-wide uppercase mb-3">Geometry</h3>
            <p className="text-sm text-foreground/70 leading-relaxed font-mono">{geometryNotes}</p>
          </div>
          <div>
            <h3 className="font-mono text-xs text-muted-foreground tracking-splice-wide uppercase mb-3">Characteristics</h3>
            <ul className="space-y-1.5">
              {characteristics.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                  <span className="text-accent mt-0.5 shrink-0">—</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Micro-style + scaling */}
        <div className="col-span-12 md:col-span-4 md:col-start-7 space-y-6">
          {/* Micro-style preview */}
          <div className="border border-surface-border p-6 space-y-5">
            <h3 className="font-mono text-xs text-muted-foreground tracking-splice-wide uppercase">Micro-Style Preview</h3>
            
            {/* Accent swatch */}
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 shrink-0" 
                style={{ backgroundColor: accentColorHex }}
              />
              <div>
                <div className="font-mono text-xs text-foreground">{accentColorName}</div>
                <div className="font-mono text-xs text-muted-foreground">{accentColorHex}</div>
              </div>
              <div className="ml-auto text-xs text-muted-foreground max-w-[120px] text-right leading-tight">{accentColorDesc}</div>
            </div>

            {/* Typography */}
            <div className="space-y-2 pt-2 border-t border-surface-border">
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-xs text-muted-foreground">Display</span>
                <span className="text-xs text-foreground">{typographyDisplay}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-xs text-muted-foreground">Body</span>
                <span className="text-xs text-foreground">{typographyBody}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-xs text-muted-foreground">Mono</span>
                <span className="text-xs text-foreground">{typographyMono}</span>
              </div>
            </div>

            {/* Radius + stroke */}
            <div className="space-y-2 pt-2 border-t border-surface-border">
              <div>
                <span className="font-mono text-xs text-muted-foreground block mb-1">Radius</span>
                <span className="text-xs text-foreground/80">{radiusPhilosophy}</span>
              </div>
              {strokeLogic && (
                <div>
                  <span className="font-mono text-xs text-muted-foreground block mb-1">Stroke</span>
                  <span className="text-xs text-foreground/80">{strokeLogic}</span>
                </div>
              )}
            </div>
          </div>

          {/* Scaling behavior */}
          <div className="border border-surface-border p-6 space-y-3">
            <h3 className="font-mono text-xs text-muted-foreground tracking-splice-wide uppercase">Scaling Behavior</h3>
            {scalingBehavior.map((s, i) => (
              <div key={i} className="flex gap-2 text-sm">
                <span className="text-accent shrink-0">—</span>
                <span className="text-foreground/70">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
