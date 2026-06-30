'use client'

import { motion } from 'framer-motion'

const rooms = [
  {
    id: 1,
    num: '01',
    name: 'Standart Oda',
    tagline: 'Şehir Kalbinde Huzur',
    description:
      'Sıcak bej tonları ve modern donanımıyla konforlu bir konaklama. Şehrin canlılığıyla iç içe, sükûnetle tasarlanmış alanınız.',
    price: '₺2.500',
    features: ['25 m²', 'Çift Kişilik', 'Wi-Fi', 'Klima', 'Minibar'],
    gradient: 'from-[#2A2018] via-[#3D2E1A] to-[#2A2018]',
    accentColor: '#9C7A4A',
    available: true,
  },
  {
    id: 2,
    num: '02',
    name: 'Deluxe Suite',
    tagline: 'Boğaz Manzaralı Lüks',
    description:
      'Çanakkale Boğazı\'nın büyüleyici manzarasına açılan geniş balkonlu, jakuzili özel suite. Her an bir tablo gibi.',
    price: '₺4.800',
    features: ['45 m²', 'Boğaz Manzarası', 'Jakuzi', 'Balkon', 'Butler'],
    gradient: 'from-[#1A1510] via-[#8B6914] to-[#1A1510]',
    accentColor: '#C9A96E',
    available: true,
    featured: true,
  },
  {
    id: 3,
    num: '03',
    name: 'Panorama Suite',
    tagline: '180° Eşsiz Vizyon',
    description:
      'Tarihin derinliklerini ve modern lüksü buluşturan prestij suite. Özel teras ve kişisel butler hizmeti ile sınırsız konfor.',
    price: '₺7.200',
    features: ['65 m²', '180° Panoramik', 'Özel Teras', 'Kişisel Butler', 'Transfer'],
    gradient: 'from-[#111820] via-[#1C2A38] to-[#111820]',
    accentColor: '#7A9CB4',
    available: true,
  },
]

interface RoomCardsProps {
  onBookingClick: () => void
}

export default function RoomCards({ onBookingClick }: RoomCardsProps) {
  return (
    <section id="rooms" className="py-28 md:py-36 bg-antrasit relative overflow-hidden">
      {/* Decorative grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-20 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-gold/50" />
            <span className="text-gold/70 text-[0.65rem] tracking-[0.45em] uppercase font-light">
              Konaklama Seçenekleri
            </span>
          </div>
          <h2 className="font-serif text-white text-4xl md:text-6xl font-light tracking-widest leading-tight">
            Odalarımız
          </h2>
          <p className="text-white/40 text-sm tracking-wider font-light mt-4 max-w-md leading-relaxed">
            Her oda, Çanakkale'nin tarihi dokusundan ilham alarak tasarlanmıştır.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {rooms.map((room, i) => (
            <motion.article
              key={room.id}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: i * 0.12,
              }}
              whileHover={{ y: -10, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }}
              className={`group relative bg-antrasit-mid overflow-hidden cursor-pointer border border-white/5 hover:border-gold/30 transition-all duration-500 ${
                room.featured
                  ? 'ring-1 ring-gold/50 shadow-[0_0_60px_rgba(201,169,110,0.1)]'
                  : 'shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
              }`}
              style={{
                boxShadow: room.featured
                  ? '0 8px 64px rgba(201,169,110,0.15), 0 0 0 1px rgba(201,169,110,0.5)'
                  : '0 4px 32px rgba(0,0,0,0.4)',
              }}
              onClick={onBookingClick}
            >
              {/* Featured Badge */}
              {room.featured && (
                <div className="absolute top-4 left-4 z-20 bg-gold text-antrasit text-[0.6rem] tracking-[0.3em] uppercase px-3 py-1 font-medium">
                  En Popüler
                </div>
              )}

              {/* Visual Area */}
              <div
                className={`relative h-60 bg-gradient-to-br ${room.gradient} overflow-hidden`}
              >
                {/* Room number watermark */}
                <span
                  className="absolute bottom-0 right-2 font-serif text-[7rem] leading-none font-light select-none pointer-events-none"
                  style={{ color: `${room.accentColor}18` }}
                >
                  {room.num}
                </span>

                {/* Accent line */}
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
                  style={{ backgroundColor: room.accentColor }}
                />

                {/* Shimmer on hover */}
                <motion.div
                  initial={{ x: '-120%', opacity: 0 }}
                  whileHover={{ x: '220%', opacity: 1 }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -skew-x-12 pointer-events-none"
                />
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p
                      className="text-[0.65rem] tracking-[0.35em] uppercase font-light mb-1.5"
                      style={{ color: room.accentColor }}
                    >
                      {room.tagline}
                    </p>
                    <h3 className="font-serif text-white text-xl font-light tracking-wider">
                      {room.name}
                    </h3>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="font-serif text-gold text-lg">{room.price}</span>
                    <span className="text-white/25 text-xs block tracking-wider">/gece</span>
                  </div>
                </div>

                <p className="text-white/40 text-[0.8rem] leading-relaxed mb-6 font-light">
                  {room.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mb-7">
                  {room.features.map((f) => (
                    <span
                      key={f}
                      className="text-[0.6rem] tracking-wider text-white/35 border border-white/10 px-2.5 py-1 font-light"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onBookingClick()
                  }}
                  className="w-full border py-3 text-[0.65rem] tracking-[0.3em] uppercase font-light transition-all duration-400 group-hover:bg-gold group-hover:text-antrasit group-hover:border-gold"
                  style={{ borderColor: `${room.accentColor}60`, color: room.accentColor }}
                >
                  Rezervasyon Yap
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center text-white/25 text-xs tracking-widest mt-12 font-light"
        >
          Fiyatlar kişi başı olup KDV dahildir. Sabah kahvaltısı dahildir.
        </motion.p>
      </div>
    </section>
  )
}
