import { Outlet } from 'react-router-dom'
import { AudioToggle } from '../components/AudioToggle'
import { ResetButton } from '../components/ResetButton'
import { useSessionRestore } from '../hooks/useSessionRestore'

export function GameLayout() {
  useSessionRestore()

  return (
    <div className="min-h-svh overflow-hidden bg-background text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,107,53,0.20),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(244,63,94,0.18),transparent_30%)]" />
      <div className="relative z-10">
        <Outlet />
      </div>
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-3">
        <ResetButton />
        <AudioToggle />
      </div>
    </div>
  )
}
