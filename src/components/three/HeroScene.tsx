"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const CoinScene = dynamic(() => import("./CoinScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-pulse-soft rounded-full bg-brand-500/20 blur-2xl" />
    </div>
  ),
});

const QUERY = "(min-width: 768px)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function HeroScene({ className }: { className?: string }) {
  // Skip mounting the WebGL canvas on mobile entirely (not just hiding it
  // with CSS) — it's hidden from that viewport anyway, so there's no reason
  // to spend battery/CPU keeping a render loop going behind the scenes.
  const showScene = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!showScene) return null;

  return (
    <div className={className}>
      <CoinScene />
    </div>
  );
}
