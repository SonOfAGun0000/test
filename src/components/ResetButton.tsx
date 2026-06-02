import { RotateCcw } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

export function ResetButton() {
  const resetGame = useGameStore((state) => state.resetGame)

  return (
    <button
      type="button"
      onClick={resetGame}
      className="inline-grid size-11 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition hover:border-accent/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label="Reset progress"
      title="Reset progress"
    >
      <RotateCcw size={18} aria-hidden="true" />
    </button>
  )
}
