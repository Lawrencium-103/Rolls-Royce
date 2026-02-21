'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onLoadingComplete?: () => void
  minimumDuration?: number
}

export default function Preloader({ 
  onLoadingComplete, 
  minimumDuration = 2000 
}: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const elapsed = Date.now() - startTimeRef.current
        const targetProgress = Math.min((elapsed / minimumDuration) * 100, 100)
        const newProgress = prev + (targetProgress - prev) * 0.1
        
        if (newProgress >= 99.5) {
          clearInterval(interval)
          return 100
        }
        
        return newProgress
      })
    }, 16)

    return () => clearInterval(interval)
  }, [minimumDuration])

  useEffect(() => {
    if (progress >= 100 && !isComplete) {
      setTimeout(() => {
        setIsComplete(true)
        onLoadingComplete?.()
      }, 300)
    }
  }, [progress, isComplete, onLoadingComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { 
              duration: 0.8, 
              ease: [0.83, 0, 0.17, 1] 
            }
          }}
        >
          <div className="preloader-content">
            <motion.div
              className="spirit-icon"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M50 10 C30 20, 20 40, 25 60 C30 80, 45 90, 50 90 C55 90, 70 80, 75 60 C80 40, 70 20, 50 10"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.1 }}
                />
                <motion.path
                  d="M50 15 L50 5"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.1 }}
                />
                <motion.path
                  d="M45 8 L50 5 L55 8"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.1 }}
                />
                <motion.path
                  d="M40 25 Q35 35, 38 45"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.1 }}
                  opacity={0.5}
                />
                <motion.path
                  d="M60 25 Q65 35, 62 45"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.1 }}
                  opacity={0.5}
                />
              </svg>
            </motion.div>

            <div className="loading-text">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                ROLLS-ROYCE
              </motion.span>
            </div>

            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="progress-text">
              {Math.round(progress)}%
            </div>
          </div>

          <style jsx>{`
            .preloader {
              position: fixed;
              inset: 0;
              z-index: 10000;
              background: var(--color-primary-black);
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .preloader-content {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 2rem;
            }

            .spirit-icon {
              width: 80px;
              height: 80px;
              color: var(--color-secondary-silver);
            }

            .spirit-icon svg {
              width: 100%;
              height: 100%;
            }

            .loading-text {
              font-family: var(--font-subheading);
              font-size: var(--font-size-small);
              font-weight: 300;
              letter-spacing: var(--letter-spacing-wide);
              color: var(--color-secondary-silver);
              text-transform: uppercase;
            }

            .progress-bar {
              width: 200px;
              height: 1px;
              background: hsla(0, 0%, 89%, 0.2);
              position: relative;
              overflow: hidden;
            }

            .progress-fill {
              height: 100%;
              background: var(--color-secondary-silver);
              transition: width 0.1s linear;
            }

            .progress-text {
              font-family: var(--font-body);
              font-size: var(--font-size-micro);
              color: var(--color-text-secondary);
              letter-spacing: 0.1em;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
