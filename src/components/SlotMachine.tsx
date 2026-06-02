import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Bell,
  Camera,
  Heart,
  MessageCircle,
  Send,
  Shirt,
  ShoppingBag,
  Sparkles,
  ThumbsUp,
  TrendingUp,
  UserPlus,
  type LucideIcon,
} from 'lucide-react'
import gsap from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'

const reelIcons: LucideIcon[][] = [
  [Heart, Camera, Shirt, TrendingUp, Sparkles, UserPlus],
  [ThumbsUp, UserPlus, MessageCircle, Send, Heart, Bell],
  [ShoppingBag, Bell, TrendingUp, Sparkles, Camera, Shirt],
]

const combinations = [
  [0, 0, 0], // ❤️ 👍 🛍️
  [1, 1, 1], // 📸 👥 🔔
  [2, 2, 2], // 👕 💬 📈
  [0, 1, 2], // ❤️ 👥 📈
  [1, 0, 0], // 📸 👍 🛍️
  [3, 3, 3], // 📈 ✈️ ✨
  [4, 4, 4], // ✨ ❤️ 📸
  [5, 5, 5], // 👥 🔔 👕
  [0, 2, 4], // ❤️ 💬 📸
  [1, 3, 5], // 📸 ✈️ 👕
  [2, 4, 0], // 👕 ✨ 🛍️
  [3, 5, 1], // 📈 🔔 🔔
  [4, 0, 2], // ✨ 👍 📈
  [5, 2, 3], // 👥 💬 ✨
  [2, 0, 5], // 👕 👍 👕
];

type SlotMachineProps = {
  spinning?: boolean
  onSpinComplete?: () => void
  onSpinTrigger?: () => void
  disabled?: boolean
  showTicket?: boolean
  unlockedScenarioName?: string
}

export function SlotMachine({ spinning = false, onSpinComplete, onSpinTrigger, disabled = false, showTicket = false, unlockedScenarioName }: SlotMachineProps) {
  const reelRefs = useRef<Array<HTMLDivElement | null>>([])
  const lightRefs = useRef<Array<HTMLSpanElement | null>>([])
  const machineRef = useRef<HTMLDivElement>(null)
  const leverArmRef = useRef<HTMLDivElement>(null)
  const particles = useMemo(() => Array.from({ length: 22 }, (_, index) => index), [])

  const [leverPulled, setLeverPulled] = useState(false)
  const [isHolding, setIsHolding] = useState(false)

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || spinning || leverPulled || !onSpinTrigger) return
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    setIsHolding(true)

    gsap.to(leverArmRef.current, {
      rotationX: 45,
      duration: 0.15,
      ease: 'power2.inOut',
    })
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || spinning || leverPulled || !isHolding) return
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    setIsHolding(false)
    setLeverPulled(true)

    if (onSpinTrigger) onSpinTrigger()

    gsap.to(leverArmRef.current, {
      rotationX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
      onComplete: () => {
        setLeverPulled(false)
      }
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (disabled || spinning || leverPulled || !onSpinTrigger) return

      setLeverPulled(true)
      gsap.to(leverArmRef.current, {
        rotationX: 45,
        duration: 0.15,
        ease: 'power2.inOut',
        onComplete: () => {
          if (onSpinTrigger) onSpinTrigger()
          gsap.to(leverArmRef.current, {
            rotationX: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)',
            onComplete: () => {
              setLeverPulled(false)
            }
          })
        }
      })
    }
  }

  // lighting animations
  useEffect(() => {
    const lights = lightRefs.current.filter(Boolean)
    gsap.to(lights, {
      opacity: 0.35,
      scale: 0.75,
      duration: 0.55,
      stagger: { each: 0.04, repeat: -1, yoyo: true },
      ease: 'sine.inOut',
    })
  }, [])

  // reel spin animations
  useEffect(() => {
    if (!spinning) return

    // 1. Pick a random combination at the start of the spin
    const combo = combinations[Math.floor(Math.random() * combinations.length)];
    const isDesktop = window.innerWidth >= 640;
    const stepHeight = isDesktop ? 96 : 80; // Icon height + gap
    const offset = isDesktop ? 76 : 72; // Padding + half window height - half icon height

    const timeline = gsap.timeline({
      onComplete: onSpinComplete,
    })

    // Subtly shake the machine while spinning
    timeline.to(machineRef.current, {
      x: () => gsap.utils.random(-2, 2),
      y: () => gsap.utils.random(-2, 2),
      duration: 0.06,
      repeat: 20, 
      yoyo: true,
      ease: 'power1.inOut',
    })
    
    // Reset shake
    timeline.to(machineRef.current, { x: 0, y: 0, duration: 0.05 })

    // Spin reels
    reelRefs.current.forEach((reel, index) => {
      // Target an icon in the 6th set (index 30-35) for a long spin feel
      const targetIconIndex = 30 + combo[index];
      // Calculate exact distance to center the icon in the reel window
      const spinDistance = offset - (targetIconIndex * stepHeight);

      timeline.fromTo(
        reel,
        { y: 0 },
        {
          y: spinDistance,
          duration: 1.5 + index * 0.4,
          ease: 'power3.inOut',
        },
        0 
      )
    })
  }, [spinning, onSpinComplete])

  return (
    <div className="relative mx-auto w-full max-w-[320px] sm:max-w-md md:max-w-xl lg:max-w-2xl">
      {/* Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {particles.map((particle) => (
          <span
            key={particle}
            className="absolute size-1 sm:size-2 rounded-full bg-secondary/80 animate-float-particle"
            style={{
              left: `${(particle * 37) % 100}%`,
              animationDelay: `${particle * 0.17}s`,
              animationDuration: `${3 + (particle % 5)}s`,
              boxShadow: '0 0 10px rgba(244, 63, 94, 0.8), 0 0 20px rgba(244, 63, 94, 0.4)',
            }}
          />
        ))}
      </div>

      <div className="relative flex items-center justify-center">
        {/* Machine Body */}
        <div
          ref={machineRef}
          className="relative z-10 w-full rounded-[32px] sm:rounded-[40px] border-[4px] sm:border-[6px] border-amber-600/30 bg-[linear-gradient(145deg,#1e293b,#0f172a_40%,#020617_80%)] p-3 sm:p-5 shadow-[0_0_60px_rgba(255,107,53,0.4),inset_0_0_30px_rgba(255,107,53,0.2)]"
        >
          {/* Casino Frame Lights */}
          <div className="absolute inset-[-6px] sm:inset-[-8px] rounded-[38px] sm:rounded-[46px] border-2 border-primary/20 pointer-events-none overflow-hidden z-20">
             {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={`frame-light-${i}`}
                  className="absolute size-2 sm:size-3 rounded-full bg-yellow-300 shadow-[0_0_12px_rgba(253,224,71,1),0_0_24px_rgba(255,107,53,0.9)] animate-pulse"
                  style={{
                    top: i < 8 ? '2px' : (i >= 12 && i < 20 ? 'calc(100% - 10px)' : `${((i % 4) + 1) * 20}%`),
                    left: i < 8 ? `${4 + i * 13.5}%` : (i >= 12 && i < 20 ? `${4 + (i - 12) * 13.5}%` : (i >= 8 && i < 12 ? 'calc(100% - 10px)' : '2px')),
                    animationDelay: `${(i % 3) * 0.2}s`,
                    animationDuration: '0.6s',
                  }}
                />
             ))}
          </div>

          {/* Main Display Area */}
          <div className="relative rounded-[24px] bg-gradient-to-b from-slate-900 via-slate-950 to-black p-4 sm:p-6 shadow-[inset_0_10px_30px_rgba(0,0,0,0.8)] border-t border-slate-700/50">
            
            {/* Top Lights Marquee */}
            <div className="mb-4 flex justify-around gap-1 px-2">
              {Array.from({ length: 15 }, (_, index) => (
                <span
                  key={`top-${index}`}
                  ref={(element) => {
                    lightRefs.current[index] = element
                  }}
                  className="size-2 sm:size-3 rounded-full bg-secondary shadow-[0_0_15px_rgba(244,63,94,0.9)]"
                />
              ))}
            </div>

            {/* Reels Container */}
            <div className="rounded-xl sm:rounded-2xl border-4 border-slate-800 bg-slate-950 p-2 sm:p-4 shadow-[inset_0_0_30px_rgba(0,0,0,1)] relative">
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-10 pointer-events-none" />
              
              <div className="grid grid-cols-3 gap-2 sm:gap-4 overflow-hidden h-[224px] sm:h-[256px]">
                {reelIcons.map((icons, reelIndex) => (
                  <div
                    key={`reel-container-${reelIndex}`}
                    className="relative overflow-hidden rounded-lg border border-primary/20 bg-black shadow-[inset_0_0_15px_rgba(255,107,53,0.15)]"
                  >
                    <div
                      ref={(element) => {
                        reelRefs.current[reelIndex] = element
                      }}
                      className="absolute left-0 right-0 top-0 grid gap-4 p-2 sm:p-3"
                    >
                      {[...Array(8)].flatMap(() => icons).map((Icon, iconIndex) => (
                        <div
                          key={`icon-${reelIndex}-${iconIndex}`}
                          className="flex h-16 sm:h-20 items-center justify-center rounded-xl bg-slate-900/80 text-primary shadow-[0_0_15px_rgba(255,107,53,0.3)] border border-primary/30"
                        >
                          <Icon className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-[0_0_8px_rgba(255,107,53,0.8)]" strokeWidth={2.5} aria-hidden="true" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Lights Marquee */}
            <div className="mt-4 flex justify-around gap-1 px-2">
              {Array.from({ length: 15 }, (_, index) => (
                <span
                  key={`bottom-${index}`}
                  ref={(element) => {
                    lightRefs.current[index + 15] = element
                  }}
                  className="size-2 sm:size-3 rounded-full bg-primary shadow-[0_0_15px_rgba(255,107,53,0.9)]"
                />
              ))}
            </div>
            
            {/* Coin Slot / Detail */}
            <div className="mt-4 flex justify-center relative z-20">
               <div className="relative h-6 sm:h-8 w-24 sm:w-32 rounded-full border-2 border-slate-700 bg-slate-900 flex items-center justify-center shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
                  {/* The slit itself - z-30 to appear over the emerging ticket */}
                  <div className="h-1 sm:h-2 w-16 sm:w-20 bg-black rounded-full shadow-[inset_0_0_5px_rgba(255,255,255,0.1)] relative z-30" />
                  
                  {/* Scenario Ticket */}
                  <AnimatePresence>
                    {showTicket && unlockedScenarioName && (
                      <motion.div
                        initial={{ y: 0, scale: 0.1, opacity: 0 }}
                        animate={{ 
                          y: -220, 
                          scale: 1, 
                          opacity: 1,
                          rotate: [-2, 2, -1.5, 1, 0]
                        }}
                        transition={{ 
                          duration: 1.5,
                          ease: "backOut",
                          rotate: {
                            duration: 2.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                          }
                        }}
                        className="absolute bottom-1/2 left-1/2 -translate-x-1/2 z-20 w-56 sm:w-64 aspect-[1/1.2] bg-[#fdfbf7] rounded border border-yellow-200/50 flex flex-col items-center justify-center p-4 shadow-[0_20px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(244,63,94,0.6)] overflow-hidden"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`
                        }}
                      >
                        <p className="text-[10px] sm:text-xs font-black text-secondary uppercase tracking-widest text-center mb-2 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]">Scenario Unlocked</p>
                        <p className="text-base sm:text-lg font-black text-slate-900 text-center uppercase leading-tight">{unlockedScenarioName}</p>
                        
                        {/* Subtly glowing edges for the neon effect */}
                        <div className="absolute inset-0 border-2 border-secondary/40 rounded shadow-[inset_0_0_20px_rgba(244,63,94,0.2)] pointer-events-none" />
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </div>

            {/* Lever Container (moved inside machine body to prevent off-screen overflow) */}
            {onSpinTrigger && (
              <div className="absolute -right-12 sm:-right-17 top-1/2 -translate-y-1/2 z-0 hidden sm:flex flex-col items-center">
                {/* Lever Base */}
                <div className="w-8 sm:w-10 h-24 sm:h-32 bg-gradient-to-r from-slate-700 to-slate-900 rounded-r-2xl border-y-2 border-r-2 border-slate-600 shadow-[inset_-5px_0_10px_rgba(0,0,0,0.5)]" />
                
                {/* Lever Arm Container for Origin */}
                <div className="absolute top-1/2 left-4 sm:left-5 w-4 sm:w-6 h-[160px] sm:h-[200px] -translate-y-full" style={{ perspective: '800px' }}>
                    <div 
                      ref={leverArmRef}
                      className="absolute bottom-0 left-0 w-3 sm:w-5 h-full bg-gradient-to-b from-slate-300 via-slate-100 to-slate-400 rounded-t-full cursor-pointer hover:brightness-110 flex justify-center"
                      style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
                      onPointerDown={handlePointerDown}
                      onPointerUp={handlePointerUp}
                      onPointerCancel={handlePointerUp}
                      role="button"
                      tabIndex={0}
                      aria-label="Pull lever to spin"
                      onKeyDown={handleKeyDown}
                    >
                      {/* Lever Ball */}
                      <div 
                        className="absolute -top-4 sm:-top-6 w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gradient-to-tr from-secondary via-red-500 to-red-600 shadow-[0_0_25px_rgba(244,63,94,0.8),inset_-5px_-5px_15px_rgba(0,0,0,0.4)] border-2 border-red-400/50"
                      />
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile spin button (if lever is hidden) */}
      {onSpinTrigger && (
        <div className="mt-8 flex justify-center sm:hidden relative z-20">
          <button
            onClick={() => {
              if (disabled || spinning || leverPulled || !onSpinTrigger) return;
              onSpinTrigger();
            }}
            disabled={disabled || spinning || leverPulled}
            className="rounded-full bg-gradient-to-br from-secondary to-red-600 px-8 py-3 font-black text-white shadow-[0_0_20px_rgba(244,63,94,0.5)] active:scale-95 transition-transform disabled:opacity-50 disabled:active:scale-100"
          >
            SPIN NOW
          </button>
        </div>
      )}
    </div>
  )
}
