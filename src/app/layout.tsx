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
      "Splice Labs — AI-Native Venture Studio for Governed Autonomous Capital",
    template: "%s — Splice Labs",
  },
  description:
    "Splice Labs is an AI-native venture studio building infrastructure for governed autonomous capital and agentic finance. We form, fund, and build companies with founder-first economics.",
  authors: [{ name: "Splice Labs" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Splice Labs — AI-Native Venture Studio",
    description:
      "Building infrastructure for governed autonomous capital. AI agents execute within policy constraints. Humans approve at critical gates. Every action is auditable.",
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
        "AI-native venture studio building infrastructure for governed autonomous capital and agentic finance.",
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
