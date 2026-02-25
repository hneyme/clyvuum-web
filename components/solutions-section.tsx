"use client"

import { Zap, Building2, Rocket } from "lucide-react"
import SpotlightCard from "@/components/ui/spotlight-card"

const solutions = [
  {
    icon: Zap,
    title: "Starter",
    description: "L'essentiel pour convertir. Une présence digitale haute performance conçue pour capturer vos premiers leads et simplifier votre prise de rendez-vous immédiatement.",
  },
  {
    icon: Building2,
    title: "Business",
    description: "Musclez votre acquisition. Un écosystème complet qui connecte votre visibilité à vos outils de gestion pour automatiser le suivi de vos prospects et structurer votre croissance.",
  },
  {
    icon: Rocket,
    title: "Scale",
    description: "L'excellence opérationnelle. Une infrastructure sur-mesure pilotée par la donnée pour automatiser vos processus complexes et garantir une performance sans faille à long terme.",
  },
]

export function SolutionsSection() {
  return (
    <section id="solutions" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Nos solutions
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Des outils puissants pour accélérer votre transformation digitale
          </p>
        </div>

        <div className="space-y-3 max-w-5xl mx-auto">
          {solutions.map((solution, index) => (
            <SpotlightCard
              key={index}
              className="w-full hover:shadow-lg hover:scale-[1.01] transition-transform duration-200"
              spotlightColor="rgba(255,255,255,0.06)"
            >
              <div className="w-full px-3 py-2 md:px-4 md:py-2 flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary/15">
                    <solution.icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-0.5">
                    {solution.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-snug">
                    {solution.description}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button 
            onClick={() => {
              const el = document.getElementById("pricing")
              if (el) el.scrollIntoView({ behavior: "smooth" })
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 md:px-8 py-2 md:py-3 text-sm md:text-base font-semibold transition-colors duration-300"
          >
            Découvrir nos offres
          </button>
        </div>
      </div>
    </section>
  )
}
