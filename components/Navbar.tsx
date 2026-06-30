'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Odalar', href: '#rooms' },
  { label: 'Hakkımızda', href: '#about' },
  { label: 'Hizmetler', href: '#amenities' },
  { label: 'İletişim', href: '#contact' },
]

interface NavbarProps {
  onBookingClick: () => void
}

export default function Navbar({ onBookingClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-antrasit/96 backdrop-blur-md py-4 shadow-[0_2px_40px_rgba(0,0,0,0.4)]'
          : 'bg-transparent py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex flex-col leading-none group">
          <span className="font-serif text-gold text-xs tracking-[0.45em] uppercase font-light transition-opacity group-hover:opacity-80">
            Hotel
          </span>
          <span className="font-serif text-white text-2xl tracking-[0.3em] uppercase font-light -mt-0.5 transition-opacity group-hover:opacity-80">
            Pelit
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-white/70 hover:text-gold text-xs tracking-[0.25em] uppercase font-light transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-500" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+902861234567"
            className="text-white/50 hover:text-gold text-xs tracking-[0.2em] transition-colors duration-300 font-light"
          >
            +90 286 123 45 67
          </a>
          <button
            onClick={onBookingClick}
            className="border border-gold text-gold hover:bg-gold hover:text-antrasit px-7 py-2.5 text-xs tracking-[0.25em] uppercase font-light transition-all duration-400"
          >
            Rezervasyon
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col justify-center gap-1.5 w-8 h-8 group"
          aria-label="Menü"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-white transition-colors"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-px bg-white"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-white"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:hidden bg-antrasit/98 backdrop-blur-md border-t border-gold/20 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/70 hover:text-gold text-sm tracking-[0.25em] uppercase font-light transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => {
                  onBookingClick()
                  setMenuOpen(false)
                }}
                className="mt-2 border border-gold text-gold px-7 py-3 text-xs tracking-[0.25em] uppercase font-light text-left w-full hover:bg-gold hover:text-antrasit transition-all duration-300"
              >
                Rezervasyon Yap
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
