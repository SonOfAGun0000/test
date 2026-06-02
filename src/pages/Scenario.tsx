import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { ChoiceCard } from '../components/ChoiceCard'
import { GameProgress } from '../components/GameProgress'
import { LeverControl } from '../components/LeverControl'
import { PageShell } from '../components/PageShell'
import { PrimaryButton } from '../components/PrimaryButton'
import { ScenarioIllustration } from '../components/ScenarioIllustration'
import { getScenarioById } from '../data/scenarios'
import { useRouteProgress } from '../hooks/useRouteProgress'
import { useGameStore } from '../store/gameStore'
import { playSound } from '../utils/audio'

export function Scenario() {
  useRouteProgress('scenario')
  const navigate = useNavigate()
  const currentScenario = useGameStore((state) => state.currentScenario)
  const stage = useGameStore((state) => state.progress.scenarioStage)
  const selectedChoices = useGameStore((state) => state.selectedChoices)
  const setScenarioStage = useGameStore((state) => state.setScenarioStage)
  const selectChoice = useGameStore((state) => state.selectChoice)
  const audioEnabled = useGameStore((state) => state.audioEnabled)
  const scenario = getScenarioById(currentScenario)

  if (!scenario) {
    return <Navigate to="/hub" replace />
  }

  const selectedChoiceId = selectedChoices[scenario.id]

  return (
    <PageShell className="pb-24">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-6">
        <GameProgress round={scenario.round} />
        {stage === 'intro' ? (
          <motion.section
            className="grid items-center gap-7 lg:grid-cols-[0.9fr_1.1fr]"
            style={{
              background: `linear-gradient(135deg, ${scenario.palette.from}18, ${scenario.palette.via}12, ${scenario.palette.to}18)`,
            }}
          >
            <ScenarioIllustration type={scenario.illustration} />
            <div>
              <p className="text-sm font-black uppercase text-secondary">
                Scenario {scenario.round}
              </p>
              <h1 className="mt-3 text-4xl font-black text-white sm:text-6xl">
                {scenario.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-200">
                {scenario.story}
              </p>
              <p className="mt-4 text-base leading-7 text-slate-400">
                {scenario.introPrompt}
              </p>
              <PrimaryButton
                className="mt-7"
                onClick={() => setScenarioStage('choice')}
              >
                Continue
                <ChevronRight size={18} aria-hidden="true" />
              </PrimaryButton>
            </div>
          </motion.section>
        ) : null}

        {stage === 'choice' ? (
          <section>
            <div className="mb-5">
              <p className="text-sm font-black uppercase text-secondary">
                Choose your move
              </p>
              <h1 className="mt-2 text-3xl font-black text-white sm:text-5xl">
                What do you do?
              </h1>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {scenario.choices.map((choice) => (
                <ChoiceCard
                  key={choice.id}
                  choice={choice}
                  selected={selectedChoiceId === choice.id}
                  locked={Boolean(selectedChoiceId)}
                  onSelect={() => {
                    if (selectedChoiceId) {
                      return
                    }
                    playSound('release', audioEnabled)
                    selectChoice(scenario, choice)
                  }}
                />
              ))}
            </div>
          </section>
        ) : null}

        {stage === 'lever' ? (
          <section className="grid items-center gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="text-sm font-black uppercase text-secondary">
                Choice Locked
              </p>
              <h1 className="mt-2 text-4xl font-black text-white sm:text-6xl">
                Pull the lever.
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-300">
                The machine will convert your decision into social reward before
                showing what happened offline.
              </p>
            </div>
            <LeverControl
              onComplete={() => {
                playSound('lever', audioEnabled)
                navigate('/reward')
              }}
            />
          </section>
        ) : null}
      </div>
    </PageShell>
  )
}
