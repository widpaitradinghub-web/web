"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lock, ShieldCheck, Zap, Headset, TrendingUp, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Accent = "brand" | "gold" | "mint" | "rose";

const ACCENT: Record<Accent, { icon: string; ring: string }> = {
  brand: { icon: "bg-brand-500/15 text-brand-300", ring: "ring-brand-400/30" },
  gold: { icon: "bg-gold-500/15 text-gold-300", ring: "ring-gold-400/30" },
  mint: { icon: "bg-mint-500/15 text-mint-300", ring: "ring-mint-400/30" },
  rose: { icon: "bg-rose-500/15 text-rose-300", ring: "ring-rose-400/30" },
};

const POINTS: { icon: typeof Lock; title: string; desc: string; accent: Accent }[] = [
  {
    icon: Lock,
    title: "Bank-grade security",
    desc: "Every transaction is verified end-to-end before funds move — your money is protected at every step.",
    accent: "brand",
  },
  {
    icon: Zap,
    title: "Unbelievable rates",
    desc: "We monitor global markets to offer some of the most competitive forex and crypto rates around.",
    accent: "gold",
  },
  {
    icon: ShieldCheck,
    title: "Fully transparent",
    desc: "No hidden fees. You see the exact rate and payout before you commit to any exchange.",
    accent: "mint",
  },
  {
    icon: Headset,
    title: "Real humans, 24/7",
    desc: "Reach a real person on WhatsApp any time — day or night — for quotes and support.",
    accent: "rose",
  },
];

const STATS = [
  { icon: TrendingUp, label: "10K+ exchanges", top: "4%", left: "54%", delay: 0 },
  { icon: Clock3, label: "< 5 min payouts", top: "70%", left: "50%", delay: 0.5 },
  { icon: Headset, label: "24/7 support", top: "10%", left: "6%", delay: 1 },
  { icon: ShieldCheck, label: "Bank-grade security", top: "68%", left: "2%", delay: 1.5 },
];

export function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const pointRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-18, 0, 18]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      const points = pointRefs.current.filter(Boolean) as HTMLDivElement[];
      if (points.length) {
        gsap.fromTo(
          points,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: points[0], start: "top 85%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="noise-overlay relative isolate z-20 -mt-10 scroll-mt-24 overflow-hidden overflow-x-clip rounded-t-[2.5rem] bg-ink pb-24 pt-16 shadow-[0_-40px_90px_-40px_rgba(0,0,0,0.65)] sm:-mt-16 sm:rounded-t-[3rem] sm:pb-32 sm:pt-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="pointer-events-none absolute -left-20 top-1/4 -z-10 h-80 w-80 rounded-full bg-brand-600/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-16 bottom-0 -z-10 h-72 w-72 rounded-full bg-gold-500/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <div ref={headingRef} className="will-change-transform">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-brand-200">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                Why WID PAI
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                With WID, your money moves safely.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                The smarter way to exchange and invest with confidence — trusted by traders, travellers and
                businesses across Kenya.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {POINTS.map((p, i) => (
                <div
                  key={p.title}
                  ref={(el) => {
                    pointRefs.current[i] = el;
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:bg-white/[0.06]"
                >
                  <div
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-xl ring-1",
                      ACCENT[p.accent].icon,
                      ACCENT[p.accent].ring
                    )}
                  >
                    <p.icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-white">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">{p.desc}</p>
                </div>
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
              <div className="glass-panel relative flex h-full w-full items-center justify-center overflow-hidden rounded-[3rem]">
                <div
                  className="absolute inset-0 opacity-[0.4]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                    maskImage: "radial-gradient(circle at center, black, transparent 75%)",
                  }}
                />

                <div className="relative grid h-40 w-40 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 shadow-[0_0_80px_-10px_rgba(138,63,252,0.8)]">
                  <ShieldCheck className="h-16 w-16 text-white" strokeWidth={1.4} />
                  <span className="absolute inset-0 animate-pulse-soft rounded-full ring-4 ring-brand-300/40" />
                </div>

                {STATS.map((s) => (
                  <motion.div
                    key={s.label}
                    className="glass-panel absolute flex items-center gap-2 whitespace-nowrap rounded-2xl px-3.5 py-2.5"
                    style={{ top: s.top, left: s.left }}
                    animate={{ y: [0, -14, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
                  >
                    <s.icon className="h-4 w-4 text-gold-300" strokeWidth={1.8} />
                    <span className="font-display text-xs font-bold text-white">{s.label}</span>
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
