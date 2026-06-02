/**
 * Defines the union type for all possible game choice icons.
 * These correspond to the LucideIcon components used in the slot machine reels
 * and scenario-related displays.
 */
export type GameChoiceIcon =
  | 'heart'
  | 'thumbsup'
  | 'message'
  | 'send'
  | 'bell'
  | 'shopping'
  | 'shopping-bag'
  | 'shopping-cart'
  | 'trend'
  | 'borrow'
  | 'repeat'
  | 'camera'
  | 'shirt'
  | 'sparkles'
  | 'userPlus'

export type RouteKey =
  | 'intro'
  | 'hub'
  | 'scenario'
  | 'reward'
  | 'reality'
  | 'reflection'
  | 'analysis'
  | 'results'
  | 'share'

export type FearKey =
  | 'judged'
  | 'attention'
  | 'fittingIn'
  | 'repetitive'
  | 'boring'

export type BehaviourKey =
  | 'buysNewOutfits'
  | 'followsTrends'
  | 'borrowsOutfits'
  | 'repeatsOutfits'
  | 'avoidsPhotos'

export interface GameChoice {
  id: string
  title: string
  description: string
  icon: GameChoiceIcon
  weights: {
    validation: number
    reality: number
  }
  fear: FearKey
  behavior: BehaviourKey
}

export interface Scenario {
  id: string
  title: string
  shortTitle: string
  story: string
  introPrompt: string
  illustration: 'birthday' | 'photo' | 'presentation' | 'holiday' | 'tiktok'
  palette: {
    from: string
    via: string
    to: string
  }
  round: number
  choices: GameChoice[]
  reward: {
    comments: string[]
    likes: number
    followers: number
    badges: string[]
  }
  reality: {
    headline: string
    body: string
  }
  reflection: {
    question: string
    options: string[]
    textPrompt: string
  }
}

export interface GameState {
  progress: {
    completedScenarioIds: string[]
    completedRoutes: RouteKey[]
    currentStep: RouteKey
    scenarioStage: 'intro' | 'choice' | 'lever'
    startedAt: string | null
    updatedAt: string | null
  }
  currentScenario: string | null
  selectedChoices: Record<string, string>
  reflectionAnswers: Record<string, string>
  hiddenValidationScore: number
  hiddenRealityScore: number
  fearTracking: Record<FearKey, number>
  behaviorTracking: Record<BehaviourKey, number>
  audioEnabled: boolean
  gameCompleted: boolean
}

export interface GameStore extends GameState {
  toggleAudio: () => void
  setCurrentScenario: (id: string | null) => void
  setScenarioStage: (stage: GameState['progress']['scenarioStage']) => void
  selectChoice: (scenario: Scenario, choice: GameChoice) => void
  answerReflection: (scenarioId: string, answer: string) => void
  completeScenario: (scenarioId: string) => void
  setHiddenScores: (scores: { validation: number; reality: number }) => void
  setProgressStep: (step: RouteKey) => void
  setAudioEnabled: (enabled: boolean) => void
  completeGame: () => void
  resetGame: () => void
}