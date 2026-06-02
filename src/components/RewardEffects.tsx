import { Heart, Sparkles } from 'lucide-react'

export function RewardEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {Array.from({ length: 30 }, (_, index) => {
        const Icon = index % 2 === 0 ? Heart : Sparkles
        return (
          <Icon
            key={index}
            className="absolute animate-reward-float text-secondary drop-shadow"
            size={18 + (index % 4) * 6}
            fill={index % 2 === 0 ? 'currentColor' : 'none'}
            style={{
              left: `${(index * 29) % 100}%`,
              bottom: '-8%',
              animationDelay: `${index * 0.06}s`,
              animationDuration: `${1.8 + (index % 5) * 0.22}s`,
            }}
            aria-hidden="true"
          />
        )
      })}
    </div>
  )
}
