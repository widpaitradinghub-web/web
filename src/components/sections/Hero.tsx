"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LeafMotif } from "@/components/ui/LeafMotif";
import { HeroScene } from "@/components/three/HeroScene";
import { SITE, waLink } from "@/lib/utils";

const STATS = [
  { value: "10K+", label: "Exchanges Completed" },
  { value: "< 5 min", label: "Average Payout Time" },
  { value: "24/7", label: "Always Available" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -22]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
      {/* Ambient gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-brand-600/30 blur-[140px]" />
        <div className="absolute right-[-10%] top-[20%] h-[380px] w-[380px] rounded-full bg-gold-500/15 blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[-10%] h-[420px] w-[420px] rounded-full bg-mint-500/10 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 20%, black, transparent)",
          }}
        />
        <LeafMotif />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Your safe &amp; fast solution
            <br />
            to all your{" "}
            <span className="gradient-text">foreign exchange</span> needs.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
          >
            WID PAI Exchange buys and sells foreign currencies and digital assets —
            BTC, USDT, ETH and more — at unbelievable rates, with secure, verified
            settlement in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button
              href={waLink(SITE.whatsappPrimary, "Hi WID PAI Exchange, I'd like to make an exchange.")}
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle className="h-5 w-5" />}
            >
              Send a Chat
            </Button>
            <Button href="#services" variant="ghost" size="lg" external={false} icon={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}>
              Explore Services
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/55"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-mint-400" /> Verified &amp; secure
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-gold-400" /> Instant payouts
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-white/50 sm:text-sm">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1200 }}
          className="relative mx-auto aspect-square w-full max-w-[560px]"
        >
          <motion.div
            style={{ rotateX, scale: sceneScale, y: sceneY, opacity: sceneOpacity }}
            className="h-full w-full"
          >
            <HeroScene className="h-full w-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
