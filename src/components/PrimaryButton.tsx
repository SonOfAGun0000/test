import type { ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

type PrimaryButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> & {
  children: ReactNode
  tone?: 'primary' | 'secondary' | 'ghost'
}

const toneClassNames: Record<NonNullable<PrimaryButtonProps['tone']>, string> = {
  primary:
    'bg-primary text-white shadow-neon-primary hover:brightness-110 focus-visible:outline-primary',
  secondary:
    'bg-secondary text-slate-950 shadow-neon-secondary hover:brightness-105 focus-visible:outline-secondary',
  ghost:
    'border border-white/15 bg-white/5 text-slate-100 hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-primary',
}

export function PrimaryButton({
  children,
  className = '',
  tone = 'primary',
  type = 'button',
  ...props
}: PrimaryButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-extrabold uppercase tracking-wide transition disabled:cursor-not-allowed disabled:opacity-50 ${toneClassNames[tone]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
