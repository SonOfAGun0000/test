import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

type LeverControlProps = {
  onComplete: () => void
}

export function LeverControl({ onComplete }: LeverControlProps) {
  const timerRef = useRef<number | null>(null)
  const [holding, setHolding] = useState(false)
  const [complete, setComplete] = useState(false)

  const startHold = () => {
    if (complete) {
      return
    }

    setHolding(true)
    timerRef.current = window.setTimeout(() => {
      setComplete(true)
      setHolding(false)
      onComplete()
    }, 650)
  }

  const stopHold = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
    }
    setHolding(false)
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-5">
      <div className="relative h-72 w-32">
        <div className="absolute bottom-0 left-1/2 h-40 w-10 -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-600 via-slate-200 to-slate-700" />
        <motion.button
          type="button"
          onPointerDown={startHold}
          onPointerUp={stopHold}
          onPointerLeave={stopHold}
          animate={{ y: holding || complete ? 130 : 0, rotate: holding || complete ? 8 : 0 }}
          transition={{ type: 'spring', stiffness: 170, damping: 16 }}
          className="absolute left-1/2 top-2 grid size-28 -translate-x-1/2 place-items-center rounded-full border-4 border-orange-200 bg-gradient-to-br from-primary to-accent text-center text-sm font-black uppercase text-white shadow-[0_0_32px_rgba(244,63,94,0.6)]"
          aria-label="Hold lever"
        >
          Hold
        </motion.button>
      </div>
      <p className="text-center text-sm font-bold uppercase text-slate-300">
        Tap and hold the lever
      </p>
    </div>
  )
}
