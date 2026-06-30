import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hotel Pelit Çanakkale | Lüks Konaklama',
  description:
    'Çanakkale Boğazı kıyısında, tarihin ve lüksün buluştuğu nokta. Hotel Pelit ile eşsiz bir konaklama deneyimi yaşayın.',
  keywords: ['Hotel Pelit', 'Çanakkale otel', 'lüks otel', 'Boğaz manzarası'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-bej antialiased">{children}</body>
    </html>
  )
}
