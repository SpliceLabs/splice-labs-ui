"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { ScrollProgress } from "@/components/marketing/ui/ScrollProgress";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle hash scroll after navigation
  useEffect(() => {
    const fullHash = window.location.hash;
    if (!fullHash) return;

    // Extract just the element ID (e.g., "#contact" from "#contact?intent=founder")
    const hash = fullHash.split("?")[0];

    // Longer delay to ensure page content is rendered
    setTimeout(() => {
      const el = document.getElementById(hash.slice(1)); // Remove # prefix
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  }, [pathname, searchParams]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <SiteNav />
      {children}
      <SiteFooter />
    </div>
  );
}
