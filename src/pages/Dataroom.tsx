import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";

interface DataroomItem {
  title: string;
  status: "Complete" | "In Development" | "In Progress" | "Draft" | "To Be Added" | "None to Date";
  description?: string;
  bullets?: string[];
  checklist?: string[];
  subsections?: { name: string; description: string; status: string; bullets?: string[] }[];
}

interface DataroomSection {
  number: string;
  title: string;
  items: DataroomItem[];
}

const STATUS_COLORS: Record<string, string> = {
  Complete: "bg-accent/20 text-accent",
  "In Development": "bg-accent/10 text-accent/70",
  "In Progress": "bg-accent/10 text-accent/70",
  Draft: "bg-muted text-muted-foreground",
  "To Be Added": "bg-muted text-muted-foreground/60",
  "None to Date": "bg-muted text-muted-foreground/60",
};

const SECTIONS: DataroomSection[] = [
  {
    number: "01",
    title: "Company Overview",
    items: [
      { title: "Executive Summary", status: "Draft", description: "One-page company overview covering mission, products, market, and traction." },
      {
        title: "Pitch Deck", status: "In Progress", description: "Investor presentation deck",
        bullets: ["Deck A: One-pager for investors", "Deck B: YC-style 8-12 slide deck", "Deck C: Vision deck for strategic partners", "Deck D: Sales deck for clients"],
      },
    ],
  },
  {
    number: "02",
    title: "Intellectual Property",
    items: [
      {
        title: "HELIOS Platform", status: "In Development",
        checklist: ["Technical architecture documentation", "Security model whitepaper (zero-trust architecture)", "Source code repository (access upon request)"],
      },
      {
        title: "Protocols & Prototypes", status: "In Development",
        subsections: [
          { name: "Silent Markets", description: "Agent-paired trading journal for web3 traders", status: "Building" },
          { name: "Anon Capital", description: "DAO infrastructure for structured earnings remittance", status: "Building" },
          { name: "Crown Futures", description: "Enterprise-scale prop firm infrastructure for web3", status: "Building" },
        ],
      },
    ],
  },
  {
    number: "03",
    title: "Products & Technology",
    items: [
      {
        title: "HELIOS Technical Documentation", status: "In Development", description: "Core Architecture: Secure multi-agent orchestration for DeFi. Zero-trust architecture. Constrained reasoning vs probabilistic models.",
        subsections: [
          { name: "Security Primitives", description: "Memory Containment, Sandboxed Execution, Deterministic Constraint Engine, Verification Layer, Context Orchestration, Immutable Audit Logs", status: "In Development" },
          { name: "Compliance", description: "SOC 2 Type II roadmap (in progress), DeFi-specific security standards, Regulatory readiness framework", status: "In Development" },
        ],
      },
      { title: "Technology Stack", status: "To Be Added", bullets: ["Infrastructure overview", "Development tools and frameworks", "Third-party dependencies", "Security tools and practices"] },
      { title: "Product Roadmap", status: "To Be Added", bullets: ["6-month roadmap", "12-month strategic initiatives", "Feature priorities"] },
    ],
  },
  {
    number: "04",
    title: "Compliance & Security",
    items: [
      { title: "Security Practices", status: "In Development", bullets: ["Security audit reports (when completed)", "Incident response plan", "Data privacy policies"] },
      { title: "SOC 2 Compliance", status: "In Development", description: "Ground-Up Approach. Current status: IAM foundation being built." },
      { title: "DeFi/Crypto Compliance", status: "To Be Added", bullets: ["Legal opinions on token/protocol status", "Regulatory analysis", "AML/KYC policies (if applicable)", "GENIUS Act compliance strategy"] },
    ],
  },
];

const PRIORITIES = [
  { level: "Priority 1: Complete These First", items: ["Executive Summary (1-2 pages)", "HELIOS Technical Overview (product one-pager)", "Founder Bios", "Financial Model (even if basic)"] },
  { level: "Priority 2: Build Out Over Time", items: ["Legal entity formation documents", "Detailed product documentation", "Customer pipeline and traction data", "Full compliance documentation"] },
  { level: "Priority 3: As Needed for Fundraising", items: ["Full financial history and projections", "Detailed cap table and equity documentation", "Customer contracts and agreements", "Security audits and compliance certifications"] },
];

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center font-mono text-[9px] tracking-splice-wide uppercase px-2 py-0.5 ${STATUS_COLORS[status] || "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}

export default function Dataroom() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-44 md:pb-20 px-6 md:px-8 max-w-[1200px] mx-auto relative">
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-surface-border" />
        <div className="absolute left-6 md:left-8 top-32 md:top-44 w-px h-16 bg-accent/40" />

        <div className="pl-8 md:pl-12">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-3 h-3 border border-accent bg-accent/10 -ml-[calc(2rem+6px)] md:-ml-[calc(3rem+6px)]" />
            <span className="font-mono text-[9px] text-accent/60 tracking-splice-ultra uppercase">
              module::dataroom
            </span>
            <span className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-splice-tight text-foreground leading-[1.05] mb-4">
            Splice Labs Dataroom
          </h1>
          <p className="text-sm text-foreground/50 leading-relaxed max-w-[600px] mb-2">
            Documentation for Splice Labs, a protocol and systems design foundry building agent-native AI and DeFi infrastructure. Our flagship product, HELIOS, provides secure multi-agent orchestration for DeFi with zero-trust architecture.
          </p>
          <p className="font-mono text-[10px] text-muted-foreground tracking-splice-wide uppercase">
            Last Updated: March 4, 2026
          </p>
        </div>
      </section>

      {/* Sections */}
      {SECTIONS.map((section) => (
        <section key={section.number} className="border-t border-surface-border">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] text-accent tracking-splice-ultra">{section.number}</span>
              <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground">
                {section.title}
              </h2>
              <span className="flex-1 h-px bg-surface-border" />
            </div>

            <div className="space-y-6">
              {section.items.map((item) => (
                <div key={item.title} className="border border-surface-border p-5 md:p-6 hover:border-accent/20 transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="font-display text-base font-semibold tracking-splice-tight text-foreground">
                      {item.title}
                    </h3>
                    <StatusBadge status={item.status} />
                  </div>

                  {item.description && (
                    <p className="text-sm text-foreground/50 leading-relaxed mb-3">{item.description}</p>
                  )}

                  {item.bullets && (
                    <ul className="space-y-1 ml-1">
                      {item.bullets.map((b, i) => (
                        <li key={i} className="text-sm text-foreground/40 flex items-start gap-2">
                          <span className="text-accent/40 mt-0.5">–</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.checklist && (
                    <ul className="space-y-1 ml-1">
                      {item.checklist.map((c, i) => (
                        <li key={i} className="text-sm text-foreground/40 flex items-start gap-2">
                          <span className="text-muted-foreground/40 mt-0.5">☐</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.subsections && (
                    <div className="mt-4 space-y-3 pl-4 border-l border-surface-border">
                      {item.subsections.map((sub) => (
                        <div key={sub.name}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-foreground/70">{sub.name}</span>
                            <span className="font-mono text-[8px] text-muted-foreground/50 tracking-splice-wide uppercase">{sub.status}</span>
                          </div>
                          <p className="text-xs text-foreground/40">{sub.description}</p>
                          {sub.bullets && (
                            <ul className="mt-1 space-y-0.5">
                              {sub.bullets.map((b, i) => (
                                <li key={i} className="text-xs text-foreground/30 flex items-start gap-2">
                                  <span className="text-accent/30">–</span>{b}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Next Steps */}
      <section className="border-t border-surface-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-16">
          <h2 className="font-display text-xl md:text-2xl font-semibold tracking-splice-tight text-foreground mb-8">
            Next Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PRIORITIES.map((p) => (
              <div key={p.level} className="border border-surface-border p-5 md:p-6">
                <h3 className="font-mono text-[10px] text-accent tracking-splice-ultra uppercase mb-4">{p.level}</h3>
                <ol className="space-y-2">
                  {p.items.map((item, i) => (
                    <li key={i} className="text-sm text-foreground/50 flex items-start gap-2">
                      <span className="font-mono text-[10px] text-foreground/30 mt-0.5">{i + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Status Key */}
      <section className="border-t border-surface-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-16">
          <h3 className="font-mono text-[10px] text-muted-foreground tracking-splice-ultra uppercase mb-4">Document Status Key</h3>
          <div className="flex flex-wrap gap-4">
            {Object.keys(STATUS_COLORS).map((s) => (
              <div key={s} className="flex items-center gap-2">
                <StatusBadge status={s} />
                <span className="text-xs text-foreground/30">
                  {s === "Complete" && "— Finished and current"}
                  {s === "In Development" && "— Work in progress"}
                  {s === "In Progress" && "— Work in progress"}
                  {s === "Draft" && "— Initial version, needs review"}
                  {s === "To Be Added" && "— Placeholder for future"}
                  {s === "None to Date" && "— Not applicable yet"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-surface-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 text-center">
          <p className="text-sm text-foreground/50 mb-4">
            For questions about accessing specific documents or requesting additional information:
          </p>
          <a
            href="mailto:hello@splicelabs.io"
            className="inline-flex items-center justify-center font-mono text-xs tracking-splice-wide uppercase bg-accent text-accent-foreground px-6 py-3 hover:bg-accent/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
