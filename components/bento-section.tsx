"use client"

import React from "react"
import { Command } from "lucide-react"
import LogoLoop from "@/components/ui/logoloop"
import { Icon } from '@iconify/react'
import { cn } from "@/lib/utils"
import Image from 'next/image'
import { motion } from "motion/react"

function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const baseClasses = "group relative h-full w-full overflow-hidden rounded-3xl border border-border bg-card/30 p-4"
  const hoverClasses = "transition-all duration-300 hover:border-primary/30"

  return (
    <div className={cn(baseClasses, hoverClasses, className)}>
      {children}
    </div>
  )
}

function FeatureOne() {
  return (
    <BentoCard className="p-0 sm:row-span-2 flex flex-col justify-center">
      <div className="p-8">
        <h3 className="font-semibold text-xl md:text-2xl mb-1">Adapté à vos besoins</h3>
        <p className="text-sm md:text-base text-muted-foreground">Une optimisation personnalisée</p>
      </div>
      <div className="px-4 pb-4 mt-2">
          <div className="mx-4 mb-4 border border-border rounded-lg bg-background/50 p-3 overflow-hidden">
            <div className="w-full h-40 md:h-48 flex items-center justify-center">
              <Image
                src="/illustration-slack-2.png"
                alt="Illustration centralisation"
                className="w-full h-full object-contain pointer-events-none select-none"
                width={384}
                height={374}
                quality={85}
                loading="lazy"
              />
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground text-center italic">Illustration d&apos;une centralisation d&apos;outils grâce à Slack</p>
      </div>
    </BentoCard>
  )
}

function FeatureTwo() {
  return (
    <BentoCard className="flex flex-col justify-center p-8 bg-gradient-to-br from-card/50 to-background">
      <div className="flex items-center gap-2 mb-6 bg-background/80 border border-border rounded-lg px-3 py-2 shadow-sm">
        <Command size={14} className="text-muted-foreground" />
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Rechercher...</span>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
      <h3 className="font-semibold text-xl md:text-2xl mb-1">Zéro friction</h3>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">Pilotez votre écosystème n&apos;importe où pour une productivité décuplée</p>
    </BentoCard>
  )
}

function FeatureThree() {
  return (
    <BentoCard className="flex flex-col justify-center gap-6 p-8 overflow-hidden">
      <div>
        <h3 className="font-semibold text-xl md:text-2xl mb-1">Connectivité</h3>
        <p className="text-sm md:text-base text-muted-foreground">Une synchronisation native avec vos outils</p>
      </div>
      
      <div className="w-full">
        <LogoLoop
          logos={[
            { node: <Icon icon="fa6-brands:telegram" width="32" height="32" className="text-foreground/90" />, title: 'Telegram' },
            { node: <Icon icon="fa6-brands:whatsapp" width="32" height="32" className="text-foreground/90" />, title: 'WhatsApp' },
            { node: <Icon icon="fa6-brands:slack" width="32" height="32" className="text-foreground/90" />, title: 'Slack' },
            { node: <Icon icon="fa6-brands:apple" width="32" height="32" className="text-foreground/90" />, title: 'Apple' },
            { node: <Icon icon="fa6-brands:windows" width="32" height="32" className="text-foreground/90" />, title: 'Windows' },
            { node: <Icon icon="fa6-brands:android" width="32" height="32" className="text-foreground/90" />, title: 'Android' },
            { node: <Icon icon="fa6-brands:zoom" width="32" height="32" className="text-foreground/90" />, title: 'Zoom' },
            { node: <Icon icon="fa6-brands:mailchimp" width="32" height="32" className="text-foreground/90" />, title: 'Mailchimp' },
            { node: <Icon icon="fa6-brands:google-drive" width="32" height="32" className="text-foreground/90" />, title: 'Google Drive' },
            { node: <Icon icon="fa6-brands:stripe" width="32" height="32" className="text-foreground/90" />, title: 'Stripe' },
            { node: <Icon icon="fa6-brands:paypal" width="32" height="32" className="text-foreground/90" />, title: 'PayPal' },
            { node: <Icon icon="fa6-brands:discord" width="32" height="32" className="text-foreground/90" />, title: 'Discord' },
          ]}
          speed={40}
          direction="left"
          logoHeight={28}
          gap={28}
          hoverSpeed={30}
          scaleOnHover
          fadeOut
          fadeOutColor="transparent"
          ariaLabel="Technologies partenaires"
          className="w-full"
        />
      </div>
    </BentoCard>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
} as const

export function BentoSection() {

  return (
    <section id="bento" className="pt-16 pb-20 md:pt-32 md:pb-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Travaillez plus intelligemment
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed italic">
            Work smarter, not harder.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-none">
          <motion.div 
                  className="sm:row-span-2"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
                  <FeatureOne />
          </motion.div>

          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FeatureTwo />
          </motion.div>

          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FeatureThree />
          </motion.div>
        </div>
      </div>
    </section>
  )
}