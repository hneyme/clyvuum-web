"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone } from "lucide-react"
import { Icon } from "@iconify/react"

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch("https://formspree.io/f/xpqqalzy", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
      if (res.ok) {
        form.reset()
        setSubmitStatus('success')
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
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
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Une question ? N&apos;hésitez pas à nous contacter
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-card/50 border border-border rounded-2xl p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-6">Envoyez-nous un message</h3>
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
              {submitStatus === 'success' && (
                <p className="text-sm text-green-500 text-center">Message envoyé avec succès !</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-sm text-red-500 text-center">Une erreur est survenue. Veuillez réessayer.</p>
              )}
            </form>
          </div>

          <div className="space-y-4">
            <a
              href="tel:+33744995224"
              className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-border/50 transition-all duration-300 hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Téléphone</p>
                <p className="text-foreground font-medium">+33 7 44 99 52 24</p>
              </div>
            </a>

            <a
              href="mailto:contact@clyvuum.fr"
              className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-border/50 transition-all duration-300 hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground font-medium">contact@clyvuum.fr</p>
              </div>
            </a>

            <a
              href="https://wa.me/33744995224"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-border/50 transition-all duration-300 hover:border-green-500/30 group"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Icon icon="fa6-brands:whatsapp" className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">WhatsApp</p>
                <p className="text-foreground font-medium group-hover:text-green-400 transition-colors">Discuter avec nous</p>
              </div>
            </a>

            <a
              href="https://instagram.com/clyvuum"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-card/30 border border-border/50 transition-all duration-300 hover:border-pink-500/30 group"
            >
              <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center">
                <Icon icon="fa6-brands:instagram" className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Instagram</p>
                <p className="text-foreground font-medium group-hover:text-pink-400 transition-colors">@clyvuum</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
