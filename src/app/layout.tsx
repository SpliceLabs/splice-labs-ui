import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../index.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title:
    "Splice Labs — Protocol and Systems Design Foundry | Agent-Native AI & DeFi Infrastructure",
  description:
    "Splice Labs designs agent-native AI and DeFi protocols for mid-sized enterprises and public sector innovators. Powered by HELIOS — secure multi-agent orchestration for DeFi. Prototype the Future.",
  authors: [{ name: "Splice Labs" }],
  openGraph: {
    title: "Splice Labs — Prototype the Future",
    description:
      "The only protocol design foundry creating agent-native AI/DeFi solutions at the intersection of AI and decentralized finance. Built on HELIOS secure orchestration infrastructure.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
