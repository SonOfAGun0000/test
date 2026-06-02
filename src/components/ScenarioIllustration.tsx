import type { Scenario } from '../types/game'

type ScenarioIllustrationProps = {
  type: Scenario['illustration']
}

export function ScenarioIllustration({ type }: ScenarioIllustrationProps) {
  const accent = {
    birthday: '#FFD166',
    photo: '#38BDF8',
    presentation: '#22C55E',
    holiday: '#14B8A6',
    tiktok: '#F43F5E',
  }[type]

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden rounded-lg border border-white/10 bg-slate-950/35 p-5 shadow-2xl">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 30% 25%, ${accent}, transparent 34%), radial-gradient(circle at 70% 80%, #FF6B35, transparent 34%)`,
        }}
      />
      <svg viewBox="0 0 360 270" className="relative h-full w-full">
        <rect x="22" y="184" width="316" height="34" rx="17" fill="#0F172A" />
        {type === 'birthday' ? (
          <>
            <circle cx="90" cy="82" r="28" fill="#FFD166" />
            <path d="M66 129h60l-9 71H75z" fill="#F43F5E" />
            <rect x="170" y="102" width="96" height="76" rx="14" fill="#1E293B" />
            <path d="M178 102l38-34 42 34" fill="#FF6B35" />
            <circle cx="247" cy="73" r="10" fill="#FFD166" />
            <circle cx="279" cy="91" r="7" fill="#F43F5E" />
          </>
        ) : null}
        {type === 'photo' ? (
          <>
            <rect x="72" y="76" width="216" height="138" rx="24" fill="#1E293B" />
            <rect x="112" y="58" width="54" height="32" rx="10" fill="#38BDF8" />
            <circle cx="181" cy="145" r="50" fill="#0F172A" />
            <circle cx="181" cy="145" r="29" fill={accent} />
            <circle cx="256" cy="105" r="10" fill="#FFD166" />
          </>
        ) : null}
        {type === 'presentation' ? (
          <>
            <rect x="64" y="58" width="232" height="122" rx="12" fill="#E2E8F0" />
            <path d="M91 147h52l21-42 35 22 31-43 40 63" fill="none" stroke="#22C55E" strokeWidth="12" strokeLinecap="round" />
            <circle cx="106" cy="218" r="22" fill="#FFD166" />
            <rect x="130" y="188" width="104" height="45" rx="18" fill="#F43F5E" />
          </>
        ) : null}
        {type === 'holiday' ? (
          <>
            <circle cx="274" cy="72" r="32" fill="#FFD166" />
            <path d="M57 181c54-64 95-64 149 0 35-35 68-36 101 0" fill="#14B8A6" />
            <rect x="126" y="105" width="92" height="91" rx="16" fill="#FF6B35" />
            <path d="M150 105c4-25 40-25 44 0" fill="none" stroke="#FFD166" strokeWidth="10" />
          </>
        ) : null}
        {type === 'tiktok' ? (
          <>
            <rect x="112" y="35" width="136" height="205" rx="28" fill="#020617" />
            <rect x="127" y="58" width="106" height="158" rx="18" fill="#1E293B" />
            <path d="M180 95v70c0 19-16 30-35 24-24-8-18-45 7-45 7 0 13 2 18 6V95z" fill="#F43F5E" />
            <path d="M180 95c16 26 31 37 52 39" fill="none" stroke="#38BDF8" strokeWidth="14" strokeLinecap="round" />
          </>
        ) : null}
      </svg>
    </div>
  )
}
