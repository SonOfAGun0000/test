import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { BadgeCheck, Heart, MessageCircle, UserPlus } from 'lucide-react'
import { PageShell } from '../components/PageShell'
import { PrimaryButton } from '../components/PrimaryButton'
import { RewardEffects } from '../components/RewardEffects'
import { getScenarioById } from '../data/scenarios'
import { useRouteProgress } from '../hooks/useRouteProgress'
import { useGameStore } from '../store/gameStore'
import { playSound } from '../utils/audio'

export function Reward() {
  useRouteProgress('reward')
  const navigate = useNavigate()
  const likesRef = useRef<HTMLSpanElement>(null)
  const followersRef = useRef<HTMLSpanElement>(null)
  const [ready, setReady] = useState(false)
  const scenario = getScenarioById(useGameStore((state) => state.currentScenario))
  const audioEnabled = useGameStore((state) => state.audioEnabled)

  useEffect(() => {
    if (!scenario) {
      return
    }

    playSound('reward', audioEnabled)
    const data = { likes: 0, followers: 0 }
    const timeline = gsap.timeline({
      onComplete: () => setReady(true),
    })

    timeline.to(data, {
      likes: scenario.reward.likes,
      followers: scenario.reward.followers,
      duration: 1.4,
      ease: 'power3.out',
      onUpdate: () => {
        if (likesRef.current) {
          likesRef.current.textContent = Math.round(data.likes).toString()
        }
        if (followersRef.current) {
          followersRef.current.textContent = `+${Math.round(data.followers)}`
        }
      },
    })

    return () => {
      timeline.kill()
    }
  }, [audioEnabled, scenario])

  if (!scenario) {
    return <Navigate to="/hub" replace />
  }

  return (
    <PageShell className="relative justify-center pb-24">
      <RewardEffects />
      <section className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-sm font-black uppercase text-secondary"
        >
          Social Reward
        </motion.p>
        <h1 className="mt-3 text-5xl font-black text-white sm:text-7xl">
          You are trending.
        </h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-primary/40 bg-primary/15 p-5 shadow-neon-primary">
            <Heart className="mx-auto text-primary" fill="currentColor" />
            <p className="mt-3 text-4xl font-black text-white">
              <span ref={likesRef}>0</span>
            </p>
            <p className="text-xs font-black uppercase text-slate-300">Likes</p>
          </div>
          <div className="rounded-lg border border-secondary/40 bg-secondary/15 p-5 shadow-neon-secondary">
            <UserPlus className="mx-auto text-secondary" />
            <p className="mt-3 text-4xl font-black text-white">
              <span ref={followersRef}>+0</span>
            </p>
            <p className="text-xs font-black uppercase text-slate-300">
              Followers
            </p>
          </div>
          <div className="rounded-lg border border-accent/40 bg-accent/15 p-5">
            <BadgeCheck className="mx-auto text-accent" />
            <p className="mt-3 text-lg font-black text-white">
              {scenario.reward.badges[0]}
            </p>
            <p className="text-xs font-black uppercase text-slate-300">Badge</p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {scenario.reward.comments.map((comment) => (
            <motion.div
              key={comment}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-white/10 bg-card p-4 text-left"
            >
              <MessageCircle className="mb-3 text-secondary" size={18} />
              <p className="font-bold text-white">"{comment}"</p>
            </motion.div>
          ))}
        </div>
        {ready ? (
          <PrimaryButton className="mt-8" onClick={() => navigate('/reality')}>
            Continue
          </PrimaryButton>
        ) : null}
      </section>
    </PageShell>
  )
}
