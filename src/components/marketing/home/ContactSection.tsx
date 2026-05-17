import { useState } from "react";
import { SwarmSlot } from "./swarm/SwarmSlot";
import { TerminalButton } from "../ui/TerminalButton";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type AudienceType = "founder" | "investor" | "partner" | "operator";
type Field = "name" | "email" | "message" | "company" | "role";
type Errors = Partial<Record<Field, string>>;

const AUDIENCE_OPTIONS: { type: AudienceType; label: string; cta: string; placeholder: string }[] = [
  { type: "founder", label: "Founder", cta: "Apply as Founder", placeholder: "Tell us about your venture idea or what you're building" },
  { type: "investor", label: "Investor", cta: "Request Materials", placeholder: "Tell us about your fund and investment thesis" },
  { type: "partner", label: "Partner", cta: "Partner with Splice", placeholder: "Describe the problem you'd like to co-solve" },
  { type: "operator", label: "Operator", cta: "Join Operator Bench", placeholder: "Tell us about your background and areas of expertise" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full bg-transparent border border-surface-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors disabled:opacity-50";

export function ContactSection() {
  const [audienceType, setAudienceType] = useState<AudienceType>("founder");
  const [formState, setFormState] = useState({ name: "", email: "", message: "", company: "", role: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  const currentAudience = AUDIENCE_OPTIONS.find((a) => a.type === audienceType)!;

  const update = (field: Field, value: string) => {
    setFormState((s) => ({ ...s, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!formState.name.trim()) next.name = "Tell us who you are.";
    if (!EMAIL_RE.test(formState.email.trim())) next.email = "Enter a valid email address.";
    if (!formState.message.trim()) next.message = "Add some context.";
    if ((audienceType === "investor" || audienceType === "partner") && !formState.company.trim()) {
      next.company = "Tell us your organization.";
    }
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    try {
      // TODO: wire to a real contact endpoint (app/api/contact route handler).
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const submitting = status === "submitting";

  return (
    <section id="contact" className="border-t border-surface-border relative">
      {/* Swarm slot: right half on md+; full width on mobile. */}
      <SwarmSlot id="contact" className="absolute inset-0 md:left-1/3" />
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-surface-border" />
      {/* Terminal splice line at bottom */}
      <div className="absolute left-6 md:left-8 bottom-0 w-px h-8 bg-accent/40" />
      <div className="absolute left-[calc(1.5rem-3px)] md:left-[calc(2rem-3px)] bottom-0 w-2 h-2 border border-accent bg-accent/10" />

      <div className="max-w-[1700px] mx-auto px-6 md:px-8 py-20 md:py-28">
        <div className="md:w-1/2 md:mr-auto flex justify-center md:justify-start mask-fade-from-left">
         <div className="w-full max-w-[600px]">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-2 h-2 bg-accent/40 -ml-[calc(2rem+4px)] md:-ml-[calc(3rem+4px)]" />
            <span className="font-mono text-[9px] text-accent tracking-splice-ultra uppercase">
              module::contact
            </span>
            <span className="flex-1 h-px bg-surface-border" />
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
              <div className="flex flex-wrap gap-2 mb-8">
                {AUDIENCE_OPTIONS.map((opt) => (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => setAudienceType(opt.type)}
                    className={cn(
                      "font-mono text-[10px] tracking-splice-ultra uppercase px-3 py-1.5 border transition-colors",
                      audienceType === opt.type
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-surface-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {status === "success" ? (
              <div
                role="status"
                className="border border-accent/30 bg-accent/5 px-5 py-6"
              >
                <p className="font-mono text-[10px] text-accent tracking-splice-ultra uppercase mb-2">
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
                      className="font-mono text-[9px] text-muted-foreground/60 tracking-splice-ultra uppercase block mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formState.name}
                      onChange={(e) => update("name", e.target.value)}
                      disabled={submitting}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className={inputClass}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        className="mt-1.5 font-mono text-[9px] text-destructive tracking-splice-wide uppercase"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="font-mono text-[9px] text-muted-foreground/60 tracking-splice-ultra uppercase block mb-1.5"
                    >
                      Email
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
                        className="mt-1.5 font-mono text-[9px] text-destructive tracking-splice-wide uppercase"
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
                      className="font-mono text-[9px] text-muted-foreground/60 tracking-splice-ultra uppercase block mb-1.5"
                    >
                      {audienceType === "investor" ? "Fund / Organization" : "Company"}
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={formState.company}
                      onChange={(e) => update("company", e.target.value)}
                      disabled={submitting}
                      aria-invalid={!!errors.company}
                      aria-describedby={errors.company ? "contact-company-error" : undefined}
                      className={inputClass}
                      placeholder={audienceType === "investor" ? "Your fund name" : "Your company name"}
                    />
                    {errors.company && (
                      <p
                        id="contact-company-error"
                        className="mt-1.5 font-mono text-[9px] text-destructive tracking-splice-wide uppercase"
                      >
                        {errors.company}
                      </p>
                    )}
                  </div>
                )}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-[9px] text-muted-foreground/60 tracking-splice-ultra uppercase block mb-1.5"
                  >
                    {audienceType === "founder" ? "What you're building" : "Context"}
                  </label>
                  <textarea
                    id="contact-message"
                    value={formState.message}
                    onChange={(e) => update("message", e.target.value)}
                    disabled={submitting}
                    rows={4}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className={`${inputClass} resize-none`}
                    placeholder={currentAudience.placeholder}
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      className="mt-1.5 font-mono text-[9px] text-destructive tracking-splice-wide uppercase"
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
                  className="min-h-[0.75rem] font-mono text-[9px] text-destructive tracking-splice-wide uppercase"
                >
                  {status === "error" &&
                    "Something went wrong — please try again."}
                </p>
                <p className="font-mono text-[9px] text-muted-foreground/60 tracking-splice-wide">
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
