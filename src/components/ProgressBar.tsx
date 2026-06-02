type ProgressBarProps = {
  value: number
  label?: string
}

export function ProgressBar({ value, label = 'Game progress' }: ProgressBarProps) {
  const normalizedValue = Math.min(100, Math.max(0, value))

  return (
    <div className="w-full" aria-label={label}>
      <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase text-slate-300">
        <span>{label}</span>
        <span>{Math.round(normalizedValue)}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-900 ring-1 ring-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary shadow-neon-primary transition-[width] duration-500"
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
    </div>
  )
}
