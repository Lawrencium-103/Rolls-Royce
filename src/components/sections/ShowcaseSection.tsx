'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 192
const BATCH_SIZE = 24

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentFrame, setCurrentFrame] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map())
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const rafRef = useRef<number | null>(null)

  const getFramePath = useCallback((index: number) => {
    return `/assets/sequences/${String(index + 1).padStart(5, '0')}.png`
  }, [])

  const preloadImages = useCallback(async () => {
    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = getFramePath(index)
        img.onload = () => {
          imagesRef.current.set(index, img)
          resolve()
        }
        img.onerror = () => {
          resolve()
        }
      })
    }

    let loaded = 0
    for (let i = 0; i < TOTAL_FRAMES; i += BATCH_SIZE) {
      const batch = []
      for (let j = i; j < Math.min(i + BATCH_SIZE, TOTAL_FRAMES); j++) {
        batch.push(
          loadImage(j).then(() => {
            loaded++
            setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100))
          })
        )
      }
      await Promise.all(batch)
    }

    setImagesLoaded(true)
  }, [getFramePath])

  const renderFrame = useCallback((frameIndex: number) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = imagesRef.current.get(frameIndex)
    if (!img) {
      ctx.fillStyle = '#0A0A0A'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      return
    }

    canvas.width = img.width
    canvas.height = img.height

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)
  }, [])

  useEffect(() => {
    preloadImages()
  }, [preloadImages])

  useEffect(() => {
    if (!imagesLoaded || !sectionRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            Math.floor(self.progress * (TOTAL_FRAMES - 1)),
            TOTAL_FRAMES - 1
          )
          if (frameIndex !== currentFrame) {
            setCurrentFrame(frameIndex)
            renderFrame(frameIndex)
          }
        },
      })

      gsap.fromTo(
        '.showcase-label',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.showcase-overlay',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.showcase-title',
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.showcase-overlay',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.to('.showcase-overlay', {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '20% top',
          end: '40% top',
          scrub: 1,
        },
      })

      gsap.to(canvasRef.current, {
        scale: 1.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        mouseRef.current.targetX = (clientX / window.innerWidth - 0.5) * 2
        mouseRef.current.targetY = (clientY / window.innerHeight - 0.5) * 2
      }

      const animateMouse = () => {
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08

        gsap.to('.showcase-parallax-1', {
          x: mouseRef.current.x * 30,
          y: mouseRef.current.y * 30,
          duration: 0.5,
          ease: 'power2.out',
        })

        gsap.to('.showcase-parallax-2', {
          x: mouseRef.current.x * -20,
          y: mouseRef.current.y * -20,
          duration: 0.5,
          ease: 'power2.out',
        })

        rafRef.current = requestAnimationFrame(animateMouse)
      }

      const section = sectionRef.current
      section?.addEventListener('mousemove', handleMouseMove)
      rafRef.current = requestAnimationFrame(animateMouse)

      return () => {
        section?.removeEventListener('mousemove', handleMouseMove)
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
      }
    }, sectionRef)

    if (imagesRef.current.has(0)) {
      renderFrame(0)
    }

    return () => ctx.revert()
  }, [imagesLoaded, currentFrame, renderFrame])

  return (
    <section ref={sectionRef} className="showcase-section" id="showcase">
      <div className="showcase-canvas-wrapper">
        <canvas ref={canvasRef} className="showcase-canvas" />
        
        <div className="showcase-vignette" />
        <div className="showcase-scanlines" />

        {!imagesLoaded && (
          <div className="loading-overlay">
            <div className="loading-content">
              <div className="loading-ring" />
              <span className="loading-text">Loading Experience {loadProgress}%</span>
              <div className="loading-bar">
                <div className="loading-bar-fill" style={{ width: `${loadProgress}%` }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="showcase-overlay">
        <div className="overlay-content">
          <span className="showcase-label showcase-parallax-1">The Reveal</span>
          <h2 className="showcase-title showcase-parallax-2">Scroll to Explore</h2>
        </div>
      </div>

      <div className="showcase-progress">
        <div
          className="progress-bar"
          style={{ 
            transform: `scaleY(${(currentFrame / (TOTAL_FRAMES - 1))})` 
          }}
        />
      </div>

      <div className="showcase-corner top-left" />
      <div className="showcase-corner top-right" />
      <div className="showcase-corner bottom-left" />
      <div className="showcase-corner bottom-right" />

      <style jsx>{`
        .showcase-section {
          position: relative;
          height: 500vh;
          background: #000;
        }

        .showcase-canvas-wrapper {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
        }

        .showcase-canvas {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: #000;
        }

        .showcase-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.7) 100%);
          pointer-events: none;
        }

        .showcase-scanlines {
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

        .loading-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
          z-index: 10;
        }

        .loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .loading-ring {
          width: 48px;
          height: 48px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-top-color: var(--color-accent-gold);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-text {
          font-family: var(--font-subheading);
          font-size: 0.75rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
        }

        .loading-bar {
          width: 200px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 1px;
          overflow: hidden;
        }

        .loading-bar-fill {
          height: 100%;
          background: var(--color-accent-gold);
          transition: width 0.2s ease;
        }

        .showcase-overlay {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .overlay-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem;
        }

        .showcase-label {
          font-family: var(--font-subheading);
          font-size: 0.75rem;
          font-weight: 300;
          letter-spacing: 0.4em;
          color: var(--color-accent-gold);
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .showcase-title {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 600;
          color: #fff;
          margin-bottom: 2rem;
        }

        .frame-indicator {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          font-family: var(--font-subheading);
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.3);
        }

        .frame-current {
          font-size: 1.5rem;
          color: var(--color-accent-gold);
        }

        .frame-divider {
          opacity: 0.3;
        }

        .showcase-progress {
          position: fixed;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 100px;
          background: rgba(255, 255, 255, 0.1);
          z-index: 10;
        }

        .progress-bar {
          width: 100%;
          height: 100%;
          background: var(--color-accent-gold);
          transform-origin: top;
        }

        .showcase-corner {
          position: fixed;
          width: 60px;
          height: 60px;
          z-index: 10;
          pointer-events: none;
        }

        .showcase-corner.top-left {
          top: 1.5rem;
          left: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          border-left: 1px solid rgba(255, 255, 255, 0.15);
        }

        .showcase-corner.top-right {
          top: 1.5rem;
          right: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          border-right: 1px solid rgba(255, 255, 255, 0.15);
        }

        .showcase-corner.bottom-left {
          bottom: 1.5rem;
          left: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          border-left: 1px solid rgba(255, 255, 255, 0.15);
        }

        .showcase-corner.bottom-right {
          bottom: 1.5rem;
          right: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          border-right: 1px solid rgba(255, 255, 255, 0.15);
        }

        @media (max-width: 768px) {
          .showcase-progress {
            right: 1rem;
          }

          .showcase-corner {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
