'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 192

export default function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map())
  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const loadImages = async () => {
      const batchSize = 24
      let loaded = 0

      for (let i = 0; i < TOTAL_FRAMES; i += batchSize) {
        const batch: Promise<void>[] = []
        
        for (let j = i; j < Math.min(i + batchSize, TOTAL_FRAMES); j++) {
          batch.push(
            new Promise((resolve) => {
              const img = new Image()
              img.src = `/assets/hero/${String(j + 1).padStart(5, '0')}.png`
              img.onload = () => {
                imagesRef.current.set(j, img)
                loaded++
                setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100))
                resolve()
              }
              img.onerror = () => resolve()
            })
          )
        }
        
        await Promise.all(batch)
      }

      setIsLoading(false)
    }

    loadImages()
  }, [])

  useEffect(() => {
    if (isLoading || !sectionRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!
    const section = sectionRef.current

    const renderFrame = (index: number) => {
      const img = imagesRef.current.get(index)
      if (!img) return

      canvas.width = img.width
      canvas.height = img.height
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
    }

    renderFrame(0)

    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '200% top',
      scrub: 0.5,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          Math.floor(self.progress * (TOTAL_FRAMES - 1)),
          TOTAL_FRAMES - 1
        )
        renderFrame(frameIndex)
        

      },
    })

    const ctxGsap = gsap.context(() => {
      gsap.fromTo(
        '.hero-title-line',
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.5,
        }
      )

      gsap.fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          delay: 1.2,
        }
      )

      gsap.fromTo(
        '.hero-cta',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          delay: 1.5,
        }
      )

      gsap.fromTo(
        '.hero-stats-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          delay: 1.8,
        }
      )

      gsap.to(contentRef.current, {
        opacity: 0,
        y: -100,
        scrollTrigger: {
          trigger: section,
          start: '30% top',
          end: '60% top',
          scrub: 1,
        },
      })

      gsap.to(canvas, {
        scale: 1.1,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '100% top',
          scrub: 1,
        },
      })
    }, section)

    return () => {
      scrollTrigger.kill()
      ctxGsap.revert()
    }
  }, [isLoading])

  useEffect(() => {
    if (isLoading) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      mouseRef.current.targetX = (clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.targetY = (clientY / window.innerHeight - 0.5) * 2
    }

    const animateMouse = () => {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08

      gsap.set('.hero-parallax-1', {
        x: mouseRef.current.x * 40,
        y: mouseRef.current.y * 40,
      })

      gsap.set('.hero-parallax-2', {
        x: mouseRef.current.x * -25,
        y: mouseRef.current.y * -25,
      })

      gsap.set('.hero-parallax-3', {
        x: mouseRef.current.x * 15,
        y: mouseRef.current.y * 15,
      })

      gsap.set('.canvas-parallax', {
        x: mouseRef.current.x * 10,
        y: mouseRef.current.y * 10,
      })

      rafRef.current = requestAnimationFrame(animateMouse)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animateMouse)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isLoading])

  return (
    <section
      ref={sectionRef}
      className="cinematic-hero"
    >
      {isLoading && (
        <div className="hero-loader">
          <div className="loader-content">
            <div className="loader-logo">RR</div>
            <div className="loader-bar">
              <div className="loader-fill" style={{ width: `${loadProgress}%` }} />
            </div>
            <span className="loader-text">{loadProgress}%</span>
          </div>
        </div>
      )}

      <div className="hero-canvas-container">
        <canvas ref={canvasRef} className="hero-canvas canvas-parallax" />
        <div className="hero-vignette" />
        <div className="hero-gradient-overlay" />
        <div className="hero-scanlines" />
      </div>

      <div ref={contentRef} className="hero-content">
        <div className="hero-badge hero-parallax-1">
          <span>Rolls-Royce</span>
          <span className="badge-dot" />
          <span>Electric</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-title-line">S</span>
          <span className="hero-title-line">P</span>
          <span className="hero-title-line">E</span>
          <span className="hero-title-line">C</span>
          <span className="hero-title-line">T</span>
          <span className="hero-title-line">R</span>
          <span className="hero-title-line">E</span>
        </h1>

        <p className="hero-subtitle hero-parallax-3">
          The pinnacle of electric luxury. A masterpiece of engineering excellence.
        </p>

        <div className="hero-cta hero-parallax-2">
          <button className="cta-primary">
            <span>Experience Now</span>
            <div className="cta-shine" />
          </button>
          <button className="cta-secondary">Configure Yours</button>
        </div>

        <div className="hero-stats">
          <div className="hero-stats-item">
            <span className="stats-value">530<span>km</span></span>
            <span className="stats-label">Electric Range</span>
          </div>
          <div className="hero-stats-divider" />
          <div className="hero-stats-item">
            <span className="stats-value">4.5<span>s</span></span>
            <span className="stats-label">0-100 km/h</span>
          </div>
          <div className="hero-stats-divider" />
          <div className="hero-stats-item">
            <span className="stats-value">900<span>Nm</span></span>
            <span className="stats-label">Torque</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>

      <div className="hero-corner-frame top-left" />
      <div className="hero-corner-frame top-right" />
      <div className="hero-corner-frame bottom-left" />
      <div className="hero-corner-frame bottom-right" />

      <style jsx>{`
        .cinematic-hero {
          position: relative;
          height: 200vh;
          background: #000;
          overflow: hidden;
        }

        .hero-loader {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
        }

        .loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .loader-logo {
          font-family: var(--font-heading);
          font-size: 3rem;
          font-weight: 600;
          color: var(--color-secondary-silver);
          letter-spacing: 0.3em;
        }

        .loader-bar {
          width: 200px;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }

        .loader-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-accent-gold), #fff);
          transition: width 0.2s ease;
        }

        .loader-text {
          font-family: var(--font-subheading);
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          color: rgba(255, 255, 255, 0.5);
        }

        .hero-canvas-container {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
        }

        .hero-canvas {
          width: 100%;
          height: 100%;
          object-fit: cover;
          will-change: transform;
        }

        .hero-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.8) 100%);
          pointer-events: none;
        }

        .hero-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.3) 0%,
            transparent 30%,
            transparent 70%,
            rgba(0, 0, 0, 0.9) 100%
          );
          pointer-events: none;
        }

        .hero-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.03) 2px,
            rgba(0, 0, 0, 0.03) 4px
          );
          pointer-events: none;
          opacity: 0.5;
        }

        .hero-content {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem;
          max-width: 1000px;
        }

        .hero-badge {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          font-family: var(--font-subheading);
          font-size: 0.75rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          color: var(--color-accent-gold);
          text-transform: uppercase;
          will-change: transform;
        }

        .badge-dot {
          width: 4px;
          height: 4px;
          background: var(--color-accent-gold);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .hero-title {
          display: flex;
          gap: 0.1em;
          font-family: var(--font-heading);
          font-size: clamp(4rem, 18vw, 14rem);
          font-weight: 700;
          letter-spacing: 0.15em;
          line-height: 1;
          background: linear-gradient(
            180deg,
            #ffffff 0%,
            rgba(255, 255, 255, 0.9) 50%,
            var(--color-accent-gold) 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 2rem;
        }

        .hero-title-line {
          display: inline-block;
          will-change: transform;
        }

        .hero-subtitle {
          font-family: var(--font-body);
          font-size: clamp(1rem, 2vw, 1.5rem);
          font-weight: 300;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          max-width: 600px;
          margin-bottom: 3rem;
          will-change: transform;
        }

        .hero-cta {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 4rem;
          will-change: transform;
        }

        .cta-primary {
          position: relative;
          padding: 1.25rem 3rem;
          background: linear-gradient(135deg, #fff 0%, #e2e2e2 100%);
          border: none;
          border-radius: 0;
          font-family: var(--font-subheading);
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          color: #000;
          text-transform: uppercase;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(255, 255, 255, 0.2);
        }

        .cta-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% { left: -100%; }
          50%, 100% { left: 100%; }
        }

        .cta-secondary {
          padding: 1.25rem 3rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 0;
          font-family: var(--font-subheading);
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          color: #fff;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #fff;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 3rem;
        }

        .hero-stats-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .stats-value {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 600;
          color: #fff;
        }

        .stats-value span {
          font-family: var(--font-subheading);
          font-size: 0.5em;
          font-weight: 300;
          color: var(--color-accent-gold);
          margin-left: 0.25em;
        }

        .stats-label {
          font-family: var(--font-subheading);
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
        }

        .hero-stats-divider {
          width: 1px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
        }

        .hero-scroll-indicator {
          position: fixed;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          z-index: 10;
        }

        .scroll-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.5), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.5; }
          50% { transform: scaleY(1.2); opacity: 1; }
        }

        .hero-scroll-indicator span {
          font-family: var(--font-subheading);
          font-size: 0.65rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
        }

        .hero-frame-counter {
          position: fixed;
          bottom: 3rem;
          right: 3rem;
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          font-family: var(--font-subheading);
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.3);
          z-index: 10;
          will-change: transform;
        }

        .frame-current {
          font-size: 1.5rem;
          color: var(--color-accent-gold);
        }

        .frame-divider {
          opacity: 0.3;
        }

        .hero-corner-frame {
          position: fixed;
          width: 80px;
          height: 80px;
          z-index: 10;
          pointer-events: none;
        }

        .hero-corner-frame.top-left {
          top: 2rem;
          left: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          border-left: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hero-corner-frame.top-right {
          top: 2rem;
          right: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          border-right: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hero-corner-frame.bottom-left {
          bottom: 2rem;
          left: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          border-left: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hero-corner-frame.bottom-right {
          bottom: 2rem;
          right: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          border-right: 1px solid rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 768px) {
          .hero-stats {
            flex-direction: column;
            gap: 1.5rem;
          }

          .hero-stats-divider {
            width: 50px;
            height: 1px;
          }

          .hero-cta {
            flex-direction: column;
            gap: 1rem;
          }

          .cta-primary,
          .cta-secondary {
            padding: 1rem 2rem;
            font-size: 0.75rem;
          }

          .hero-frame-counter {
            right: 1rem;
            bottom: 1rem;
          }

          .hero-corner-frame {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
