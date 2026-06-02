export type SoundName =
  | 'spin'
  | 'release'
  | 'lever'
  | 'reward'
  | 'glitch'
  | 'reveal'
  | 'ambient'

let audioContext: AudioContext | null = null

const initAudio = () => {
  if (audioContext) return audioContext
  const AudioContextClass =
    window.AudioContext || (window as any).webkitAudioContext
  if (AudioContextClass) {
    audioContext = new AudioContextClass()
  }
  return audioContext
}

// Noise buffer for mechanical and textural sounds
const createNoiseBuffer = (ctx: AudioContext, duration: number) => {
  const bufferSize = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1
  }
  return buffer
}

export const playSound = (sound: SoundName, enabled: boolean) => {
  if (!enabled) return
  const ctx = initAudio()
  if (!ctx) return

  const now = ctx.currentTime

  switch (sound) {
    case 'lever': {
      // Stronger mechanical pull
      const osc = ctx.createOscillator()
      osc.type = 'square'
      osc.frequency.setValueAtTime(40, now)
      osc.frequency.exponentialRampToValueAtTime(20, now + 0.3)

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.1, now + 0.05)
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25)
      gain.gain.linearRampToValueAtTime(0, now + 0.4)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.4)

      // Mechanical scrape texture
      const noiseNode = ctx.createBufferSource()
      noiseNode.buffer = createNoiseBuffer(ctx, 0.4)
      const noiseFilter = ctx.createBiquadFilter()
      noiseFilter.type = 'bandpass'
      noiseFilter.frequency.value = 800
      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0, now)
      noiseGain.gain.linearRampToValueAtTime(0.15, now + 0.1)
      noiseGain.gain.linearRampToValueAtTime(0, now + 0.35)

      noiseNode.connect(noiseFilter)
      noiseFilter.connect(noiseGain)
      noiseGain.connect(ctx.destination)
      noiseNode.start(now)
      break
    }
    case 'spin': {
      // Realistic spinning sound - lasts for reel animation (~2.4s)
      const duration = 2.4

      for (let i = 0; i < duration * 15; i++) {
        const timeOffset = now + i / 15 + (i * i * 0.0005) // Slow down over time
        if (timeOffset > now + duration) break

        const osc = ctx.createOscillator()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(800 + Math.random() * 200, timeOffset)
        osc.frequency.exponentialRampToValueAtTime(400, timeOffset + 0.05)

        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0, timeOffset)
        gain.gain.linearRampToValueAtTime(0.05, timeOffset + 0.01)
        gain.gain.linearRampToValueAtTime(0, timeOffset + 0.04)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(timeOffset)
        osc.stop(timeOffset + 0.05)
      }
      break
    }
    case 'release': {
      // Mechanical locking into place
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(600, now)
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.1)

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.1, now + 0.02)
      gain.gain.linearRampToValueAtTime(0, now + 0.15)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.2)
      break
    }
    case 'reward': {
      // Heart pops, follower counter ticks, subtle celebration
      const duration = 1.4 // Match GSAP animation duration

      // Ticking sound
      for (let i = 0; i < duration * 20; i++) {
        const time = now + i / 20
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(1200, time)

        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0, time)
        gain.gain.linearRampToValueAtTime(0.02, time + 0.01)
        gain.gain.linearRampToValueAtTime(0, time + 0.03)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(time)
        osc.stop(time + 0.04)
      }

      // Heart pops
      ;[0.2, 0.6, 1.0].forEach((delay) => {
        const time = now + delay
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(400, time)
        osc.frequency.exponentialRampToValueAtTime(800, time + 0.1)

        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0, time)
        gain.gain.linearRampToValueAtTime(0.1, time + 0.05)
        gain.gain.linearRampToValueAtTime(0, time + 0.15)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(time)
        osc.stop(time + 0.2)
      })

      // Subtle celebration chord
      const endTime = now + duration
      const chord = [523.25, 659.25, 783.99, 1046.5] // C major chord
      chord.forEach((freq, index) => {
        const osc = ctx.createOscillator()
        osc.type = 'triangle'
        osc.frequency.value = freq

        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0, endTime + index * 0.05)
        gain.gain.linearRampToValueAtTime(0.05, endTime + index * 0.05 + 0.1)
        gain.gain.linearRampToValueAtTime(0, endTime + 1.0)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(endTime + index * 0.05)
        osc.stop(endTime + 1.0)
      })
      break
    }
    case 'glitch': {
      // Digital glitch effect, emotional contrast
      for (let i = 0; i < 5; i++) {
        const time = now + Math.random() * 0.4

        const osc = ctx.createOscillator()
        osc.type = Math.random() > 0.5 ? 'sawtooth' : 'square'
        osc.frequency.setValueAtTime(100 + Math.random() * 1000, time)
        osc.frequency.setValueAtTime(100 + Math.random() * 1000, time + 0.05)

        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0, time)
        gain.gain.linearRampToValueAtTime(0.05, time + 0.02)
        gain.gain.linearRampToValueAtTime(0, time + 0.1)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(time)
        osc.stop(time + 0.1)
      }

      // Deep rumble
      const rumble = ctx.createOscillator()
      rumble.type = 'sine'
      rumble.frequency.setValueAtTime(40, now)
      const rumbleGain = ctx.createGain()
      rumbleGain.gain.setValueAtTime(0, now)
      rumbleGain.gain.linearRampToValueAtTime(0.15, now + 0.2)
      rumbleGain.gain.linearRampToValueAtTime(0, now + 0.8)
      rumble.connect(rumbleGain)
      rumbleGain.connect(ctx.destination)
      rumble.start(now)
      rumble.stop(now + 0.8)
      break
    }
    case 'ambient': {
      // Suspenseful ambient tone
      const duration = 5.0
      const freqs = [150, 154, 220, 222, 330]
      freqs.forEach((freq) => {
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.value = freq

        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(0.04, now + 1.5)
        gain.gain.linearRampToValueAtTime(0.04, now + 3.0)
        gain.gain.linearRampToValueAtTime(0, now + duration)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + duration)
      })
      break
    }
    case 'reveal': {
      // Cinematic impact sound
      const duration = 3.0

      // Heavy thud
      const thud = ctx.createOscillator()
      thud.type = 'sine'
      thud.frequency.setValueAtTime(150, now)
      thud.frequency.exponentialRampToValueAtTime(30, now + 0.5)

      const thudGain = ctx.createGain()
      thudGain.gain.setValueAtTime(0, now)
      thudGain.gain.linearRampToValueAtTime(0.3, now + 0.05)
      thudGain.gain.exponentialRampToValueAtTime(0.01, now + 1.0)

      thud.connect(thudGain)
      thudGain.connect(ctx.destination)
      thud.start(now)
      thud.stop(now + 1.0)

      // Shimmer (Noise)
      const noise = ctx.createBufferSource()
      noise.buffer = createNoiseBuffer(ctx, duration)

      const noiseFilter = ctx.createBiquadFilter()
      noiseFilter.type = 'highpass'
      noiseFilter.frequency.value = 2000

      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0, now)
      noiseGain.gain.linearRampToValueAtTime(0.15, now + 0.1)
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + duration)

      noise.connect(noiseFilter)
      noiseFilter.connect(noiseGain)
      noiseGain.connect(ctx.destination)
      noise.start(now)

      // Synth tail
      const synth = ctx.createOscillator()
      synth.type = 'sawtooth'
      synth.frequency.setValueAtTime(55, now) // Low A

      const synthFilter = ctx.createBiquadFilter()
      synthFilter.type = 'lowpass'
      synthFilter.frequency.setValueAtTime(2000, now)
      synthFilter.frequency.exponentialRampToValueAtTime(100, now + 1.5)

      const synthGain = ctx.createGain()
      synthGain.gain.setValueAtTime(0, now)
      synthGain.gain.linearRampToValueAtTime(0.15, now + 0.1)
      synthGain.gain.linearRampToValueAtTime(0, now + duration)

      synth.connect(synthFilter)
      synthFilter.connect(synthGain)
      synthGain.connect(ctx.destination)
      synth.start(now)
      synth.stop(now + duration)
      break
    }
  }
}
