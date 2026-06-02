import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { PrimaryButton } from '../components/PrimaryButton'
import { getScenarioById } from '../data/scenarios'
import { useRouteProgress } from '../hooks/useRouteProgress'
import { useGameStore } from '../store/gameStore'
import { playSound } from '../utils/audio'

export function Reality() {
  useRouteProgress('reality')
  const navigate = useNavigate()
  const scenario = getScenarioById(useGameStore((state) => state.currentScenario))
  const audioEnabled = useGameStore((state) => state.audioEnabled)

  useEffect(() => {
    playSound('glitch', audioEnabled)
  }, [audioEnabled])

  if (!scenario) {
    return <Navigate to="/hub" replace />
  }

  return (
    <PageShell className="justify-center bg-slate-950 pb-24">
      <section className="crt-flicker relative mx-auto w-full max-w-3xl overflow-hidden rounded-lg border border-slate-600 bg-slate-900 p-6 text-center shadow-2xl">
        <p className="text-glitch text-sm font-black uppercase text-slate-300">
          Reality Check
        </p>
        <h1 className="mt-4 text-4xl font-black text-white sm:text-6xl">
          {scenario.reality.headline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          {scenario.reality.body}
        </p>
        <PrimaryButton
          tone="ghost"
          className="mt-8"
          onClick={() => navigate('/reflection')}
        >
          Reflect
        </PrimaryButton>
      </section>
    </PageShell>
  )
}
