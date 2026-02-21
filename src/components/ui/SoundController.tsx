'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SoundControllerProps {
  onToggle?: (isPlaying: boolean) => void
}

export default function SoundController({ onToggle }: SoundControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [gainNode, setGainNode] = useState<GainNode | null>(null)
  const [oscillators, setOscillators] = useState<OscillatorNode[]>([])

  const createAmbientSound = useCallback(() => {
    if (typeof window === 'undefined') return null

    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const gain = ctx.createGain()
    gain.connect(ctx.destination)
    gain.gain.value = 0

    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.value = 60
    osc1.connect(gain)
    osc1.start()

    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = 90
    osc2.connect(gain)
    osc2.start()

    const osc3 = ctx.createOscillator()
    osc3.type = 'sine'
    osc3.frequency.value = 120
    osc3.connect(gain)
    osc3.start()

    setOscillators([osc1, osc2, osc3])
    setGainNode(gain)
    setAudioContext(ctx)

    return { ctx, gain }
  }, [])

  const toggleSound = useCallback(() => {
    if (!audioContext) {
      const created = createAmbientSound()
      if (created) {
        created.gain.gain.setTargetAtTime(0.05, created.ctx.currentTime, 0.5)
        setIsPlaying(true)
        onToggle?.(true)
      }
      return
    }

    if (isPlaying) {
      gainNode?.gain.setTargetAtTime(0, audioContext.currentTime, 0.5)
      setIsPlaying(false)
      onToggle?.(false)
    } else {
      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }
      gainNode?.gain.setTargetAtTime(0.05, audioContext.currentTime, 0.5)
      setIsPlaying(true)
      onToggle?.(true)
    }
  }, [audioContext, gainNode, isPlaying, onToggle, createAmbientSound])

  useEffect(() => {
    return () => {
      oscillators.forEach((osc) => osc.stop())
      audioContext?.close()
    }
  }, [audioContext, oscillators])

  return (
    <>
      <motion.button
        className={`sound-controller ${isPlaying ? 'playing' : ''}`}
        onClick={toggleSound}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 3 }}
        aria-label={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
        data-cursor-hover
      >
        <div className="sound-icon">
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.svg
                key="playing"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </motion.svg>
            ) : (
              <motion.svg
                key="muted"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.3 }}
              >
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        {isPlaying && (
          <div className="sound-waves">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="wave"
                animate={{
                  scaleY: [1, 2, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}
      </motion.button>

      <style jsx>{`
        .sound-controller {
          position: fixed;
          bottom: var(--spacing-lg);
          right: var(--spacing-lg);
          z-index: var(--z-navigation);
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm);
          background: hsla(0, 0%, 10%, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid hsla(0, 0%, 89%, 0.1);
          border-radius: var(--border-radius-pill);
          transition: all var(--duration-normal) var(--ease-snappy);
        }

        .sound-controller:hover {
          border-color: var(--color-accent-gold);
        }

        .sound-controller.playing {
          border-color: var(--color-accent-gold);
        }

        .sound-icon {
          width: 20px;
          height: 20px;
          color: var(--color-text-secondary);
          transition: color var(--duration-fast);
        }

        .sound-controller:hover .sound-icon,
        .sound-controller.playing .sound-icon {
          color: var(--color-text-primary);
        }

        .sound-icon svg {
          width: 100%;
          height: 100%;
        }

        .sound-waves {
          display: flex;
          align-items: center;
          gap: 2px;
          height: 16px;
        }

        .wave {
          width: 2px;
          height: 8px;
          background: var(--color-accent-gold);
          border-radius: 1px;
        }

        @media (max-width: 768px) {
          .sound-controller {
            bottom: var(--spacing-sm);
            right: var(--spacing-sm);
          }
        }
      `}</style>
    </>
  )
}
