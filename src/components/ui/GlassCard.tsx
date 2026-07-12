import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass-panel relative overflow-hidden rounded-3xl p-6 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      {children}
    </div>
  );
}
