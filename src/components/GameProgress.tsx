import { scenarios } from '../data/scenarios'
import { ProgressBar } from './ProgressBar'

type GameProgressProps = {
  round: number
}

export function GameProgress({ round }: GameProgressProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/35 p-3 backdrop-blur">
      <div className="mb-2 flex items-center justify-between text-xs font-black uppercase text-slate-200">
        <span>
          Round {round} of {scenarios.length}
        </span>
        <span>{Math.round((round / scenarios.length) * 100)}%</span>
      </div>
      <ProgressBar value={(round / scenarios.length) * 100} label="Game progress" />
    </div>
  )
}
