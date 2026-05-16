import { Boxes, Brain, Cpu, ShieldCheck, Workflow } from "lucide-react";
import type { CategoryEntry, PostCardData } from "@/components/blog";

/** Sample content for the blog demo routes. */

export const categories: CategoryEntry[] = [
  {
    label: "Research",
    href: "/blog?c=research",
    tone: "teal",
    icon: <Workflow size={18} />,
    blurb: "Theory, protocol design, and the runtime gap.",
  },
  {
    label: "Engineering",
    href: "/blog?c=engineering",
    tone: "amber",
    icon: <Cpu size={18} />,
    blurb: "How HELIOS and Agave are built.",
  },
  {
    label: "Thesis",
    href: "/blog?c=thesis",
    tone: "bone",
    icon: <Brain size={18} />,
    blurb: "Where agent-native finance is heading.",
  },
  {
    label: "Security",
    href: "/blog?c=security",
    tone: "graphite",
    icon: <ShieldCheck size={18} />,
    blurb: "Trust nothing. Audit everything.",
  },
];

export const posts: (PostCardData & { snippet: string })[] = [
  {
    href: "/blog/article-demo",
    title: "Deterministic Runtimes for Cross-Chain Agent Execution",
    date: "May 12, 2026",
    category: "Research",
    tone: "teal",
    texture: "halftone",
    icon: <Workflow size={18} />,
    chipLabel: "Runtime",
    snippet:
      "The firms with proven strategies built now win. This is infrastructure-layer timing.",
  },
  {
    href: "/blog/article-demo",
    title: "Compiled Policy: Approval Gates That Live in Contracts",
    date: "May 09, 2026",
    category: "Engineering",
    tone: "amber",
    texture: "engraving",
    icon: <Cpu size={18} />,
    chipLabel: "HELIOS",
    snippet:
      "Policies belong in contracts, not prompts. Typed, signed, and replayable.",
  },
  {
    href: "/blog/article-demo",
    title: "Replay Attestation and the End of Trust-Me Trading",
    date: "May 04, 2026",
    category: "Security",
    tone: "graphite",
    texture: "halftone",
    icon: <ShieldCheck size={18} />,
    chipLabel: "Attestation",
    snippet:
      "Every agent decision is reconstructable. Auditors verify, they do not trust.",
  },
  {
    href: "/blog/article-demo",
    title: "Why Agent-Native Finance Will Eat the Desk",
    date: "Apr 28, 2026",
    category: "Thesis",
    tone: "bone",
    texture: "none",
    icon: <Brain size={18} />,
    chipLabel: "Thesis",
    snippet:
      "Agents propose, humans approve. The trading desk becomes a control plane.",
  },
  {
    href: "/blog/article-demo",
    title: "Isolated Agent Runtimes: A Field Report",
    date: "Apr 21, 2026",
    category: "Engineering",
    tone: "amber",
    texture: "halftone",
    icon: <Boxes size={18} />,
    chipLabel: "Agave",
    snippet:
      "What we learned shipping isolated runtimes to production for six months.",
  },
  {
    href: "/blog/article-demo",
    title: "Context Compression in Long-Horizon Agents",
    date: "Apr 14, 2026",
    category: "Research",
    tone: "teal",
    texture: "engraving",
    icon: <Workflow size={18} />,
    chipLabel: "Context",
    snippet:
      "Head, middle, tail — how we keep agents coherent across thousand-step runs.",
  },
];
