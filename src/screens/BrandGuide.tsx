"use client";

import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { TerminalWordmark } from "@/components/logos/TerminalLogo";
import { ConduitWordmark } from "@/components/logos/ConduitLogo";
import { AxisWordmark } from "@/components/logos/AxisLogo";
import { useState } from "react";

/* ── Color Tokens ── */
const COLOR_SYSTEM = {
  core: [
    { name: "Background", token: "--background", hsl: "210 14% 6%", hex: "#0E1114", usage: "Page & app background" },
    { name: "Foreground", token: "--foreground", hsl: "210 10% 82%", hex: "#CBCED4", usage: "Primary text" },
    { name: "Accent", token: "--accent", hsl: "174 100% 42%", hex: "#00D6A4", usage: "Primary accent, links, CTAs" },
    { name: "Accent Foreground", token: "--accent-foreground", hsl: "210 14% 6%", hex: "#0E1114", usage: "Text on accent backgrounds" },
  ],
  surfaces: [
    { name: "Surface", token: "--surface", hsl: "210 12% 9%", hex: "#141719", usage: "Cards, panels" },
    { name: "Surface Raised", token: "--surface-raised", hsl: "210 10% 12%", hex: "#1B1E22", usage: "Elevated cards, hovers" },
    { name: "Surface Border", token: "--surface-border", hsl: "210 10% 16%", hex: "#252830", usage: "Dividers, card borders" },
  ],
  semantic: [
    { name: "Primary", token: "--primary", hsl: "174 100% 42%", hex: "#00D6A4", usage: "Buttons, active states" },
    { name: "Secondary", token: "--secondary", hsl: "210 10% 14%", hex: "#202328", usage: "Secondary buttons, tags" },
    { name: "Muted", token: "--muted", hsl: "210 10% 14%", hex: "#202328", usage: "Disabled states, subtle bg" },
    { name: "Muted Foreground", token: "--muted-foreground", hsl: "210 15% 73%", hex: "#ABB1BF", usage: "Secondary text, captions" },
    { name: "Destructive", token: "--destructive", hsl: "0 72% 51%", hex: "#E03E3E", usage: "Errors, destructive actions" },
    { name: "Border", token: "--border", hsl: "210 10% 18%", hex: "#2A2D33", usage: "Input borders, dividers" },
    { name: "Ring", token: "--ring", hsl: "174 100% 42%", hex: "#00D6A4", usage: "Focus rings" },
  ],
  extended: [
    { name: "Amber", token: "--amber", hsl: "42 100% 50%", hex: "#FFB800", usage: "Warnings, highlights, premium tier" },
    { name: "Amber Foreground", token: "--amber-foreground", hsl: "42 100% 10%", hex: "#332500", usage: "Text on amber backgrounds" },
    { name: "Gold", token: "--gold", hsl: "36 80% 56%", hex: "#D4A234", usage: "Premium features, achievements, badges" },
    { name: "Gold Foreground", token: "--gold-foreground", hsl: "36 80% 8%", hex: "#241A05", usage: "Text on gold backgrounds" },
    { name: "Rust", token: "--rust", hsl: "16 72% 48%", hex: "#D45A28", usage: "Urgent states, hot data, emphasis" },
    { name: "Rust Foreground", token: "--rust-foreground", hsl: "16 10% 95%", hex: "#F4F2F1", usage: "Text on rust backgrounds" },
  ],
};

const TYPOGRAPHY = [
  { role: "Display", family: "Space Grotesk", weight: "700", size: "42–72px", tracking: "-0.04em", sample: "Splice Labs" },
  { role: "Heading", family: "Space Grotesk", weight: "600–700", size: "24–36px", tracking: "-0.04em", sample: "Protocol Infrastructure" },
  { role: "Body", family: "Space Grotesk", weight: "400–500", size: "16–18px", tracking: "normal", sample: "We design agent-native protocol infrastructure for decentralized finance." },
  { role: "Label / Mono", family: "Space Mono", weight: "400–700", size: "10–14px", tracking: "0.18em", sample: "PROTOCOL DESIGN FOUNDRY" },
  { role: "Caption", family: "Space Mono", weight: "400", size: "10–12px", tracking: "0.18em", sample: "v2.1.0 — 2026-03-19" },
];

const LOGO_SIZES = [
  { label: "Header (420×72)", w: 420, h: 72, scale: "header" as const },
  { label: "Product (140×32)", w: 140, h: 32, scale: "product" as const },
  { label: "Favicon (16×16)", w: 16, h: 16, scale: "favicon" as const },
];

const SLACK_SIZES = [
  { label: "Workspace Icon (512×512)", size: 512 },
  { label: "Bot Avatar (256×256)", size: 256 },
  { label: "Emoji (128×128)", size: 128 },
];

function ColorSwatch({ color }: { color: { name: string; token: string; hsl: string; hex: string; usage: string } }) {
  const [copied, setCopied] = useState(false);
  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="group">
      <button
        onClick={() => copy(color.hex)}
        className="w-full h-20 border border-surface-border transition-all hover:scale-105 hover:border-accent/40"
        style={{ backgroundColor: color.hex }}
        title={`Click to copy ${color.hex}`}
      />
      <div className="mt-2 space-y-0.5">
        <p className="font-mono text-sm text-foreground font-medium">{color.name}</p>
        <p className="font-mono text-label-sm text-muted-foreground tracking-splice-wide">
          {copied ? "COPIED!" : color.hex}
        </p>
        <p className="font-mono text-label-sm text-muted-foreground/60 tracking-splice-wide">
          {color.token}
        </p>
        <p className="text-label text-muted-foreground/50">{color.usage}</p>
      </div>
    </div>
  );
}

function downloadSVG(svgElement: SVGElement | null, filename: string) {
  if (!svgElement) return;
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadPNG(svgElement: SVGElement | null, filename: string, width: number, height: number, scale = 2) {
  if (!svgElement) return;
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);
  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };
  img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)));
}

function SlackIcon({ size }: { size: number }) {
  // Renders the terminal logo mark sized for Slack
  const acc = "#00D4B4";
  const base = "#E8EAF0";
  const bg = "#0E1114";
  const padding = size * 0.15;
  const inner = size - padding * 2;
  const charW = inner * 0.55;
  const charH = inner * 0.6;
  const cursorW = inner * 0.12;
  const cursorH = inner * 0.45;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width={size} height={size} fill={bg} />
      {/* Prompt chevron */}
      <text
        x={padding}
        y={size * 0.62}
        className="font-mono"
        fontSize={inner * 0.5}
        fontWeight="400"
        fill={base}
        opacity="0.3"
      >›</text>
      {/* S letterform */}
      <text
        x={padding + inner * 0.18}
        y={size * 0.62}
        className="font-mono"
        fontSize={inner * 0.5}
        fontWeight="400"
        fill={base}
      >S</text>
      {/* Underscore */}
      <text
        x={padding + inner * 0.52}
        y={size * 0.62}
        className="font-mono"
        fontSize={inner * 0.5}
        fontWeight="700"
        fill={acc}
      >_</text>
      {/* Block cursor */}
      <rect
        x={padding + inner * 0.78}
        y={size * 0.28}
        width={cursorW}
        height={cursorH}
        fill={acc}
      />
    </svg>
  );
}

function DownloadableSlackIcon({ size, label }: { size: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="border border-surface-border p-2" id={`slack-${size}`}>
        <SlackIcon size={Math.min(size, 128)} />
      </div>
      <p className="font-mono text-label-sm text-muted-foreground tracking-splice-wide uppercase text-center">{label}</p>
      <button
        onClick={() => {
          const el = document.querySelector(`#slack-${size} svg`) as SVGElement;
          downloadPNG(el, `splice-labs-slack-${size}x${size}.png`, Math.min(size, 128), Math.min(size, 128), size / Math.min(size, 128));
        }}
        className="font-mono text-label-sm tracking-splice-wide uppercase text-accent hover:text-foreground transition-colors border border-accent/30 px-3 py-1 hover:border-accent"
      >
        Download PNG
      </button>
    </div>
  );
}

function LogoDownloadRow({
  label,
  children,
  id,
  w,
  h,
}: {
  label: string;
  children: React.ReactNode;
  id: string;
  w: number;
  h: number;
}) {
  return (
    <div className="border border-surface-border p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-label-sm text-muted-foreground tracking-splice-wide uppercase">{label}</span>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const svg = document.querySelector(`#${id} svg`) as SVGElement;
              downloadSVG(svg, `splice-labs-${id}.svg`);
            }}
            className="font-mono text-label-sm tracking-splice-wide uppercase text-accent hover:text-foreground transition-colors border border-accent/30 px-3 py-1 hover:border-accent"
          >
            SVG
          </button>
          <button
            onClick={() => {
              const svg = document.querySelector(`#${id} svg`) as SVGElement;
              downloadPNG(svg, `splice-labs-${id}@2x.png`, w, h, 2);
            }}
            className="font-mono text-label-sm tracking-splice-wide uppercase text-accent hover:text-foreground transition-colors border border-accent/30 px-3 py-1 hover:border-accent"
          >
            PNG @2×
          </button>
          <button
            onClick={() => {
              const svg = document.querySelector(`#${id} svg`) as SVGElement;
              downloadPNG(svg, `splice-labs-${id}@3x.png`, w, h, 3);
            }}
            className="font-mono text-label-sm tracking-splice-wide uppercase text-accent hover:text-foreground transition-colors border border-accent/30 px-3 py-1 hover:border-accent"
          >
            PNG @3×
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center min-h-[80px] bg-background p-4" id={id}>
        {children}
      </div>
    </div>
  );
}

export default function BrandGuide() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <div className="h-14" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* Header */}
        <header className="mb-20">
          <p className="font-mono text-label-sm text-accent tracking-splice-ultra uppercase mb-4">Brand Guidelines</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-splice-tight text-foreground mb-4">
            Splice Labs
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Complete identity system — logos, marks, color tokens, and typography. 
            All assets are available for download in SVG and PNG formats.
          </p>
        </header>

        {/* ─── SECTION 1: PRIMARY LOGO ─── */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-label-sm text-accent tracking-splice-ultra uppercase">01</span>
            <h2 className="font-display text-2xl font-bold tracking-splice-tight text-foreground">Primary Wordmark</h2>
          </div>
          <p className="text-base text-muted-foreground mb-8 max-w-xl">
            The Terminal wordmark is the primary identity. The command-line motif — prompt, underscore, block cursor — 
            encodes the brand's technical DNA. Always use on dark backgrounds.
          </p>

          <div className="space-y-4">
            <LogoDownloadRow label="Header — Accent" id="terminal-header-accent" w={420} h={72}>
              <TerminalWordmark accent scale="header" />
            </LogoDownloadRow>
            <LogoDownloadRow label="Header — Mono" id="terminal-header-mono" w={420} h={72}>
              <TerminalWordmark scale="header" />
            </LogoDownloadRow>
            <LogoDownloadRow label="Product — Accent" id="terminal-product-accent" w={140} h={32}>
              <TerminalWordmark accent scale="product" />
            </LogoDownloadRow>
            <LogoDownloadRow label="Product — Mono" id="terminal-product-mono" w={140} h={32}>
              <TerminalWordmark scale="product" />
            </LogoDownloadRow>
          </div>

          {/* Clear space & minimum size rules */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-surface-border p-6">
              <h3 className="font-mono text-label-sm text-muted-foreground tracking-splice-wide uppercase mb-3">Clear Space</h3>
              <p className="text-sm text-muted-foreground">
                Maintain a minimum clear space equal to the height of the block cursor on all sides of the wordmark. 
                No other elements should encroach on this boundary.
              </p>
            </div>
            <div className="border border-surface-border p-6">
              <h3 className="font-mono text-label-sm text-muted-foreground tracking-splice-wide uppercase mb-3">Minimum Size</h3>
              <p className="text-sm text-muted-foreground">
                The wordmark should not be rendered smaller than 120px wide for digital or 1.2" for print. 
                Below this, use the favicon mark only.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: FAVICON & SLACK MARKS ─── */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-label-sm text-accent tracking-splice-ultra uppercase">02</span>
            <h2 className="font-display text-2xl font-bold tracking-splice-tight text-foreground">App Icons & Slack</h2>
          </div>
          <p className="text-base text-muted-foreground mb-8 max-w-xl">
            Optimized marks for small-format use: favicons, Slack workspace icons, bot avatars, and custom emoji. 
            All rendered on the brand background (#0E1114) with proper padding.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {SLACK_SIZES.map(({ label, size }) => (
              <DownloadableSlackIcon key={size} size={size} label={label} />
            ))}
          </div>

          <div className="mt-8">
            <LogoDownloadRow label="Favicon (16×16)" id="terminal-favicon" w={16} h={16}>
              <div className="scale-[3] origin-center">
                <TerminalWordmark accent scale="favicon" />
              </div>
            </LogoDownloadRow>
          </div>
        </section>

        {/* ─── SECTION 3: COLOR SYSTEM ─── */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-label-sm text-accent tracking-splice-ultra uppercase">03</span>
            <h2 className="font-display text-2xl font-bold tracking-splice-tight text-foreground">Color System</h2>
          </div>
          <p className="text-base text-muted-foreground mb-4 max-w-xl">
            Dark-first graphite palette with a single electric teal accent. All colors are defined as HSL 
            values and mapped to CSS custom properties. Click any swatch to copy the hex value.
          </p>

          {/* Core */}
          <h3 className="font-mono text-label-sm text-muted-foreground tracking-splice-wide uppercase mb-4 mt-10">Core Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {COLOR_SYSTEM.core.map((c) => <ColorSwatch key={c.token} color={c} />)}
          </div>

          {/* Surfaces */}
          <h3 className="font-mono text-label-sm text-muted-foreground tracking-splice-wide uppercase mb-4">Surface Layers</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {COLOR_SYSTEM.surfaces.map((c) => <ColorSwatch key={c.token} color={c} />)}
          </div>

          {/* Semantic */}
          <h3 className="font-mono text-label-sm text-muted-foreground tracking-splice-wide uppercase mb-4">Semantic Tokens</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {COLOR_SYSTEM.semantic.map((c) => <ColorSwatch key={c.token + c.name} color={c} />)}
          </div>

          {/* Extended */}
          <h3 className="font-mono text-label-sm text-muted-foreground tracking-splice-wide uppercase mb-4">Extended Palette — Warm Accents</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-xl">
            Secondary accent tones for warnings, premium tiers, urgency, and data visualization. 
            Use sparingly alongside the primary teal — never as a replacement.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {COLOR_SYSTEM.extended.map((c) => <ColorSwatch key={c.token + c.name} color={c} />)}
          </div>

          {/* Usage rules */}
          <div className="mt-10 border border-surface-border p-6">
            <h3 className="font-mono text-label-sm text-muted-foreground tracking-splice-wide uppercase mb-3">Usage Rules</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• All colors must be referenced via CSS custom properties — never hardcode hex values in components.</li>
              <li>• The accent color (#00D6A4) is used sparingly: CTAs, active states, focus rings, and key data points.</li>
              <li>• Warm accents (amber, gold, rust) are secondary — use for warnings, premium tiers, and data emphasis only.</li>
              <li>• Never pair warm accents with each other. Always anchor compositions with the primary teal.</li>
              <li>• Text on accent backgrounds must use the matching <code className="font-mono text-label text-foreground">--*-foreground</code> token for WCAG AA compliance.</li>
              <li>• Surface layers create depth hierarchy. Use <code className="font-mono text-label text-foreground">surface → surface-raised</code> for card elevation.</li>
              <li>• Contrast ratio: all text must meet WCAG AA (4.5:1 for normal text, 3:1 for large text).</li>
            </ul>
          </div>
        </section>

        {/* ─── SECTION 4: TYPOGRAPHY ─── */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-label-sm text-accent tracking-splice-ultra uppercase">04</span>
            <h2 className="font-display text-2xl font-bold tracking-splice-tight text-foreground">Typography</h2>
          </div>
          <p className="text-base text-muted-foreground mb-8 max-w-xl">
            Two typefaces form the complete system: Space Grotesk for display and body, Space Mono for 
            labels, code, and technical metadata. Both are open-source and self-hosted.
          </p>

          <div className="space-y-0">
            {TYPOGRAPHY.map((t, i) => (
              <div key={t.role} className="border border-surface-border p-6 -mt-px first:mt-0">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="shrink-0 md:w-48">
                    <p className="font-mono text-label-sm text-accent tracking-splice-wide uppercase">{t.role}</p>
                    <p className="font-mono text-label-sm text-muted-foreground/60 tracking-splice-wide mt-1">{t.family}</p>
                    <p className="font-mono text-label-sm text-muted-foreground/40 tracking-splice-wide">{t.weight} · {t.size}</p>
                    <p className="font-mono text-label-sm text-muted-foreground/40 tracking-splice-wide">Tracking: {t.tracking}</p>
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-foreground ${
                        t.role === "Display" ? "font-display text-4xl font-bold tracking-splice-tight" :
                        t.role === "Heading" ? "font-display text-2xl font-semibold tracking-splice-tight" :
                        t.role === "Body" ? "font-body text-base" :
                        t.role === "Label / Mono" ? "font-mono text-sm tracking-splice-wide uppercase" :
                        "font-mono text-label tracking-splice-wide uppercase text-muted-foreground"
                      }`}
                    >
                      {t.sample}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tracking tokens */}
          <div className="mt-8 border border-surface-border p-6">
            <h3 className="font-mono text-label-sm text-muted-foreground tracking-splice-wide uppercase mb-4">Custom Tracking Tokens</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="font-mono text-label text-foreground mb-1">splice-tight</p>
                <p className="font-mono text-label-sm text-muted-foreground/60">-0.04em</p>
                <p className="font-display text-xl font-bold tracking-splice-tight text-foreground mt-2">Splice Labs</p>
              </div>
              <div>
                <p className="font-mono text-label text-foreground mb-1">splice-wide</p>
                <p className="font-mono text-label-sm text-muted-foreground/60">0.18em</p>
                <p className="font-mono text-sm tracking-splice-wide uppercase text-foreground mt-2">Protocol</p>
              </div>
              <div>
                <p className="font-mono text-label text-foreground mb-1">splice-ultra</p>
                <p className="font-mono text-label-sm text-muted-foreground/60">0.28em</p>
                <p className="font-mono text-label-sm tracking-splice-ultra uppercase text-foreground mt-2">Section Label</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: GEOMETRY & RULES ─── */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-label-sm text-accent tracking-splice-ultra uppercase">05</span>
            <h2 className="font-display text-2xl font-bold tracking-splice-tight text-foreground">Geometry & Rules</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-surface-border p-6">
              <h3 className="font-mono text-label-sm text-muted-foreground tracking-splice-wide uppercase mb-3">Border Radius</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Zero-radius (sharp corners) is the default. The brand radius token is 0.125rem — 
                essentially square. This reinforces the technical, precise aesthetic.
              </p>
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-surface-raised border border-surface-border" />
                <div className="w-16 h-16 bg-accent" />
              </div>
            </div>
            <div className="border border-surface-border p-6">
              <h3 className="font-mono text-label-sm text-muted-foreground tracking-splice-wide uppercase mb-3">Grid Unit</h3>
              <p className="text-sm text-muted-foreground mb-4">
                All spacing is based on a 4px grid unit. Common spacings: 4, 8, 12, 16, 24, 32, 48, 64px.
                Component padding uses multiples of the grid unit.
              </p>
              <div className="flex items-end gap-1">
                {[1, 2, 3, 4, 6, 8].map((m) => (
                  <div
                    key={m}
                    className="bg-accent/20 border border-accent/40"
                    style={{ width: 4 * m, height: 4 * m }}
                  />
                ))}
              </div>
            </div>
            <div className="border border-surface-border p-6">
              <h3 className="font-mono text-label-sm text-muted-foreground tracking-splice-wide uppercase mb-3">Prohibited</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• No gradients on the logo mark</li>
                <li>• No drop shadows on typography</li>
                <li>• No rotation or skewing of the wordmark</li>
                <li>• No crypto clichés: chain links, coins, hexagons, shields</li>
                <li>• No colored backgrounds behind the wordmark (dark bg only)</li>
              </ul>
            </div>
            <div className="border border-surface-border p-6">
              <h3 className="font-mono text-label-sm text-muted-foreground tracking-splice-wide uppercase mb-3">Voice & Tone</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <span className="text-foreground">Technical precision</span> — specificity over abstraction</li>
                <li>• <span className="text-foreground">Operator confidence</span> — direct, no hedging</li>
                <li>• <span className="text-foreground">Zero-trust framing</span> — "Trust nothing. Audit everything."</li>
                <li>• Avoid: hype language, superlatives, "revolutionary", "disrupting"</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: ALTERNATE DIRECTIONS ─── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="font-mono text-label-sm text-accent tracking-splice-ultra uppercase">06</span>
            <h2 className="font-display text-2xl font-bold tracking-splice-tight text-foreground">Alternate Marks (Reference)</h2>
          </div>
          <p className="text-base text-muted-foreground mb-8 max-w-xl">
            Explored logo directions retained for reference. The Terminal mark (above) is the approved primary.
          </p>

          <div className="space-y-4">
            <LogoDownloadRow label="Axis — Asymmetric Wordmark" id="axis-header" w={420} h={72}>
              <AxisWordmark accent scale="header" />
            </LogoDownloadRow>
            <LogoDownloadRow label="Conduit — Cable Cross-Section" id="conduit-header" w={400} h={72}>
              <ConduitWordmark accent scale="header" />
            </LogoDownloadRow>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}