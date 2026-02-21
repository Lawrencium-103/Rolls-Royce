'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 530, unit: 'km', label: 'Range', desc: 'WLTP Cycle' },
  { value: 430, unit: 'kW', label: 'Power', desc: 'Peak Output' },
  { value: 900, unit: 'Nm', label: 'Torque', desc: 'Instant Power' },
  { value: 4.5, unit: 's', label: '0-100', desc: 'Acceleration' },
]

function AnimatedCounter({ value, unit, isActive }: { value: number; unit: string; isActive: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isActive) return

    let start = 0
    const duration = 2000
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setDisplay(value * eased)

      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [isActive, value])

  return (
    <span className="stat-number">
      {value % 1 !== 0 ? display.toFixed(1) : Math.round(display)}
      <span className="stat-unit">{unit}</span>
    </span>
  )
}

export default function CinematicStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStats, setActiveStats] = useState<number[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stats-title-line',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      stats.forEach((_, index) => {
        ScrollTrigger.create({
          trigger: `.stat-card-${index}`,
          start: 'top 70%',
          onEnter: () => setActiveStats((prev) => [...new Set([...prev, index])]),
        })
      })

      gsap.fromTo(
        '.stat-card',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.to('.blueprint-line', {
        strokeDashoffset: 0,
        duration: 2,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.blueprint-svg',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const rect = sectionRef.current?.getBoundingClientRect()
        if (!rect) return

        const x = (clientX - rect.left) / rect.width - 0.5
        const y = (clientY - rect.top) / rect.height - 0.5

        gsap.to('.stat-card', {
          x: x * 20,
          y: y * 20,
          rotateY: x * 3,
          rotateX: -y * 3,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.02,
        })

        gsap.to('.blueprint-svg', {
          x: x * -30,
          y: y * -30,
          duration: 0.5,
          ease: 'power2.out',
        })
      }

      const section = sectionRef.current
      section?.addEventListener('mousemove', handleMouseMove)

      return () => {
        section?.removeEventListener('mousemove', handleMouseMove)
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="cinematic-stats" id="performance">
      <div className="stats-background">
        <svg className="blueprint-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line className="blueprint-line" x1="10" y1="20" x2="90" y2="20" />
          <line className="blueprint-line" x1="10" y1="40" x2="90" y2="40" />
          <line className="blueprint-line" x1="10" y1="60" x2="90" y2="60" />
          <line className="blueprint-line" x1="10" y1="80" x2="90" y2="80" />
          <line className="blueprint-line" x1="20" y1="10" x2="20" y2="90" />
          <line className="blueprint-line" x1="50" y1="10" x2="50" y2="90" />
          <line className="blueprint-line" x1="80" y1="10" x2="80" y2="90" />
        </svg>
      </div>

      <div className="stats-content">
        <header className="stats-header">
          <span className="stats-label">Engineering Excellence</span>
          <h2 className="stats-title">
            <span className="stats-title-line">Pure</span>{' '}
            <span className="stats-title-line">Electric</span>{' '}
            <span className="stats-title-line">Power</span>
          </h2>
        </header>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={stat.label} className={`stat-card stat-card-${index}`}>
              <div className="stat-glow" />
              <div className="stat-content">
                <AnimatedCounter
                  value={stat.value}
                  unit={stat.unit}
                  isActive={activeStats.includes(index)}
                />
                <span className="stat-label">{stat.label}</span>
                <span className="stat-desc">{stat.desc}</span>
              </div>
              <div className="stat-corner tl" />
              <div className="stat-corner tr" />
              <div className="stat-corner bl" />
              <div className="stat-corner br" />
            </div>
          ))}
        </div>

        <div className="specs-footer">
          <div className="spec-row">
            <span className="spec-key">Architecture</span>
            <span className="spec-val">All-Aluminum Space Frame</span>
          </div>
          <div className="spec-row">
            <span className="spec-key">Battery</span>
            <span className="spec-val">102 kWh Capacity</span>
          </div>
          <div className="spec-row">
            <span className="spec-key">Charging</span>
            <span className="spec-val">DC Fast Charging Ready</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cinematic-stats {
          position: relative;
          min-height: 100vh;
          padding: 10vh 0;
          background: linear-gradient(180deg, #000 0%, #050510 50%, #000 100%);
          overflow: hidden;
        }

        .stats-background {
          position: absolute;
          inset: 0;
          opacity: 0.05;
          pointer-events: none;
        }

        .blueprint-svg {
          width: 100%;
          height: 100%;
        }

        .blueprint-line {
          stroke: rgba(255, 255, 255, 0.3);
          stroke-width: 0.1;
          stroke-dasharray: 10;
          stroke-dashoffset: 10;
        }

        .stats-content {
          position: relative;
          z-index: 2;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 5vw;
        }

        .stats-header {
          text-align: center;
          margin-bottom: 8vh;
        }

        .stats-label {
          display: block;
          font-family: var(--font-subheading);
          font-size: 0.75rem;
          font-weight: 300;
          letter-spacing: 0.4em;
          color: var(--color-accent-gold);
          text-transform: uppercase;
          margin-bottom: 2rem;
        }

        .stats-title {
          font-family: var(--font-heading);
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 600;
          color: #fff;
          line-height: 1.1;
        }

        .stats-title-line {
          display: inline-block;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-bottom: 6vh;
          perspective: 1000px;
        }

        .stat-card {
          position: relative;
          padding: 3rem 2rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          text-align: center;
          transform-style: preserve-3d;
          transition: border-color 0.3s ease;
        }

        .stat-card:hover {
          border-color: rgba(212, 175, 55, 0.3);
        }

        .stat-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .stat-card:hover .stat-glow {
          opacity: 1;
        }

        .stat-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .stat-number {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 600;
          color: #fff;
          line-height: 1;
        }

        .stat-unit {
          font-family: var(--font-subheading);
          font-size: 0.4em;
          font-weight: 300;
          color: var(--color-accent-gold);
          margin-left: 0.25em;
        }

        .stat-label {
          font-family: var(--font-subheading);
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          color: #fff;
          text-transform: uppercase;
          margin-top: 0.5rem;
        }

        .stat-desc {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .stat-corner {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: rgba(212, 175, 55, 0.3);
          border-style: solid;
          transition: border-color 0.3s ease;
        }

        .stat-card:hover .stat-corner {
          border-color: var(--color-accent-gold);
        }

        .stat-corner.tl { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
        .stat-corner.tr { top: -1px; right: -1px; border-width: 1px 1px 0 0; }
        .stat-corner.bl { bottom: -1px; left: -1px; border-width: 0 0 1px 1px; }
        .stat-corner.br { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }

        .specs-footer {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem 3rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }

        .spec-row:last-child {
          border-bottom: none;
        }

        .spec-key {
          font-family: var(--font-subheading);
          font-size: 0.75rem;
          font-weight: 300;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
        }

        .spec-val {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
