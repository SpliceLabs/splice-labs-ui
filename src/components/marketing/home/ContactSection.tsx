"use client";

import { useState, useEffect } from "react";
import { SwarmSlot } from "./swarm/SwarmSlot";
import { TerminalButton } from "../ui/TerminalButton";
import { ModuleLabel } from "../ui/ModuleLabel";
import { cn } from "@/lib/utils";
import { getSectionLayout, getAccentLinePosition, getCalcPosition, type SectionAlign } from "./sectionLayout";
import { JunctionNode } from "./JunctionNode";

type Status = "idle" | "submitting" | "success" | "error";
type AudienceType = "founder" | "investor" | "partner" | "operator";
type Field = "name" | "email" | "message" | "company" | "linkedin";
type Errors = Partial<Record<Field, string>>;

const AUDIENCE_OPTIONS: { type: AudienceType; label: string; cta: string; placeholder: string }[] = [
  { type: "founder", label: "Founder", cta: "Apply as Founder", placeholder: "Tell us about your venture idea or what you're building" },
  { type: "investor", label: "Investor", cta: "Request Materials", placeholder: "Tell us about your fund and investment thesis" },
  { type: "partner", label: "Partner", cta: "Partner with Splice", placeholder: "Describe the problem you'd like to co-solve" },
  { type: "operator", label: "Operator", cta: "Join Operator Bench", placeholder: "Tell us about your background and areas of expertise" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LINKEDIN_RE = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i;

const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_COMPANY_LENGTH = 100;

const inputClass =
  "w-full bg-transparent border border-surface-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-ember-glow transition-colors disabled:opacity-50";

interface ContactSectionProps {
  align?: SectionAlign;
}

export function ContactSection({ align = "left" }: ContactSectionProps) {
  const layout = getSectionLayout(align);
  const linePos = getAccentLinePosition(align);
  const calcPos = getCalcPosition(align);

  const [audienceType, setAudienceType] = useState<AudienceType>("founder");
  const [formState, setFormState] = useState({ name: "", email: "", message: "", company: "", linkedin: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [actionType, setActionType] = useState<string | null>(null);

  // Parse params from hash (e.g., #contact?intent=investor&action=schedule-call)
  useEffect(() => {
    const parseHashParams = () => {
      const hash = window.location.hash;
      if (!hash.includes("?")) return;

      const queryString = hash.split("?")[1];
      const params = new URLSearchParams(queryString);
      const intent = params.get("intent");
      const action = params.get("action");

      if (intent && ["founder", "investor", "partner", "operator"].includes(intent)) {
        setAudienceType(intent as AudienceType);
      }
      setActionType(action);
    };

    // Parse on mount (with small delay for Next.js navigation)
    parseHashParams();
    const timeout = setTimeout(parseHashParams, 100);

    // Listen for hash changes
    window.addEventListener("hashchange", parseHashParams);
    return () => {
      window.removeEventListener("hashchange", parseHashParams);
      clearTimeout(timeout);
    };
  }, []);

  const currentAudience = AUDIENCE_OPTIONS.find((a) => a.type === audienceType)!;

  const update = (field: Field, value: string) => {
    setFormState((s) => ({ ...s, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!formState.name.trim()) {
      next.name = "Tell us who you are.";
    } else if (formState.name.trim().length > MAX_NAME_LENGTH) {
      next.name = `Name must be under ${MAX_NAME_LENGTH} characters.`;
    }
    if (!EMAIL_RE.test(formState.email.trim())) next.email = "Enter a valid email address.";
    if (!formState.message.trim()) {
      next.message = "Add some context.";
    } else if (formState.message.trim().length > MAX_MESSAGE_LENGTH) {
      next.message = `Message must be under ${MAX_MESSAGE_LENGTH} characters.`;
    }
    if ((audienceType === "investor" || audienceType === "partner") && !formState.company.trim()) {
      next.company = "Tell us your organization.";
    } else if (formState.company.trim().length > MAX_COMPANY_LENGTH) {
      next.company = `Company must be under ${MAX_COMPANY_LENGTH} characters.`;
    }
    if (!formState.linkedin.trim()) {
      next.linkedin = "Share your LinkedIn profile.";
    } else if (!LINKEDIN_RE.test(formState.linkedin.trim())) {
      next.linkedin = "Enter a valid LinkedIn profile URL.";
    }
    return next;
  };

  const ACTION_LABELS: Record<string, string> = {
    // Investor actions
    "request-materials": "Requesting investor materials",
    "schedule-call": "Requesting a diligence call",
    // Founder actions
    "apply-founder": "Applying as founder",
    "join-bench": "Joining operator bench",
    // Partner actions
    "partner-inquiry": "Partnership inquiry",
    "submit-problem": "Submitting a problem to co-solve",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, audienceType, actionType }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const submitting = status === "submitting";

  return (
    <section id="contact" className="border-t border-surface-border relative">
      <SwarmSlot id="contact" className={layout.swarmSlot} />
      <div className={layout.accentLine} />
      {/* Terminal splice line at bottom */}
      <div className={`absolute ${linePos} bottom-0 w-px h-8 bg-ember/30`} />
      <div className={`absolute ${calcPos} bottom-0 w-2 h-2 border border-ember/60 bg-ember/10`} />

      <div className="max-w-[1700px] mx-auto px-20 py-12 md:py-16">
        <div className={layout.contentWrapper}>
         <div className="w-full max-w-[600px]">
          <div className={layout.headerFlex}>
            <JunctionNode sectionId="contact" align={align} />
            <ModuleLabel name="contact" sectionId="contact" rule={false} dot={false} />
            <span className="flex-1 h-px bg-foreground/10" />
          </div>

          <div className="grid grid-cols-1 gap-10">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-splice-tight text-foreground mb-3">
                Build With Us
              </h2>
              <p className="text-sm text-foreground/70 leading-relaxed mb-6">
                Select your path. We'll respond within a few days if there's a fit.
              </p>

              {/* Audience type selector */}
              <div className="flex flex-wrap gap-2 mb-4">
                {AUDIENCE_OPTIONS.map((opt) => (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => {
                      setAudienceType(opt.type);
                      setActionType(null); // Clear action when manually changing type
                    }}
                    className={cn(
                      "font-mono text-xs tracking-splice-ultra uppercase px-3 py-1.5 border transition-all duration-300 ease-out",
                      audienceType === opt.type
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-surface-border text-muted-foreground hover:border-ember/40 hover:text-foreground hover:bg-ember/5 hover:-translate-y-0.5"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Action indicator */}
              {actionType && ACTION_LABELS[actionType] && (
                <div className="flex items-center gap-2 mb-8 px-3 py-2 border border-ember/30 bg-ember/5">
                  <span className="w-1.5 h-1.5 bg-ember rounded-full" />
                  <span className="font-mono text-xs text-ember tracking-splice-wide">
                    {ACTION_LABELS[actionType]}
                  </span>
                </div>
              )}
              {!actionType && <div className="mb-4" />}
            </div>

            {status === "success" ? (
              <div
                role="status"
                className="border border-accent/30 bg-accent/5 px-5 py-6"
              >
                <p className="font-mono text-xs text-accent tracking-splice-ultra uppercase mb-2">
                  Message received
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Thanks{formState.name.trim() ? `, ${formState.name.trim()}` : ""}. If it's a fit,
                  we'll get back to you within a few days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="font-mono text-label text-muted-foreground/60 tracking-splice-ultra uppercase block mb-1.5"
                    >
                      Name <span className="text-ember">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formState.name}
                      onChange={(e) => update("name", e.target.value)}
                      disabled={submitting}
                      maxLength={MAX_NAME_LENGTH}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className={inputClass}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        className="mt-1.5 font-mono text-label text-destructive tracking-splice-wide uppercase"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="font-mono text-label text-muted-foreground/60 tracking-splice-ultra uppercase block mb-1.5"
                    >
                      Email <span className="text-ember">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formState.email}
                      onChange={(e) => update("email", e.target.value)}
                      disabled={submitting}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      className={inputClass}
                      placeholder="you@company.com"
                    />
                    {errors.email && (
                      <p
                        id="contact-email-error"
                        className="mt-1.5 font-mono text-label text-destructive tracking-splice-wide uppercase"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                {(audienceType === "investor" || audienceType === "partner") && (
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="font-mono text-label text-muted-foreground/60 tracking-splice-ultra uppercase block mb-1.5"
                    >
                      {audienceType === "investor" ? "Fund / Organization" : "Company"} <span className="text-ember">*</span>
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={formState.company}
                      onChange={(e) => update("company", e.target.value)}
                      disabled={submitting}
                      maxLength={MAX_COMPANY_LENGTH}
                      aria-invalid={!!errors.company}
                      aria-describedby={errors.company ? "contact-company-error" : undefined}
                      className={inputClass}
                      placeholder={audienceType === "investor" ? "Your fund name" : "Your company name"}
                    />
                    {errors.company && (
                      <p
                        id="contact-company-error"
                        className="mt-1.5 font-mono text-label text-destructive tracking-splice-wide uppercase"
                      >
                        {errors.company}
                      </p>
                    )}
                  </div>
                )}
                <div>
                  <label
                    htmlFor="contact-linkedin"
                    className="font-mono text-label text-muted-foreground/60 tracking-splice-ultra uppercase block mb-1.5"
                  >
                    LinkedIn Profile <span className="text-ember">*</span>
                  </label>
                  <input
                    id="contact-linkedin"
                    type="url"
                    value={formState.linkedin}
                    onChange={(e) => update("linkedin", e.target.value)}
                    disabled={submitting}
                    aria-invalid={!!errors.linkedin}
                    aria-describedby={errors.linkedin ? "contact-linkedin-error" : undefined}
                    className={inputClass}
                    placeholder="linkedin.com/in/yourprofile"
                  />
                  {errors.linkedin && (
                    <p
                      id="contact-linkedin-error"
                      className="mt-1.5 font-mono text-label text-destructive tracking-splice-wide uppercase"
                    >
                      {errors.linkedin}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-label text-muted-foreground/60 tracking-splice-ultra uppercase block mb-1.5"
                  >
                    {audienceType === "founder" ? "What you're building" : "Context"} <span className="text-ember">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    value={formState.message}
                    onChange={(e) => update("message", e.target.value)}
                    disabled={submitting}
                    rows={4}
                    maxLength={MAX_MESSAGE_LENGTH}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className={`${inputClass} resize-none`}
                    placeholder={currentAudience.placeholder}
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      className="mt-1.5 font-mono text-label text-destructive tracking-splice-wide uppercase"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>
                <TerminalButton
                  as="button"
                  type="submit"
                  disabled={submitting}
                  data-event={`cta_contact_${audienceType}`}
                >
                  {submitting ? "Sending…" : currentAudience.cta}
                </TerminalButton>
                <p
                  aria-live="polite"
                  className="min-h-[0.75rem] font-mono text-label text-destructive tracking-splice-wide uppercase"
                >
                  {status === "error" &&
                    "Something went wrong — please try again."}
                </p>
                <p className="font-mono text-label text-muted-foreground/60 tracking-splice-wide">
                  No spam. If it's not a fit, we'll say so.
                </p>
              </form>
            )}
          </div>
         </div>
        </div>
      </div>
    </section>
  );
}
