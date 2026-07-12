import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Hero } from "@/components/sections/Hero";
import { RatesMarquee } from "@/components/sections/RatesMarquee";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyUs } from "@/components/sections/WhyUs";
import { CryptoShowcase } from "@/components/sections/CryptoShowcase";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <RatesMarquee />
        <Services />
        <HowItWorks />
        <WhyUs />
        <CryptoShowcase />
        <CTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
