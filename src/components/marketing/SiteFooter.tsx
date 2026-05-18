import { TerminalCaret } from "./ui/TerminalCaret";

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "Thesis", href: "/thesis" },
      { label: "Studio Model", href: "/studio-model" },
      { label: "Incubations", href: "/#projects" },
    ],
  },
  {
    title: "Work With Us",
    links: [
      { label: "Founders", href: "/for-founders" },
      { label: "Investors", href: "/for-investors" },
      { label: "Partners", href: "/for-partners" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "HELIOS", href: "/#helios" },
      { label: "DataRoom", href: "/dataroom" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
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
              <span>spl<span className="font-bold text-base text-ember">I</span>ce</span>
              <span className="text-accent font-bold">_</span>
              <TerminalCaret rate="footer" className="ml-0.5" />
            </div>
            <p className="font-mono text-[10px] text-muted-foreground tracking-splice-wide uppercase">
              AI-Native Venture Studio
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <span className="font-mono text-[9px] text-foreground/40 tracking-splice-ultra uppercase block mb-3">
                  {column.title}
                </span>
                <div className="space-y-2">
                  {column.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="group block font-mono text-[11px] text-muted-foreground tracking-splice-wide uppercase transition-[color,font-weight] hover:text-foreground hover:font-bold focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2"
                    >
                      <span className="relative">
                        {link.label}
                        <span
                          aria-hidden
                          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-ember motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out group-hover:scale-x-100"
                        />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-surface-border">
          <p className="font-mono text-[10px] text-muted-foreground/50 tracking-splice-wide">
            © {new Date().getFullYear()} Splice Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
