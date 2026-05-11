const FOOTER_LINKS = [
  { label: "Why Splice Labs", href: "#value" },
  { label: "Prototypes", href: "#projects" },
  { label: "HELIOS Platform", href: "/helios" },
  { label: "Security", href: "#security" },
  { label: "Founders", href: "#founders" },
  { label: "Our Commitments", href: "#commitments" },
  { label: "DataRoom", href: "/dataroom" },
  { label: "Brand Guide", href: "/brand" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 bg-background border-t border-surface-border">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-1 font-mono text-sm text-foreground mb-3">
              <span className="text-foreground/30">›</span>
              <span>splice</span>
              <span className="text-accent font-bold">_</span>
              <span className="inline-block w-2 h-4 bg-accent ml-0.5 animate-blink-cursor" />
            </div>
            <p className="font-mono text-[10px] text-muted-foreground tracking-splice-wide uppercase">
              Protocol and Systems Design Foundry
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[11px] text-muted-foreground tracking-splice-wide uppercase hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-surface-border">
          <p className="font-mono text-[10px] text-muted-foreground/50 tracking-splice-wide">
            © 2026 Splice Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
