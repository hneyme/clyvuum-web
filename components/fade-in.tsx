"use client"
import { motion } from "framer-motion"
import React from "react"

export function FadeIn({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }} // On rajoute un peu de mouvement et de zoom
      whileInView={{ opacity: 1, y: 0, scale: 1 }} // On revient à la normale
      viewport={{ once: true, amount: 0.2 }} // Déclenche quand 20% de la section est visible
      transition={{ 
        duration: 1.4, // On augmente la durée (1.4s au lieu de 1.2s)
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // Courbe "Expo Out" : démarre vite, finit très doucement
      }}
    >
      {children}
    </motion.div>
  )
}