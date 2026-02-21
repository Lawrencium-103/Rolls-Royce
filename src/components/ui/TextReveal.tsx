'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  once?: boolean
}

export default function TextReveal({
  children,
  className = '',
  delay = 0,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once, margin: '-10% 0px' })
  const [shouldAnimate, setShouldAnimate] = useState(false)

  const words = children.split(' ')

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShouldAnimate(true), delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [isInView, delay])

  return (
    <span ref={ref} className={`text-reveal ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="word-wrapper">
          <motion.span
            className="word"
            initial={{ y: '100%', rotateX: -90, opacity: 0 }}
            animate={shouldAnimate ? { y: 0, rotateX: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: wordIndex * 0.08,
              ease: [0.83, 0, 0.17, 1] as const,
            }}
          >
            {word}
            {wordIndex < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}

      <style jsx>{`
        .text-reveal {
          display: inline;
        }

        .word-wrapper {
          display: inline-block;
          overflow: hidden;
          perspective: 1000px;
        }

        .word {
          display: inline-block;
          transform-origin: center bottom;
        }
      `}</style>
    </span>
  )
}
