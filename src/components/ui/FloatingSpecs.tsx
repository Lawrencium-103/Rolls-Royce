'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const specs = [
  { label: 'Power', value: '430 kW' },
  { label: 'Torque', value: '900 Nm' },
  { label: 'Range', value: '530 km' },
  { label: '0-100', value: '4.5s' },
]

export default function FloatingSpecs() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSpec, setActiveSpec] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      
      const scrollPercent = scrollY / (docHeight - windowHeight)
      setIsVisible(scrollPercent > 0.1 && scrollPercent < 0.9)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setActiveSpec((prev) => (prev + 1) % specs.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="floating-specs"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          <div className="spec-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpec}
                className="spec-item"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="spec-label">{specs[activeSpec].label}</span>
                <span className="spec-value">{specs[activeSpec].value}</span>
              </motion.div>
            </AnimatePresence>

            <div className="spec-dots">
              {specs.map((_, index) => (
                <button
                  key={index}
                  className={`spec-dot ${index === activeSpec ? 'active' : ''}`}
                  onClick={() => setActiveSpec(index)}
                  aria-label={`View spec ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <style jsx>{`
            .floating-specs {
              position: fixed;
              left: var(--spacing-lg);
              top: 50%;
              transform: translateY(-50%);
              z-index: var(--z-navigation);
            }

            .spec-container {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: var(--spacing-sm);
              padding: var(--spacing-md);
              background: hsla(0, 0%, 10%, 0.8);
              backdrop-filter: blur(20px);
              border: 1px solid hsla(0, 0%, 89%, 0.1);
              border-radius: var(--border-radius-md);
            }

            .spec-item {
              display: flex;
              flex-direction: column;
              gap: var(--spacing-xs);
            }

            .spec-label {
              font-family: var(--font-subheading);
              font-size: var(--font-size-micro);
              font-weight: 300;
              letter-spacing: var(--letter-spacing-wide);
              color: var(--color-text-secondary);
              text-transform: uppercase;
            }

            .spec-value {
              font-family: var(--font-heading);
              font-size: var(--font-size-h3);
              font-weight: 600;
              color: var(--color-text-primary);
            }

            .spec-dots {
              display: flex;
              gap: var(--spacing-xs);
            }

            .spec-dot {
              width: 6px;
              height: 6px;
              background: hsla(0, 0%, 89%, 0.2);
              border: none;
              border-radius: 50%;
              cursor: pointer;
              transition: all var(--duration-fast);
            }

            .spec-dot.active {
              background: var(--color-accent-gold);
              transform: scale(1.3);
            }

            .spec-dot:hover:not(.active) {
              background: hsla(0, 0%, 89%, 0.5);
            }

            @media (max-width: 1024px) {
              .floating-specs {
                display: none;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
