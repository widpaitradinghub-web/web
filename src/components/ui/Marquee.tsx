import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
};

export function Marquee({ children, reverse = false, className, pauseOnHover = true }: MarqueeProps) {
  return (
    <div className={cn("relative flex overflow-hidden mask-fade-x", className)}>
      <div
        className={cn(
          "flex shrink-0 items-stretch gap-6 pr-6",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused] hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 items-stretch gap-6 pr-6",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
