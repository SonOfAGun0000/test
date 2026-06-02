import type { ReactNode } from 'react'

type ResultCardProps = {
  title: string
  value: string
  children?: ReactNode
}

export function ResultCard({ title, value, children }: ResultCardProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-card p-5">
      <p className="text-xs font-extrabold uppercase text-slate-400">{title}</p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
      {children ? (
        <div className="mt-3 text-sm leading-6 text-slate-300">{children}</div>
      ) : null}
    </article>
  )
}
