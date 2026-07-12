import { Leaf } from "@/components/logo/Leaf";
import { cn } from "@/lib/utils";

const SPOTS = [
  { top: "6%", left: "4%", size: 90, rotate: -18, opacity: 0.08, delay: "0s" },
  { top: "62%", left: "-2%", size: 140, rotate: 12, opacity: 0.06, delay: "1.3s" },
  { top: "18%", left: "88%", size: 120, rotate: 30, opacity: 0.07, delay: "2.6s" },
  { top: "78%", left: "82%", size: 80, rotate: -10, opacity: 0.09, delay: "3.9s" },
];

export function LeafMotif({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {SPOTS.map((s, i) => (
        <Leaf
          key={i}
          size={s.size}
          color="currentColor"
          className="absolute animate-float-slow text-brand-300"
          style={{
            top: s.top,
            left: s.left,
            opacity: s.opacity,
            transform: `rotate(${s.rotate}deg)`,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
