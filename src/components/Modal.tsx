import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'

type ModalProps = {
  title: string
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export function Modal({ title, children, isOpen, onClose }: ModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/80 p-4 backdrop-blur-md">
      <motion.section
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-lg rounded-lg border border-white/10 bg-card p-5 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id="modal-title" className="text-lg font-black text-white">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white"
            aria-label="Close modal"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-4 text-sm leading-6 text-slate-300">{children}</div>
      </motion.section>
    </div>
  )
}
