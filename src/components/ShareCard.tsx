import type { ResultProfile } from '../utils/results'

type ShareCardProps = {
  result: ResultProfile
}

export function ShareCard({ result }: ShareCardProps) {
  const badge = result.badges[0]

  return (
    <div
      className={`relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[28px] border border-white/20 bg-gradient-to-br ${result.theme.gradient} p-7 text-white ${result.theme.glow}`}
    >
      <div className="absolute -right-14 -top-14 size-44 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute -bottom-16 -left-16 size-52 rounded-full bg-black/25 blur-2xl" />
      <div className="relative flex h-full flex-col">
        <p className="text-sm font-black uppercase text-white/80">
          THE ALGORITHM SLOT MACHINE
        </p>
        <div className="my-auto">
          <p className="text-sm font-black uppercase text-white/75">My result</p>
          <h1 className="mt-3 text-5xl font-black leading-tight">
            {result.personality}
          </h1>
          {badge ? (
            <div className="mt-5 inline-flex rounded-full bg-black/25 px-4 py-2 text-sm font-black">
              {badge.label}
            </div>
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-black/30 p-4">
            <p className="text-xs font-black uppercase text-white/70">
              Influence
            </p>
            <p className="text-3xl font-black">{result.influencePercent}%</p>
          </div>
          <div className="rounded-lg bg-black/30 p-4">
            <p className="text-xs font-black uppercase text-white/70">
              Reality
            </p>
            <p className="text-3xl font-black">{result.realityPercent}%</p>
          </div>
        </div>
        <p className="mt-5 text-sm font-extrabold leading-5 text-white/85">
          How much does social media influence YOUR choices?
        </p>
      </div>
    </div>
  )
}
