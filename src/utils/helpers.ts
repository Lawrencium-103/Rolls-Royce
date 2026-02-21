export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

export function getScrollPercent(): number {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  return scrollTop / docHeight
}

export function getElementVisibility(element: HTMLElement): number {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight

  if (rect.top >= windowHeight || rect.bottom <= 0) return 0

  const visibleTop = Math.max(0, rect.top)
  const visibleBottom = Math.min(windowHeight, rect.bottom)

  return (visibleBottom - visibleTop) / windowHeight
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function getRandomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function formatNumber(num: number, decimals = 0): string {
  return num.toFixed(decimals)
}

export function padNumber(num: number, padLength = 3): string {
  return String(num).padStart(padLength, '0')
}

export function generateSequencePaths(
  basePath: string,
  count: number,
  format = 'webp'
): string[] {
  return Array.from({ length: count }, (_, i) => {
    const frameNum = padNumber(i + 1)
    return basePath.replace('{number}', frameNum).replace('{format}', format)
  })
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export const EASING = {
  cinema: [0.83, 0, 0.17, 1],
  snappy: [0.22, 1, 0.36, 1],
  smooth: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
} as const
