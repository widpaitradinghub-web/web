"use client";

import { Banknote, Bitcoin, Coins, Globe2, Repeat, Wallet2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { StaggerGroup, StaggerItem } from "@/components/ui/RevealOnScroll";
import { Leaf } from "@/components/logo/Leaf";

const SERVICES = [
  {
    icon: Globe2,
    title: "Foreign Exchange",
    desc: "Buy and sell major foreign currencies — USD, GBP, EUR, NGN and more — at competitive, transparent rates.",
    accent: "from-brand-500/25 to-brand-700/10",
  },
  {
    icon: Bitcoin,
    title: "Crypto Trading",
    desc: "We trade all valuable cryptocurrency — BTC, USDT, ETH — with fast, verified settlement.",
    accent: "from-gold-500/25 to-gold-500/5",
  },
  {
    icon: Coins,
    title: "Bulk KES Exchange",
    desc: "We buy and sell Kenyan Shillings in bulk for individuals and businesses, no volume too large.",
    accent: "from-mint-500/25 to-mint-500/5",
  },
  {
    icon: Wallet2,
    title: "Digital Wallets & PayPal",
    desc: "Move funds between PayPal, digital wallets and local currency with secure, verified transfers.",
    accent: "from-brand-400/25 to-brand-600/10",
  },
  {
    icon: Repeat,
    title: "Instant Settlement",
    desc: "Get paid out in minutes, not days — every trade is confirmed and settled fast.",
    accent: "from-gold-400/25 to-brand-700/10",
  },
  {
    icon: Banknote,
    title: "Personal & Business Rates",
    desc: "Custom bulk rates for businesses, diaspora remittances, and frequent traders.",
    accent: "from-mint-400/20 to-brand-500/10",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="What We Do"
          title="One exchange desk for every currency you hold."
          description="From cash-in-hand forex to on-chain digital assets, WID PAI Exchange gives you a single, trusted counter to buy and sell it all."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {SERVICES.map((s) => (
            <StaggerItem key={s.title}>
              <GlassCard className="group h-full transition-transform duration-300 hover:-translate-y-1.5">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} ring-1 ring-white/10`}
                >
                  <s.icon className="h-6 w-6 text-white" strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/60">{s.desc}</p>
                <Leaf
                  size={72}
                  className="pointer-events-none absolute -bottom-4 -right-4 text-white opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.08]"
                />
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
