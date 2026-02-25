"use client"

import Image from "next/image"

const footerLinks = [
  { name: "À propos", sectionId: "about" },
  { name: "Solutions", sectionId: "solutions" },
  { name: "Tarifs", sectionId: "pricing" },
  { name: "FAQ", sectionId: "faq" },
  { name: "Contact", sectionId: "contact" },
]

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-card/50 border border-border rounded-2xl p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollTo("hero")
              }}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Image 
                src="/clyvuum-logo.svg" 
                alt="Clyvuum Logo" 
                width={32} 
                height={32} 
                className="w-auto h-8"
              />
            </a>

            <nav aria-label="Liens du pied de page" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <button
                  key={link.sectionId}
                  onClick={() => scrollTo(link.sectionId)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="h-px bg-border my-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Clyvuum. Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <a href="mailto:contact@clyvuum.fr" className="hover:text-foreground transition-colors">
                contact@clyvuum.fr
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}