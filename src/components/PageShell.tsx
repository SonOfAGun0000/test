import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { pageTransition } from '../animations/pageTransitions'

type PageShellProps = {
  children: ReactNode
  className?: string
}

export function PageShell({ children, className = '' }: PageShellProps) {
  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`mx-auto flex min-h-svh w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </motion.main>
  )
}
