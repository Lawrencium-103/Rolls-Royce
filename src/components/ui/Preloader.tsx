'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onLoadingComplete?: () => void
}

export default function Preloader({ onLoadingComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<'intro' | 'reveal' | 'complete'>('intro')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('reveal'), 800)
    const timer2 = setTimeout(() => setPhase('complete'), 1800)
    const timer3 = setTimeout(() => onLoadingComplete?.(), 2200)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          ref={containerRef}
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
        >
          <div className="preloader-inner">
            {phase === 'intro' && (
              <motion.div
                className="logo-reveal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="rr-monogram"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <svg viewBox="0 0 100 100" className="monogram-svg">
                    <motion.path
                      d="M30 30 L30 70 L45 70 Q55 70 55 60 Q55 52 48 50 Q55 48 55 40 Q55 30 45 30 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                    <motion.path
                      d="M55 30 L55 70 L70 70 Q80 70 80 60 Q80 52 73 50 Q80 48 80 40 Q80 30 70 30 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                    />
                    <motion.path
                      d="M38 40 L45 40 Q48 40 48 45 Q48 50 45 50 L38 50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
                    />
                    <motion.path
                      d="M63 40 L70 40 Q73 40 73 45 Q73 50 70 50 L63 50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.35 }}
                    />
                    <motion.path
                      d="M38 58 L47 58 Q52 58 52 63 Q52 68 47 68 L38 68"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.4 }}
                    />
                    <motion.path
                      d="M63 58 L72 58 Q77 58 77 63 Q77 68 72 68 L63 68"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.45 }}
                    />
                  </svg>
                </motion.div>

                <motion.div
                  className="horizontal-line"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            )}

            {phase === 'reveal' && (
              <motion.div
                className="brand-reveal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="brand-text"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="brand-main">ROLLS-ROYCE</span>
                </motion.div>

                <motion.div
                  className="model-text"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  SPECTRE
                </motion.div>

                <motion.div
                  className="tagline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Inspiring Greatness
                </motion.div>
              </motion.div>
            )}
          </div>

          <motion.div
            className="curtain left"
            initial={{ x: '-100%' }}
            animate={{ x: phase === 'reveal' ? '0%' : '-100%' }}
            transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
          />
          <motion.div
            className="curtain right"
            initial={{ x: '100%' }}
            animate={{ x: phase === 'reveal' ? '0%' : '100%' }}
            transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
          />

          <style jsx>{`
            .preloader {
              position: fixed;
              inset: 0;
              z-index: 10000;
              background: #000;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
            }

            .preloader-inner {
              display: flex;
              flex-direction: column;
              align-items: center;
              z-index: 2;
            }

            .logo-reveal {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 2rem;
            }

            .rr-monogram {
              width: 100px;
              height: 100px;
              color: var(--color-accent-gold);
            }

            .monogram-svg {
              width: 100%;
              height: 100%;
            }

            .horizontal-line {
              width: 120px;
              height: 1px;
              background: linear-gradient(90deg, transparent, var(--color-accent-gold), transparent);
              transform-origin: center;
            }

            .brand-reveal {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 0.5rem;
            }

            .brand-text {
              display: flex;
              align-items: center;
              gap: 1rem;
            }

            .brand-main {
              font-family: var(--font-heading);
              font-size: clamp(1.5rem, 4vw, 2.5rem);
              font-weight: 600;
              color: #fff;
              letter-spacing: 0.3em;
            }

            .model-text {
              font-family: var(--font-heading);
              font-size: clamp(3rem, 10vw, 6rem);
              font-weight: 700;
              color: transparent;
              background: linear-gradient(180deg, #fff 0%, var(--color-accent-gold) 100%);
              -webkit-background-clip: text;
              background-clip: text;
              letter-spacing: 0.2em;
              line-height: 1;
            }

            .tagline {
              font-family: var(--font-subheading);
              font-size: 0.75rem;
              font-weight: 300;
              letter-spacing: 0.4em;
              color: rgba(255, 255, 255, 0.4);
              text-transform: uppercase;
              margin-top: 1rem;
            }

            .curtain {
              position: absolute;
              top: 0;
              bottom: 0;
              width: 50%;
              background: var(--color-accent-gold);
              z-index: 1;
            }

            .curtain.left {
              left: 0;
              transform-origin: left;
            }

            .curtain.right {
              right: 0;
              transform-origin: right;
            }

            @media (max-width: 768px) {
              .rr-monogram {
                width: 80px;
                height: 80px;
              }

              .brand-main {
                letter-spacing: 0.2em;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
