"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Leaf } from "@/components/logo/Leaf";
import { SITE, waLink } from "@/lib/utils";

export function CTA() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-600 via-brand-700 to-ink-elevated p-10 text-center sm:p-16">
            <div className="pointer-events-none absolute inset-0 noise-overlay" />
            <Leaf size={220} className="pointer-events-none absolute -left-16 -top-16 text-white/[0.06]" />
            <Leaf size={260} className="pointer-events-none absolute -bottom-20 -right-16 rotate-45 text-white/[0.06]" />

            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                Ready to exchange with confidence?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/70">
                Message us now for a live quote — real people, real rates, real fast.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button
                  href={waLink(SITE.whatsappPrimary, "Hi WID PAI Exchange, I'd like a quote.")}
                  variant="whatsapp"
                  size="lg"
                  icon={<MessageCircle className="h-5 w-5" />}
                >
                  Send a Chat
                </Button>
              </div>

              <p className="mt-6 text-sm text-white/60">{SITE.whatsappPrimaryDisplay}</p>

              <p className="mt-4 text-sm font-medium uppercase tracking-[0.3em] text-white/50">
                Follow {SITE.social} on TikTok · Instagram · X
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
