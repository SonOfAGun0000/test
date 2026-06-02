import { Sparkles } from 'lucide-react'

type RewardCounterProps = {
  value: number
  label?: string
}

export function RewardCounter({
  value,
  label = 'Validation tokens',
}: RewardCounterProps) {
  return (
    <div className="inline-flex items-center gap-3 rounded-lg border border-secondary/30 bg-secondary/10 px-4 py-3 text-secondary">
      <Sparkles size={20} aria-hidden="true" />
      <div>
        <p className="text-xs font-bold uppercase text-slate-300">{label}</p>
        <p className="text-2xl font-black leading-none">{value}</p>
      </div>
    </div>
  )
}
