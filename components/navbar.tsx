"use client"

import React, { useState, useLayoutEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import Image from "next/image"

type CardNavLink = {
  label: string
  href: string
  sectionId?: string
}

type CardNavItem = {
  label: string
  bgColor: string
  textColor: string
  links: CardNavLink[]
}

const navItems: CardNavItem[] = [
  {
    label: "Accueil",
    bgColor: "rgba(30, 41, 59, 0.9)",
    textColor: "#e2e8f0",
    links: [
      { label: "Hero", href: "#hero", sectionId: "hero" },
      { label: "À propos", href: "#about", sectionId: "about" },
    ],
  },
  {
    label: "Services",
    bgColor: "rgba(51, 65, 85, 0.9)",
    textColor: "#e2e8f0",
    links: [
      { label: "Solutions", href: "#solutions", sectionId: "solutions" },
      { label: "Nos offres", href: "#pricing", sectionId: "pricing" },
    ],
  },
  {
    label: "Contact",
    bgColor: "rgba(71, 85, 105, 0.9)",
    textColor: "#e2e8f0",
    links: [
      { label: "WhatsApp", href: "https://whatsapp.com", sectionId: "whatsapp" },
      { label: "Instagram", href: "https://instagram.com", sectionId: "instagram" },
      { label: "Email", href: "#contact", sectionId: "contact" },
    ],
  },
]

export function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const navRef = useRef<HTMLDivElement | null>(null)

  // refs for card elements – we collect cards from both mobile and desktop
  // layouts. hidden elements won't be visible during the animation but having
  // them here ensures the timeline always has something to work with and
  // removes viewport-based branching logic.
  const mobileCardsRef = useRef<HTMLDivElement[]>([])
  const desktopCardsRef = useRef<HTMLDivElement[]>([])
  const ctaRef = useRef<HTMLDivElement | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  const scrollToSection = (sectionId: string) => {
    const element = typeof window !== "undefined" ? document.getElementById(sectionId) : null
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    if (isExpanded) toggleMenu()
  }

  const calculateHeight = () => {
    // mirror the original component's dynamic measurement so the expanded
    // navbar only takes as much space as it needs on mobile. the previous
    // implementation always used 90% of the viewport (capped at 720px), which
    // left a huge empty gap under the CTA button on small screens.
    if (typeof window === "undefined") return 300

    const navEl = navRef.current
    if (!navEl) return 300

    const isMobile = window.matchMedia("(max-width: 768px)").matches
    if (isMobile) {
      // locate the scrolling/content container; we add a data attribute to
      // make the selector reliable.
      const contentEl = navEl.querySelector("[data-nav-content]") as
        | HTMLElement
        | null
      if (contentEl) {
        // temporarily make it visible/static so we can measure its height
        const wasVis = contentEl.style.visibility
        const wasPE = contentEl.style.pointerEvents
        const wasPos = contentEl.style.position
        const wasHeight = contentEl.style.height

        contentEl.style.visibility = "visible"
        contentEl.style.pointerEvents = "auto"
        contentEl.style.position = "static"
        contentEl.style.height = "auto"
        // force reflow
        contentEl.offsetHeight

        const topBar = 60
        // scrollHeight already includes padding (p-2 from Tailwind), so don't
        // add extra padding — it doubles and creates the empty gap below CTA.
        const contentHeight = contentEl.scrollHeight

        contentEl.style.visibility = wasVis
        contentEl.style.pointerEvents = wasPE
        contentEl.style.position = wasPos
        contentEl.style.height = wasHeight

        // return only what's needed: the top bar + the actual content
        return topBar + contentHeight
      }
    }

    return 280
  }

  // helper removed: not used

  const createTimeline = () => {
    const navEl = navRef.current
    if (!navEl) return null

    // start collapsed and hide overflow so extra space doesn't show up
    gsap.set(navEl, { height: 60, overflow: "hidden" })

    // always animate every card we know about; the hidden set simply
    // won't be visible, which avoids timing/lookup races when the layout
    // changes or during hydration.
    const cards = [...mobileCardsRef.current, ...desktopCardsRef.current].filter(Boolean)

    const tl = gsap.timeline({ paused: true })

    tl.to(
      navEl,
      {
        height: calculateHeight,
        duration: 0.4,
        ease: "power3.out",
        // keep overflow hidden throughout so cards remain clipped inside
        // the expanding "drawer"; dynamic height calculation eliminates the
        // old problem with an empty gap.
      },
      0
    )

    // animate cards and CTA together for a smoother, staggered entrance
    const targets: (HTMLElement | undefined)[] = [...cards]
    if (ctaRef.current) targets.push(ctaRef.current)

    if (targets.length) {
      // use fromTo instead of pre-setting transforms; this avoids having
      // inline transforms when calculateHeight() runs, ensuring the height
      // measurement is accurate.
      tl.fromTo(
        targets,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", stagger: 0.08 },
        0
      )
    }

    return tl
  }

  useLayoutEffect(() => {
    const tl = createTimeline()
    tlRef.current = tl

    return () => {
      tl?.kill()
      tlRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return

      if (isExpanded) {
        const newHeight = calculateHeight()
        gsap.set(navRef.current, { height: newHeight })

        tlRef.current!.kill()
        const newTl = createTimeline()
        if (newTl) {
          newTl.progress(1)
          tlRef.current = newTl
        }
      } else {
        tlRef.current!.kill()
        const newTl = createTimeline()
        if (newTl) {
          tlRef.current = newTl
        }
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
    // dependencies intentionally limited: createTimeline is stable in this component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded])

  const toggleMenu = () => {
    const tl = tlRef.current
    if (!tl) {
      // create timeline if missing
      const newTl = createTimeline()
      if (!newTl) return
      tlRef.current = newTl
    }
    if (!isExpanded) {
      setIsExpanded(true)
      tlRef.current!.play(0)
    } else {
      tlRef.current!.eventCallback("onReverseComplete", () => setIsExpanded(false))
      tlRef.current!.reverse()
    }
  }

  // refs setters
  const setMobileCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) mobileCardsRef.current[i] = el
  }
  const setDesktopCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) desktopCardsRef.current[i] = el
  }

  return (
    <>
      {/* Overlay glass blur */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      <div className="fixed left-0 right-0 z-50 top-4 flex justify-center pointer-events-none">
        <nav
          ref={navRef}
          className="block h-[60px] p-0 rounded-2xl shadow-lg relative will-change-[height] bg-black/20 backdrop-blur-lg border border-white/10 w-[calc(100%-2rem)] max-w-[800px] pointer-events-auto mx-4"
        >
          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-4 z-10">
            {/* Logo */}
            <div className="flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
              <button
                onClick={() => scrollToSection("hero")}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Image src="/clyvuum-logo.svg" alt="Clyvuum Logo" width={32} height={32} className="w-auto h-8" />
              </button>
            </div>

            {/* Hamburger - Desktop */}
            <button
              className="group h-10 flex-col items-center justify-center cursor-pointer gap-[6px] hidden md:flex md:absolute md:left-4"
              onClick={toggleMenu}
              aria-label={isExpanded ? "Close menu" : "Open menu"}
            >
              <div
                className={`w-[26px] h-[2px] bg-foreground transition-all duration-300 ease-linear origin-center ${
                  isExpanded ? "translate-y-[4px] rotate-45" : ""
                } group-hover:opacity-75`}
              />
              <div
                className={`w-[26px] h-[2px] bg-foreground transition-all duration-300 ease-linear origin-center ${
                  isExpanded ? "-translate-y-[4px] -rotate-45" : ""
                } group-hover:opacity-75`}
              />
            </button>

            {/* Hamburger - Mobile */}
            <button
              className="group h-10 flex flex-col items-center justify-center cursor-pointer gap-[6px] md:hidden ml-auto"
              onClick={toggleMenu}
              aria-label={isExpanded ? "Close menu" : "Open menu"}
            >
              <div
                className={`w-[26px] h-[2px] bg-foreground transition-all duration-300 ease-linear origin-center ${
                  isExpanded ? "translate-y-[4px] rotate-45" : ""
                } group-hover:opacity-75`}
              />
              <div
                className={`w-[26px] h-[2px] bg-foreground transition-all duration-300 ease-linear origin-center ${
                  isExpanded ? "-translate-y-[4px] -rotate-45" : ""
                } group-hover:opacity-75`}
              />
            </button>

            {/* CTA Button - Desktop only */}
            <Button
              onClick={() => scrollToSection("contact")}
              className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-10 px-5 md:absolute md:right-4"
            >
              Démarrer
            </Button>
          </div>

          {/* Cards content */}
          <div
            data-nav-content
            className={`absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col gap-2 justify-start overflow-y-auto z-[1] w-full md:flex-row md:items-stretch md:gap-3 md:p-3 md:overflow-visible ${isExpanded ? "pointer-events-auto" : "pointer-events-none"}`}
            aria-hidden={!isExpanded}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* Mobile layout - combined with CTA pinned to bottom */}
            <div className="flex md:hidden flex-col gap-2 w-full">
              {navItems.map((item, idx) => (
                <div
                  key={`mobile-${item.label}-${idx}`}
                  className="nav-card select-none relative flex flex-row items-center justify-between gap-2 p-4 rounded-xl w-full transition-transform duration-200 hover:scale-[1.02]"
                  ref={setMobileCardRef(idx)}
                  style={{ backgroundColor: item.bgColor, color: item.textColor }}
                >
                  <div className="font-bold tracking-tight text-base md:text-sm whitespace-nowrap flex-shrink-0">
                    {item.label}
                  </div>
                  <div className="flex flex-row gap-2">
                    {item.links.map((lnk, i) => (
                      <button
                        key={`${lnk.label}-${i}`}
                        className="inline-flex items-center gap-2 text-left cursor-pointer transition-opacity duration-300 hover:opacity-75 text-base md:text-xs whitespace-nowrap py-2 px-2 rounded"
                        onClick={() => lnk.sectionId && scrollToSection(lnk.sectionId)}
                      >
                        <ArrowUpRight className="w-4 h-4 md:w-3 md:h-3 shrink-0" aria-hidden="true" />
                        <span>{lnk.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* CTA Button - Mobile: mt-auto pins it to the bottom of the drawer */}
              <div ref={ctaRef} className="w-full mt-auto">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-12 text-base font-semibold"
                >
                  Démarrer
                </Button>
              </div>
            </div>

            {/* Desktop layout - stretch */}
            <div className="hidden md:flex md:flex-row md:gap-3 md:flex-1 md:w-full">
              {navItems.map((item, idx) => (
                <div
                  key={`desktop-${item.label}-${idx}`}
                  className="nav-card select-none relative flex flex-col gap-3 p-3 rounded-xl w-full md:flex-1 md:min-w-0 transition-transform duration-200 hover:scale-[1.02] md:h-full"
                  ref={setDesktopCardRef(idx)}
                  style={{ backgroundColor: item.bgColor, color: item.textColor }}
                >
                  <div className="font-bold tracking-tight text-lg whitespace-nowrap flex-shrink-0">
                    {item.label}
                  </div>
                  <div className="flex flex-col gap-3 mt-auto">
                    {item.links.map((lnk, i) => (
                      <button
                        key={`${lnk.label}-${i}`}
                        className="inline-flex items-center gap-2 text-left cursor-pointer transition-opacity duration-300 hover:opacity-75 text-sm whitespace-nowrap"
                        onClick={() => lnk.sectionId && scrollToSection(lnk.sectionId)}
                      >
                        <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{lnk.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
