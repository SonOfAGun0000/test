import type { RouteKey } from '../types/game'

export type AppRouteDefinition = {
  key: RouteKey
  path: string
  label: string
}

export const appRoutes: AppRouteDefinition[] = [
  { key: 'intro', path: '/', label: 'Intro' },
  { key: 'hub', path: '/hub', label: 'Hub' },
  { key: 'scenario', path: '/scenario', label: 'Scenario' },
  { key: 'reward', path: '/reward', label: 'Reward' },
  { key: 'reality', path: '/reality', label: 'Reality' },
  { key: 'reflection', path: '/reflection', label: 'Reflection' },
  { key: 'analysis', path: '/analysis', label: 'Analysis' },
  { key: 'results', path: '/results', label: 'Results' },
  { key: 'share', path: '/share', label: 'Share' },
]

export const routePathByKey = appRoutes.reduce(
  (paths, route) => ({
    ...paths,
    [route.key]: route.path,
  }),
  {} as Record<RouteKey, string>,
)
