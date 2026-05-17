import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { TerminalCaret } from "./ui/TerminalCaret";
import { TerminalButton } from "./ui/TerminalButton";

/** Check if href is an internal route (not a hash anchor) */
function isInternalRoute(href: string | undefined): boolean {
  return !!href && href.startsWith("/") && !href.startsWith("/#");
}

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: DropdownItem[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Why Splice Labs", href: "#value" },
  { label: "Prototypes", href: "#projects" },
  {
    label: "Platform",
    children: [
      { label: "HELIOS Platform", href: "#helios" },
      { label: "Security", href: "#security" },
    ],
  },
  {
    label: "About",
    children: [
      { label: "Founders", href: "#founders" },
      { label: "Our Commitments", href: "#commitments" },
    ],
  },
  { label: "DataRoom", href: "/dataroom" },
];

function Dropdown({ items, open, onClose }: { items: DropdownItem[]; open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={ref} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[180px] bg-popover border border-border backdrop-blur-md py-1 z-50">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          onClick={onClose}
          className="block px-4 py-2 font-mono text-[11px] text-muted-foreground tracking-widest uppercase hover:text-foreground hover:bg-surface-raised transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-surface-border">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1 font-mono text-sm text-foreground">
          <span className="text-foreground/30">›</span>
          <span>splice</span>
          <span className="text-accent font-bold">_</span>
          <TerminalCaret className="ml-0.5" />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className="font-mono text-[11px] text-muted-foreground tracking-widest uppercase hover:text-foreground transition-colors flex items-center gap-1 focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2"
                >
                  {item.label}
                  <svg className={`w-3 h-3 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                    <div className="min-w-[180px] bg-popover border border-border backdrop-blur-md py-1">
                      {item.children!.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2 font-mono text-[11px] text-muted-foreground tracking-widest uppercase hover:text-foreground hover:bg-surface-raised transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : isInternalRoute(item.href) ? (
              <Link
                key={item.label}
                href={item.href!}
                className="font-mono text-[11px] text-muted-foreground tracking-widest uppercase hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="font-mono text-[11px] text-muted-foreground tracking-widest uppercase hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                {item.label}
              </a>
            )
          )}
          <TerminalButton
            href="#contact"
            size="sm"
            data-event="cta_request_demo"
          >
            Request a private demo
          </TerminalButton>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1 p-2"
          aria-label="Menu"
        >
          <span className={`block w-5 h-px bg-foreground transition-transform ${mobileOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
          <span className={`block w-5 h-px bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-foreground transition-transform ${mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-surface-border px-6 py-6 space-y-1">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  className="w-full flex items-center justify-between font-mono text-xs text-muted-foreground tracking-widest uppercase hover:text-foreground py-2"
                >
                  {item.label}
                  <svg className={`w-3 h-3 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === item.label && (
                  <div className="pl-4 space-y-1 border-l border-border ml-2">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        onClick={() => { setMobileOpen(false); setOpenDropdown(null); }}
                        className="block font-mono text-xs text-muted-foreground tracking-widest uppercase hover:text-foreground py-2"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : isInternalRoute(item.href) ? (
              <Link
                key={item.label}
                href={item.href!}
                onClick={() => setMobileOpen(false)}
                className="block font-mono text-xs text-muted-foreground tracking-widest uppercase hover:text-foreground py-2"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block font-mono text-xs text-muted-foreground tracking-widest uppercase hover:text-foreground py-2"
              >
                {item.label}
              </a>
            )
          )}
          <TerminalButton
            href="#contact"
            size="sm"
            onClick={() => setMobileOpen(false)}
            data-event="cta_request_demo_mobile"
            className="mt-4 w-full"
          >
            Request a private demo
          </TerminalButton>
        </div>
      )}
    </nav>
  );
}
