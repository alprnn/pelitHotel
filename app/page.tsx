'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, animate, useInView } from 'framer-motion'
import SmoothScroll from '@/components/SmoothScroll'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import RoomCards from '@/components/RoomCards'
import BookingModal from '@/components/BookingModal'
import CustomCursor from '@/components/CustomCursor'
import LoadingScreen from '@/components/LoadingScreen'
import Gallery from '@/components/Gallery'

/* ─── Animated number counter ─── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const value = useMotionValue(0)
  const spring = useSpring(value, { stiffness: 60, damping: 20 })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const controls = animate(value, to, { duration: 2.2, ease: 'easeOut' })
    const unsub = spring.on('change', (v) => setDisplay(Math.floor(v).toString()))
    return () => {
      controls.stop()
      unsub()
    }
  }, [inView, to, value, spring])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

/* ─── Amenities ─── */
const amenities = [
  {
    icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
    label: 'Boğaz Manzarası',
    desc: 'Her odadan Çanakkale Boğazı manzarası',
  },
  {
    icon: 'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z',
    label: 'VIP Transfer',
    desc: 'Havaalanı ve şehir içi özel araç',
  },
  {
    icon: 'M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z',
    label: 'Restoran & Bar',
    desc: 'Ödüllü şef mutfağı, panoramik manzara',
  },
  {
    icon: 'M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z',
    label: 'SPA & Wellness',
    desc: 'Masaj, hamam ve yüzme havuzu',
  },
  {
    icon: 'M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z',
    label: 'Ücretsiz Wi-Fi',
    desc: 'Tüm alanlarda fiber internet bağlantısı',
  },
  {
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z',
    label: 'Kişisel Concierge',
    desc: '7/24 butler ve özel istek servisi',
  },
]

/* ─── Testimonials ─── */
const testimonials = [
  {
    quote:
      'Boğaz manzarası, sessizliği ve personelin sıcaklığıyla Çanakkale\'nin en değerli konaklama deneyimi. Her detay özenle düşünülmüş.',
    author: 'Ahmet Y.',
    city: 'İstanbul',
    rating: 5,
  },
  {
    quote:
      'The view from our suite at sunrise was breathtaking. The staff anticipated every need before we even asked. Truly a world-class property.',
    author: 'Sophie M.',
    city: 'Paris',
    rating: 5,
  },
  {
    quote:
      'Jakuziyle gün batımı izlemek, sabah kahvaltısının zenginliği… Hotel Pelit\'te geçen her an bir tatil fotoğrafı gibi.',
    author: 'Zeynep K.',
    city: 'Ankara',
    rating: 5,
  },
]

/* ─── Marquee items ─── */
const marqueeWords = ['LÜKS', '·', 'KONFOR', '·', 'TARİH', '·', 'GÜZELLİK', '·', 'HUZUR', '·', 'ÇANAKKALE', '·', 'BOĞAZ', '·']

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [showFloatingBtn, setShowFloatingBtn] = useState(false)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [showBackTop, setShowBackTop] = useState(false)
  const openBooking = () => setIsBookingOpen(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setShowFloatingBtn(scrollY > window.innerHeight * 0.6)
      setShowBackTop(scrollY > window.innerHeight * 1.5)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <LoadingScreen />
      <CustomCursor />

      <SmoothScroll>
        <div className="bg-bej">
          {/* ── Navigation ── */}
          <Navbar onBookingClick={openBooking} />

          {/* ── Hero ── */}
          <Hero onBookingClick={openBooking} />

          {/* ── Marquee Text Strip ── */}
          <div className="overflow-hidden bg-antrasit py-4 border-y border-gold/10">
            <motion.div
              animate={{ x: '-50%' }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              className="flex whitespace-nowrap"
            >
              {[0, 1].map((rep) => (
                <div key={rep} className="flex items-center">
                  {marqueeWords.map((word, j) => (
                    <span
                      key={`${rep}-${j}`}
                      className={`font-serif text-lg font-light px-6 ${
                        word === '·' ? 'text-gold/60' : 'text-white/15'
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Stats Strip ── */}
          <section className="bg-bej-dark py-14">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { to: 1920, suffix: '', label: "Kuruluş Yılı", isYear: true },
                  { to: 47, suffix: '', label: 'Lüks Oda & Suite' },
                  { to: 100, suffix: '+', label: 'Yıllık Deneyim' },
                  { to: 9800, suffix: '+', label: 'Mutlu Misafir' },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.7 }}
                    className="flex flex-col items-center"
                  >
                    <span className="font-serif text-antrasit text-4xl md:text-5xl font-light tracking-wider">
                      {s.isYear ? '1920' : <Counter to={s.to} suffix={s.suffix} />}
                    </span>
                    <span className="text-antrasit/40 text-[0.65rem] tracking-[0.3em] uppercase mt-2 font-light">
                      {s.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── About ── */}
          <section id="about" className="py-28 md:py-36 bg-bej overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="flex items-center gap-4 mb-7">
                    <span className="w-8 h-px bg-gold" />
                    <span className="text-gold text-[0.65rem] tracking-[0.45em] uppercase font-light">
                      Hikayemiz
                    </span>
                  </div>
                  <h2 className="font-serif text-antrasit text-4xl md:text-5xl font-light tracking-wider leading-tight mb-8">
                    Tarihin Kalbinde
                    <br />
                    <em className="not-italic text-gold">Lüksün Adresi</em>
                  </h2>
                  <p className="text-antrasit/55 text-sm leading-[2.1] font-light mb-6 max-w-md">
                    1920'den bu yana Çanakkale Boğazı'nın kıyısında, tarihe tanıklık eden bir ev gibi duran Hotel
                    Pelit; geçmişin derinliğini modernin zarafetiyle buluşturuyor. Her detayda Çanakkale ruhunu
                    hissettiren bir kaçış noktası.
                  </p>
                  <p className="text-antrasit/40 text-sm leading-[2.1] font-light max-w-md">
                    Tarihi yarımada manzarası, ödüllü mutfağımız ve kişiselleştirilmiş butler hizmetimizle her
                    konaklamanızı unutulmaz bir anıya dönüştürüyoruz.
                  </p>

                  <div className="mt-10 flex items-center gap-8">
                    <button
                      onClick={openBooking}
                      className="inline-flex items-center gap-3 text-antrasit text-xs tracking-[0.3em] uppercase font-light group"
                    >
                      <span>Rezervasyon</span>
                      <span className="w-8 h-px bg-antrasit group-hover:w-16 transition-all duration-500" />
                    </button>
                    <a
                      href="#rooms"
                      className="text-antrasit/40 hover:text-antrasit text-xs tracking-[0.3em] uppercase font-light transition-colors duration-300"
                    >
                      Odalar →
                    </a>
                  </div>
                </motion.div>

                {/* Stacked images visual */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
                  className="relative h-[520px]"
                >
                  {/* Back image */}
                  <div
                    className="absolute top-0 right-0 w-[78%] h-[75%] bg-gradient-to-br from-antrasit-mid to-antrasit overflow-hidden"
                    style={{
                      backgroundImage: "url('/about-1.jpg')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundColor: '#2C2C2E',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-antrasit/60 via-transparent to-transparent" />
                  </div>

                  {/* Front image */}
                  <div
                    className="absolute bottom-0 left-0 w-[60%] h-[58%] border-4 border-bej overflow-hidden shadow-2xl"
                    style={{
                      backgroundImage: "url('/about-2.jpg')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundColor: '#1C1C1E',
                      background: 'linear-gradient(135deg, #C9A96E22 0%, #1C1C1E 100%)',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-antrasit/80 to-transparent" />
                    <div className="absolute bottom-5 left-5">
                      <span className="text-white/20 font-serif text-5xl font-light">1920</span>
                    </div>
                  </div>

                  {/* Gold badge */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold p-5 shadow-2xl z-10"
                  >
                    <p className="font-serif text-antrasit text-2xl font-light leading-none">★ 4.9</p>
                    <p className="text-antrasit/60 text-[0.55rem] tracking-[0.3em] uppercase mt-1">Misafir Puanı</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── Rooms ── */}
          <RoomCards onBookingClick={openBooking} />

          {/* ── Gallery ── */}
          <Gallery />

          {/* ── Amenities ── */}
          <section id="amenities" className="py-28 md:py-36 bg-antrasit relative overflow-hidden">
            {/* Subtle pattern */}
            <div
              className="absolute inset-0 opacity-[0.025] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A96E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="text-center mb-20"
              >
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="w-8 h-px bg-gold/50" />
                  <span className="text-gold/70 text-[0.65rem] tracking-[0.45em] uppercase font-light">
                    Hizmetlerimiz
                  </span>
                  <span className="w-8 h-px bg-gold/50" />
                </div>
                <h2 className="font-serif text-white text-4xl md:text-5xl font-light tracking-wider">
                  Hotel Pelit Ayrıcalıkları
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {amenities.map((a, i) => (
                  <motion.div
                    key={a.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.7 }}
                    whileHover={{ y: -6, transition: { duration: 0.35 } }}
                    className="group flex flex-col items-center text-center p-8 border border-white/6 hover:border-gold/25 transition-colors duration-500"
                  >
                    <div className="w-14 h-14 border border-white/10 group-hover:border-gold/40 flex items-center justify-center mb-5 transition-colors duration-400">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white/30 group-hover:fill-gold transition-colors duration-400">
                        <path d={a.icon} />
                      </svg>
                    </div>
                    <h3 className="text-white/80 text-xs tracking-[0.25em] uppercase font-light mb-3 group-hover:text-gold transition-colors duration-300">
                      {a.label}
                    </h3>
                    <p className="text-white/25 text-xs leading-relaxed font-light">{a.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Full-Bleed CTA ── */}
          <section className="relative h-[75vh] min-h-[500px] overflow-hidden">
            {/* BG — replace /cta-bg.jpg with your own image */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{
                backgroundImage: "url('/cta-bg.jpg')",
                background: 'linear-gradient(135deg, #0A0A0A 0%, #1C1C1E 40%, #2C2010 100%)',
              }}
            />
            <div className="absolute inset-0 bg-antrasit/72" />

            {/* Decorative rings */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-[500px] h-[500px] rounded-full border border-gold/4" />
              <div className="absolute inset-8 rounded-full border border-gold/6" />
              <div className="absolute inset-16 rounded-full border border-gold/8" />
            </div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.95, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-center gap-5"
              >
                <div className="flex items-center gap-4">
                  <span className="w-10 h-px bg-gold/40" />
                  <span className="text-gold/60 text-[0.6rem] tracking-[0.5em] uppercase font-light">
                    Sizi Bekliyoruz
                  </span>
                  <span className="w-10 h-px bg-gold/40" />
                </div>

                <h2 className="font-serif text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-wider max-w-3xl leading-[1.1]">
                  Hayalinizdeki
                  <br />
                  <em className="not-italic text-gold">Kaçamak</em> Burada
                </h2>

                <p className="text-white/45 text-sm tracking-wider font-light max-w-xs mt-2 leading-relaxed">
                  Tarihi Çanakkale'nin sıcak kucağında, lüks bir konaklama için hemen rezervasyon yapın.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                  <button
                    onClick={openBooking}
                    className="group relative bg-gold text-antrasit px-12 py-4 text-xs tracking-[0.35em] uppercase font-medium overflow-hidden hover:shadow-[0_8px_40px_rgba(201,169,110,0.4)] transition-shadow duration-400"
                  >
                    <span className="relative z-10">Rezervasyon Yap</span>
                    <div className="absolute inset-0 bg-gold-light translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                  <a
                    href="tel:+902861234567"
                    className="text-white/50 hover:text-gold text-xs tracking-[0.3em] uppercase font-light transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-4 h-px bg-current" />
                    +90 286 123 45 67
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Testimonials ── */}
          <section className="py-24 md:py-32 bg-bej relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-serif text-[20vw] text-antrasit/[0.025] font-light select-none tracking-widest">
                Pelit
              </span>
            </div>

            <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-14"
              >
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="w-6 h-px bg-gold/50" />
                  <span className="text-gold/70 text-[0.65rem] tracking-[0.45em] uppercase font-light">
                    Misafir Yorumları
                  </span>
                  <span className="w-6 h-px bg-gold/50" />
                </div>
                <h2 className="font-serif text-antrasit text-3xl md:text-4xl font-light tracking-wider">
                  Deneyimler
                </h2>
              </motion.div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-10">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-gold text-lg">★</span>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="font-serif text-antrasit/70 text-xl md:text-2xl font-light leading-relaxed tracking-wide italic">
                    &ldquo;{testimonials[testimonialIndex].quote}&rdquo;
                  </p>
                  <div className="mt-8 flex flex-col items-center gap-1.5">
                    <span className="text-antrasit text-sm font-light tracking-wider">
                      {testimonials[testimonialIndex].author}
                    </span>
                    <span className="text-antrasit/30 text-[0.65rem] tracking-[0.35em] uppercase">
                      {testimonials[testimonialIndex].city}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-10">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === testimonialIndex ? 'bg-gold w-8' : 'bg-antrasit/20 w-1.5'
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ── Contact / Footer ── */}
          <footer id="contact" className="bg-antrasit">
            {/* Newsletter strip */}
            <div className="border-b border-white/8">
              <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-white/70 text-sm font-light tracking-wider">
                      Özel fırsatlar ve haberler için abone olun
                    </p>
                    <p className="text-white/25 text-xs tracking-wider mt-1 font-light">
                      Spam yok, yalnızca seçkin içerikler
                    </p>
                  </div>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex gap-0 w-full md:w-auto"
                  >
                    <input
                      type="email"
                      placeholder="E-posta adresiniz"
                      className="bg-white/5 border border-white/12 border-r-0 px-5 py-3 text-white text-xs placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors w-full md:w-64 font-light tracking-wider"
                    />
                    <button
                      type="submit"
                      className="bg-gold text-antrasit px-6 py-3 text-xs tracking-[0.3em] uppercase font-medium hover:bg-gold-light transition-colors duration-300 shrink-0"
                    >
                      Abone
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Main footer */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="md:col-span-1">
                  <div className="flex flex-col leading-none mb-6">
                    <span className="font-serif text-gold text-xs tracking-[0.45em] uppercase font-light">Hotel</span>
                    <span className="font-serif text-white text-2xl tracking-[0.3em] uppercase font-light -mt-0.5">Pelit</span>
                  </div>
                  <p className="text-white/30 text-xs leading-[2] font-light max-w-[200px] mb-8">
                    Çanakkale Boğazı kıyısında, tarihin ve lüksün buluştuğu nokta. Est. 1920.
                  </p>
                  {/* Social icons */}
                  <div className="flex gap-4">
                    {[
                      { name: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                      { name: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                    ].map((s) => (
                      <button
                        key={s.name}
                        className="w-8 h-8 border border-white/10 hover:border-gold/50 flex items-center justify-center group transition-colors duration-300"
                        aria-label={s.name}
                      >
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white/30 group-hover:fill-gold transition-colors duration-300">
                          <path d={s.path} />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="text-white/35 text-[0.6rem] tracking-[0.45em] uppercase mb-6 font-light">İletişim</h3>
                  <ul className="space-y-4">
                    {[
                      { label: 'Kordon Cad. No: 12', sub: '17100 Çanakkale, Türkiye' },
                      { label: '+90 (286) 123 45 67', sub: 'Rezervasyon Hattı' },
                      { label: 'info@hotelpelit.com', sub: 'E-posta' },
                      { label: '07:00 – 23:00', sub: 'Resepsiyon Saatleri' },
                    ].map((item) => (
                      <li key={item.sub}>
                        <p className="text-white/55 text-xs font-light">{item.label}</p>
                        <p className="text-white/22 text-[0.62rem] tracking-wider mt-0.5">{item.sub}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-white/35 text-[0.6rem] tracking-[0.45em] uppercase mb-6 font-light">Bağlantılar</h3>
                  <ul className="space-y-3">
                    {[
                      { label: 'Odalar & Suitler', href: '#rooms' },
                      { label: 'SPA & Wellness', href: '#amenities' },
                      { label: 'Restoran', href: '#amenities' },
                      { label: 'Galeri', href: '#gallery' },
                      { label: 'Hakkımızda', href: '#about' },
                      { label: 'İletişim', href: '#contact' },
                    ].map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          className="text-white/35 hover:text-gold text-xs tracking-wider font-light transition-colors duration-300"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booking CTA */}
                <div>
                  <h3 className="text-white/35 text-[0.6rem] tracking-[0.45em] uppercase mb-6 font-light">Rezervasyon</h3>
                  <p className="text-white/30 text-xs font-light leading-relaxed mb-6">
                    Özel fırsatlar ve en uygun fiyatlar için doğrudan bizimle iletişime geçin.
                  </p>
                  <button
                    onClick={openBooking}
                    className="border border-gold text-gold hover:bg-gold hover:text-antrasit px-6 py-3 text-xs tracking-[0.3em] uppercase font-light transition-all duration-400 w-full"
                  >
                    Hemen Rezervasyon
                  </button>
                  <div className="mt-4 p-4 border border-white/6 text-center">
                    <p className="text-gold text-lg font-serif font-light">%15</p>
                    <p className="text-white/25 text-[0.58rem] tracking-widest mt-0.5">Direkt rezervasyona özel indirim</p>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="mt-16 pt-8 border-t border-white/6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-white/18 text-[0.62rem] tracking-widest font-light">
                  © 2025 Hotel Pelit Çanakkale. Tüm hakları saklıdır.
                </p>
                <div className="flex gap-6">
                  {['Gizlilik Politikası', 'Çerez Politikası', 'KVKK'].map((item) => (
                    <span
                      key={item}
                      className="text-white/18 text-[0.62rem] tracking-wider hover:text-white/45 cursor-pointer transition-colors font-light"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </footer>

          {/* ── Floating Reservation Tab (right side, appears after hero) ── */}
          <AnimatePresence>
            {showFloatingBtn && (
              <motion.button
                initial={{ opacity: 0, x: 72 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 72 }}
                transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={openBooking}
                className="fixed top-28 right-0 z-40 flex items-center gap-2.5 bg-gold text-antrasit py-3.5 pl-4 pr-3 text-[0.58rem] tracking-[0.35em] uppercase font-semibold shadow-[0_4px_40px_rgba(201,169,110,0.35)] hover:bg-gold-light transition-colors duration-300"
                style={{ writingMode: 'vertical-rl' }}
                aria-label="Rezervasyon Yap"
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{ transform: 'rotate(90deg)', flexShrink: 0 }}
                >
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Rezervasyon
              </motion.button>
            )}
          </AnimatePresence>

          {/* ── Back to Top button ── */}
          <AnimatePresence>
            {showBackTop && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 z-40 w-11 h-11 border border-antrasit/25 bg-bej hover:bg-antrasit hover:border-antrasit flex items-center justify-center group transition-all duration-400 shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
                aria-label="Yukarı çık"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-antrasit group-hover:text-white transition-colors duration-300"
                >
                  <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          {/* ── Booking Modal ── */}
          <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        </div>
      </SmoothScroll>
    </>
  )
}
