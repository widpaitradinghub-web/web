import { NextResponse } from "next/server";

type RateRow = { pair: string; value: string; trend: "up" | "down" };

const FALLBACK_RATES: RateRow[] = [
  { pair: "USD → KES", value: "128.40", trend: "up" },
  { pair: "NGN → KES", value: "0.087", trend: "down" },
  { pair: "BTC → KES", value: "8,942,300", trend: "up" },
  { pair: "USDT → KES", value: "129.10", trend: "up" },
  { pair: "ETH → KES", value: "312,880", trend: "down" },
  { pair: "GBP → KES", value: "163.75", trend: "up" },
  { pair: "EUR → KES", value: "139.20", trend: "up" },
];

// Module-level cache so we can compute a real up/down trend between polls,
// and serve something sane if the upstream APIs are unreachable.
const lastValues: Record<string, number> = {};
let lastPayload: { live: boolean; updatedAt: string; rates: RateRow[] } | null = null;

function formatNumber(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function trendFor(key: string, value: number): "up" | "down" {
  const prev = lastValues[key];
  const trend: "up" | "down" = prev === undefined ? "up" : value >= prev ? "up" : "down";
  lastValues[key] = value;
  return trend;
}

export async function GET() {
  try {
    const [fxRes, cryptoRes] = await Promise.all([
      fetch("https://open.er-api.com/v6/latest/USD", { next: { revalidate: 60 } }),
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd",
        { next: { revalidate: 60 } }
      ),
    ]);

    if (!fxRes.ok || !cryptoRes.ok) throw new Error("Upstream rate provider error");

    const fx = await fxRes.json();
    const crypto = await cryptoRes.json();

    const usdKes = Number(fx?.rates?.KES);
    const gbpRate = Number(fx?.rates?.GBP);
    const eurRate = Number(fx?.rates?.EUR);
    const ngnRate = Number(fx?.rates?.NGN);
    const btcUsd = Number(crypto?.bitcoin?.usd);
    const ethUsd = Number(crypto?.ethereum?.usd);
    const usdtUsd = Number(crypto?.tether?.usd);

    if (![usdKes, gbpRate, eurRate, ngnRate, btcUsd, ethUsd, usdtUsd].every(Number.isFinite)) {
      throw new Error("Malformed rate payload");
    }

    const gbpKes = usdKes / gbpRate;
    const eurKes = usdKes / eurRate;
    const ngnKes = usdKes / ngnRate;
    const btcKes = btcUsd * usdKes;
    const ethKes = ethUsd * usdKes;
    const usdtKes = usdtUsd * usdKes;

    const rates: RateRow[] = [
      { pair: "USD → KES", value: formatNumber(usdKes, 2), trend: trendFor("USD", usdKes) },
      { pair: "NGN → KES", value: formatNumber(ngnKes, 3), trend: trendFor("NGN", ngnKes) },
      { pair: "BTC → KES", value: formatNumber(btcKes, 0), trend: trendFor("BTC", btcKes) },
      { pair: "USDT → KES", value: formatNumber(usdtKes, 2), trend: trendFor("USDT", usdtKes) },
      { pair: "ETH → KES", value: formatNumber(ethKes, 0), trend: trendFor("ETH", ethKes) },
      { pair: "GBP → KES", value: formatNumber(gbpKes, 2), trend: trendFor("GBP", gbpKes) },
      { pair: "EUR → KES", value: formatNumber(eurKes, 2), trend: trendFor("EUR", eurKes) },
    ];

    lastPayload = { live: true, updatedAt: new Date().toISOString(), rates };
    return NextResponse.json(lastPayload);
  } catch {
    const payload = lastPayload
      ? { ...lastPayload, live: false }
      : { live: false, updatedAt: new Date().toISOString(), rates: FALLBACK_RATES };
    return NextResponse.json(payload);
  }
}
