"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquareText, FileCheck2, ArrowLeftRight, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Accent = "brand" | "gold" | "mint" | "rose";

const ACCENT: Record<Accent, { icon: string; ring: string; dot: string; glow: string }> = {
  brand: { icon: "bg-brand-500/20 text-brand-300", ring: "ring-brand-400/30", dot: "bg-brand-400", glow: "bg-brand-500/25" },
  gold: { icon: "bg-gold-500/20 text-gold-300", ring: "ring-gold-400/30", dot: "bg-gold-400", glow: "bg-gold-500/20" },
  mint: { icon: "bg-mint-500/20 text-mint-300", ring: "ring-mint-400/30", dot: "bg-mint-400", glow: "bg-mint-500/20" },
  rose: { icon: "bg-rose-500/20 text-rose-300", ring: "ring-rose-400/30", dot: "bg-rose-400", glow: "bg-rose-500/20" },
};

const STEPS: { icon: typeof MessageSquareText; title: string; desc: string; accent: Accent }[] = [
  {
    icon: MessageSquareText,
    title: "Chat with us",
    desc: "Message us on WhatsApp with the currency or crypto you want to exchange and how much.",
    accent: "brand",
  },
  {
    icon: FileCheck2,
    title: "Get a locked-in quote",
    desc: "We confirm the live rate and total payout before you send anything — no surprises.",
    accent: "gold",
  },
  {
    icon: ArrowLeftRight,
    title: "Send & we verify",
    desc: "Send your currency or crypto to our verified details. We confirm receipt instantly.",
    accent: "mint",
  },
  {
    icon: PartyPopper,
    title: "Get paid out",
    desc: "Receive your exchanged funds in minutes — straight to your bank, wallet or M-PESA.",
    accent: "rose",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // Desktop: pinned horizontal scroll-jack through 4 full slides.
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeDesktop, setActiveDesktop] = useState(0);

  // Tablet: vertical timeline with a spine that draws in.
  const timelineRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const tabletCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile: native swipeable snap carousel.
  const carouselRef = useRef<HTMLDivElement>(null);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeMobile, setActiveMobile] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Desktop pin-scroll journey.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const track = trackRef.current;
        const pinEl = pinRef.current;
        if (!track || !pinEl) return;
        const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
        const getDistance = () => track.scrollWidth - pinEl.clientWidth;

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinEl,
            start: "top top+=96",
            end: () => "+=" + getDistance(),
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(slides.length - 1, Math.floor(self.progress * slides.length));
              setActiveDesktop(idx);
            },
          },
        });
      }, pinRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // Tablet vertical timeline.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 640px) and (max-width: 1023px)", () => {
      const ctx = gsap.context(() => {
        if (spineRef.current) {
          gsap.fromTo(
            spineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 65%",
                end: "bottom 85%",
                scrub: 0.6,
              },
            }
          );
        }

        const cards = tabletCardRefs.current.filter(Boolean) as HTMLDivElement[];
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { autoAlpha: 0, x: i % 2 === 0 ? -36 : 36 },
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 82%" },
            }
          );
        });
      }, timelineRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // Mobile carousel reveal.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const mm = gsap.matchMedia();
    mm.add("(max-width: 639px)", () => {
      const ctx = gsap.context(() => {
        const cards = mobileCardRefs.current.filter(Boolean) as HTMLDivElement[];
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: carouselRef.current, start: "top 85%" },
          }
        );
      }, carouselRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // Track which mobile card is centered so the progress dots stay in sync
  // with the user's swipe.
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.scrollWidth / STEPS.length;
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveMobile(Math.min(STEPS.length - 1, Math.max(0, idx)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  function goToMobileCard(i: number) {
    const el = carouselRef.current;
    const card = mobileCardRefs.current[i];
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - 20, behavior: "smooth" });
  }

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="noise-overlay relative isolate z-20 -mt-10 scroll-mt-24 overflow-x-clip rounded-t-[2.5rem] bg-cream pb-20 pt-16 text-ink sm:-mt-16 sm:rounded-t-[3rem] sm:pb-28 sm:pt-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
      <div className="pointer-events-none absolute left-[-10%] top-10 -z-10 h-72 w-72 rounded-full bg-brand-200/40 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-8%] top-1/3 -z-10 h-72 w-72 rounded-full bg-gold-300/25 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5">
        <div ref={headingRef} className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-ink/70">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            The Process
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl">
            Four steps. A few minutes. Done.
          </h2>
        </div>
      </div>

      {/* Desktop: pinned horizontal scroll-jack */}
      <div className="relative mt-16 hidden lg:block">
        <div ref={pinRef} className="mx-auto max-w-7xl px-5">
          <div className="mb-8 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">
              Step {String(activeDesktop + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              {STEPS.map((s, i) => (
                <span
                  key={s.title}
                  className={cn(
                    "h-1.5 w-10 rounded-full transition-colors duration-300",
                    i <= activeDesktop ? ACCENT[s.accent].dot : "bg-ink/10"
                  )}
                />
              ))}
            </div>
          </div>

          <div className="overflow-hidden">
            <div ref={trackRef} className="flex w-max gap-8">
              {STEPS.map((step, i) => (
                <div
                  key={step.title}
                  ref={(el) => {
                    slideRefs.current[i] = el;
                  }}
                  className="w-[640px] shrink-0 xl:w-[760px]"
                >
                  <div className="relative overflow-hidden rounded-[2.5rem] bg-ink-elevated p-12 shadow-[0_40px_90px_-30px_rgba(15,8,25,0.5)] ring-1 ring-white/10">
                    <span
                      className={cn(
                        "pointer-events-none absolute -right-10 -top-14 -z-0 h-72 w-72 rounded-full blur-[100px]",
                        ACCENT[step.accent].glow
                      )}
                    />
                    <span className="pointer-events-none absolute -right-6 -top-16 select-none font-display text-[13rem] font-black leading-none text-white/[0.04]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className={cn(
                        "relative grid h-20 w-20 place-items-center rounded-3xl ring-1",
                        ACCENT[step.accent].icon,
                        ACCENT[step.accent].ring
                      )}
                    >
                      <step.icon className="h-9 w-9" strokeWidth={1.6} />
                    </div>
                    <h3 className="relative mt-8 font-display text-4xl font-bold text-white">{step.title}</h3>
                    <p className="relative mt-4 max-w-md text-lg leading-relaxed text-white/60">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tablet: vertical alternating timeline with a spine that draws in */}
      <div className="mx-auto mt-16 hidden max-w-3xl px-5 sm:block lg:hidden">
        <div ref={timelineRef} className="relative">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink/10">
            <div
              ref={spineRef}
              className="h-full w-full origin-top bg-gradient-to-b from-brand-500 via-gold-400 to-rose-400"
            />
          </div>

          <div className="relative space-y-10">
            {STEPS.map((step, i) => (
              <div key={step.title} className={cn("flex items-center gap-6", i % 2 === 1 && "flex-row-reverse")}>
                <div
                  ref={(el) => {
                    tabletCardRefs.current[i] = el;
                  }}
                  className="w-[calc(50%-2rem)] rounded-3xl bg-ink-elevated p-6 shadow-xl ring-1 ring-white/10"
                >
                  <div
                    className={cn(
                      "grid h-12 w-12 place-items-center rounded-2xl ring-1",
                      ACCENT[step.accent].icon,
                      ACCENT[step.accent].ring
                    )}
                  >
                    <step.icon className="h-5 w-5" strokeWidth={1.7} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">{step.desc}</p>
                </div>
                <div className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink-elevated font-display text-sm font-bold text-white ring-4 ring-cream">
                  {i + 1}
                </div>
                <div className="w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: swipeable snap carousel */}
      <div className="mt-14 sm:hidden">
        <div
          ref={carouselRef}
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              ref={(el) => {
                mobileCardRefs.current[i] = el;
              }}
              className="w-[82vw] shrink-0 snap-center rounded-3xl bg-ink-elevated p-7 shadow-xl ring-1 ring-white/10"
            >
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "grid h-14 w-14 place-items-center rounded-2xl ring-1",
                    ACCENT[step.accent].icon,
                    ACCENT[step.accent].ring
                  )}
                >
                  <step.icon className="h-6 w-6" strokeWidth={1.7} />
                </div>
                <span className="font-display text-3xl font-black text-white/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Go to step ${i + 1}`}
              onClick={() => goToMobileCard(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeMobile ? cn("w-6", ACCENT[s.accent].dot) : "w-1.5 bg-ink/15"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
