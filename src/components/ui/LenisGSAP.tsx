'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface LenisGSAPProps {
  children: React.ReactNode
}

export default function LenisGSAP({ children }: LenisGSAPProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    })

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop: (value) => {
        if (arguments.length) {
          lenis.scrollTo(value as number, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: 'transform',
    })

    ScrollTrigger.refresh()

    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('mousemove', handleMouseMove)

    const updateParallax = () => {
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      const globalParallax = document.querySelectorAll('[data-parallax]')
      globalParallax.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.parallax || '1') * 10
        gsap.set(el, {
          x: targetX * speed,
          y: targetY * speed,
        })
      })

      requestAnimationFrame(updateParallax)
    }

    updateParallax()

    return () => {
      lenis.destroy()
      lenisRef.current = null
      window.removeEventListener('mousemove', handleMouseMove)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return <>{children}</>
}
