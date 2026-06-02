import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'

type SlotMachineFrameProps = {
  children: ReactNode
}

export function SlotMachineFrame({ children }: SlotMachineFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!frameRef.current) {
      return
    }

    const animation = gsap.to(frameRef.current, {
      boxShadow:
        '0 0 28px rgba(255, 107, 53, 0.55), 0 0 54px rgba(244, 63, 94, 0.24)',
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    return () => {
      animation.kill()
    }
  }, [])

  return (
    <div
      ref={frameRef}
      className="relative overflow-hidden rounded-lg border border-primary/40 bg-card p-4 shadow-neon-primary"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
      <div className="grid grid-cols-3 gap-2" aria-hidden="true">
        {['FIT', 'LIKE', 'BUY'].map((label) => (
          <div
            key={label}
            className="grid aspect-square place-items-center rounded-md border border-white/10 bg-slate-950 text-sm font-black text-secondary"
          >
            {label}
          </div>
        ))}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}
