'use client'

import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 192

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map())
  const currentFrameRef = useRef(0)
  const isRenderedRef = useRef(false)

  const getFramePath = useCallback((index: number) => {
    return `/assets/sequences/${String(index + 1).padStart(5, '0')}.png`
  }, [])

  useEffect(() => {
    const loadImages = async () => {
      const loadBatch = async (start: number, end: number) => {
        const promises: Promise<void>[] = []
        for (let i = start; i < end && i < TOTAL_FRAMES; i++) {
          promises.push(
            new Promise((resolve) => {
              const img = new Image()
              img.src = getFramePath(i)
              img.onload = () => {
                imagesRef.current.set(i, img)
                resolve()
              }
              img.onerror = () => resolve()
            })
          )
        }
        await Promise.all(promises)
      }

      await loadBatch(0, 24)
      
      if (imagesRef.current.has(0) && canvasRef.current && !isRenderedRef.current) {
        renderFrame(0)
        isRenderedRef.current = true
      }

      loadBatch(24, TOTAL_FRAMES)
    }

    loadImages()
  }, [getFramePath])

  const renderFrame = useCallback((frameIndex: number) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = imagesRef.current.get(frameIndex)
    if (!img) return

    canvas.width = img.width
    canvas.height = img.height
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)
    currentFrameRef.current = frameIndex
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !canvasRef.current) return

    let scrollTrigger: ScrollTrigger

    const ctx = gsap.context(() => {
      scrollTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            Math.floor(self.progress * (TOTAL_FRAMES - 1)),
            TOTAL_FRAMES - 1
          )
          if (frameIndex !== currentFrameRef.current) {
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

      gsap.to(canvasRef.current, {
        scale: 1.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => {
      scrollTrigger?.kill()
      ctx.revert()
    }
  }, [renderFrame])

  return (
    <section ref={sectionRef} className="showcase-section" id="showcase">
      <div className="showcase-canvas-wrapper">
        <canvas ref={canvasRef} className="showcase-canvas" />
        <div className="showcase-vignette" />
      </div>

      <div className="showcase-overlay">
        <div className="overlay-content">
          <span className="showcase-label">The Reveal</span>
          <h2 className="showcase-title">Scroll to Explore</h2>
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
