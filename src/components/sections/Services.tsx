"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Banknote, Bitcoin, CheckCheck, Coins, Globe2, Repeat, Wallet2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  {
    icon: Globe2,
    title: "Foreign Exchange",
    desc: "USD, GBP, EUR, NGN and more at transparent rates.",
    accent: "from-brand-500/25 to-brand-700/10",
    pos: "left-[1%] top-[4%] -rotate-6",
  },
  {
    icon: Bitcoin,
    title: "Crypto Trading",
    desc: "BTC, USDT, ETH with fast, verified settlement.",
    accent: "from-gold-500/25 to-gold-500/5",
    pos: "right-[1%] top-[1%] rotate-5",
  },
  {
    icon: Coins,
    title: "Bulk KES Exchange",
    desc: "No volume too large, for individuals or business.",
    accent: "from-mint-500/25 to-mint-500/5",
    pos: "left-[-1%] top-[42%] -rotate-3",
  },
  {
    icon: Wallet2,
    title: "Digital Wallets",
    desc: "Move funds between PayPal, wallets and cash.",
    accent: "from-brand-400/25 to-brand-600/10",
    pos: "right-[-1%] top-[46%] rotate-4",
  },
  {
    icon: Repeat,
    title: "Instant Settlement",
    desc: "Paid out in minutes, not days — every time.",
    accent: "from-gold-400/25 to-brand-700/10",
    pos: "left-[6%] bottom-[2%] rotate-5",
  },
  {
    icon: Banknote,
    title: "Business Rates",
    desc: "Custom bulk pricing for diaspora and frequent traders.",
    accent: "from-mint-400/20 to-brand-500/10",
    pos: "right-[6%] bottom-[0%] -rotate-5",
  },
];

type ChatMessage = { from: "user" | "agent"; text: string };

function buildScript(usdKes: number | null): ChatMessage[] {
  const rate = usdKes ?? 129.32;
  const payout = Math.round(rate * 500).toLocaleString("en-US");
  return [
    { from: "user", text: "Hi! I want to exchange $500 to KES 🙂" },
    {
      from: "agent",
      text: `Live rate right now is 1 USD = ${rate.toFixed(2)} KES — that's KES ${payout} for $500 👍`,
    },
    { from: "user", text: "Perfect, let's do it" },
    { from: "agent", text: "✅ Rate locked. Send to +254 734 786 194 — I'll confirm the moment it lands." },
    { from: "agent", text: `💸 Received! KES ${payout} is on its way to your M-PESA now.` },
  ];
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/50"
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </div>
  );
}

function PhoneMock() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [usdKes, setUsdKes] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const startedRef = useRef(false);
  const rateRef = useRef<number | null>(null);

  useEffect(() => {
    rateRef.current = usdKes;
  }, [usdKes]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/rates", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const row = data?.rates?.find((r: { pair: string }) => r.pair?.startsWith("USD"));
        const parsed = row ? Number(String(row.value).replace(/,/g, "")) : null;
        if (parsed && Number.isFinite(parsed)) setUsdKes(parsed);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!phoneRef.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const play = async () => {
      const script = buildScript(rateRef.current);
      const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
      if (reduceMotion) {
        setVisibleCount(script.length);
        return;
      }
      for (let i = 0; i < script.length; i++) {
        setTyping(true);
        await wait(650 + Math.random() * 400);
        setTyping(false);
        setVisibleCount((c) => c + 1);
        await wait(450);
      }
    };

    const st = ScrollTrigger.create({
      trigger: phoneRef.current,
      start: "top 78%",
      onEnter: () => {
        if (startedRef.current) return;
        startedRef.current = true;
        play();
      },
    });

    return () => st.kill();
  }, []);

  const script = buildScript(usdKes);
  const nextFrom = script[visibleCount]?.from ?? "agent";

  return (
    <div ref={phoneRef} className="relative mx-auto h-[600px] w-[280px] animate-float-slow">
      <div className="absolute inset-0 rounded-[2.75rem] border-[6px] border-[#0d0d10] bg-[#0d0d10] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/10">
        <div className="pointer-events-none absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-[#0d0d10]" />
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.25rem] bg-[#0b141a]">
          <div className="flex shrink-0 items-center gap-3 bg-[#1f2c34] px-4 pb-3 pt-8">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-bold text-white">
              W
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white">WID PAI Trading Hub</div>
              <div className="text-[11px] text-mint-400">online</div>
            </div>
          </div>

          <div
            className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-4"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.03) 0, transparent 40%), radial-gradient(circle at 85% 75%, rgba(255,255,255,0.03) 0, transparent 40%)",
            }}
          >
            {script.slice(0, visibleCount).map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[82%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug shadow-sm",
                  m.from === "user"
                    ? "self-end rounded-br-sm bg-[#005c4b] text-white"
                    : "self-start rounded-bl-sm bg-[#1f2c34] text-white"
                )}
              >
                {m.text}
                {m.from === "user" && (
                  <CheckCheck className="ml-1 mt-1 inline h-3 w-3 text-sky-400" />
                )}
              </div>
            ))}
            {typing && (
              <div
                className={cn(
                  "rounded-2xl bg-[#1f2c34]",
                  nextFrom === "user" ? "self-end rounded-br-sm" : "self-start rounded-bl-sm"
                )}
              >
                <TypingDots />
              </div>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2 border-t border-white/5 bg-[#1f2c34] px-3 py-2.5">
            <div className="flex-1 rounded-full bg-white/10 px-3 py-1.5 text-[11px] text-white/40">
              Type a message
            </div>
            <div className="grid h-7 w-7 place-items-center rounded-full bg-mint-500 text-[#0b141a]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.fromTo(
        headingRef.current,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        heroRef.current,
        { autoAlpha: 0, y: 60, scale: 0.94 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 55%",
            scrub: 0.6,
          },
        }
      );

      if (cards.length) {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 30, scale: 0.85 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top 70%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative isolate overflow-x-clip py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand-600/15 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-5">
        <div ref={headingRef}>
          <SectionHeading
            eyebrow="What We Do"
            title="One exchange desk for every currency you hold."
            description="From cash-in-hand forex to on-chain digital assets, WID PAI Exchange gives you a single, trusted counter to buy and sell it all — right inside a WhatsApp chat."
          />
        </div>

        <div ref={heroRef} className="relative mx-auto mt-16 [transform-origin:center_top] will-change-transform">
          {/* Desktop: phone with floating service cards scattered around it */}
          <div className="relative mx-auto hidden h-[640px] max-w-5xl lg:block">
            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
              <PhoneMock />
            </div>
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={cn("glass-panel absolute z-10 w-[220px] rounded-2xl p-4", s.pos)}
              >
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.accent} ring-1 ring-white/10`}
                >
                  <s.icon className="h-5 w-5 text-white" strokeWidth={1.8} />
                </div>
                <h3 className="mt-3 font-display text-sm font-bold text-white">{s.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/55">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile / tablet: phone up top, services as a simple grid below */}
          <div className="lg:hidden">
            <PhoneMock />
            <StaggerGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.08}>
              {SERVICES.map((s) => (
                <StaggerItem key={s.title}>
                  <div className="glass-panel rounded-2xl p-5">
                    <div
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${s.accent} ring-1 ring-white/10`}
                    >
                      <s.icon className="h-5 w-5 text-white" strokeWidth={1.8} />
                    </div>
                    <h3 className="mt-3 font-display text-base font-bold text-white">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">{s.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
