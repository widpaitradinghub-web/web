import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "whatsapp" | "outline";
  size?: "md" | "lg";
  className?: string;
  icon?: ReactNode;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  external = true,
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 will-change-transform active:scale-[0.97]";

  const sizes = {
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 text-white shadow-[0_8px_30px_-8px_rgba(138,63,252,0.7)] hover:shadow-[0_12px_40px_-6px_rgba(138,63,252,0.9)] hover:-translate-y-0.5",
    ghost:
      "border border-white/20 bg-white/5 text-white backdrop-blur hover:border-white/40 hover:bg-white/10",
    whatsapp:
      "bg-gradient-to-r from-[#25D366] to-[#1fb855] text-ink shadow-[0_8px_30px_-8px_rgba(37,211,102,0.65)] hover:shadow-[0_12px_40px_-6px_rgba(37,211,102,0.85)] hover:-translate-y-0.5",
    outline:
      "border border-ink/15 bg-white text-ink shadow-[0_8px_24px_-12px_rgba(15,8,25,0.35)] hover:border-ink/25 hover:bg-cream-soft",
  };

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(base, sizes[size], variants[variant], className)}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
