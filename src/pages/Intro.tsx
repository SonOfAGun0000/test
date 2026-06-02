import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart, ThumbsUp, MessageCircle, Bell, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageShell } from "../components/PageShell";
import { SlotMachine } from "../components/SlotMachine";
import { routePathByKey } from "../data/routes";
import { useRouteProgress } from "../hooks/useRouteProgress";

const FloatingParticles = () => {
  const [particles] = useState(() => {
    const icons = [Heart, ThumbsUp, MessageCircle, Bell, Sparkles];
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      Icon: icons[i % icons.length],
      left: `${Math.random() * 100}%`,
      animationDuration: 15 + Math.random() * 25,
      delay: Math.random() * -30,
      scale: 0.8 + Math.random() * 0.8,
      opacity: 0.15 + Math.random() * 0.3,
      xOffset: Math.random() * 120 - 60,
      color: i % 2 === 0 ? 'text-primary' : (i % 3 === 0 ? 'text-secondary' : 'text-accent'),
    }));
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute bottom-0 ${p.color} drop-shadow-[0_0_8px_currentColor]`}
          initial={{ y: "100vh", x: 0 }}
          animate={{
            y: "-20vh",
            x: [0, p.xOffset, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.animationDuration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: p.left,
            opacity: p.opacity,
            scale: p.scale,
          }}
        >
          <p.Icon />
        </motion.div>
      ))}
    </div>
  );
};

export function Intro() {
  useRouteProgress("intro");
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(true);

  const handleSpinComplete = useCallback(() => setIsSpinning(false), []);

  useEffect(() => {
    if (!isSpinning) {
      const timer = setTimeout(() => setIsSpinning(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isSpinning]);

  return (
    <PageShell className="relative justify-center overflow-hidden pb-8 pt-6 sm:pb-16 sm:pt-8 min-h-[100dvh]">
      <FloatingParticles />

      {/* Ambient Glow behind main content */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[800px] max-h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] bg-secondary/20 rounded-full blur-[80px] pointer-events-none z-0 mix-blend-screen" />

      <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 sm:mb-10 w-full"
        >
          <h1 className="text-5xl font-black leading-none tracking-tighter text-white sm:text-7xl md:text-8xl drop-shadow-[0_0_20px_rgba(255,107,53,0.8)] filter">
            THE ALGORITHM
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent drop-shadow-[0_0_25px_rgba(255,107,53,0.9)] filter block mt-1">
              SLOT MACHINE
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, type: "spring", bounce: 0.4 }}
          className="w-full max-w-[min(90vw,360px)] sm:max-w-[500px] md:max-w-[650px] mb-8 sm:mb-10 relative z-20"
        >
          {/* Subtle background pulse for the slot machine */}
          <motion.div 
            animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.98, 1.02, 0.98] }} 
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full -z-10"
          />
          <SlotMachine
            spinning={isSpinning}
            onSpinComplete={handleSpinComplete}
            disabled={true}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 w-full max-w-md px-2 z-30"
        >
          <p className="text-sm sm:text-base md:text-lg font-black tracking-[0.2em] text-slate-200 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Pull the lever.
            <br className="sm:hidden" /> Chase validation.
            <br className="sm:hidden" /> Discover reality.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
            whileTap={{ scale: 0.92 }}
            initial={{ boxShadow: "0 0 20px rgba(255,107,53,0.4)" }}
            animate={{ 
              boxShadow: ["0 0 20px rgba(255,107,53,0.4)", "0 0 50px rgba(255,107,53,0.9)", "0 0 20px rgba(255,107,53,0.4)"] 
            }}
            transition={{ 
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            onClick={() => navigate(routePathByKey.hub)}
            className="group relative w-full overflow-hidden rounded-full bg-gradient-to-b from-primary via-primary to-orange-600 px-8 py-5 sm:py-6 text-2xl sm:text-3xl font-black text-white transition-all uppercase tracking-widest border-[3px] border-white/40 cursor-pointer"
          >
            {/* Button Shine Effect */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
            <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center gap-3">
              Start Experience
              <motion.span 
                animate={{ x: [0, 5, 0] }} 
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                &rarr;
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </section>
    </PageShell>
  );
}
