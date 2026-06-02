import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type {
  BehaviourKey,
  FearKey,
  GameChoice,
  GameState,
  GameStore,
  RouteKey,
} from '../types/game'
import { completedSessionAwareStorage } from '../utils/storage'

const now = () => new Date().toISOString()

const initialProgress: GameState['progress'] = {
  currentStep: 'intro',
  scenarioStage: 'intro',
  completedRoutes: [],
  completedScenarioIds: [],
  startedAt: null,
  updatedAt: null,
}

const initialFearTracking: Record<FearKey, number> = {
  judged: 0,
  repetitive: 0,
  attention: 0,
  boring: 0,
  fittingIn: 0,
}

const initialBehaviorTracking: Record<BehaviourKey, number> = {
  buysNewOutfits: 0,
  followsTrends: 0,
  repeatsOutfits: 0,
  borrowsOutfits: 0,
  avoidsPhotos: 0,
}

export const initialGameState: GameState = {
  currentScenario: null,
  selectedChoices: {},
  reflectionAnswers: {},
  hiddenValidationScore: 0,
  hiddenRealityScore: 0,
  fearTracking: initialFearTracking,
  behaviorTracking: initialBehaviorTracking,
  progress: initialProgress,
  audioEnabled: false,
  gameCompleted: false,
}

const increment = <Key extends string>(record: Record<Key, number>, key: Key) => ({
  ...record,
  [key]: (record[key] ?? 0) + 1,
})

const markRouteVisited = (
  completedRoutes: RouteKey[],
  step: RouteKey,
): RouteKey[] => {
  if (step === 'intro' || completedRoutes.includes(step)) {
    return completedRoutes
  }

  return [...completedRoutes, step]
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      ...initialGameState,
      setCurrentScenario: (scenarioId) =>
        set((state) => ({
          currentScenario: scenarioId,
          progress: {
            ...state.progress,
            scenarioStage: 'intro',
            updatedAt: now(),
          },
        })),
      setScenarioStage: (stage) =>
        set((state) => ({
          progress: {
            ...state.progress,
            scenarioStage: stage,
            updatedAt: now(),
          },
        })),
      selectChoice: (scenario, choice: GameChoice) =>
        set((state) => ({
          selectedChoices: {
            ...state.selectedChoices,
            [scenario.id]: choice.id,
          },
          hiddenValidationScore:
            state.hiddenValidationScore + choice.weights.validation,
          hiddenRealityScore: state.hiddenRealityScore + choice.weights.reality,
          fearTracking: increment(state.fearTracking, choice.fear),
          behaviorTracking: increment(state.behaviorTracking, choice.behavior),
          progress: {
            ...state.progress,
            scenarioStage: 'lever',
            updatedAt: now(),
          },
        })),
      answerReflection: (scenarioId, answer) =>
        set((state) => ({
          reflectionAnswers: {
            ...state.reflectionAnswers,
            [scenarioId]: answer,
          },
          progress: {
            ...state.progress,
            updatedAt: now(),
          },
        })),
      completeScenario: (scenarioId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            completedScenarioIds: state.progress.completedScenarioIds.includes(
              scenarioId,
            )
              ? state.progress.completedScenarioIds
              : [...state.progress.completedScenarioIds, scenarioId],
            scenarioStage: 'intro',
            updatedAt: now(),
          },
        })),
      setHiddenScores: ({ validation, reality }) =>
        set((state) => ({
          hiddenValidationScore: validation ?? state.hiddenValidationScore,
          hiddenRealityScore: reality ?? state.hiddenRealityScore,
          progress: {
            ...state.progress,
            updatedAt: now(),
          },
        })),
      setProgressStep: (step) =>
        set((state) => ({
          progress: {
            ...state.progress,
            currentStep: step,
            completedRoutes: markRouteVisited(state.progress.completedRoutes, step),
            startedAt: state.progress.startedAt ?? now(),
            updatedAt: now(),
          },
        })),
      toggleAudio: () =>
        set((state) => ({
          audioEnabled: !state.audioEnabled,
        })),
      setAudioEnabled: (enabled) =>
        set({
          audioEnabled: enabled,
        }),
      completeGame: () =>
        set((state) => ({
          ...state,
          gameCompleted: true,
          progress: {
            ...state.progress,
            currentStep: 'results',
            updatedAt: now(),
          },
        })),
      resetGame: () =>
        set({
          ...initialGameState,
        }),
    }),
    {
      name: 'algorithm-slot-machine-session',
      storage: createJSONStorage(() => completedSessionAwareStorage),
      partialize: (state) => ({
        currentScenario: state.currentScenario,
        selectedChoices: state.selectedChoices,
        reflectionAnswers: state.reflectionAnswers,
        hiddenValidationScore: state.hiddenValidationScore,
        hiddenRealityScore: state.hiddenRealityScore,
        fearTracking: state.fearTracking,
        behaviorTracking: state.behaviorTracking,
        progress: state.progress,
        audioEnabled: state.audioEnabled,
        gameCompleted: state.gameCompleted,
      }),
    },
  ),
)
