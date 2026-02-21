'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useScroll, useTransform, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollSequenceProps {
  frames: string[]
  className?: string
}

export default function ScrollSequence({ frames, className = '' }: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const loadedRef = useRef<number[]>([])
  const frameCount = frames.length

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const renderFrame = useCallback((index: number) => {
    if (!canvasRef.current || !imagesRef.current[index]) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = imagesRef.current[index]
    
    canvas.width = 1920
    canvas.height = 1080

    const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
    const x = (canvas.width - img.width * scale) / 2
    const y = (canvas.height - img.height * scale) / 2

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
  }, [])

  const preloadImages = useCallback(async () => {
    const loadImage = (src: string, index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          imagesRef.current[index] = img
          loadedRef.current.push(index)
          resolve(img)
        }
        img.onerror = reject
      })
    }

    const batchSize = 20
    for (let i = 0; i < frameCount; i += batchSize) {
      const batch = frames.slice(i, Math.min(i + batchSize, frameCount))
      await Promise.all(batch.map((frame, batchIndex) => loadImage(frame, i + batchIndex)))
    }
  }, [frames, frameCount])

  useEffect(() => {
    preloadImages()
  }, [preloadImages])

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      const frameIndex = Math.min(
        Math.floor(latest * (frameCount - 1)),
        frameCount - 1
      )
      if (frameIndex >= 0 && imagesRef.current[frameIndex]) {
        renderFrame(frameIndex)
      }
    })

    return () => unsubscribe()
  }, [smoothProgress, frameCount, renderFrame])

  if (frameCount === 0) {
    return (
      <div className={`scroll-sequence ${className}`} ref={containerRef}>
        <div className="placeholder" />
        <style jsx>{`
          .scroll-sequence {
            position: relative;
            height: 500vh;
          }
          .placeholder {
            position: sticky;
            top: 0;
            height: 100vh;
            width: 100%;
            background: var(--color-bg-primary);
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className={`scroll-sequence ${className}`} ref={containerRef}>
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} />
      </div>
      <style jsx>{`
        .scroll-sequence {
          position: relative;
          height: 500vh;
        }

        .canvas-wrapper {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
        }

        canvas {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  )
}
