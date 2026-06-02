import { motion } from 'framer-motion'

interface ScenarioTicketProps {
  scenarioName: string
  round: number
  totalRounds: number
}

export function ScenarioTicket({ scenarioName, round, totalRounds }: ScenarioTicketProps) {
  // Generate 8 floating particles
  const particles = Array.from({ length: 8 })

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="relative group">
        {/* Floating Particles Around Card */}
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-amber-200 blur-[1px]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              y: [-20, -120],
              x: [0, (i % 2 === 0 ? 40 : -40) * Math.random()],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2.5 + Math.random(),
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut"
            }}
            style={{
              left: `${10 + Math.random() * 80}%`,
              bottom: '20%',
            }}
          />
        ))}

        {/* Main Reward Card */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            rotateY: 0,
            rotateZ: [-0.5, 0.5, -0.5],
            y: [-4, 4, -4]
          }}
          exit={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
          transition={{
            scale: { type: "spring", damping: 12, stiffness: 100 },
            rotateY: { duration: 0.6 },
            rotateZ: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative overflow-hidden w-80 sm:w-96 rounded-2xl border-2 border-amber-300/60 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-700 p-8 shadow-[0_0_50px_rgba(245,158,11,0.5)] text-center"
        >
          {/* Animated Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{ width: '200%', skewX: -25 }}
            animate={{ x: ['-150%', '150%'] }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              repeatDelay: 1 
            }}
          />

          {/* Glowing Border Inner */}
          <div className="absolute inset-1 rounded-xl border border-white/20 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <motion.span 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-100/80 drop-shadow-sm"
            >
              Scenario Unlocked
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="my-3 text-3xl sm:text-4xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
            >
              🎉 {scenarioName} 🎉
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="rounded-full bg-black/20 px-4 py-1.5 backdrop-blur-sm border border-white/10"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-amber-100">
                Round {round} of {totalRounds}
              </span>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Extra Outer Glow */}
        <div className="absolute inset-0 bg-amber-500/20 blur-[60px] -z-10" />
      </div>
    </div>
  )
}