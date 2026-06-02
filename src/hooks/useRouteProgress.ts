import { useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import type { RouteKey } from '../types/game'

export const useRouteProgress = (routeKey: RouteKey) => {
  const setProgressStep = useGameStore((state) => state.setProgressStep)

  useEffect(() => {
    setProgressStep(routeKey)
  }, [routeKey, setProgressStep])
}
