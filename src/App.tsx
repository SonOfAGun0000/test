import { lazy, Suspense, useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { BootSequence } from './components/BootSequence'
import { GameLayout } from './layouts/GameLayout'
import ProjectInfo from './components/ProjectInfo'

const Intro = lazy(() =>
  import('./pages/Intro').then((module) => ({ default: module.Intro })),
)
const Hub = lazy(() =>
  import('./pages/Hub').then((module) => ({ default: module.Hub })),
)
const Scenario = lazy(() =>
  import('./pages/Scenario').then((module) => ({ default: module.Scenario })),
)
const Reward = lazy(() =>
  import('./pages/Reward').then((module) => ({ default: module.Reward })),
)
const Reality = lazy(() =>
  import('./pages/Reality').then((module) => ({ default: module.Reality })),
)
const Reflection = lazy(() =>
  import('./pages/Reflection').then((module) => ({
    default: module.Reflection,
  })),
)
const Analysis = lazy(() =>
  import('./pages/Analysis').then((module) => ({ default: module.Analysis })),
)
const Results = lazy(() =>
  import('./pages/Results').then((module) => ({ default: module.Results })),
)
const Share = lazy(() =>
  import('./pages/Share').then((module) => ({ default: module.Share })),
)

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<BootSequence onComplete={() => undefined} />}>
        <Routes location={location} key={location.pathname}>
          <Route element={<GameLayout />}>
            <Route index element={<Intro />} />
            <Route path="hub" element={<Hub />} />
            <Route path="scenario" element={<Scenario />} />
            <Route path="reward" element={<Reward />} />
            <Route path="reality" element={<Reality />} />
            <Route path="reflection" element={<Reflection />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="results" element={<Results />} />
            <Route path="share" element={<Share />} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

function App() {
  const [isBooting, setIsBooting] = useState(true)
  const completeBoot = useCallback(() => setIsBooting(false), [])

  if (isBooting) {
    return <BootSequence onComplete={completeBoot} />
  }

  return (
    <HashRouter>
      <AnimatedRoutes />
      <ProjectInfo />
    </HashRouter>
  )
}

export default App
