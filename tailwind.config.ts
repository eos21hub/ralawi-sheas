import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FBF8F3',
          deep: '#F5EFE4',
        },
        sand: '#E8DFD0',
        espresso: '#2A1F17',
        bark: '#6B5A4C',
        shea: {
          DEFAULT: '#C89B5A',
          dark: '#9B7438',
          light: '#E5C68F',
        },
        sage: {
          DEFAULT: '#7A8970',
          deep: '#5E6C57',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['clamp(0.75rem, 0.71rem + 0.20vw, 0.8125rem)', { lineHeight: '1.5' }],
        sm: ['clamp(0.875rem, 0.83rem + 0.22vw, 0.9375rem)', { lineHeight: '1.55' }],
        base: ['clamp(1rem, 0.96rem + 0.20vw, 1.125rem)', { lineHeight: '1.65' }],
        lg: ['clamp(1.125rem, 1.07rem + 0.27vw, 1.3125rem)', { lineHeight: '1.6' }],
        xl: ['clamp(1.25rem, 1.17rem + 0.39vw, 1.5rem)', { lineHeight: '1.5' }],
        '2xl': ['clamp(1.5rem, 1.37rem + 0.65vw, 2rem)', { lineHeight: '1.3' }],
        '3xl': ['clamp(2rem, 1.80rem + 1.0vw, 2.75rem)', { lineHeight: '1.15' }],
        '4xl': ['clamp(2.5rem, 2.13rem + 1.85vw, 4rem)', { lineHeight: '1.05' }],
        display: ['clamp(3.5rem, 2.5rem + 5vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
      },
      spacing: {
        15: '3.75rem',
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        38: '9.5rem',
      },
      maxWidth: {
        prose: '38rem',
        content: '80rem',
      },
      letterSpacing: {
        wider: '0.04em',
        widest: '0.18em',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        inout: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translate3d(0, 12px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
      },
      animation: {
        marquee: 'marquee 48s linear infinite',
        'fade-in': 'fade-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
