import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: number;
  variant?: "full" | "mark";
  tone?: "light" | "dark" | "purple" | "black";
  priority?: boolean;
};

/**
 * Official WID PAI Exchange brand logo component.
 * Uses high-resolution transparent vector-cut PNG assets extracted from official brand graphics.
 */
export function Logo({
  className,
  size = 36,
  variant = "full",
  tone = "light",
  priority = true,
}: LogoProps) {
  // Select appropriate logo file based on tone and variant
  let logoSrc = "/images/logo/logo-white.png";
  
  if (variant === "mark") {
    logoSrc = "/images/logo/logo-mark.png";
  } else {
    switch (tone) {
      case "dark":
      case "purple":
        logoSrc = "/images/logo/logo-purple.png";
        break;
      case "black":
        logoSrc = "/images/logo/logo-black.png";
        break;
      case "light":
      default:
        logoSrc = "/images/logo/logo-white.png";
        break;
    }
  }

  // Aspect ratio is ~3.1 for full logo, ~0.4 for mark icon
  const aspectRatio = variant === "mark" ? 0.41 : 3.1;
  const height = size;
  const width = Math.round(height * aspectRatio);

  return (
    <div className={cn("inline-flex items-center shrink-0 select-none", className)}>
      <Image
        src={logoSrc}
        alt="WID PAI Exchange Logo"
        width={width * 2} // HiDPI double density
        height={height * 2}
        priority={priority}
        className="h-auto w-auto object-contain transition-opacity duration-200"
        style={{ height: `${height}px`, width: "auto" }}
      />
    </div>
  );
}

