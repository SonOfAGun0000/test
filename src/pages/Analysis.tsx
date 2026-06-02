import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageShell } from '../components/PageShell'
import { useRouteProgress } from '../hooks/useRouteProgress'
import { useGameStore } from '../store/gameStore'
import { playSound } from '../utils/audio'

const lines = [
  'ANALYZING DECISIONS...',
  'CHECKING FEAR PATTERNS...',
  'COMPARING REALITY VS VALIDATION...',
  'GENERATING PROFILE...',
  'MATCH FOUND',
]

export function Analysis() {
  useRouteProgress('analysis')
  const navigate = useNavigate()
  const [visibleLines, setVisibleLines] = useState(1)
  const completeGame = useGameStore((state) => state.completeGame)
  const audioEnabled = useGameStore((state) => state.audioEnabled)

  useEffect(() => {
    playSound('ambient', audioEnabled)
    const timers = lines.map((_, index) =>
      window.setTimeout(() => setVisibleLines(index + 1), index * 920),
    )
    const finishTimer = window.setTimeout(() => {
      completeGame()
      navigate('/results')
    }, 5600)

    return () => {
      timers.forEach(window.clearTimeout)
      window.clearTimeout(finishTimer)
    }
  }, [audioEnabled, completeGame, navigate])

  return (
    <PageShell className="justify-center pb-24">
      <section className="mx-auto w-full max-w-3xl rounded-lg border border-success/30 bg-black p-5 font-mono shadow-[0_0_38px_rgba(34,197,94,0.18)]">
        <div className="mb-4 flex gap-2">
          <span className="size-3 rounded-full bg-accent" />
          <span className="size-3 rounded-full bg-secondary" />
          <span className="size-3 rounded-full bg-success" />
        </div>
        <div className="space-y-3">
          {lines.slice(0, visibleLines).map((line) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-sm font-black sm:text-lg ${
                line === 'MATCH FOUND' ? 'text-secondary' : 'text-success'
              }`}
            >
              &gt; {line}
            </motion.p>
          ))}
          <span className="inline-block h-5 w-3 animate-pulse bg-success" />
        </div>
      </section>
    </PageShell>
  )
}
