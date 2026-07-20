"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { SITE, waLink } from "@/lib/utils";

const HIGHLIGHTS = [
  "10K+ exchanges completed",
  "Average payout under 5 minutes",
  "2x faster than the market",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex min-h-screen items-start overflow-hidden bg-cream pb-10 pt-28 text-ink sm:pt-32"
    >
      {/* Ambient light-hero backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-cream" />
        <div className="absolute left-1/2 top-[-10%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-[140px]" />
        <div className="absolute right-[-10%] top-[15%] h-[360px] w-[360px] rounded-full bg-gold-300/25 blur-[130px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,252,245,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,252,245,0.3) 1px, transparent 1px)",
            backgroundSize: "6px 6px",
          }}
        />
      </div>

      {/* Noise overlay — sits above the text and images so the grain reads across the whole section */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,252,245,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,252,245,0.45) 1px, transparent 1px)",
          backgroundSize: "6px 6px",
          mixBlendMode: "screen",
          opacity: 0.3,
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-8 px-5 lg:grid-cols-[0.85fr_1.3fr_0.85fr] lg:gap-6">
        <div className="flex h-full flex-col justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="text-6xl font-black leading-[0.98] tracking-tight text-balance text-ink sm:text-7xl lg:text-[5rem]"
          >
            Solution
            <br />
            to your
            <br />
            <span className="inline-block rounded-xl bg-brand-200/80 px-2.5 py-0.5 text-ink">
              FX
            </span>{" "}
            needs
          </motion.h1>

          <motion.ul
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5 flex flex-col gap-2"
          >
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-ink/70">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-[4/5.6] w-full max-w-[380px] lg:aspect-auto lg:h-[640px] lg:max-w-[600px]"
        >
          <HeroVisual sectionRef={sectionRef} />
        </motion.div>

        <div className="flex h-full flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-sm leading-relaxed text-ink/65"
          >
            WID PAI Exchange buys and sells foreign currencies and digital assets —
            BTC, USDT, ETH and more — at unbelievable rates, with secure, verified
            settlement in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-5 flex flex-col items-stretch gap-2.5"
          >
            <Button
              href={waLink(SITE.whatsappPrimary, "Hi WID PAI Exchange, I'd like to make an exchange.")}
              variant="whatsapp"
              size="md"
              className="justify-center"
              icon={<MessageCircle className="h-4 w-4" />}
            >
              Send a Chat
            </Button>
            <Button
              href="#services"
              variant="outline"
              size="md"
              external={false}
              className="justify-center"
              icon={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            >
              Explore Services
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
