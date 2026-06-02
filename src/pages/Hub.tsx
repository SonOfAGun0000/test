import { useCallback, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { GameProgress } from '../components/GameProgress'
import { PageShell } from '../components/PageShell'
import { PrimaryButton } from '../components/PrimaryButton'
import { SlotMachine } from '../components/SlotMachine'
import { getNextScenario, scenarios } from '../data/scenarios'
import { useRouteProgress } from '../hooks/useRouteProgress'
import { useGameStore } from '../store/gameStore'
import { playSound } from '../utils/audio'
import { ScenarioTicket } from '../components/ScenarioTicket'

export function Hub() {
  useRouteProgress('hub')
  const navigate = useNavigate()
  const [spinning, setSpinning] = useState(false)
  const [showTicket, setShowTicket] = useState(false)
  const isNavigating = useRef(false)

  const completedScenarioIds = useGameStore(
    (state) => state.progress.completedScenarioIds,
  )
  const setCurrentScenario = useGameStore((state) => state.setCurrentScenario)
  const audioEnabled = useGameStore((state) => state.audioEnabled)
  const nextScenario = getNextScenario(completedScenarioIds)
  const round = Math.min(completedScenarioIds.length + 1, scenarios.length)

  const beginRound = () => {
    if (!nextScenario) {
      navigate('/analysis')
      return
    }

    playSound('spin', audioEnabled)
    setSpinning(true)
    setShowTicket(false)
  }

  const handleSpinComplete = useCallback(() => {
    if (!nextScenario) {
      navigate('/analysis')
      return
    }

    playSound('release', audioEnabled)
    setSpinning(false)
    setShowTicket(true)
  }, [audioEnabled, navigate, nextScenario])

  useEffect(() => {
    if (showTicket && nextScenario && !isNavigating.current) {
      const timer = window.setTimeout(() => {
        isNavigating.current = true
        setCurrentScenario(nextScenario.id)
        navigate('/scenario')
      }, 3200)
      return () => window.clearTimeout(timer)
    }
  }, [showTicket, nextScenario, setCurrentScenario, navigate])

  return (
    <PageShell className="justify-center pb-24">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          <GameProgress round={round} />
          <div>
            <p className="text-sm font-black uppercase text-secondary">
              Slot Machine Hub
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-6xl">
              Pull a scenario from the feed.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
              Each spin turns a clothing decision into likes, pressure, and a
              reality check. The scores stay hidden. The pattern does not.
            </p>
          </div>
          {!nextScenario ? (
            <PrimaryButton onClick={() => navigate('/analysis')} disabled={spinning}>
              Analyze Results
              <ArrowRight size={18} aria-hidden="true" />
            </PrimaryButton>
          ) : (
            <div className="flex flex-col gap-4">
              <motion.div
                key="spin-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4"
              >
                <PrimaryButton onClick={beginRound} disabled={spinning || showTicket} className="sm:hidden">
                  Spin Round {round}
                  <ArrowRight size={18} aria-hidden="true" />
                </PrimaryButton>
                <p className="hidden text-lg font-bold text-primary sm:block animate-pulse">
                  {!showTicket ? `Tap the lever to begin Round ${round}` : 'Accessing feed...'}
                </p>
              </motion.div>
            </div>
          )}
        </div>
        <div className="relative">
          <SlotMachine 
            spinning={spinning} 
            onSpinComplete={handleSpinComplete} 
            onSpinTrigger={nextScenario && !showTicket ? beginRound : undefined}
            disabled={spinning || showTicket || !nextScenario}
            showTicket={false} // We are using our new premium ScenarioTicket instead
            unlockedScenarioName={nextScenario?.title}
          />

          <AnimatePresence>
            {showTicket && nextScenario && (
              <ScenarioTicket
                scenarioName={nextScenario.title}
                round={round}
                totalRounds={scenarios.length}
              />
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageShell>
  )
}
