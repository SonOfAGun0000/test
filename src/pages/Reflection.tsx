import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { PrimaryButton } from '../components/PrimaryButton'
import { getScenarioById, scenarios } from '../data/scenarios'
import { useRouteProgress } from '../hooks/useRouteProgress'
import { useGameStore } from '../store/gameStore'
import { PageShell } from '../components/PageShell'

export function Reflection() {
  useRouteProgress('reflection')
  const navigate = useNavigate()
  const scenario = getScenarioById(useGameStore((state) => state.currentScenario))
  const answerReflection = useGameStore((state) => state.answerReflection)
  const completeScenario = useGameStore((state) => state.completeScenario)
  const savedAnswers = useGameStore((state) => state.reflectionAnswers)
  const [selected, setSelected] = useState('')
  const [text, setText] = useState('')

  if (!scenario) {
    return <Navigate to="/hub" replace />
  }

  const finish = () => {
    const finalAnswer = [selected, text.trim()].filter(Boolean).join(' | ')
    answerReflection(scenario.id, finalAnswer || savedAnswers[scenario.id] || 'Skipped')
    completeScenario(scenario.id)
    navigate(scenario.round === scenarios.length ? '/analysis' : '/hub')
  }

  return (
    <PageShell className="justify-center pb-24">
      <section className="mx-auto w-full max-w-3xl rounded-lg border border-white/10 bg-card/90 p-5 shadow-2xl">
        <p className="text-sm font-black uppercase text-secondary">Reflection</p>
        <h1 className="mt-3 text-3xl font-black text-white sm:text-5xl">
          {scenario.reflection.question}
        </h1>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {scenario.reflection.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(option)}
              className={`rounded-lg border p-4 text-left font-black transition ${
                selected === option
                  ? 'border-secondary bg-secondary/15 text-white shadow-neon-secondary'
                  : 'border-white/10 bg-slate-950/40 text-slate-200 hover:border-primary/60'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <label className="mt-5 block">
          <span className="text-sm font-bold text-slate-300">
            {scenario.reflection.textPrompt}
          </span>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="mt-2 min-h-28 w-full resize-none rounded-lg border border-white/10 bg-slate-950/70 p-4 text-white outline-none transition focus:border-secondary"
            placeholder="Optional"
          />
        </label>
        <PrimaryButton className="mt-5 w-full sm:w-auto" onClick={finish}>
          Continue
        </PrimaryButton>
      </section>
    </PageShell>
  )
}
