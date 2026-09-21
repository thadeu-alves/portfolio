/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    screens: {
      xs: '320px',
      sm: '480px',
      md: '700px',
      lg: '900px',
    },
    extend: {
      colors: {
        'site-bg':      '#191629',
        'site-purple':  '#8f1ef2',
        'site-magenta': '#e100e6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'marquee-scroll': {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        'tw-blink': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
      animation: {
        marquee:    'marquee-scroll 20s linear infinite',
        'tw-blink': 'tw-blink 0.65s steps(1) infinite',
      },
    },
  },
  plugins: [],
};
