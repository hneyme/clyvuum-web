"use client"

import Image from "next/image"

export function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-card/50 border border-border rounded-2xl p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                const hero = document.getElementById("hero")
                if (hero) hero.scrollIntoView({ behavior: "smooth" })
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
          </div>

          <div className="h-px bg-border my-6" />

          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Clyvuum. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  )
}