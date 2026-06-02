import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const bootSteps = [
  'INITIALIZING...',
  'Loading Social Algorithms...',
  'Analyzing Validation Patterns...',
  'Ready.',
] as const

type BootSequenceProps = {
  onComplete: () => void
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const stepDuration = 450
    const timers = bootSteps.map((_, index) =>
      window.setTimeout(() => setActiveStep(index), index * stepDuration),
    )
    const completeTimer = window.setTimeout(onComplete, 1900)

    return () => {
      timers.forEach(window.clearTimeout)
      window.clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className="grid min-h-svh place-items-center bg-background px-5 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="mb-5 h-2 overflow-hidden rounded-full bg-card ring-1 ring-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
        </div>
        <p className="text-sm font-black uppercase text-secondary">
          {bootSteps[activeStep]}
        </p>
      </motion.div>
    </div>
  )
}
