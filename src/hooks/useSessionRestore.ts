import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { routePathByKey } from '../data/routes'
import { useGameStore } from '../store/gameStore'

export const useSessionRestore = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const currentStep = useGameStore((state) => state.progress.currentStep)
  const gameCompleted = useGameStore((state) => state.gameCompleted)
  const hasStarted = useGameStore((state) => Boolean(state.progress.startedAt))

  useEffect(() => {
    if (
      location.pathname !== '/' ||
      !hasStarted ||
      gameCompleted ||
      currentStep === 'intro'
    ) {
      return
    }

    navigate(routePathByKey[currentStep], { replace: true })
  }, [currentStep, gameCompleted, hasStarted, location.pathname, navigate])
}
