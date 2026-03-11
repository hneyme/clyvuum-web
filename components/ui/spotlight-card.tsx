"use client"

import type React from "react"
import { useRef, useState, useSyncExternalStore, useCallback } from "react"

interface Position {
  x: number
  y: number
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string
  spotlightColor?: string
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.15)",
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState<number>(0)
  const isTouch = useSyncExternalStore(
    () => () => {},
    () => "ontouchstart" in window || navigator.maxTouchPoints > 0,
    () => false
  )
  const tickingRef = useRef(false)

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    if (!divRef.current || isFocused || isTouch || tickingRef.current) return
    tickingRef.current = true
    const clientX = e.clientX
    const clientY = e.clientY
    requestAnimationFrame(() => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect()
        setPosition({ x: clientX - rect.left, y: clientY - rect.top })
      }
      tickingRef.current = false
    })
  }, [isFocused, isTouch])

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(0.6)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = () => {
    if (!isTouch) setOpacity(0.6)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={isTouch ? undefined : handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={isTouch ? undefined : handleMouseEnter}
      onMouseLeave={isTouch ? undefined : handleMouseLeave}
      className={`relative rounded-2xl border border-border bg-card overflow-hidden p-6 transition-all duration-300 hover:border-foreground/30 ${className}`}
    >
      {!isTouch && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
          style={{
            opacity,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
      )}
      {children}
    </div>
  )
}

export default SpotlightCard
