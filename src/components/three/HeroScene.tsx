"use client";

import dynamic from "next/dynamic";

const CoinScene = dynamic(() => import("./CoinScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-pulse-soft rounded-full bg-brand-500/20 blur-2xl" />
    </div>
  ),
});

export function HeroScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <CoinScene />
    </div>
  );
}
