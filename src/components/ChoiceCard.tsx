import {
  Bell,
  Camera,
  Heart,
  MessageCircle,
  Repeat,
  Send,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  ThumbsUp,
  TrendingUp,
  UserPlus,
} from 'lucide-react'
import { motion } from 'framer-motion'
import type { GameChoice } from '../types/game'

const icons = {
  heart: Heart,
  thumbsup: ThumbsUp,
  message: MessageCircle,
  send: Send,
  bell: Bell,
  shopping: ShoppingBag,
  'shopping-bag': ShoppingBag,
  'shopping-cart': ShoppingCart,
  trend: TrendingUp,
  borrow: Shirt,
  repeat: Repeat,
  camera: Camera,
  shirt: Shirt,
  sparkles: Sparkles,
  userPlus: UserPlus,
} as const

type ChoiceCardProps = {
  choice: GameChoice
  selected: boolean
  locked: boolean
  onSelect: () => void
}

export function ChoiceCard({ choice, selected, locked, onSelect }: ChoiceCardProps) {
  const Icon = icons[choice.icon] ?? Sparkles

  return (
    <motion.button
      type="button"
      disabled={locked && !selected}
      onClick={onSelect}
      whileHover={{ y: -5, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      animate={
        selected
          ? {
              scale: [1, 1.03, 1],
              boxShadow: '0 0 28px rgba(255, 209, 102, 0.45)',
            }
          : {}
      }
      className={`group grid w-full grid-cols-[3rem_1fr] gap-4 rounded-lg border p-4 text-left transition ${
        selected
          ? 'border-secondary bg-secondary/15'
          : 'border-white/10 bg-card/90 hover:border-primary/60 hover:bg-primary/10'
      }`}
    >
      <span className="grid size-12 place-items-center rounded-lg bg-slate-950 text-secondary transition group-hover:text-white">
        <Icon size={24} aria-hidden="true" />
      </span>
      <span>
        <span className="block text-base font-black text-white">{choice.title}</span>
        <span className="mt-1 block text-sm leading-6 text-slate-300">
          {choice.description}
        </span>
      </span>
    </motion.button>
  )
}
