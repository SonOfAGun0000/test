import type { ReactNode } from 'react'

type ScenarioCardProps = {
  title: string
  eyebrow?: string
  children: ReactNode
}

export function ScenarioCard({ title, eyebrow, children }: ScenarioCardProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-card/90 p-5 shadow-2xl shadow-slate-950/30">
      {eyebrow ? (
        <p className="mb-2 text-xs font-extrabold uppercase text-secondary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-xl font-black text-white">{title}</h2>
      <div className="mt-4 text-sm leading-6 text-slate-300">{children}</div>
    </article>
  )
}
