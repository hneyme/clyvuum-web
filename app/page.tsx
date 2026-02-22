import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SolutionsSection } from "@/components/solutions-section"
import { PricingSection } from "@/components/pricing-section"
import { BentoSection } from "@/components/bento-section"
import { FaqSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { FadeIn } from "@/components/fade-in"

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main className="flex flex-col w-full">
        {/* Pas de FadeIn sur le Hero pour un chargement instantané */}
        <HeroSection />

        <FadeIn>
          <AboutSection />
        </FadeIn>

        <FadeIn>
          <SolutionsSection />
        </FadeIn>

        <FadeIn>
          <BentoSection />
        </FadeIn>

        <FadeIn>
          <PricingSection />
        </FadeIn>

        <FadeIn>
          <FaqSection />
        </FadeIn>

        <FadeIn>
          <ContactSection />
        </FadeIn>
      </main>
      <Footer />
    </div>
  )
}