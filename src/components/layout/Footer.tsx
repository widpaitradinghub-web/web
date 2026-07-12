import { MessageCircle, MapPin } from "lucide-react";
import { Logo } from "@/components/logo/Logo";
import { InstagramIcon, XIcon, TikTokIcon } from "@/components/icons/SocialIcons";
import { SITE, waLink } from "@/lib/utils";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#rates", label: "Rates" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#why-us", label: "Why Us" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-soft">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo size={30} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Your safe and fast solution to all your foreign exchange needs — trusted for
              currency and crypto exchange across Kenya and beyond.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: TikTokIcon, href: SITE.socialUrl.tiktok, label: "TikTok" },
                { icon: InstagramIcon, href: SITE.socialUrl.instagram, label: "Instagram" },
                { icon: XIcon, href: SITE.socialUrl.x, label: "X" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-brand-400 hover:text-brand-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white/50">
              Navigate
            </h4>
            <ul className="mt-5 space-y-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/70 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white/50">
              Get In Touch
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>
                <a
                  href={waLink(SITE.whatsappPrimary, "Hi WID PAI Exchange!")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 text-mint-400" />
                  {SITE.whatsappPrimaryDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-300" />
                Nairobi, Kenya
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white/50">
              We Trade
            </h4>
            <ul className="mt-5 flex flex-wrap gap-2">
              {["BTC", "USDT", "ETH", "KES", "USD", "NGN"].map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} WID PAI Exchange. All rights reserved.</p>
          <p>Safe · Fast · Trusted foreign exchange &amp; crypto trading.</p>
        </div>
      </div>
    </footer>
  );
}
