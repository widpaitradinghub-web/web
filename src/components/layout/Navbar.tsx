"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "@/components/logo/Logo";
import { Button } from "@/components/ui/Button";
import { SITE, waLink } from "@/lib/utils";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#rates", label: "Rates" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#why-us", label: "Why Us" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
            scrolled ? "glass-panel shadow-lg shadow-black/20" : "bg-transparent"
          }`}
        >
          <a href="#top" className="shrink-0">
            <Logo size={26} />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-white/75 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              href={waLink(SITE.whatsappPrimary, "Hi WID PAI Exchange, I'd like to make an exchange.")}
              variant="whatsapp"
              size="md"
              icon={<MessageCircle className="h-4 w-4" />}
            >
              Send a Chat
            </Button>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-ink/80 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-5 top-[calc(env(safe-area-inset-top)+4.5rem)] z-40 rounded-2xl lg:hidden"
            >
            <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#1e1234]/98 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <Button
                href={waLink(SITE.whatsappPrimary, "Hi WID PAI Exchange, I'd like to make an exchange.")}
                variant="whatsapp"
                size="md"
                className="mt-2 justify-center"
                icon={<MessageCircle className="h-4 w-4" />}
              >
                Send a Chat
              </Button>
            </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
