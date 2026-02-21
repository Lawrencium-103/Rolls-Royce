'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CinemicInterior() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.interior-feature-card',
        { y: 100, opacity: 0, rotateX: 10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.interior-features-grid',
            start: 'top 80%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.interior-title-word',
        { y: 80, rotateX: -90, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.interior-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.starlight-star',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: {
            each: 0.02,
            from: 'random',
          },
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.starlight-panel',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.to('.interior-parallax-bg', {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const rect = sectionRef.current?.getBoundingClientRect()
        if (!rect) return

        const x = (clientX - rect.left) / rect.width - 0.5
        const y = (clientY - rect.top) / rect.height - 0.5

        gsap.to('.interior-feature-card', {
          rotateY: x * 5,
          rotateX: -y * 5,
          duration: 0.5,
          ease: 'power2.out',
        })

        gsap.to('.starlight-star', {
          x: x * 10,
          y: y * 10,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.01,
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
    <section ref={sectionRef} className="cinematic-interior" id="interiors">
      <div className="interior-bg">
        <div className="interior-parallax-bg" />
        <div className="interior-stars-bg">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="bg-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="interior-content">
        <header className="interior-header">
          <span className="interior-label">Celestial Craftsmanship</span>
          <h2 className="interior-title">
            <span className="interior-title-word">The</span>{' '}
            <span className="interior-title-word">Sanctuary</span>{' '}
            <span className="interior-title-word">Within</span>
          </h2>
        </header>

        <div className="starlight-panel">
          <div className="starlight-frame">
            {[...Array(80)].map((_, i) => (
              <div
                key={i}
                className="starlight-star"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
            <div className="starlight-glow" />
          </div>
          <div className="starlight-info">
            <h3>Starlight Headliner</h3>
            <p>1,344 fiber optic lights, each placed by hand to create your personal constellation.</p>
          </div>
        </div>

        <div className="interior-features-grid">
          <article className="interior-feature-card">
            <div className="feature-number">01</div>
            <h3 className="feature-title">Bespoke Leather</h3>
            <p className="feature-desc">
              Hand-selected hides from heritage tanneries, meticulously stitched by master craftspeople over 100 hours.
            </p>
            <div className="feature-line" />
          </article>

          <article className="interior-feature-card">
            <div className="feature-number">02</div>
            <h3 className="feature-title">Illuminated Fascia</h3>
            <p className="feature-desc">
              The Spirit of Ecstasy emerges from the dashboard in a choreographed light display.
            </p>
            <div className="feature-line" />
          </article>

          <article className="interior-feature-card">
            <div className="feature-number">03</div>
            <h3 className="feature-title">Planar Suspension</h3>
            <p className="feature-desc">
              A revolutionary suspension system that eliminates body roll and delivers unprecedented ride quality.
            </p>
            <div className="feature-line" />
          </article>
        </div>
      </div>

      <style jsx>{`
        .cinematic-interior {
          position: relative;
          min-height: 100vh;
          padding: 10vh 0;
          background: linear-gradient(180deg, #000 0%, #0a0a0f 50%, #000 100%);
          overflow: hidden;
        }

        .interior-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .interior-parallax-bg {
          position: absolute;
          inset: -100px;
          background: radial-gradient(ellipse at 50% 30%, rgba(139, 92, 246, 0.08) 0%, transparent 50%);
        }

        .interior-stars-bg {
          position: absolute;
          inset: 0;
        }

        .bg-star {
          position: absolute;
          width: 1px;
          height: 1px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        .interior-content {
          position: relative;
          z-index: 2;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 5vw;
        }

        .interior-header {
          text-align: center;
          margin-bottom: 8vh;
        }

        .interior-label {
          display: block;
          font-family: var(--font-subheading);
          font-size: 0.75rem;
          font-weight: 300;
          letter-spacing: 0.4em;
          color: var(--color-accent-gold);
          text-transform: uppercase;
          margin-bottom: 2rem;
        }

        .interior-title {
          font-family: var(--font-heading);
          font-size: clamp(3rem, 8vw, 7rem);
          font-weight: 600;
          color: #fff;
          line-height: 1.1;
        }

        .interior-title-word {
          display: inline-block;
          perspective: 1000px;
        }

        .starlight-panel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          margin-bottom: 10vh;
          padding: 4rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
        }

        .starlight-frame {
          position: relative;
          aspect-ratio: 16/9;
          background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }

        .starlight-star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 6px 1px rgba(255, 255, 255, 0.5);
          animation: starPulse 2s ease-in-out infinite;
        }

        @keyframes starPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        .starlight-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
          animation: glowPulse 4s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .starlight-info h3 {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 600;
          color: #fff;
          margin-bottom: 1rem;
        }

        .starlight-info p {
          font-family: var(--font-body);
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.6);
        }

        .interior-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          perspective: 1000px;
        }

        .interior-feature-card {
          position: relative;
          padding: 3rem 2rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          transform-style: preserve-3d;
          transition: all 0.3s ease;
        }

        .interior-feature-card:hover {
          border-color: rgba(212, 175, 55, 0.3);
          background: rgba(255, 255, 255, 0.04);
        }

        .feature-number {
          font-family: var(--font-subheading);
          font-size: 0.7rem;
          font-weight: 300;
          letter-spacing: 0.3em;
          color: var(--color-accent-gold);
          margin-bottom: 1.5rem;
        }

        .feature-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 1rem;
        }

        .feature-desc {
          font-family: var(--font-body);
          font-size: 0.95rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.5);
        }

        .feature-line {
          position: absolute;
          bottom: 0;
          left: 2rem;
          right: 2rem;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--color-accent-gold), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .interior-feature-card:hover .feature-line {
          opacity: 1;
        }

        @media (max-width: 1024px) {
          .starlight-panel {
            grid-template-columns: 1fr;
          }

          .interior-features-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  )
}
