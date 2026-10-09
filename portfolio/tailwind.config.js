/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts,js}'],
  theme: {
    extend: {
      colors: {
        /* Theme tokens (driven by CSS variables so dark/light both look right) */
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        'bg-soft': 'rgb(var(--c-bg-soft) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--c-surface-2) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        content: 'rgb(var(--c-text) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        primary: 'rgb(var(--c-primary) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        cyanx: 'rgb(var(--c-cyan) / <alpha-value>)',
        medgreen: 'rgb(var(--c-green) / <alpha-value>)',
        /* Static brand ramp used for gradients / glows */
        brand: {
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        iris: {
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--c-primary) / 0.25), 0 18px 60px -20px rgb(var(--c-primary) / 0.55)',
        'glow-sm': '0 12px 40px -18px rgb(var(--c-primary) / 0.65)',
        'glow-accent': '0 18px 60px -22px rgb(var(--c-accent) / 0.6)',
        card: '0 24px 60px -34px rgb(2 6 23 / 0.85)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to right, rgb(var(--c-line) / 0.55) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--c-line) / 0.55) 1px, transparent 1px)',
        'brand-gradient': 'linear-gradient(120deg, #3b82f6 0%, #6366f1 45%, #a855f7 100%)',
        'text-gradient': 'linear-gradient(100deg, #93c5fd 0%, #3b82f6 40%, #a78bfa 100%)',
      },
      backgroundSize: {
        grid: '44px 44px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(0, -22px, 0) scale(1.03)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(-26px, 18px, 0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translate3d(0, 26px, 0)' },
          to: { opacity: '1', transform: 'none' },
        },
        fadeRight: {
          from: { opacity: '0', transform: 'translate3d(46px, 0, 0)' },
          to: { opacity: '1', transform: 'none' },
        },
        fadeLeft: {
          from: { opacity: '0', transform: 'translate3d(-46px, 0, 0)' },
          to: { opacity: '1', transform: 'none' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.94)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.06)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        scrollHint: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '35%': { opacity: '1' },
          '100%': { transform: 'translateY(12px)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 10s ease-in-out infinite',
        'float-slow': 'floatSlow 14s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-right': 'fadeRight 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-left': 'fadeLeft 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 0.9s ease-out both',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-glow': 'pulseGlow 7s ease-in-out infinite',
        shimmer: 'shimmer 2.6s linear infinite',
        'scroll-hint': 'scrollHint 1.8s ease-in-out infinite',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
