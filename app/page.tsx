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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Clyvuum",
  url: "https://clyvuum.fr",
  logo: "https://clyvuum.fr/icon-512.png",
  description:
    "Clyvuum accompagne les entreprises dans leur transformation digitale avec des solutions fluides, rapides et sur-mesure.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+33-7-44-99-52-24",
    contactType: "customer service",
    availableLanguage: ["French", "English"],
  },
  sameAs: [
    "https://instagram.com/clyvuum",
    "https://wa.me/33744995224",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "FR",
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien de temps dure un projet ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nous livrons vos premières solutions en un temps record, avec des délais établis avec vous selon la complexité.",
      },
    },
    {
      "@type": "Question",
      name: "Proposez-vous du sur-mesure ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolument. Chaque système est conçu spécifiquement pour supprimer vos frictions et s'adapter à vos processus internes.",
      },
    },
    {
      "@type": "Question",
      name: "Quel suivi après la livraison ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nous assurons un suivi complet pour vérifier que tout fonctionne parfaitement et selon les solutions mises en place, une maintenance sera établie.",
      },
    },
  ],
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main className="flex flex-col w-full">
        <HeroSection />

        <FadeIn>
          <AboutSection />
        </FadeIn>

        <FadeIn>
          <BentoSection />
        </FadeIn>

        <FadeIn>
          <SolutionsSection />
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