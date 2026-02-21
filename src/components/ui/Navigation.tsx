'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Interiors', href: '#interiors' },
  { label: 'Performance', href: '#performance' },
  { label: 'Experience', href: '#experience' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.nav
        className={`navigation ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
      >
        <div className="nav-container">
          <a href="#" className="nav-logo" data-cursor-hover>
            <div className="logo-mark">
              <span>RR</span>
            </div>
          </a>

          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
                data-cursor-hover
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <a href="#experience" className="nav-cta" data-cursor-hover>
              Book Viewing
            </a>
            <button
              className={`mobile-toggle ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="toggle-line" />
              <span className="toggle-line" />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="mobile-menu-content"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.83, 0, 0.17, 1] }}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="mobile-link"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#experience"
                className="mobile-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book Private Viewing
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .navigation {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: var(--z-navigation);
          padding: var(--spacing-md) 0;
          transition: all var(--duration-normal) var(--ease-snappy);
        }

        .navigation.scrolled {
          background: hsla(0, 0%, 4%, 0.9);
          backdrop-filter: blur(20px);
          padding: var(--spacing-sm) 0;
        }

        .nav-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 var(--spacing-gutter);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          display: flex;
          align-items: center;
        }

        .logo-mark {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--color-secondary-silver);
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-secondary-silver);
          letter-spacing: 0.1em;
          transition: all var(--duration-normal);
        }

        .logo-mark:hover {
          background: var(--color-secondary-silver);
          color: var(--color-primary-black);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: var(--spacing-lg);
        }

        .nav-link {
          font-family: var(--font-subheading);
          font-size: var(--font-size-small);
          font-weight: 400;
          letter-spacing: 0.05em;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          transition: color var(--duration-fast);
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--color-accent-gold);
          transition: width var(--duration-normal) var(--ease-snappy);
        }

        .nav-link:hover {
          color: var(--color-text-primary);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .nav-cta {
          font-family: var(--font-subheading);
          font-size: var(--font-size-small);
          font-weight: 500;
          letter-spacing: var(--letter-spacing-wide);
          color: var(--color-primary-black);
          background: var(--color-secondary-silver);
          padding: var(--spacing-xs) var(--spacing-md);
          border-radius: var(--border-radius-pill);
          text-transform: uppercase;
          transition: all var(--duration-normal);
        }

        .nav-cta:hover {
          background: var(--color-accent-gold);
        }

        .mobile-toggle {
          display: none;
          flex-direction: column;
          gap: 6px;
          padding: 8px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .toggle-line {
          width: 24px;
          height: 2px;
          background: var(--color-secondary-silver);
          transition: all var(--duration-normal);
        }

        .mobile-toggle.open .toggle-line:first-child {
          transform: rotate(45deg) translate(3px, 6px);
        }

        .mobile-toggle.open .toggle-line:last-child {
          transform: rotate(-45deg) translate(3px, -6px);
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: calc(var(--z-navigation) - 1);
          background: hsla(0, 0%, 4%, 0.95);
          backdrop-filter: blur(20px);
        }

        .mobile-menu-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-md);
        }

        .mobile-link {
          font-family: var(--font-heading);
          font-size: var(--font-size-h2);
          font-weight: 500;
          color: var(--color-text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color var(--duration-fast);
        }

        .mobile-link:hover {
          color: var(--color-accent-gold);
        }

        .mobile-cta {
          margin-top: var(--spacing-lg);
          font-family: var(--font-subheading);
          font-size: var(--font-size-body);
          font-weight: 500;
          letter-spacing: var(--letter-spacing-wide);
          color: var(--color-primary-black);
          background: var(--color-secondary-silver);
          padding: var(--spacing-sm) var(--spacing-lg);
          border-radius: var(--border-radius-pill);
          text-transform: uppercase;
          transition: all var(--duration-normal);
        }

        .mobile-cta:hover {
          background: var(--color-accent-gold);
        }

        @media (max-width: 1024px) {
          .nav-links {
            display: none;
          }

          .nav-cta {
            display: none;
          }

          .mobile-toggle {
            display: flex;
          }
        }
      `}</style>
    </>
  )
}
