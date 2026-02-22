"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone } from "lucide-react"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    // Remplacez par votre endpoint Formspree
    // https://formspree.io/f/VOTRE_ID
    try {
      await fetch("https://formspree.io/f/xpqqalzy", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
      form.reset()
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="pt-16 pb-20 md:pt-32 md:pb-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Contactez-nous
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Une question ? N&apos;h&eacute;sitez pas &agrave; nous contacter
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Form Card */}
          <div className="bg-card/50 border border-border rounded-2xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">Envoyez-nous un message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Nom
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Votre nom"
                  required
                  className="bg-background/50 border-border focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  className="bg-background/50 border-border focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Votre message..."
                  rows={4}
                  required
                  className="bg-background/50 border-border focus:border-primary resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer"}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-border/50 transition-all duration-300 hover:border-primary/30">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Téléphone</p>
                <p className="text-foreground font-medium">+33 07 44 99 52 24</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-border/50 transition-all duration-300 hover:border-primary/30">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground font-medium">contact@clyvuum.fr</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
