"use client"

import { useState } from "react"
import { Check, Zap, Building2, Rocket, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import SpotlightCard from "@/components/spotlight-card"
import { QuoteDrawer, type PlanType } from "@/components/quote-drawer"

interface PricingTier {
  name: string
  price: string
  priceSubtext: string
  features: string[]
  buttonText: string
  icon: LucideIcon
  plan?: PlanType
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "À partir de 500€",
    priceSubtext: "Audit de faisabilité inclus",
    icon: Zap,
    features: [
      "Site web haute performance",
      "Outils implémentés de votre choix",
      "Intégration email basique",
      "SEO local optimisé",
      "Support email",
    ],
    buttonText: "Lancer mon projet",
    plan: "starter",
  },
  {
    name: "Business",
    price: "À partir de 2000€",
    priceSubtext: "Analyse complète de vos processus incluse",
    icon: Building2,
    features: [
      "Tout du plan Starter",
      "Interface de gestion",
      "Intégration CRM complète",
      "Tableaux de bord d'analyse",
      "Outils personnalisés",
      "Support prioritaire",
    ],
    buttonText: "Optimiser ma structure",
    plan: "business",
  },
  {
    name: "Scale",
    price: "Sur demande",
    priceSubtext: "Solution personnalisée",
    icon: Rocket,
    features: [
      "Tout du plan Business",
      "Infrastructure personnalisée",
      "Automatisation multi-canaux",
      "Intégrations sur mesure",
      "Utilisateurs illimités",
      "Account manager dédié",
      "Support 24/7",
    ],
    buttonText: "Réserver mon audit complet",
  },
]

export function PricingSection() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null)

  const handlePlanClick = (tier: PricingTier) => {
    if (tier.plan) {
      setSelectedPlan(tier.plan)
      setDrawerOpen(true)
    } else {
      const contact = document.getElementById("contact")
      if (contact) contact.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="pricing" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Nos offres
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Choisissez le plan qui correspond à votre étape de croissance et bénéficiez d&apos;une transformation digitale adaptée à vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12 md:items-stretch">
          {pricingTiers.map((tier, index) => (
            <SpotlightCard
              key={index}
              className="group relative flex flex-col h-full transition-all duration-300"
              spotlightColor="rgba(59, 130, 246, 0.15)"
            >
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground">
                    {tier.name}
                  </h3>
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary/15">
                    <tier.icon className="h-4 w-4 text-primary" />
                  </div>
                </div>

                <div className="space-y-2.5 mb-6 flex-1">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-base">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 mb-4">
                  <p className="text-sm md:text-base text-muted-foreground mb-0.5">{tier.price}</p>
                  <p className="text-xs md:text-sm text-muted-foreground/70">{tier.priceSubtext}</p>
                </div>
              </div>

              <Button
                onClick={() => handlePlanClick(tier)}
                className="w-full py-5 bg-primary/10 text-primary hover:bg-primary/20"
              >
                <span className="text-sm font-semibold">{tier.buttonText}</span>
              </Button>
            </SpotlightCard>
          ))}
        </div>
      </div>

      <QuoteDrawer
        plan={selectedPlan}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </section>
  )
}
