"use client";

import Image from "next/image";
import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Sparkles, Briefcase, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type HeroVisualProps = {
  sectionRef: RefObject<HTMLElement | null>;
  className?: string;
};

export function HeroVisual({ sectionRef, className }: HeroVisualProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardBackRef = useRef<HTMLDivElement>(null);
  const cardFrontRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(cardBackRef.current, { rotation: 4 });
      gsap.set(cardFrontRef.current, { rotation: -3 });

      // Continuous, gentle float — runs until the user starts scrolling.
      const floatTl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });
      floatTl
        .to(cardBackRef.current, { y: -10, rotation: 5.5, duration: 3.2 }, 0)
        .to(cardFrontRef.current, { y: 8, rotation: -4.5, duration: 3.6 }, 0.15);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          if (self.progress > 0.02) {
            if (!floatTl.paused()) floatTl.pause();
          } else if (floatTl.paused()) {
            floatTl.play();
          }
        },
      });

      // Scroll-scrubbed retreat — the cards sink, shrink and fade so they
      // read as tucking away behind the section that follows the hero.
      gsap.to(wrapRef.current, {
        y: 260,
        scale: 0.74,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <div ref={wrapRef} className={cn("h-full", className)}>
      <div
        className="relative mx-auto h-full w-full max-w-[600px]"
        style={{ filter: "drop-shadow(0 40px 70px rgba(60,40,90,0.4))" }}
      >
        <div
          ref={cardBackRef}
          className="absolute right-[9%] top-0 aspect-[3.1/4.7] h-[70%]"
          style={{ transform: "rotate(3deg)" }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[1.75rem]">
            <Image
              src="/images/widpai-hero2.png"
              alt="Business client confirming a WID PAI exchange"
              fill
              priority
              quality={95}
              sizes="(min-width: 1024px) 480px, 70vw"
              className="object-cover object-[46%_42%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -top-3 right-2 flex rotate-3 items-center gap-1.5 whitespace-nowrap rounded-full bg-ink px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-md">
            <Briefcase className="h-3 w-3" /> For businesses
          </div>
          <div className="absolute -right-6 top-[20%] flex items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-100 px-3 py-1.5 text-[10px] font-semibold text-ink shadow-lg">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-600" /> Verified &amp; secure
          </div>
        </div>

        <div
          ref={cardFrontRef}
          className="absolute left-[3%] top-0 aspect-[3.1/4.7] h-[68%]"
          style={{ transform: "rotate(-3deg)" }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[1.75rem]">
            <Image
              src="/images/widpai-hero1.png"
              alt="Customer chatting with WID PAI Exchange to exchange currency"
              fill
              priority
              quality={95}
              sizes="(min-width: 1024px) 480px, 70vw"
              className="object-cover object-[60%_46%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -top-3 left-2 flex -rotate-3 items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-600 px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-md">
            <UserRound className="h-3 w-3" /> For individuals
          </div>
          <div className="absolute -bottom-3 left-0 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-ink shadow-lg">
            <Sparkles className="h-3.5 w-3.5 text-brand-600" /> Payout confirmed
          </div>
        </div>
      </div>
    </div>
  );
}
