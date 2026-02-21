'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorAuraRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const auraX = useSpring(cursorX, springConfig)
  const auraY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseEnter = () => setIsHidden(false)
    const handleMouseLeave = () => setIsHidden(true)

    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]')
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true))
        el.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    const timeout = setTimeout(addHoverListeners, 1000)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timeout)
    }
  }, [cursorX, cursorY])

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }

  return (
    <>
      <motion.div
        ref={cursorDotRef}
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        ref={cursorAuraRef}
        className="cursor-aura"
        style={{
          x: auraX,
          y: auraY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 1.5 : 1,
          opacity: isHidden ? 0 : isHovering ? 0.8 : 0.4,
        }}
      />
      <style jsx>{`
        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: var(--cursor-dot);
          height: var(--cursor-dot);
          background: var(--color-secondary-silver);
          border-radius: 50%;
          pointer-events: none;
          z-index: var(--z-cursor);
          mix-blend-mode: difference;
          will-change: transform;
        }

        .cursor-aura {
          position: fixed;
          top: 0;
          left: 0;
          width: var(--cursor-aura);
          height: var(--cursor-aura);
          background: transparent;
          border: 1px solid var(--color-secondary-silver);
          border-radius: 50%;
          pointer-events: none;
          z-index: calc(var(--z-cursor) - 1);
          mix-blend-mode: difference;
          will-change: transform, opacity, scale;
          transition: border-color var(--duration-fast) var(--ease-snappy);
        }
      `}</style>
    </>
  )
}
