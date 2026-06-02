import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Award, RefreshCcw, Share2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../components/Modal'
import { PsychologyIcon } from '../components/PsychologyIcon'
import { PrimaryButton } from '../components/PrimaryButton'
import { ResultCard } from '../components/ResultCard'
import { PageShell } from '../components/PageShell'
import { useRouteProgress } from '../hooks/useRouteProgress'
import { useGameStore } from '../store/gameStore'
import { playSound } from '../utils/audio'
import { calculateResult } from '../utils/results'

export function Results() {
  useRouteProgress('results')
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const state = useGameStore()
  const resetGame = useGameStore((store) => store.resetGame)
  const audioEnabled = useGameStore((store) => store.audioEnabled)
  const result = calculateResult(state)
  const replay = () => {
    resetGame()
    navigate('/')
  }

  useEffect(() => {
    playSound('reveal', audioEnabled)
  }, [audioEnabled])

  return (
    <PageShell className="justify-center pb-24">
      <section className="mx-auto w-full max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm font-black uppercase text-secondary"
        >
          Result Reveal
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 130, damping: 13 }}
          className="mt-3 text-center text-4xl font-black text-white sm:text-7xl"
        >
          {result.personality}
        </motion.h1>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-8 text-slate-300">
          {result.description}
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <ResultCard
            title="Social Influence"
            value={`${result.influencePercent}%`}
          />
          <ResultCard
            title="Reality Awareness"
            value={`${result.realityPercent}%`}
          />
          <ResultCard
            title="Most Common Fear"
            value={result.mostCommonFear.label}
          >
            <PsychologyIcon
              icon={result.mostCommonFear.icon}
              className="text-secondary"
            />
          </ResultCard>
          <ResultCard
            title="Most Common Behaviour"
            value={result.mostCommonBehaviour.label}
          >
            <PsychologyIcon
              icon={result.mostCommonBehaviour.icon}
              className="text-secondary"
            />
          </ResultCard>
        </div>
        <div className="mt-5 rounded-lg border border-white/10 bg-card p-5">
          <p className="text-xs font-black uppercase text-secondary">
            Personalized Insight
          </p>
          <p className="mt-3 text-lg leading-8 text-slate-200">
            {result.personalizedInsight}
          </p>
        </div>
        {result.badges.length ? (
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {result.badges.map((badge, index) => (
              <motion.article
                key={badge.id}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: [1, 1.025, 1] }}
                transition={{
                  delay: index * 0.12,
                  scale: { duration: 1.8, repeat: Infinity },
                }}
                className="rounded-lg border border-secondary/40 bg-secondary/15 p-4 text-center text-secondary shadow-neon-secondary"
              >
                <div className="inline-flex items-center gap-2 text-sm font-black">
                  <Award size={16} aria-hidden="true" />
                  {badge.label}
                </div>
                <p className="mt-2 text-sm font-bold leading-5 text-slate-100">
                  {badge.message}
                </p>
              </motion.article>
            ))}
          </div>
        ) : null}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <PrimaryButton onClick={() => navigate('/share')}>
            <Share2 size={18} aria-hidden="true" />
            Share Result
          </PrimaryButton>
          <PrimaryButton tone="ghost" onClick={() => setModalOpen(true)}>
            <RefreshCcw size={18} aria-hidden="true" />
            Replay
          </PrimaryButton>
        </div>
      </section>
      <Modal
        title="Start a new game?"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <p>
          Starting a new game will erase your current progress and analysis.
        </p>
        <p className="mt-3">Are you sure you want to begin again?</p>
        <div className="mt-5 flex gap-3">
          <PrimaryButton tone="ghost" onClick={() => setModalOpen(false)}>
            Continue Playing
          </PrimaryButton>
          <PrimaryButton onClick={replay}>
            Start Fresh
          </PrimaryButton>
        </div>
      </Modal>
    </PageShell>
  )
}
