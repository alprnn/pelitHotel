'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [show, setShow] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // Simulate loading progress
    const steps = [20, 50, 75, 90, 100]
    const timings = [200, 500, 900, 1400, 1900]

    timings.forEach((delay, i) => {
      const t = setTimeout(() => setProgress(steps[i]), delay)
      return () => clearTimeout(t)
    })

    const dismiss = setTimeout(() => {
      setShow(false)
      document.body.style.overflow = ''
    }, 2600)

    return () => {
      clearTimeout(dismiss)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[9998] bg-antrasit flex flex-col items-center justify-center"
        >
          {/* Radial glow behind logo */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
              style={{
                background: 'radial-gradient(circle, #C9A96E 0%, transparent 70%)',
              }}
            />
          </div>

          {/* Logo */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center"
            >
              <span className="font-serif text-gold/80 text-[0.65rem] tracking-[0.65em] uppercase font-light mb-1.5">
                Hotel
              </span>
              <span className="font-serif text-white text-6xl tracking-[0.35em] uppercase font-light">
                Pelit
              </span>
            </motion.div>

            {/* Gold line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-6 h-px bg-gradient-to-r from-transparent via-gold to-transparent origin-center"
              style={{ width: '120px' }}
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="mt-5 text-white/25 text-[0.58rem] tracking-[0.6em] uppercase font-light"
            >
              Çanakkale · Est. 1920
            </motion.p>

            {/* Progress bar */}
            <div className="mt-12 w-40 h-px bg-white/8 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gold/60"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
