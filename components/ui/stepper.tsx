"use client"

import React, {
  useState,
  Children,
  useRef,
  useLayoutEffect,
  type HTMLAttributes,
  type ReactNode,
} from "react"
import { motion, AnimatePresence, type Variants } from "motion/react"
import { cn } from "@/lib/utils"

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  initialStep?: number
  onStepChange?: (step: number) => void
  onFinalStepCompleted?: () => void
  backButtonText?: string
  nextButtonText?: string
  disableStepIndicators?: boolean
  nextDisabled?: boolean
  className?: string
}

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  backButtonText = "Précédent",
  nextButtonText = "Suivant",
  disableStepIndicators = false,
  nextDisabled = false,
  className,
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep)
  const [direction, setDirection] = useState<number>(0)
  const stepsArray = Children.toArray(children)
  const totalSteps = stepsArray.length
  const isCompleted = currentStep > totalSteps
  const isLastStep = currentStep === totalSteps

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep)
    if (newStep > totalSteps) {
      onFinalStepCompleted()
    } else {
      onStepChange(newStep)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1)
      updateStep(currentStep - 1)
    }
  }

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1)
      updateStep(currentStep + 1)
    }
  }

  const handleComplete = () => {
    setDirection(1)
    updateStep(totalSteps + 1)
  }

  return (
    <div className={cn("flex flex-col w-full", className)} {...rest}>
      {/* Step indicators */}
      <div className="flex w-full items-center px-2 py-4">
        {stepsArray.map((_, index) => {
          const stepNumber = index + 1
          const isNotLastStep = index < totalSteps - 1
          return (
            <React.Fragment key={stepNumber}>
              <StepIndicator
                step={stepNumber}
                disableStepIndicators={disableStepIndicators}
                currentStep={currentStep}
                onClickStep={(clicked) => {
                  if (clicked < currentStep) {
                    setDirection(clicked > currentStep ? 1 : -1)
                    updateStep(clicked)
                  }
                }}
              />
              {isNotLastStep && (
                <StepConnector isComplete={currentStep > stepNumber} />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Step content */}
      <StepContentWrapper
        isCompleted={isCompleted}
        currentStep={currentStep}
        direction={direction}
        className="flex-1"
      >
        {stepsArray[currentStep - 1]}
      </StepContentWrapper>

      {/* Navigation footer */}
      {!isCompleted && (
        <div className="px-1 pb-2 pt-4 mt-auto">
          <div
            className={cn(
              "flex",
              currentStep !== 1 ? "justify-between" : "justify-end"
            )}
          >
            {currentStep !== 1 && (
              <button
                onClick={handleBack}
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground hover:bg-muted"
              >
                {backButtonText}
              </button>
            )}
            <button
              onClick={isLastStep ? handleComplete : handleNext}
              disabled={nextDisabled}
              className="rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLastStep ? "Envoyer ma demande" : nextButtonText}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------- internal ---------- */

interface StepContentWrapperProps {
  isCompleted: boolean
  currentStep: number
  direction: number
  children: ReactNode
  className?: string
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className = "",
}: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState<number>(0)

  return (
    <motion.div
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: "spring", duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={(h) => setParentHeight(h)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

interface SlideTransitionProps {
  children: ReactNode
  direction: number
  onHeightReady: (height: number) => void
}

function SlideTransition({
  children,
  direction,
  onHeightReady,
}: SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (containerRef.current) {
      onHeightReady(containerRef.current.offsetHeight)
    }
  }, [children, onHeightReady])

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: "absolute", left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  )
}

const stepVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? "-50%" : "50%",
    opacity: 0,
  }),
}

export function Step({ children }: { children: ReactNode }) {
  return <div className="px-1">{children}</div>
}

/* ---------- StepIndicator ---------- */

interface StepIndicatorProps {
  step: number
  currentStep: number
  onClickStep: (clicked: number) => void
  disableStepIndicators?: boolean
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators = false,
}: StepIndicatorProps) {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
        ? "inactive"
        : "complete"

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) {
      onClickStep(step)
    }
  }

  return (
    <motion.div
      onClick={handleClick}
      className="relative cursor-pointer outline-none focus:outline-none"
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: {
            scale: 1,
            backgroundColor: "var(--muted)",
            color: "var(--muted-foreground)",
          },
          active: {
            scale: 1,
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
          },
          complete: {
            scale: 1,
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
          },
        }}
        transition={{ duration: 0.3 }}
        className="flex h-8 w-8 items-center justify-center rounded-full font-semibold text-sm"
      >
        {status === "complete" ? (
          <CheckIcon className="h-4 w-4" />
        ) : status === "active" ? (
          <span>{step}</span>
        ) : (
          <span>{step}</span>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ---------- StepConnector ---------- */

function StepConnector({ isComplete }: { isComplete: boolean }) {
  const lineVariants: Variants = {
    incomplete: { width: 0, backgroundColor: "transparent" },
    complete: { width: "100%", backgroundColor: "var(--primary)" },
  }

  return (
    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded bg-muted">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={{ duration: 0.4 }}
      />
    </div>
  )
}

/* ---------- CheckIcon ---------- */

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.1,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}
