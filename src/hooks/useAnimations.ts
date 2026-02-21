import { useEffect, useRef, useState } from 'react'

interface UseScrollTriggerOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollTrigger<T extends HTMLElement>(
  options: UseScrollTriggerOptions = {}
) {
  const { threshold = 0.5, rootMargin = '0px', once = false } = options
  const ref = useRef<T>(null)
  const [isActive, setIsActive] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting)
        setProgress(entry.intersectionRatio)

        if (once && entry.isIntersecting) {
          observer.unobserve(element)
        }
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 20), rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, isActive, progress }
}

export function useMagneticEffect(threshold = 60) {
  const elementRef = useRef<HTMLElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY

      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

      if (distance < threshold) {
        const pull = 1 - distance / threshold
        setPosition({
          x: distanceX * pull * 0.4,
          y: distanceY * pull * 0.4,
        })
      } else {
        setPosition({ x: 0, y: 0 })
      }
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [threshold])

  return { elementRef, position }
}

export function useParallax(speed = 0.5) {
  const elementRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const scrollPercent = rect.top / window.innerHeight
      setOffset(scrollPercent * speed * 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return { elementRef, offset }
}

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return position
}

export function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

export function useIsMobile() {
  const { width } = useWindowSize()
  return width < 768
}

export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReduced
}
