'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const inputClass =
  'w-full bg-white/5 border border-white/10 focus:border-gold/60 px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none transition-colors duration-300 rounded-none'

const labelClass = 'block text-white/40 text-[0.65rem] tracking-[0.35em] uppercase mb-2 font-light'

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    roomType: 'Standart Oda',
    message: '',
  })

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleClose}
            className="fixed inset-0 bg-antrasit/80 backdrop-blur-md z-[60]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-antrasit-mid rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.7)] w-full max-w-xl max-h-[92vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative px-8 pt-8 pb-7 border-b border-white/8">
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-white/30 hover:text-white transition-colors rounded-full hover:bg-white/5"
                  aria-label="Kapat"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 4L4 14M4 4l10 10" />
                  </svg>
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <span className="w-6 h-px bg-gold/60" />
                  <span className="text-gold/70 text-[0.6rem] tracking-[0.4em] uppercase font-light">
                    Hotel Pelit Çanakkale
                  </span>
                </div>
                <h2 className="font-serif text-white text-2xl md:text-3xl font-light tracking-wider">
                  {submitted ? 'Rezervasyonunuz Alındı' : 'Rezervasyon Yap'}
                </h2>
              </div>

              {/* Success State */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-8 py-12 text-center"
                >
                  <div className="w-16 h-16 border border-gold/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C9A96E" strokeWidth="1.5">
                      <path d="M5 14l7 7L23 8" />
                    </svg>
                  </div>
                  <p className="text-white/70 text-sm tracking-wider font-light leading-relaxed mb-8">
                    Rezervasyon talebiniz alınmıştır. En kısa sürede{' '}
                    <span className="text-gold">{formData.email}</span> adresinize ve{' '}
                    <span className="text-gold">{formData.phone}</span> numaranıza dönüş yapacağız.
                  </p>
                  <button
                    onClick={handleClose}
                    className="border border-gold text-gold px-8 py-3 text-xs tracking-[0.3em] uppercase font-light hover:bg-gold hover:text-antrasit transition-all duration-300"
                  >
                    Kapat
                  </button>
                </motion.div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="px-8 py-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Ad Soyad</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder="Adınız ve soyadınız"
                        className={inputClass}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className={labelClass}>E-posta</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="ornek@email.com"
                        className={inputClass}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className={labelClass}>Telefon</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        placeholder="+90 5xx xxx xx xx"
                        className={inputClass}
                      />
                    </div>

                    {/* Check-in */}
                    <div>
                      <label className={labelClass}>Giriş Tarihi</label>
                      <input
                        type="date"
                        required
                        value={formData.checkIn}
                        onChange={(e) => update('checkIn', e.target.value)}
                        className={inputClass}
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>

                    {/* Check-out */}
                    <div>
                      <label className={labelClass}>Çıkış Tarihi</label>
                      <input
                        type="date"
                        required
                        value={formData.checkOut}
                        onChange={(e) => update('checkOut', e.target.value)}
                        className={inputClass}
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>

                    {/* Guests */}
                    <div>
                      <label className={labelClass}>Misafir Sayısı</label>
                      <select
                        value={formData.guests}
                        onChange={(e) => update('guests', e.target.value)}
                        className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        {['1 Kişi', '2 Kişi', '3 Kişi', '4 Kişi'].map((v, i) => (
                          <option key={v} value={i + 1} className="bg-antrasit">
                            {v}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Room Type */}
                    <div>
                      <label className={labelClass}>Oda Tipi</label>
                      <select
                        value={formData.roomType}
                        onChange={(e) => update('roomType', e.target.value)}
                        className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        {['Standart Oda', 'Deluxe Suite', 'Panorama Suite'].map((r) => (
                          <option key={r} value={r} className="bg-antrasit">
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Özel İstek</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => update('message', e.target.value)}
                        rows={3}
                        placeholder="Özel isteklerinizi belirtebilirsiniz..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full bg-gold text-antrasit py-4 text-xs tracking-[0.4em] uppercase font-medium mt-6 hover:bg-gold-light transition-colors duration-300"
                  >
                    Rezervasyonu Onayla
                  </motion.button>

                  <p className="text-white/20 text-[0.65rem] text-center mt-4 tracking-widest font-light">
                    24 saat içinde size dönüş yapacağız &nbsp;·&nbsp; +90 (286) 123 45 67
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
