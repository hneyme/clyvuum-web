"use client"

import { cn } from "@/lib/utils"
import { IconMenu2, IconX } from "@tabler/icons-react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react"
import Image from "next/image"
import React, { useRef, useState, useCallback } from "react"

const navItems = [
  { name: "À propos", sectionId: "about" },
  { name: "Solutions", sectionId: "solutions" },
  { name: "Contact", sectionId: "contact" },
]

export function Navbar() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeVisible = latest > 100
    if (shouldBeVisible !== visible) setVisible(shouldBeVisible)
  })

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }, [])

  return (
    <motion.nav
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 w-full will-change-transform"
      aria-label="Navigation principale"
    >
      <motion.div
        animate={{
          width: visible ? "40%" : "100%",
          y: visible ? 20 : 8,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        style={{
          minWidth: "800px",
        }}
        className={cn(
          "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex",
          "transition-[backdrop-filter,box-shadow,background-color,border-color] duration-300",
          visible && "bg-neutral-950/80 ring-1 ring-white/8 backdrop-blur-md shadow-lg"
        )}
      >
        <button
          onClick={() => scrollToSection("hero")}
          className="relative z-20 flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/clyvuum-logo.svg"
            alt="Clyvuum Logo"
            width={32}
            height={32}
            className="w-auto h-7"
          />
        </button>

        <motion.div
          onMouseLeave={() => setHovered(null)}
          className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium lg:flex lg:space-x-2"
        >
          {navItems.map((item, idx) => (
            <button
              key={item.sectionId}
              onMouseEnter={() => setHovered(idx)}
              onClick={() => scrollToSection(item.sectionId)}
              className="relative px-4 py-2 text-muted-foreground"
            >
              {hovered === idx && (
                <motion.div
                  layoutId="hovered"
                  className="absolute inset-0 h-full w-full rounded-full bg-white/10"
                />
              )}
              <span className="relative z-20">{item.name}</span>
            </button>
          ))}
        </motion.div>

        <button
          onClick={() => scrollToSection("pricing")}
          className="relative z-20 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Démarrer
        </button>
      </motion.div>

      <motion.div
        animate={{
          width: visible ? "92%" : "100%",
          y: visible ? 12 : 6,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        className={cn(
          "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between rounded-full bg-transparent px-4 py-3 lg:hidden",
          "transition-[backdrop-filter,box-shadow,background-color,border-color] duration-300",
          visible && "bg-neutral-950/80 ring-1 ring-white/8 backdrop-blur-md shadow-lg"
        )}
      >
        <div className="flex w-full items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/clyvuum-logo.svg"
              alt="Clyvuum Logo"
              width={32}
              height={32}
              className="w-auto h-7"
            />
          </button>

          {mobileOpen ? (
            <button
              aria-label="Fermer le menu"
              aria-expanded={true}
              onClick={() => setMobileOpen(false)}
              className="p-1"
            >
              <IconX className="h-6 w-6 text-foreground" />
            </button>
          ) : (
            <button
              aria-label="Ouvrir le menu"
              aria-expanded={false}
              onClick={() => setMobileOpen(true)}
              className="p-1"
            >
              <IconMenu2 className="h-6 w-6 text-foreground" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-x-0 top-[4.5rem] z-50 mx-2 flex w-auto flex-col gap-2 rounded-2xl bg-card border border-border px-4 py-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] will-change-transform"
            >
              {navItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => {
                  scrollToSection("pricing")
                  setMobileOpen(false)
                }}
                className="mt-1 w-full rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground text-center transition-colors hover:bg-primary/90"
              >
                Démarrer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  )
}
