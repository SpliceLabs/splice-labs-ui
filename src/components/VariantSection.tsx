import { ReactNode } from "react";

interface VariantRowProps {
  direction: string;
  directionNumber: string;
  variants: {
    label: string;
    description: string;
    bw: ReactNode;
    accent: ReactNode;
    favicon: ReactNode;
    product: ReactNode;
  }[];
}

export function VariantSection({ direction, directionNumber, variants }: VariantRowProps) {
  return (
    <section className="border-t border-surface-border pt-12 pb-16">
      {/* Direction header */}
      <div className="flex items-baseline gap-4 mb-8">
        <span className="font-mono text-xs text-muted-foreground tracking-splice-wide">{directionNumber}</span>
        <h2 className="font-display text-2xl font-bold tracking-splice-tight text-foreground">{direction}</h2>
        <span className="font-mono text-xs text-muted-foreground tracking-splice-wide uppercase">3 Variants</span>
      </div>

      {/* Three variant columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-surface-border">
        {variants.map((v, i) => (
          <div key={i} className="bg-background p-8 space-y-6">
            {/* Variant label */}
            <div>
              <div className="font-mono text-xs text-accent tracking-splice-wide uppercase mb-1">Variant {String.fromCharCode(65 + i)}</div>
              <div className="font-display text-sm font-semibold text-foreground">{v.label}</div>
              <p className="text-xs text-foreground/60 mt-1 leading-relaxed">{v.description}</p>
            </div>

            {/* B&W header */}
            <div>
              <span className="font-mono text-label-sm text-muted-foreground tracking-splice-wide uppercase block mb-3">Black & White</span>
              <div className="flex items-center min-h-[72px]">
                {v.bw}
              </div>
            </div>

            {/* Accent header */}
            <div>
              <span className="font-mono text-label-sm text-muted-foreground tracking-splice-wide uppercase block mb-3">Accent</span>
              <div className="flex items-center min-h-[72px]">
                {v.accent}
              </div>
            </div>

            {/* Scaling row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface p-4">
                <span className="font-mono text-label-xs text-muted-foreground tracking-splice-wide uppercase block mb-2">Favicon 16×16</span>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 flex items-center justify-center">{v.favicon}</div>
                  <div className="w-6 h-6 bg-surface-raised flex items-center justify-center">
                    <div className="scale-150">{v.favicon}</div>
                  </div>
                </div>
              </div>
              <div className="bg-surface p-4">
                <span className="font-mono text-label-xs text-muted-foreground tracking-splice-wide uppercase block mb-2">Product</span>
                <div className="flex items-center">{v.product}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
