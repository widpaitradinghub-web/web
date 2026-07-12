"use client";

import { Check, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll, StaggerGroup, StaggerItem } from "@/components/ui/RevealOnScroll";
import { SITE, waLink } from "@/lib/utils";

const FEATURES = [
  "We buy shillings (KES) in bulk",
  "We trade all valuable crypto — BTC, ETH, USDT",
  "We sell shillings (KES) at competitive rates",
  "Secure PayPal & digital wallet transfers",
];

const ASSETS = [
  { symbol: "₿", name: "Bitcoin", code: "BTC", change: "+2.4%", up: true, color: "from-gold-400 to-gold-500" },
  { symbol: "Ξ", name: "Ethereum", code: "ETH", change: "-1.1%", up: false, color: "from-brand-400 to-brand-600" },
  { symbol: "₮", name: "Tether", code: "USDT", change: "+0.1%", up: true, color: "from-mint-400 to-mint-500" },
  { symbol: "K", name: "Shilling", code: "KES", change: "+0.6%", up: true, color: "from-brand-300 to-brand-500" },
];

export function CryptoShowcase() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <GlassCard className="overflow-hidden p-8 sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-brand-500/25 blur-[110px]" />
          <div className="relative grid items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Chat WID"
                title="Trade crypto & shillings with one trusted desk."
                description="Whether you're moving bulk KES or converting digital assets, WID PAI Exchange keeps every trade fast, transparent and secure."
              />

              <ul className="mt-8 space-y-3">
                {FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/75">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint-500/20 text-mint-400">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                <Button
                  href={waLink(SITE.whatsappPrimary, "Hi WID, I'd like to trade crypto / KES.")}
                  variant="primary"
                  size="lg"
                  icon={<MessageCircle className="h-5 w-5" />}
                >
                  Send a Chat
                </Button>
              </div>
            </div>

            <StaggerGroup className="grid grid-cols-2 gap-4" stagger={0.08}>
              {ASSETS.map((a) => (
                <StaggerItem key={a.code}>
                  <RevealOnScroll className="h-full">
                    <div className="glass-panel flex h-full flex-col justify-between rounded-2xl p-5">
                      <div className="flex items-center justify-between">
                        <div
                          className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${a.color} font-display text-lg font-bold text-ink`}
                        >
                          {a.symbol}
                        </div>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            a.up ? "bg-mint-500/15 text-mint-400" : "bg-rose-500/15 text-rose-400"
                          }`}
                        >
                          {a.change}
                        </span>
                      </div>
                      <div className="mt-6">
                        <div className="font-display text-base font-bold text-white">{a.code}</div>
                        <div className="text-xs text-white/50">{a.name}</div>
                      </div>
                    </div>
                  </RevealOnScroll>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
