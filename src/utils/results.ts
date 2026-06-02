import { scenarios } from '../data/scenarios'
import type { BehaviourKey, FearKey, GameState } from '../types/game'

export type PersonalityId =
  | 'validation-seeker'
  | 'balanced-thinker'
  | 'authentic-chooser'

export type SecretBadgeId =
  | 'algorithms-favorite'
  | 'reality-master'
  | 'the-observer'

export type SecretBadge = {
  id: SecretBadgeId
  label: string
  message: string
}

export type PsychologyLabel = {
  key: FearKey | BehaviourKey
  label: string
  icon: string
}

export type ResultTheme = {
  gradient: string
  glow: string
  accent: string
  motifs: string[]
}

export type ResultProfile = {
  id: PersonalityId
  personality: string
  description: string
  influencePercent: number
  realityPercent: number
  mostCommonFear: PsychologyLabel
  mostCommonBehaviour: PsychologyLabel
  personalizedInsight: string
  badges: SecretBadge[]
  theme: ResultTheme
}

const maxScore = scenarios.length * 30

export const fearLabels: Record<FearKey, PsychologyLabel> = {
  judged: { key: 'judged', label: 'Being Judged', icon: 'Eye' },
  repetitive: { key: 'repetitive', label: 'Looking Repetitive', icon: 'Repeat' },
  attention: { key: 'attention', label: 'Missing Attention', icon: 'Bell' },
  boring: { key: 'boring', label: 'Looking Boring', icon: 'Sparkles' },
  fittingIn: { key: 'fittingIn', label: 'Not Fitting In', icon: 'Users' },
}

export const behaviourLabels: Record<BehaviourKey, PsychologyLabel> = {
  buysNewOutfits: {
    key: 'buysNewOutfits',
    label: 'Buying New Outfits',
    icon: 'ShoppingBag',
  },
  followsTrends: {
    key: 'followsTrends',
    label: 'Following Trends',
    icon: 'TrendingUp',
  },
  repeatsOutfits: {
    key: 'repeatsOutfits',
    label: 'Repeating Favourite Outfits',
    icon: 'Repeat',
  },
  borrowsOutfits: {
    key: 'borrowsOutfits',
    label: 'Borrowing Outfits',
    icon: 'Shirt',
  },
  avoidsPhotos: {
    key: 'avoidsPhotos',
    label: 'Avoiding Photos',
    icon: 'CameraOff',
  },
}

const themes: Record<PersonalityId, ResultTheme> = {
  'validation-seeker': {
    gradient: 'from-accent via-primary to-pink-500',
    glow: 'shadow-[0_0_46px_rgba(244,63,94,0.42)]',
    accent: '#F43F5E',
    motifs: ['Notifications', 'Hearts', 'Social icons'],
  },
  'balanced-thinker': {
    gradient: 'from-sky-500 via-violet-500 to-slate-950',
    glow: 'shadow-[0_0_46px_rgba(124,58,237,0.36)]',
    accent: '#7C3AED',
    motifs: ['Balance', 'Equalizer', 'Symmetry'],
  },
  'authentic-chooser': {
    gradient: 'from-success via-emerald-400 to-secondary',
    glow: 'shadow-[0_0_46px_rgba(34,197,94,0.34)]',
    accent: '#22C55E',
    motifs: ['Open road', 'Stars', 'Freedom'],
  },
}

const normalizeRecord = <Key extends string>(
  record: Partial<Record<Key, number>> | undefined,
  keys: readonly Key[],
) =>
  keys.reduce(
    (normalized, key) => ({
      ...normalized,
      [key]: record?.[key] ?? 0,
    }),
    {} as Record<Key, number>,
  )

const getTopKey = <Key extends string>(
  record: Record<Key, number>,
  fallback: Key,
) => {
  const sorted = Object.entries(record).sort(
    ([, valueA], [, valueB]) => Number(valueB) - Number(valueA),
  )
  return (sorted[0]?.[0] as Key | undefined) ?? fallback
}

export const calculateDominantFear = (state: GameState) => {
  const tracking = normalizeRecord(state.fearTracking, Object.keys(fearLabels) as FearKey[])
  return fearLabels[getTopKey(tracking, 'judged')]
}

export const calculateDominantBehaviour = (state: GameState) => {
  const tracking = normalizeRecord(
    state.behaviorTracking,
    Object.keys(behaviourLabels) as BehaviourKey[],
  )
  return behaviourLabels[getTopKey(tracking, 'followsTrends')]
}

export const calculateSocialInfluence = (state: GameState) =>
  Math.min(100, Math.round((state.hiddenValidationScore / maxScore) * 100))

export const calculateRealityAwareness = (state: GameState) =>
  Math.min(100, Math.round((state.hiddenRealityScore / maxScore) * 100))

const getPersonalityId = (
  influencePercent: number,
  realityPercent: number,
): PersonalityId => {
  const difference = influencePercent - realityPercent

  if (difference >= 18) {
    return 'validation-seeker'
  }

  if (difference <= -18) {
    return 'authentic-chooser'
  }

  return 'balanced-thinker'
}

const getSecretBadges = (
  influencePercent: number,
  realityPercent: number,
): SecretBadge[] => {
  const badges: SecretBadge[] = []

  if (influencePercent >= 70 && influencePercent - realityPercent >= 20) {
    badges.push({
      id: 'algorithms-favorite',
      label: "🎭 Algorithm's Favorite",
      message: 'The algorithm knows exactly what gets your attention.',
    })
  }

  if (realityPercent >= 70 && realityPercent - influencePercent >= 20) {
    badges.push({
      id: 'reality-master',
      label: '🏆 Reality Master',
      message: 'You consistently prioritize reality over perceived judgement.',
    })
  }

  if (Math.abs(influencePercent - realityPercent) <= 8) {
    badges.push({
      id: 'the-observer',
      label: '⚖️ The Observer',
      message: 'You understand both social influence and personal authenticity.',
    })
  }

  return badges
}

const generateInsight = (
  personalityId: PersonalityId,
  fear: PsychologyLabel,
  behaviour: PsychologyLabel,
) => {
  if (personalityId === 'validation-seeker' && fear.key === 'judged') {
    return 'The fear of judgement appeared repeatedly throughout your decisions. However, the reality checks suggest people may notice less than you expect.'
  }

  if (personalityId === 'validation-seeker') {
    return `${fear.label} kept pulling your choices toward visible approval. The reality checks suggest the feed made the risk feel larger than it was offline.`
  }

  if (
    personalityId === 'authentic-chooser' &&
    behaviour.key === 'repeatsOutfits'
  ) {
    return 'You consistently valued comfort and personal preference over external expectations.'
  }

  if (personalityId === 'authentic-chooser') {
    return `${behaviour.label} showed up as a self-trust pattern. You noticed social pressure, but your decisions kept returning to what felt real.`
  }

  return `Your pattern mixed ${behaviour.label.toLowerCase()} with awareness of ${fear.label.toLowerCase()}. You read the room without handing the whole decision to it.`
}

export const calculateResult = (state: GameState): ResultProfile => {
  const influencePercent = calculateSocialInfluence(state)
  const realityPercent = calculateRealityAwareness(state)
  const mostCommonFear = calculateDominantFear(state)
  const mostCommonBehaviour = calculateDominantBehaviour(state)
  const id = getPersonalityId(influencePercent, realityPercent)

  const base = {
    id,
    influencePercent,
    realityPercent,
    mostCommonFear,
    mostCommonBehaviour,
    personalizedInsight: generateInsight(id, mostCommonFear, mostCommonBehaviour),
    badges: getSecretBadges(influencePercent, realityPercent),
    theme: themes[id],
  }

  if (id === 'validation-seeker') {
    return {
      ...base,
      personality: 'Validation Seeker',
      description:
        'You often anticipate judgement that never arrives. You may overestimate how closely other people observe your choices.',
    }
  }

  if (id === 'authentic-chooser') {
    return {
      ...base,
      personality: 'Authentic Chooser',
      description:
        'You prioritize comfort, self-expression, and personal values over external approval.',
    }
  }

  return {
    ...base,
    personality: 'Balanced Thinker',
    description:
      'You understand social expectations without allowing them to fully control your decisions.',
  }
}
