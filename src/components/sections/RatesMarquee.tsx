import { TrendingUp, TrendingDown } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { cn } from "@/lib/utils";

const RATES = [
  { pair: "USD → KES", value: "128.40", trend: "up" as const },
  { pair: "NGN → KES", value: "0.087", trend: "down" as const },
  { pair: "BTC → KES", value: "8,942,300", trend: "up" as const },
  { pair: "USDT → KES", value: "129.10", trend: "up" as const },
  { pair: "ETH → KES", value: "312,880", trend: "down" as const },
  { pair: "GBP → KES", value: "163.75", trend: "up" as const },
  { pair: "EUR → KES", value: "139.20", trend: "up" as const },
];

function RateCard({ pair, value, trend }: (typeof RATES)[number]) {
  const up = trend === "up";
  return (
    <div className="flex min-w-[220px] items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
      <div>
        <div className="text-xs font-medium uppercase tracking-wide text-white/45">{pair}</div>
        <div className="mt-1 font-display text-lg font-bold text-white">{value}</div>
      </div>
      <div
        className={cn(
          "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
          up ? "bg-mint-500/15 text-mint-400" : "bg-rose-500/15 text-rose-400"
        )}
      >
        {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
      </div>
    </div>
  );
}

export function RatesMarquee() {
  return (
    <section id="rates" className="relative border-y border-white/10 bg-ink-soft/60 py-10">
      <div className="group">
        <Marquee>
          {RATES.map((r) => (
            <RateCard key={r.pair} {...r} />
          ))}
        </Marquee>
      </div>
      <p className="mt-6 text-center text-xs text-white/35">
        Indicative rates only — chat with us on WhatsApp for a live, locked-in quote.
      </p>
    </section>
  );
}
