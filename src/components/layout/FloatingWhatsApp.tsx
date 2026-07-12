"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { SITE, waLink } from "@/lib/utils";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={waLink(SITE.whatsappPrimary, "Hi WID PAI Exchange, I'd like to make an exchange.")}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#1fb855] text-ink shadow-[0_10px_35px_-8px_rgba(37,211,102,0.8)] sm:h-16 sm:w-16"
      aria-label="Send a chat on WhatsApp"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
      <MessageCircle className="relative h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.2} />
    </motion.a>
  );
}
