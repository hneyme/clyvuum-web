"use client"

import { type LucideIcon } from "lucide-react"
import { motion, type Transition } from "motion/react"
import { cn } from "@/lib/utils"

type AnimationType = "glow"

const glowAnimation = {
  opacity: [0.7, 1, 0.7],
}

const glowTransition: Transition = {
  duration: 3,
  repeat: Infinity,
  ease: "easeInOut",
}

interface AnimatedIconProps {
  icon: LucideIcon
  animation?: AnimationType
  className?: string
  containerClassName?: string
}

export function AnimatedIcon({
  icon: Icon,
  className,
  containerClassName,
}: AnimatedIconProps) {
  return (
    <motion.div
      className={cn(
        "flex items-center justify-center rounded-md bg-primary/15",
        containerClassName
      )}
      animate={glowAnimation}
      transition={glowTransition}
    >
      <Icon className={cn("text-primary", className)} />
    </motion.div>
  )
}
