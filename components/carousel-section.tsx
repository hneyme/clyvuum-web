"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, PanInfo, useMotionValue, useTransform } from "motion/react"
import { Code, Layout, Layers } from "lucide-react"
import Image from "next/image"
import React, { JSX } from "react"

export interface CarouselItem {
  title: string
  description: string
  id: number
  icon: React.ReactNode
  image?: string
}

export interface CarouselProps {
  items?: CarouselItem[]
  baseWidth?: number
  autoplay?: boolean
  autoplayDelay?: number
  pauseOnHover?: boolean
  loop?: boolean
  round?: boolean
}

const DEFAULT_ITEMS: CarouselItem[] = [
  {
    title: "Automatisation Native",
    description:
      "Éliminez 100% des doubles saisies grâce à une synchronisation parfaite entre vos outils métiers.",
    id: 1,
    icon: <Layout className="h-4 w-4 text-white" />,
    image: "/automatisation.webp",
  },
  {
    title: "Monitoring Intelligent",
    description:
      "Transformez vos données brutes en un tableau de bord clair pour piloter votre croissance avec précision.",
    id: 2,
    icon: <Layers className="h-4 w-4 text-white" />,
    image: "/monitoring.webp",
  },
  {
    title: "Performance Critique",
    description:
      "Un socle technique optimisé pour le SEO et conçu pour convertir chaque visiteur en prospect qualifié.",
    id: 3,
    icon: <Code className="h-4 w-4 text-white" />,
    image: "/performance.webp",
  },
  {
    title: "Infrastructure Cloud",
    description:
      "Profitez d'une solution robuste, évolutive et sécurisée pour accompagner votre activité sans friction.",
    id: 4,
    icon: <Layout className="h-4 w-4 text-white" />,
    image: "/cloud.webp",
  },
  {
    title: "Intégration Totale",
    description:
      "Connectez vos applications quotidiennes pour créer un environnement de travail fluide et ultra-productif.",
    id: 5,
    icon: <Layers className="h-4 w-4 text-white" />,
    image: "/integration.webp",
  },
]

const GAP = 16
const SPRING_OPTIONS = { type: "spring" as const, stiffness: 300, damping: 30 }
const VELOCITY_THRESHOLD = 500
const DRAG_BUFFER = 0

interface CarouselItemProps {
  item: CarouselItem
  index: number
  itemWidth: number
  itemHeight: number
  round: boolean
  trackItemOffset: number
  x: any
  transition: any
}

function CarouselItem({
  item,
  index,
  itemWidth,
  itemHeight,
  round,
  trackItemOffset,
  x,
  transition,
}: CarouselItemProps) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset]
  const outputRange = [90, 0, -90]
  const rotateY = useTransform(x, range, outputRange, { clamp: false })

  return (
    <motion.div
      key={`${item?.id ?? index}-${index}`}
      className={`relative shrink-0 flex flex-col overflow-hidden cursor-grab active:cursor-grabbing ${
        round ? "items-center justify-center text-center bg-background border-0" : "bg-muted border border-border rounded-lg"
      }`}
      style={{
        width: itemWidth,
        height: itemHeight,
        rotateY,
        ...(round && { borderRadius: "50%" }),
      }}
      transition={transition}
    >
      {item.image && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            style={{ objectFit: "contain", objectPosition: "center" }}
            className="pointer-events-none select-none"
            draggable={false}
          />
        </div>
      )}

      <div className="absolute left-0 right-0 bottom-0 px-4 py-3 sm:px-6 sm:py-4">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative z-10 flex flex-col items-start">
          {item.icon && (
            <span className="inline-flex mb-2 h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary/20">
              {item.icon}
            </span>
          )}
          <div className="font-semibold text-sm sm:text-base text-white">{item.title}</div>
          <p className="mt-1 text-xs sm:text-sm text-white/90 line-clamp-2">{item.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 330,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}: CarouselProps): JSX.Element {
  const [containerWidth, setContainerWidth] = useState<number>(baseWidth)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth)
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  const containerPadding = 16
  const itemWidth = containerWidth - containerPadding * 2
  const itemHeight = Math.round(itemWidth * 0.5625)
  const trackItemOffset = itemWidth + GAP

  const itemsForRender = useMemo(() => {
    if (!loop) return items
    if (items.length === 0) return []
    return [items[items.length - 1], ...items, items[0]]
  }, [items, loop])

  const [position, setPosition] = useState<number>(loop ? 1 : 0)
  const x = useMotionValue(0)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isJumping, setIsJumping] = useState<boolean>(false)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return
    const container = containerRef.current
    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [pauseOnHover])

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return
    if (pauseOnHover && isHovered) return
    const timer = setInterval(() => {
      setPosition((prev) => Math.min(prev + 1, itemsForRender.length - 1))
    }, autoplayDelay)
    return () => clearInterval(timer)
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length])

  useEffect(() => {
    const startingPosition = loop ? 1 : 0
    x.set(-startingPosition * trackItemOffset)
  }, [itemsForRender.length, loop, trackItemOffset, x])

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS

  const handleAnimationStart = () => setIsAnimating(true)

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false)
      return
    }
    const lastCloneIndex = itemsForRender.length - 1
    if (position === lastCloneIndex) {
      setIsJumping(true)
      const target = 1
      setPosition(target)
      x.set(-target * trackItemOffset)
      requestAnimationFrame(() => setIsJumping(false))
      requestAnimationFrame(() => setIsAnimating(false))
      return
    }
    if (position === 0) {
      setIsJumping(true)
      const target = items.length
      setPosition(target)
      x.set(-target * trackItemOffset)
      requestAnimationFrame(() => setIsJumping(false))
      requestAnimationFrame(() => setIsAnimating(false))
      return
    }
    setIsAnimating(false)
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const { offset, velocity } = info
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
        ? -1
        : 0
    if (direction === 0) return
    setPosition((prev) => {
      const next = prev + direction
      const max = itemsForRender.length - 1
      return Math.max(0, Math.min(next, max))
    })
  }

  const dragProps = loop
    ? {}
    : { dragConstraints: { left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0), right: 0 } }

  const activeIndex =
    items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1)

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 w-full ${round ? "rounded-full border border-border" : "rounded-2xl border border-border"}`}
      style={{ minHeight: `${itemHeight + 60}px` }}
    >
      <motion.div
        className="flex"
        drag={isAnimating ? false : "x"}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            round={round}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>

      <div className="flex w-full justify-center mt-4">
        <div className="flex gap-2">
          {items.map((_, index) => (
            <motion.button
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                activeIndex === index ? "bg-foreground" : "bg-muted-foreground/30"
              }`}
              animate={{ scale: activeIndex === index ? 1.2 : 1 }}
              onClick={() => setPosition(loop ? index + 1 : index)}
              transition={{ duration: 0.15 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function CarouselSection() {
  return (
    <section id="carousel" className="w-full py-16 md:pt-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">Adapté à vos besoins</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Chaque entreprise est unique. Nous connectons vos applications métiers (CRM, ERP, Calendriers) pour créer une solution fluide qui répond précisément à vos besoins.
          </p>
        </div>

        <div className="flex justify-center items-center w-full">
          <div className="w-full max-w-4xl">
            <Carousel items={DEFAULT_ITEMS} baseWidth={330} autoplay loop pauseOnHover />
          </div>
        </div>
      </div>
    </section>
  )
}
