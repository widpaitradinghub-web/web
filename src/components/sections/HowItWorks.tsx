"use client";

import { MessageSquareText, FileCheck2, ArrowLeftRight, PartyPopper } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/RevealOnScroll";

const STEPS = [
  {
    icon: MessageSquareText,
    title: "Chat with us",
    desc: "Message us on WhatsApp with the currency or crypto you want to exchange and how much.",
  },
  {
    icon: FileCheck2,
    title: "Get a locked-in quote",
    desc: "We confirm the live rate and total payout before you send anything — no surprises.",
  },
  {
    icon: ArrowLeftRight,
    title: "Send & we verify",
    desc: "Send your currency or crypto to our verified details. We confirm receipt instantly.",
  },
  {
    icon: PartyPopper,
    title: "Get paid out",
    desc: "Receive your exchanged funds in minutes — straight to your bank, wallet or M-PESA.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="The Process"
          title="Four steps. A few minutes. Done."
          align="center"
          className="mx-auto"
        />

        <StaggerGroup className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />
          {STEPS.map((step, i) => (
            <StaggerItem key={step.title} className="relative">
              <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-ink-elevated shadow-lg shadow-black/30">
                  <step.icon className="h-7 w-7 text-brand-300" strokeWidth={1.8} />
                  <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
