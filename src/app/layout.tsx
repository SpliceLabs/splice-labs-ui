import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans, Instrument_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpliceLabs - Trust verified instantly",
  description: "Providing the universal layer for instant and secure verification across all your digital interactions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexSans.variable} ${instrumentSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
