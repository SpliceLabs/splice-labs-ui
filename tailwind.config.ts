import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
      /* ═══════════════════════════════════════════════════════════════════════
         TYPOGRAPHY
         ═══════════════════════════════════════════════════════════════════════ */
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        body: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["Space Mono", "Courier New", "monospace"],
      },

      /* ═══════════════════════════════════════════════════════════════════════
         COLORS — Core + Extended + Blog System
         ═══════════════════════════════════════════════════════════════════════ */
      colors: {
        /* ── Core System ──────────────────────────────────────────────────── */
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

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        /* ── Extended Palette — Warm Accents ──────────────────────────────── */
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

        quote: "hsl(var(--quote))",

        /* ── Status Colors ────────────────────────────────────────────────── */
        status: {
          success: "hsl(var(--status-success))",
          info: "hsl(var(--status-info))",
          warning: "hsl(var(--status-warning))",
          danger: "hsl(var(--status-danger))",
        },

        /* ── Micro-Interaction Colors ─────────────────────────────────────── */
        "ring-focus": "hsl(var(--ring-focus))",
        "link-hover": "hsl(var(--link-hover))",
        highlight: "hsl(var(--mark-highlight))",
        selection: "hsl(var(--text-selection))",

        /* ── Blog System Colors ───────────────────────────────────────────── */
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
        },

        /* ── Light Mode Colors ────────────────────────────────────────────── */
        light: {
          bg: "hsl(var(--bg-light))",
          surface: "hsl(var(--surface-light))",
          border: "hsl(var(--border-light))",
          fg: "hsl(var(--fg-light))",
          "muted-fg": "hsl(var(--muted-fg-light))",
          accent: "hsl(var(--accent-light))",
        },

        /* ── Sidebar (shadcn) ─────────────────────────────────────────────── */
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
      },

      /* ═══════════════════════════════════════════════════════════════════════
         BORDER RADIUS — 0px everywhere per brand guide
         ═══════════════════════════════════════════════════════════════════════ */
      borderRadius: {
        lg: "var(--radius)",
        md: "var(--radius)",
        sm: "var(--radius)",
        DEFAULT: "var(--radius)",
      },

      /* ═══════════════════════════════════════════════════════════════════════
         LETTER SPACING — Splice typography tokens
         ═══════════════════════════════════════════════════════════════════════ */
      letterSpacing: {
        "splice-tight": "-0.04em",   // display headlines
        "splice-normal": "-0.02em",  // h2, h3
        "splice-wide": "0.18em",     // mono labels
        "splice-ultra": "0.28em",    // mono captions
      },

      /* ═══════════════════════════════════════════════════════════════════════
         TRANSITION DURATION — Motion tokens
         ═══════════════════════════════════════════════════════════════════════ */
      transitionDuration: {
        "instant": "0ms",
        "fast": "120ms",
        "base": "200ms",
        "slow": "400ms",
        "hero": "900ms",
      },

      /* ═══════════════════════════════════════════════════════════════════════
         EASING / TIMING FUNCTIONS
         ═══════════════════════════════════════════════════════════════════════ */
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "in-out-cubic": "cubic-bezier(0.65, 0, 0.35, 1)",
      },

      /* ═══════════════════════════════════════════════════════════════════════
         KEYFRAMES — Core animations
         ═══════════════════════════════════════════════════════════════════════ */
      keyframes: {
        /* ── Accordion (shadcn) ───────────────────────────────────────────── */
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        /* ── Brand Micro-Interactions ─────────────────────────────────────── */
        "pulse-accent": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },

        "blink-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },

        /* ── Draw / Reveal Animations ─────────────────────────────────────── */
        "draw": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },

        "draw-line": {
          from: { strokeDashoffset: "100" },
          to: { strokeDashoffset: "0" },
        },

        "draw-vertical": {
          "0%": { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },

        /* ── Fade / Reveal ────────────────────────────────────────────────── */
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },

        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(-6px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },

        /* ── Typewriter / Char reveal ─────────────────────────────────────── */
        "typewriter": {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },

        /* ── Hover Lift ───────────────────────────────────────────────────── */
        "hover-lift": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-2px)" },
        },

        /* ── Progress ─────────────────────────────────────────────────────── */
        "progress": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(var(--progress, 1))" },
        },
      },

      /* ═══════════════════════════════════════════════════════════════════════
         ANIMATIONS — Composed from keyframes + timing
         ═══════════════════════════════════════════════════════════════════════ */
      animation: {
        /* ── Accordion ────────────────────────────────────────────────────── */
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        /* ── Brand Signatures ─────────────────────────────────────────────── */
        "pulse-accent": "pulse-accent 2s ease-in-out infinite",
        "blink-cursor": "blink-cursor 1s step-end infinite",

        /* ── Draw / Reveal ────────────────────────────────────────────────── */
        "draw": "draw 480ms cubic-bezier(0.2, 0.7, 0.1, 1) both",
        "draw-line": "draw-line 600ms ease-out forwards",
        "draw-vertical": "draw-vertical 280ms cubic-bezier(0.25, 1, 0.5, 1) both",

        /* ── Fade ─────────────────────────────────────────────────────────── */
        "fade-in": "fade-in 200ms ease-out",
        "fade-in-up": "fade-in-up 420ms cubic-bezier(0.25, 1, 0.5, 1)",
        "fade-in-right": "fade-in-right 200ms ease-out",

        /* ── Typewriter ───────────────────────────────────────────────────── */
        "typewriter": "typewriter 240ms steps(10) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
