import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,mdx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "Courier New", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          raised: "hsl(var(--surface-raised))",
          border: "hsl(var(--surface-border))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        amber: {
          DEFAULT: "hsl(var(--amber))",
          foreground: "hsl(var(--amber-foreground))",
        },
        gold: {
          DEFAULT: "hsl(var(--gold))",
          foreground: "hsl(var(--gold-foreground))",
        },
        rust: {
          DEFAULT: "hsl(var(--rust))",
          foreground: "hsl(var(--rust-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Blog design system (Pass 2) — namespaced, extends core palette.
        blog: {
          graphite: "hsl(var(--blog-bg-graphite))",
          paper: "hsl(var(--blog-bg-paper))",
          "surface-muted": "hsl(var(--blog-surface-muted))",
          "surface-elevated": "hsl(var(--blog-surface-elevated))",
          "text-paper": "hsl(var(--blog-text-paper))",
          "text-graphite": "hsl(var(--blog-text-graphite))",
          "text-muted": "hsl(var(--blog-text-muted))",
          "text-subtle": "hsl(var(--blog-text-subtle))",
          "tile-teal": "hsl(var(--blog-tile-teal))",
          "tile-amber": "hsl(var(--blog-tile-amber))",
          "tile-bone": "hsl(var(--blog-tile-bone))",
          "tile-graphite": "hsl(var(--blog-tile-graphite))",
          "chip-ink": "hsl(var(--blog-chip-ink))",
          "chip-text": "hsl(var(--blog-chip-text))",
          hairline: "hsl(var(--blog-border-hairline))",
          "hairline-paper": "hsl(var(--blog-border-paper))",
          "ring-teal": "hsl(var(--blog-ring-teal))",
          "highlight-amber": "hsl(var(--blog-highlight-amber))",
          "link-underline": "hsl(var(--blog-link-underline))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      letterSpacing: {
        "splice-tight": "-0.04em",
        "splice-wide": "0.18em",
        "splice-ultra": "0.28em",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-accent": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "draw-line": {
          from: { strokeDashoffset: "100" },
          to: { strokeDashoffset: "0" },
        },
        "blink-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        // Blog system: hairline draw (scaleX), distinct from stroke-based draw-line.
        draw: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        // Marketing reveal: staggered entrance.
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-accent": "pulse-accent 2s ease-in-out infinite",
        "blink-cursor": "blink-cursor 1s step-end infinite",
        draw: "draw 480ms cubic-bezier(.2,.7,.1,1) both",
        "fade-up": "fade-up 0.42s cubic-bezier(0.165,0.84,0.44,1) both",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
