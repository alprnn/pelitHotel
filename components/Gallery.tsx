'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const row1 = [
  { label: 'Lobi & Resepsiyon', cat: 'İç Mekanlar', bg: 'from-[#1C1508] via-[#2E2010] to-[#1C1508]', wide: true, img: '/gallery/g1.jpg' },
  { label: 'Panorama Restaurant', cat: 'Gastronomi', bg: 'from-[#0E1A14] via-[#162A20] to-[#0E1A14]', wide: false, img: '/gallery/g2.jpg' },
  { label: 'Boğaz Manzarası', cat: 'Doğa', bg: 'from-[#0A1424] via-[#14203A] to-[#0A1424]', wide: true, img: '/gallery/g3.jpg' },
  { label: 'SPA & Wellness', cat: 'Wellness', bg: 'from-[#141420] via-[#1E1E30] to-[#141420]', wide: false, img: '/gallery/g4.jpg' },
  { label: 'Deluxe Suite', cat: 'Odalar', bg: 'from-[#201510] via-[#341E14] to-[#201510]', wide: true, img: '/gallery/g5.jpg' },
]

const row2 = [
  { label: 'Gün Batımı Terası', cat: 'Dış Mekan', bg: 'from-[#1E1208] via-[#2E1C10] to-[#1E1208]', wide: false, img: '/gallery/g6.jpg' },
  { label: 'Şarap Köşesi', cat: 'Bar', bg: 'from-[#180810] via-[#28101C] to-[#180810]', wide: true, img: '/gallery/g7.jpg' },
  { label: 'Tarihi Çanakkale', cat: 'Konum', bg: 'from-[#0C1418] via-[#162030] to-[#0C1418]', wide: false, img: '/gallery/g8.jpg' },
  { label: 'Teras Havuzu', cat: 'Wellness', bg: 'from-[#101820] via-[#182A38] to-[#101820]', wide: true, img: '/gallery/g9.jpg' },
  { label: 'Kahvaltı Sofrası', cat: 'Gastronomi', bg: 'from-[#1A1208] via-[#2A1E10] to-[#1A1208]', wide: false, img: '/gallery/g10.jpg' },
]

interface CardProps {
  label: string
  cat: string
  bg: string
  wide: boolean
  img: string
  delay: number
}

function Card({ label, cat, bg, wide, img, delay }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay, duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.025, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }}
      className={`relative flex-shrink-0 overflow-hidden group cursor-pointer ${
        wide ? 'w-80 md:w-[380px]' : 'w-56 md:w-[260px]'
      }`}
      style={{ height: '340px' }}
    >
      {/* Gradient background — will show beneath real images */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${bg}`}
        style={{ backgroundImage: `url('${img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-antrasit/35 group-hover:bg-antrasit/15 transition-colors duration-700" />

      {/* Gold border line at bottom — reveals on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-600 origin-left" />

      {/* Info — slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
        <p className="text-gold/60 text-[0.55rem] tracking-[0.45em] uppercase font-light mb-1.5">{cat}</p>
        <p className="text-white/85 text-xs tracking-wider font-light">{label}</p>
      </div>

      {/* Index watermark */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M8 3l5 5-5 5" stroke="rgba(201,169,110,0.6)" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-6%', '4%'])

  return (
    <section id="gallery" ref={sectionRef} className="py-28 md:py-36 bg-bej overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="flex items-center gap-4 mb-5">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-[0.65rem] tracking-[0.45em] uppercase font-light">
                Görsel Deneyim
              </span>
            </div>
            <h2 className="font-serif text-antrasit text-4xl md:text-5xl font-light tracking-wider leading-tight">
              Hotel Pelit'in
              <br />
              <em className="not-italic text-antrasit/30">Dünyasına Bakış</em>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="text-antrasit/40 text-sm font-light leading-relaxed md:max-w-xs"
          >
            Her köşesinde tarihin ve lüksün izlerini taşıyan Hotel Pelit, eşsiz anların yaşandığı dekorunu keşfedin.
          </motion.p>
        </div>
      </div>

      {/* Row 1 — parallax left */}
      <div className="overflow-hidden mb-4">
        <motion.div
          style={{ x: x1 }}
          className="flex gap-4 pl-6 lg:pl-16 will-change-transform"
        >
          {row1.map((c, i) => (
            <Card key={c.label} {...c} delay={i * 0.06} />
          ))}
        </motion.div>
      </div>

      {/* Row 2 — parallax right */}
      <div className="overflow-hidden">
        <motion.div
          style={{ x: x2 }}
          className="flex gap-4 pl-0 will-change-transform"
        >
          {row2.map((c, i) => (
            <Card key={c.label} {...c} delay={i * 0.05} />
          ))}
        </motion.div>
      </div>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-center mt-12"
      >
        <span className="text-antrasit/25 text-[0.6rem] tracking-[0.5em] uppercase font-light">
          Fotoğraflar gerçek otele aittir
        </span>
      </motion.div>
    </section>
  )
}
