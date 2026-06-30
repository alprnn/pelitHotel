'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [isTouch, setIsTouch] = useState(true)

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  // Ring follows with spring delay for a luxurious "lag" effect
  const rx = useSpring(mx, { stiffness: 65, damping: 15 })
  const ry = useSpring(my, { stiffness: 65, damping: 15 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    setIsTouch(false)

    // Inject global cursor:none style
    const styleEl = document.createElement('style')
    styleEl.id = 'custom-cursor-hide'
    styleEl.textContent = '* { cursor: none !important; }'
    document.head.appendChild(styleEl)

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setVisible(true)

      const target = e.target as HTMLElement
      setHovering(
        !!target.closest('a, button, [role="button"], input, select, textarea, label, [tabindex]')
      )
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', () => setVisible(false))
    document.documentElement.addEventListener('mouseenter', () => setVisible(true))

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.getElementById('custom-cursor-hide')?.remove()
    }
  }, [mx, my])

  if (isTouch) return null

  return (
    <>
      {/* Lagging outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-gold/50 will-change-transform"
        style={{ translateX: '-50%', translateY: '-50%', left: rx, top: ry }}
        animate={{
          width: hovering ? 54 : 34,
          height: hovering ? 54 : 34,
          opacity: visible ? 1 : 0,
          borderColor: hovering ? 'rgba(201,169,110,0.9)' : 'rgba(201,169,110,0.45)',
        }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      />
      {/* Precise dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-gold will-change-transform"
        style={{ translateX: '-50%', translateY: '-50%', left: mx, top: my }}
        animate={{
          width: hovering ? 7 : 4,
          height: hovering ? 7 : 4,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.12 }}
      />
    </>
  )
}
