import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const SITE = {
  name: "WID PAI Exchange",
  tagline: "Your Safe and Fast Solution To All Your Foreign Exchange Needs.",
  whatsappPrimary: "254734786194",
  whatsappPrimaryDisplay: "+254 734 786 194",
  social: "@widpai",
  socialUrl: {
    tiktok: "https://tiktok.com/@widpai",
    instagram: "https://instagram.com/widpai",
    x: "https://x.com/widpai",
  },
};

export function waLink(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
