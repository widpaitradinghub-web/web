"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lock, ShieldCheck, Zap, Headset } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Leaf } from "@/components/logo/Leaf";

const POINTS = [
  {
    icon: Lock,
    title: "Bank-grade security",
    desc: "Every transaction is verified end-to-end before funds move — your money is protected at every step.",
  },
  {
    icon: Zap,
    title: "Unbelievable rates",
    desc: "We monitor global markets to offer some of the most competitive forex and crypto rates around.",
  },
  {
    icon: ShieldCheck,
    title: "Fully transparent",
    desc: "No hidden fees. You see the exact rate and payout before you commit to any exchange.",
  },
  {
    icon: Headset,
    title: "Real humans, 24/7",
    desc: "Reach a real person on WhatsApp any time — day or night — for quotes and support.",
  },
];

const CHIPS = [
  { label: "$", top: "6%", left: "68%", delay: 0 },
  { label: "£", top: "70%", left: "72%", delay: 0.6 },
  { label: "€", top: "12%", left: "10%", delay: 1.2 },
  { label: "₿", top: "66%", left: "6%", delay: 1.8 },
];

export function WhyUs() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-18, 0, 18]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);

  return (
    <section id="why-us" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Why WID PAI"
              title="With WID, your money moves safely."
              description="The smarter way to exchange and invest with confidence — trusted by traders, travellers and businesses across Kenya."
            />

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {POINTS.map((p, i) => (
                <RevealOnScroll key={p.title} delay={i * 0.08}>
                  <div className="flex gap-4">
                    <div className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/15 ring-1 ring-brand-400/30">
                      <p.icon className="h-5 w-5 text-brand-300" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-white">{p.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/60">{p.desc}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          <div
            ref={cardRef}
            className="relative mx-auto aspect-square w-full max-w-[440px]"
            style={{ perspective: 1400 }}
          >
            <motion.div
              style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
              className="relative h-full w-full"
            >
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-brand-600/30 to-transparent blur-3xl" />
              <div className="glass-panel noise-overlay relative flex h-full w-full items-center justify-center overflow-hidden rounded-[3rem]">
                <Leaf size={64} className="absolute left-6 top-6 text-brand-300/40" />
                <Leaf size={40} className="absolute bottom-8 right-8 rotate-45 text-gold-400/30" />

                <div className="relative grid h-40 w-40 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 shadow-[0_0_80px_-10px_rgba(138,63,252,0.8)]">
                  <ShieldCheck className="h-16 w-16 text-white" strokeWidth={1.4} />
                  <span className="absolute inset-0 animate-pulse-soft rounded-full ring-4 ring-brand-300/40" />
                </div>

                {CHIPS.map((c) => (
                  <motion.div
                    key={c.label}
                    className="glass-panel absolute grid h-14 w-14 place-items-center rounded-2xl font-display text-xl font-bold text-gold-300"
                    style={{ top: c.top, left: c.left }}
                    animate={{ y: [0, -14, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, delay: c.delay, ease: "easeInOut" }}
                  >
                    {c.label}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
