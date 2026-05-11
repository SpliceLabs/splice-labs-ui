import { useState } from "react";
import { SwarmSlot } from "./swarm/SwarmSlot";

export function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

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
                Link Up With Us
              </h2>
              <p className="text-sm text-foreground/70 leading-relaxed mb-8">
                If you need a prototype that has to work, send context. We'll tell you quickly if it fits.
              </p>

              {/* Visual flourish — connection map */}
              <div className="hidden md:block space-y-2">
                {["Define → Prototype → Ship", "Scope → Build → Audit", "Align → Execute → Deliver"].map((flow, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent/20" />
                    <span className="font-mono text-[9px] text-muted-foreground/60 tracking-splice-wide">
                      {flow}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label className="font-mono text-[9px] text-muted-foreground/60 tracking-splice-ultra uppercase block mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-transparent border border-surface-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-mono text-[9px] text-muted-foreground/60 tracking-splice-ultra uppercase block mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-transparent border border-surface-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="font-mono text-[9px] text-muted-foreground/60 tracking-splice-ultra uppercase block mb-1.5">
                  What you're building
                </label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent border border-surface-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Describe your project or challenge"
                />
              </div>
              <button
                type="submit"
                className="font-mono text-xs tracking-splice-wide uppercase bg-accent text-accent-foreground px-6 py-3 hover:bg-accent/90 transition-colors"
              >
                Send
              </button>
              <p className="font-mono text-[9px] text-muted-foreground/60 tracking-splice-wide">
                No spam. If it's not a fit, we'll say so.
              </p>
            </form>
          </div>
         </div>
        </div>
      </div>
    </section>
  );
}
