import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bej: '#F8F4EE',
        'bej-dark': '#EDE8DF',
        antrasit: '#1C1C1E',
        'antrasit-mid': '#2C2C2E',
        gold: '#C9A96E',
        'gold-light': '#D4B87A',
        'gold-pale': '#EDD99A',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        'ultra-wide': '0.4em',
      },
    },
  },
  plugins: [],
}

export default config
