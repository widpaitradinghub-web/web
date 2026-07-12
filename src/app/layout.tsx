import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = "https://widpai.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WID PAI Exchange — Safe, Fast Forex & Crypto Exchange",
    template: "%s · WID PAI Exchange",
  },
  description:
    "WID PAI Exchange is your safe and fast solution for foreign exchange and digital assets — buy and sell BTC, USDT, ETH and foreign currencies at unbeatable rates.",
  keywords: [
    "WID PAI Exchange",
    "forex exchange Kenya",
    "buy sell crypto Kenya",
    "BTC to KES",
    "USDT exchange",
    "currency exchange Nairobi",
  ],
  authors: [{ name: "WID PAI Exchange" }],
  openGraph: {
    title: "WID PAI Exchange — Safe, Fast Forex & Crypto Exchange",
    description:
      "Your safe and fast solution to all your foreign exchange needs. We buy and sell BTC, USDT, ETH and foreign currencies at unbelievable rates.",
    url: siteUrl,
    siteName: "WID PAI Exchange",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WID PAI Exchange — Safe, Fast Forex & Crypto Exchange",
    description:
      "Your safe and fast solution to all your foreign exchange needs.",
  },
};

export const viewport: Viewport = {
  themeColor: "#3d1670",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-white selection:bg-brand-400 selection:text-ink">
        {children}
      </body>
    </html>
  );
}
