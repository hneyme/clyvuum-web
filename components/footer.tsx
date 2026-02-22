import { Instagram, Github } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-card/50 border border-border rounded-2xl p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <Image 
              src="/clyvuum-logo.svg" 
              alt="Clyvuum Logo" 
              width={32} 
              height={32} 
              className="w-auto h-8"
            />

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Separator */}
          <div className="h-px bg-border my-6" />

          {/* Credits */}
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Clyvuum. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  )
}