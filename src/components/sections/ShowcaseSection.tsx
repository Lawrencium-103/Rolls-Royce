'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 192

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentFrame, setCurrentFrame] = useState(0)
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map())
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const rafRef = useRef<number | null>(null)

  const getFramePath = useCallback((index: number) => {
    return `/assets/sequences/${String(index + 1).padStart(5, '0')}.png`
  }, [])

  useEffect(() => {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = getFramePath(i)
      img.onload = () => imagesRef.current.set(i, img)
    }
  }, [getFramePath])

  useEffect(() => {
    if (!sectionRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const renderFrame = (frameIndex: number) => {
      const img = imagesRef.current.get(frameIndex)
      if (!img) return

      canvas.width = img.width
      canvas.height = img.height
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
    }

    const interval = setInterval(() => {
      if (imagesRef.current.has(0)) {
        renderFrame(0)
        clearInterval(interval)
      }
    }, 100)

    const ctxGsap = gsap.context(() => {
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
            if (imagesRef.current.has(frameIndex)) {
              renderFrame(frameIndex)
            }
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

      gsap.to(canvas, {
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

    return () => {
      clearInterval(interval)
      ctxGsap.revert()
    }
  }, [currentFrame])

  return (
    <section ref={sectionRef} className="showcase-section" id="showcase">
      <div className="showcase-canvas-wrapper">
        <canvas ref={canvasRef} className="showcase-canvas" />
        <div className="showcase-vignette" />
      </div>

      <div className="showcase-overlay">
        <div className="overlay-content">
          <span className="showcase-label showcase-parallax-1">The Reveal</span>
          <h2 className="showcase-title showcase-parallax-2">Scroll to Explore</h2>
        </div>
      </div>

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
        }

        @media (max-width: 768px) {
          .showcase-title {
            font-size: clamp(1.5rem, 5vw, 2.5rem);
          }
        }
      `}</style>
    </section>
  )
}
