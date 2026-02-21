'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CinematicCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-title-char',
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.cta-description',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cta-description',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.cta-btn',
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cta-buttons',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        '.cta-feature',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cta-features',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const rect = sectionRef.current?.getBoundingClientRect()
        if (!rect) return

        const x = (clientX - rect.left) / rect.width - 0.5
        const y = (clientY - rect.top) / rect.height - 0.5

        gsap.to('.cta-bg-glow', {
          x: x * 100,
          y: y * 100,
          duration: 0.8,
          ease: 'power2.out',
        })

        gsap.to('.cta-title-char', {
          y: y * 5,
          x: x * 5,
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

  const title = 'THE INVITATION'
  const description = 'Step into a world of unparalleled luxury. Arrange your private viewing and discover the artistry behind every detail of Spectre.'

  return (
    <section ref={sectionRef} className="cinematic-cta" id="experience">
      <div className="cta-bg">
        <div className="cta-bg-glow" />
        <div className="cta-bg-lines">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-line" style={{ left: `${20 + i * 15}%` }} />
          ))}
        </div>
      </div>

      <div className="cta-content">
        <span className="cta-label">Exclusive Access</span>

        <h2 className="cta-title">
          {title.split(' ').map((word, i) => (
            <span key={i} className="cta-title-word">
              {word.split('').map((char, j) => (
                <span key={j} className="cta-title-char">
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h2>

        <p className="cta-description">
          {description}
        </p>

        <div className="cta-features">
          <div className="cta-feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span>Bespoke Personalization</span>
          </div>
          <div className="cta-feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <span>Your Schedule</span>
          </div>
          <div className="cta-feature">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span>Dedicated Concierge</span>
          </div>
        </div>

        <div className="cta-buttons">
          <button className="cta-btn cta-primary">
            <span>Book Your Experience</span>
            <div className="btn-shine" />
          </button>
          <button className="cta-btn cta-secondary">
            <span>Speak with Us</span>
          </button>
        </div>

        <div className="cta-contact">
          <span className="contact-label">Prefer to connect directly</span>
          <a href="tel:+441234567890" className="contact-phone">
            +44 (0) 123 456 7890
          </a>
        </div>
      </div>

      <footer className="cta-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="brand-logo">RR</div>
            <span className="brand-tagline">Inspiring Greatness</span>
          </div>

          <nav className="footer-nav">
            <div className="nav-group">
              <h4>Explore</h4>
              <a href="#showcase">Showcase</a>
              <a href="#interiors">Interiors</a>
              <a href="#performance">Performance</a>
            </div>
            <div className="nav-group">
              <h4>Connect</h4>
              <a href="#">Contact</a>
              <a href="#">Dealerships</a>
              <a href="#">Press</a>
            </div>
          </nav>

          <div className="footer-legal">
            <span>&copy; 2024 Rolls-Royce Motor Cars</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .cinematic-cta {
          position: relative;
          min-height: 100vh;
          padding: 15vh 0 0;
          background: linear-gradient(180deg, #000 0%, #0a0a15 50%, #000 100%);
          overflow: hidden;
        }

        .cta-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .cta-bg-glow {
          position: absolute;
          top: 20%;
          left: 50%;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
          transform: translate(-50%, -50%);
        }

        .cta-bg-lines {
          position: absolute;
          inset: 0;
          opacity: 0.03;
        }

        .bg-line {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(180deg, transparent, #fff, transparent);
        }

        .cta-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 5vw;
          max-width: 900px;
          margin: 0 auto;
        }

        .cta-label {
          font-family: var(--font-subheading);
          font-size: 0.75rem;
          font-weight: 300;
          letter-spacing: 0.4em;
          color: var(--color-accent-gold);
          text-transform: uppercase;
          padding: 0.5rem 1.5rem;
          border: 1px solid var(--color-accent-gold);
          margin-bottom: 3rem;
        }

        .cta-title {
          font-family: var(--font-heading);
          font-size: clamp(3rem, 10vw, 8rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.1em;
          line-height: 1;
          margin-bottom: 3rem;
        }

        .cta-title-char {
          display: inline-block;
          transform-origin: center bottom;
        }

        .cta-title-word {
          display: inline-block;
          white-space: nowrap;
          margin-right: 0.3em;
        }

        .cta-description {
          font-family: var(--font-body);
          font-size: clamp(1rem, 2vw, 1.25rem);
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.6);
          max-width: 600px;
          margin-bottom: 3rem;
        }

        .cta-features {
          display: flex;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .cta-feature {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .feature-icon {
          width: 24px;
          height: 24px;
          color: var(--color-accent-gold);
        }

        .feature-icon svg {
          width: 100%;
          height: 100%;
        }

        .cta-feature span {
          font-family: var(--font-subheading);
          font-size: 0.85rem;
          font-weight: 300;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.8);
        }

        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .cta-btn {
          position: relative;
          padding: 1.25rem 3rem;
          font-family: var(--font-subheading);
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          overflow: hidden;
        }

        .cta-primary {
          background: linear-gradient(135deg, #fff 0%, #e2e2e2 100%);
          border: none;
          color: #000;
        }

        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 50px rgba(255, 255, 255, 0.2);
        }

        .btn-shine {
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
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #fff;
        }

        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: #fff;
        }

        .cta-contact {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 10vh;
        }

        .contact-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .contact-phone {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 3vw, 2rem);
          color: #fff;
          transition: color 0.3s ease;
        }

        .contact-phone:hover {
          color: var(--color-accent-gold);
        }

        .cta-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 4rem 5vw;
          background: rgba(0, 0, 0, 0.3);
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 4rem;
          align-items: start;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .brand-logo {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 0.1em;
        }

        .brand-tagline {
          font-family: var(--font-subheading);
          font-size: 0.75rem;
          font-weight: 300;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.4);
        }

        .footer-nav {
          display: flex;
          gap: 4rem;
        }

        .nav-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .nav-group h4 {
          font-family: var(--font-subheading);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.3em;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .nav-group a {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          transition: color 0.2s ease;
        }

        .nav-group a:hover {
          color: #fff;
        }

        .footer-legal {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.25rem;
        }

        .footer-legal span {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .footer-brand,
          .footer-legal {
            align-items: center;
          }

          .footer-nav {
            justify-content: center;
          }

          .cta-features {
            flex-direction: column;
            gap: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .cta-buttons {
            flex-direction: column;
            width: 100%;
            max-width: 300px;
          }

          .footer-nav {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  )
}
