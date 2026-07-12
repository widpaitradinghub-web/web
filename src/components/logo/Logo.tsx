import { cn } from "@/lib/utils";
import { Leaf } from "./Leaf";

type LogoProps = {
  className?: string;
  size?: number;
  variant?: "full" | "mark";
  tone?: "light" | "dark";
};

/**
 * WID PAI wordmark: "W" + leaf glyph standing in for the crossbar + "D",
 * with the PAI superscript and tracked EXCHANGE lockup underneath.
 * Built from live text (not a raster) so it stays sharp at any size and
 * inherits currentColor for theming.
 */
export function Logo({ className, size = 40, variant = "full", tone = "light" }: LogoProps) {
  const ink = tone === "light" ? "text-white" : "text-ink";
  const accent = tone === "light" ? "text-brand-300" : "text-brand-600";
  const sub = tone === "light" ? "text-white/70" : "text-ink/60";

  return (
    <div
      style={{ fontSize: size }}
      className={cn("inline-flex flex-col select-none leading-none font-display", className)}
    >
      <div className="flex items-center">
        <span className={cn("font-extrabold tracking-tight", ink)}>W</span>
        <Leaf size={undefined} className={cn("h-[0.62em] w-[0.62em] -mx-[0.06em] translate-y-[0.02em]", accent)} />
        <span className={cn("font-extrabold tracking-tight", ink)}>D</span>
        {variant === "full" && (
          <span className={cn("ml-[0.08em] self-start text-[0.32em] font-bold tracking-wide mt-[0.05em]", accent)}>
            PAI
          </span>
        )}
      </div>
      {variant === "full" && (
        <span className={cn("mt-[0.16em] text-[0.19em] font-semibold uppercase tracking-[0.5em]", sub)}>
          Exchange
        </span>
      )}
    </div>
  );
}
