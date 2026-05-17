import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "../index.css";
import { Providers } from "./providers";

// Self-hosted at build time — no runtime Google fetch (perf contract §2.2).
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Splice Labs — Protocol and Systems Design Foundry | Agent-Native AI & DeFi Infrastructure",
    template: "%s — Splice Labs",
  },
  description:
    "Splice Labs designs agent-native AI and DeFi protocols for mid-sized enterprises and public sector innovators. Powered by HELIOS — secure multi-agent orchestration for DeFi. Prototype the Future.",
  authors: [{ name: "Splice Labs" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Splice Labs — Prototype the Future",
    description:
      "The only protocol design foundry creating agent-native AI/DeFi solutions at the intersection of AI and decentralized finance. Built on HELIOS secure orchestration infrastructure.",
    type: "website",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Splice Labs",
      url: SITE_URL,
      description:
        "Protocol and systems design foundry operating at the intersection of AI and decentralized finance.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Splice Labs",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
