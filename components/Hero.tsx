'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const fadeLine = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

interface HeroProps {
  onBookingClick: () => void
}

export default function Hero({ onBookingClick }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.65], ['0%', '-8%'])

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[700px] overflow-hidden"
      aria-label="Hero Bölümü"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 scale-[1.15] will-change-transform"
      >
        {/* Cinematic background — replace with your image at /public/hero.jpg */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero.jpg')",
            backgroundColor: '#0E0E0F',
          }}
        />
        {/* Multi-layer overlay for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-antrasit/75 via-antrasit/40 to-antrasit/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-antrasit/30 via-transparent to-antrasit/30" />
      </motion.div>

      {/* Decorative horizontal lines */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 z-10">
        <div className="w-px h-24 bg-gradient-to-b from-transparent to-gold/60" />
        <div className="w-px h-24 bg-gradient-to-b from-gold/60 to-transparent" />
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 will-change-transform"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <span className="w-12 h-px bg-gold/70" />
            <span className="text-gold text-[0.65rem] tracking-[0.5em] uppercase font-light">
              Çanakkale Boğazı Kıyısında
            </span>
            <span className="w-12 h-px bg-gold/70" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={fadeUp}
            className="font-serif text-white text-[clamp(4rem,14vw,10rem)] font-light leading-none tracking-[0.15em] uppercase"
          >
            Hotel
          </motion.h1>

          <motion.div variants={fadeLine} className="w-full origin-left my-3">
            <div className="h-px w-full max-w-xs md:max-w-sm mx-auto bg-gradient-to-r from-transparent via-gold to-transparent" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-gold text-[clamp(4rem,14vw,10rem)] font-light leading-none tracking-[0.15em] uppercase"
          >
            Pelit
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-white/55 text-sm md:text-base tracking-[0.3em] font-light mt-8 max-w-sm"
          >
            Lüks Konfor · Tarihi Güzellik · Eşsiz Manzara
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-4 mt-12"
          >
            <button
              onClick={onBookingClick}
              className="group relative bg-gold text-antrasit px-10 py-4 text-xs tracking-[0.35em] uppercase font-medium overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_rgba(201,169,110,0.4)]"
            >
              <span className="relative z-10">Rezervasyon Yap</span>
              <div className="absolute inset-0 bg-gold-light translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
            <a
              href="#rooms"
              className="border border-white/30 text-white/80 hover:border-gold hover:text-gold px-10 py-4 text-xs tracking-[0.35em] uppercase font-light transition-all duration-400"
            >
              Odaları Keşfet
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-white/35 text-[0.6rem] tracking-[0.5em] uppercase">Keşfet</span>
          <div className="relative w-px h-14 overflow-hidden">
            <motion.div
              animate={{ y: ['0%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-gold to-transparent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
