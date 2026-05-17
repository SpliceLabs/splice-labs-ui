"use client";

import { Brain, Cpu, ShieldCheck, Workflow } from "lucide-react";
import {
  CoverTile,
  Crumb,
  HairlineDivider,
  IconPlate,
  LabelChip,
  ModuleLabel,
  TagPill,
} from "@/components/blog";
import type { Surface } from "@/components/blog";
import { useState } from "react";

/**
 * Internal showcase for the Pass 3 blog primitives — rendered on both the
 * graphite and paper surfaces to prove the two-mode contract.
 */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <ModuleLabel dot>{label}</ModuleLabel>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

function Showcase({ surface }: { surface: Surface }) {
  const [activeTag, setActiveTag] = useState("ALL");
  const tags = ["ALL", "RESEARCH", "ENGINEERING", "SECURITY"];

  return (
    <section
      className={
        surface === "graphite"
          ? "bg-blog-graphite text-blog-text-paper"
          : "bg-blog-paper text-blog-text-graphite"
      }
    >
      <div className="mx-auto flex max-w-[1100px] flex-col gap-12 px-8 py-20">
        <div className="flex flex-col gap-2">
          <ModuleLabel caret>
            {surface === "graphite" ? "SURFACE :: GRAPHITE" : "SURFACE :: PAPER"}
          </ModuleLabel>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em]">
            Blog Primitives
          </h2>
        </div>

        <HairlineDivider surface={surface} />

        <Row label="LABEL CHIP">
          <LabelChip size="sm">HELIOS RUNTIME</LabelChip>
          <LabelChip size="md">CONTEXT COMPRESSION</LabelChip>
          <LabelChip size="lg" variant="notched" caret>
            READ MORE
          </LabelChip>
          <LabelChip tone="paper">TONE :: PAPER</LabelChip>
        </Row>

        <Row label="ICON PLATE">
          <IconPlate icon={<Brain size={18} />} />
          <IconPlate icon={<Cpu size={22} />} size={44} />
          <IconPlate icon={<ShieldCheck size={28} />} size={56} />
        </Row>

        <Row label="MODULE LABEL">
          <ModuleLabel>READ MORE</ModuleLabel>
          <ModuleLabel dot>02 / FILTER RAIL</ModuleLabel>
          <ModuleLabel dot caret>
            GET TLDR FROM:
          </ModuleLabel>
        </Row>

        <Row label="TAG PILL">
          {tags.map((t) => (
            <TagPill
              key={t}
              active={activeTag === t}
              onClick={() => setActiveTag(t)}
            >
              {t}
            </TagPill>
          ))}
        </Row>

        <Row label="CRUMB">
          <Crumb
            segments={[
              { label: "Blog", href: "/blog" },
              { label: "Engineering", href: "/blog?c=eng" },
              { label: "Deterministic Runtimes" },
            ]}
          />
        </Row>

        <div className="flex flex-col gap-3">
          <ModuleLabel dot>COVER TILE</ModuleLabel>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <CoverTile tone="teal" texture="halftone">
              <IconPlate icon={<Workflow size={18} />} overlap />
              <LabelChip size="sm" variant="notched">
                RESEARCH
              </LabelChip>
            </CoverTile>
            <CoverTile tone="amber" texture="engraving">
              <IconPlate icon={<Cpu size={18} />} overlap />
              <LabelChip size="sm" variant="notched">
                ENGINEERING
              </LabelChip>
            </CoverTile>
            <CoverTile tone="bone">
              <IconPlate icon={<Brain size={18} />} overlap />
              <LabelChip size="sm" variant="notched">
                THESIS
              </LabelChip>
            </CoverTile>
            <CoverTile tone="graphite" texture="halftone">
              <IconPlate icon={<ShieldCheck size={18} />} overlap />
              <LabelChip size="sm" variant="notched">
                SECURITY
              </LabelChip>
            </CoverTile>
          </div>
        </div>

        <HairlineDivider surface={surface} />
      </div>
    </section>
  );
}

export default function BlogPrimitives() {
  return (
    <main className="min-h-screen">
      <Showcase surface="graphite" />
      <Showcase surface="paper" />
    </main>
  );
}
