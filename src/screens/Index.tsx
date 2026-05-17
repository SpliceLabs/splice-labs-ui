"use client";

import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { HomePage } from "@/components/marketing/home/HomePage";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* Add spacing for fixed header + version bar */}
      
      <HomePage />
      <SiteFooter />
    </div>
  );
};

export default Index;
