'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export default function MagneticButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const textX = useTransform(springX, (v) => v * 0.4)
  const textY = useTransform(springY, (v) => v * 0.4)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
    const threshold = 60

    if (distance < threshold) {
      const pull = 1 - distance / threshold
      x.set(distanceX * pull * 0.4)
      y.set(distanceY * pull * 0.4)
    } else {
      x.set(0)
      y.set(0)
    }
  }, [disabled, x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }, [x, y])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (disabled) return

    const rect = buttonRef.current?.getBoundingClientRect()
    if (rect) {
      setRipple({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })

      setTimeout(() => setRipple(null), 600)
    }

    onClick?.()
  }, [disabled, onClick])

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-12 py-5 text-lg',
  }

  const variantClasses = {
    primary: 'bg-white text-black hover:bg-opacity-90',
    secondary: 'bg-transparent border border-white text-white hover:bg-white hover:text-black',
    ghost: 'bg-transparent text-white hover:text-gold',
  }

  return (
    <motion.button
      ref={buttonRef}
      className={`magnetic-button ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <motion.span
        className="button-text"
        style={{
          x: textX,
          y: textY,
          display: 'inline-block',
        }}
      >
        {children}
      </motion.span>
      
      {ripple && (
        <motion.span
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}

      <style jsx>{`
        .magnetic-button {
          position: relative;
          overflow: hidden;
          font-family: var(--font-subheading);
          font-weight: 500;
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          border-radius: var(--border-radius-pill);
          transition: all var(--duration-normal) var(--ease-snappy);
          will-change: transform;
        }

        .ripple {
          position: absolute;
          width: 20px;
          height: 20px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
      `}</style>
    </motion.button>
  )
}
