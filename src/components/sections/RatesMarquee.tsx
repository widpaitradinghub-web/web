"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, TrendingDown, Zap, Eye, MessageCircle } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RateRow = { pair: string; value: string; trend: "up" | "down" };

const FALLBACK_RATES: RateRow[] = [
  { pair: "USD → KES", value: "128.40", trend: "up" },
  { pair: "NGN → KES", value: "0.087", trend: "down" },
  { pair: "BTC → KES", value: "8,942,300", trend: "up" },
  { pair: "USDT → KES", value: "129.10", trend: "up" },
  { pair: "ETH → KES", value: "312,880", trend: "down" },
  { pair: "GBP → KES", value: "163.75", trend: "up" },
  { pair: "EUR → KES", value: "139.20", trend: "up" },
];

const FEATURES = [
  {
    index: "01",
    icon: Zap,
    title: "Instant match",
    desc: "Send your details on WhatsApp and get matched with a live, locked-in rate in seconds.",
  },
  {
    index: "02",
    icon: Eye,
    title: "100% transparent",
    desc: "See the exact rate and fees upfront before you commit — no hidden markups, ever.",
  },
  {
    index: "03",
    icon: MessageCircle,
    title: "Direct chat",
    desc: "Talk straight to a real person, confirm your exchange, and get paid — no middlemen.",
  },
];

function RateTicker({ pair, value, trend }: RateRow) {
  const up = trend === "up";
  const Trend = up ? TrendingUp : TrendingDown;
  return (
    <div className="flex shrink-0 items-baseline gap-2.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{pair}</span>
      <span className="font-display text-lg font-bold text-white sm:text-xl">{value}</span>
      <Trend className={cn("h-3.5 w-3.5", up ? "text-mint-400" : "text-rose-400")} />
    </div>
  );
}

export function RatesMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [rates, setRates] = useState<RateRow[]>(FALLBACK_RATES);
  const [live, setLive] = useState(false);

  // Live rates — polled from our own API route, which in turn pulls live
  // crypto (CoinGecko) and forex (open.er-api.com) prices and converts them
  // to KES. Falls back to indicative static rates if either upstream fails.
  useEffect(() => {
    let cancelled = false;

    async function loadRates() {
      try {
        const res = await fetch("/api/rates", { cache: "no-store" });
        const data = await res.json();
        if (cancelled || !Array.isArray(data?.rates)) return;
        setRates(data.rates);
        setLive(Boolean(data.live));
      } catch {
        // Keep whatever we last had (fallback or a previous live snapshot).
      }
    }

    loadRates();
    const interval = setInterval(loadRates, 60_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  // Transformation-in: the header settles into place as this section rises
  // up from behind the hero, continuing the same scroll gesture rather than
  // just appearing.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { autoAlpha: 0, y: 56, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 60%",
            scrub: 0.6,
          },
        }
      );

      // A second, faster-settling reveal layered on top of the parent
      // transform — the eyebrow, headline and copy arrive in their own
      // staggered beat once the section is mostly in view.
      gsap.fromTo(
        [eyebrowRef.current, titleRef.current, descRef.current],
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        tickerRef.current,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tickerRef.current,
            start: "top 92%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Pinned chapter scrollytelling — desktop only. The three feature panels
  // cross-fade in place as the user scrolls through a pinned viewport.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const chapters = chapterRefs.current.filter(Boolean) as HTMLDivElement[];
        if (chapters.length < 2) return;

        gsap.set(chapters, { autoAlpha: 0, y: 18 });
        gsap.set(chapters[0], { autoAlpha: 1, y: 0 });

        const setChapter = (idx: number) => {
          if (activeRef.current === idx) return;
          const prev = activeRef.current;
          activeRef.current = idx;
          setActive(idx);
          gsap.to(chapters[prev], { autoAlpha: 0, y: -18, duration: 0.45, ease: "power2.out" });
          gsap.fromTo(
            chapters[idx],
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        };

        stRef.current = ScrollTrigger.create({
          trigger: pinRef.current,
          start: "top 100px",
          end: "+=160%",
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const idx = Math.min(chapters.length - 1, Math.floor(self.progress * chapters.length));
            setChapter(idx);
          },
        });
      }, pinRef);

      return () => {
        stRef.current = null;
        ctx.revert();
      };
    });

    return () => mm.revert();
  }, []);

  // Mobile / tablet — no pin, so each chapter just gets its own reveal as it
  // scrolls into view.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const mm = gsap.matchMedia();
    mm.add("(max-width: 1023px)", () => {
      const ctx = gsap.context(() => {
        const chapters = chapterRefs.current.filter(Boolean) as HTMLDivElement[];
        chapters.forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 26 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 88%" },
            }
          );
        });
      }, pinRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  function goToChapter(i: number) {
    const st = stRef.current;
    if (st) {
      const target = st.start + (st.end - st.start) * ((i + 0.15) / FEATURES.length);
      window.scrollTo({ top: target, behavior: "smooth" });
    } else {
      chapterRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <section
      ref={sectionRef}
      id="rates"
      className="noise-overlay relative isolate z-20 -mt-10 scroll-mt-24 overflow-x-clip rounded-t-[2.5rem] border-t border-white/10 bg-ink-elevated pb-16 pt-16 shadow-[0_-40px_90px_-40px_rgba(0,0,0,0.65)] sm:-mt-16 sm:rounded-t-[3rem] sm:pb-24 sm:pt-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-brand-600/20 blur-[120px] animate-float-slow" />
      <div className="pointer-events-none absolute -right-16 top-40 -z-10 h-64 w-64 rounded-full bg-gold-500/10 blur-[110px] animate-float" />

      <div className="relative mx-auto max-w-7xl px-5">
        <div ref={headerRef} className="[transform-origin:center_top] will-change-transform">
          <span
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-brand-200"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            The WID PAI Experience
          </span>
          <h2
            ref={titleRef}
            className="mt-5 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            Built for speed. Priced in the open.
          </h2>
          <p ref={descRef} className="mt-4 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            No queues, no confusing forms — just a live rate, a real person, and a payout in minutes.
          </p>
        </div>

        <div ref={pinRef} className="mt-16 lg:mt-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.3fr] lg:items-center lg:gap-16">
            <ol className="hidden lg:block lg:space-y-6">
              {FEATURES.map((f, i) => (
                <li key={f.title}>
                  <button
                    type="button"
                    onClick={() => goToChapter(i)}
                    className={cn(
                      "flex items-center gap-3 text-left transition-colors duration-300",
                      i === active ? "text-white" : "text-white/30 hover:text-white/55"
                    )}
                  >
                    <span className="font-mono text-xs">{f.index}</span>
                    <span className="text-lg font-bold">{f.title}</span>
                  </button>
                </li>
              ))}
            </ol>

            <div className="relative lg:h-[320px]">
              {FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  ref={(el) => {
                    chapterRefs.current[i] = el;
                  }}
                  className={cn("relative lg:absolute lg:inset-0", i !== 0 && "mt-6 lg:mt-0")}
                >
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-8 sm:p-10">
                    <span className="pointer-events-none absolute -right-4 -top-12 select-none font-display text-[9rem] font-black leading-none text-white/[0.04]">
                      {f.index}
                    </span>
                    <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-brand-500/15 text-brand-300">
                      <f.icon className="h-6 w-6" />
                    </div>
                    <h3 className="relative mt-6 font-display text-2xl font-bold text-white">{f.title}</h3>
                    <p className="relative mt-3 max-w-md text-base leading-relaxed text-white/60">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={tickerRef} className="relative mt-20 border-y border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-3.5">
          <span
            className={cn(
              "flex shrink-0 items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em]",
              live ? "text-mint-400" : "text-white/35"
            )}
          >
            <span className="relative flex h-2 w-2">
              {live && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-400 opacity-75" />
              )}
              <span className={cn("relative inline-flex h-2 w-2 rounded-full", live ? "bg-mint-400" : "bg-white/35")} />
            </span>
            {live ? "Live" : "Indicative"}
          </span>
          <div className="hidden h-4 w-px shrink-0 bg-white/10 sm:block" />
          <Marquee className="flex-1">
            {rates.map((r) => (
              <RateTicker key={r.pair} {...r} />
            ))}
          </Marquee>
        </div>
      </div>
      <p className="mt-6 px-5 text-center text-xs text-white/35">
        Indicative rates only — chat with us on WhatsApp for a live, locked-in quote.
      </p>
    </section>
  );
}
