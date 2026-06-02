import { Volume2, VolumeX } from 'lucide-react'
import { useGameStore } from '../store/gameStore'

export function AudioToggle() {
  const audioEnabled = useGameStore((state) => state.audioEnabled)
  const toggleAudio = useGameStore((state) => state.toggleAudio)
  const Icon = audioEnabled ? Volume2 : VolumeX

  return (
    <button
      type="button"
      onClick={toggleAudio}
      className="grid size-12 place-items-center rounded-full border border-white/10 bg-card/90 text-white shadow-lg shadow-slate-950/40 backdrop-blur transition hover:border-primary/60 hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      aria-label={audioEnabled ? 'Mute sound' : 'Enable sound'}
      title={audioEnabled ? 'Mute sound' : 'Enable sound'}
    >
      <Icon size={20} aria-hidden="true" />
    </button>
  )
}
