/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        hero:       'var(--hero)',
        surface:    'var(--surface)',
        'surface-alt': 'var(--surface-alt)',
        'surface-elevated': 'var(--surface-elevated)',
        primary: {
          DEFAULT: 'var(--primary)',
          light:   'var(--primary-light)',
          dark:    'var(--primary-dark)',
        },
        accent: 'var(--accent)',
        cta: {
          DEFAULT: 'var(--cta)',
          hover:   'var(--cta-hover)',
          light:   'var(--cta-light)',
        },
        success: {
          DEFAULT: 'var(--success)',
          light:   'var(--success-light)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          light:   'var(--warning-light)',
        },
        error: {
          DEFAULT: 'var(--error)',
          light:   'var(--error-light)',
        },
        info: {
          DEFAULT: 'var(--info)',
          light:   'var(--info-light)',
        },
        'text-primary':   'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted':    'var(--text-muted)',
        'text-light':    'var(--text-light)',
        border: 'var(--border)',
        'border-light': 'var(--border-light)',
        'border-subtle': 'var(--border-subtle)',
        // keep static pink/peach for components that need them
        pink: {
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
        },
        peach: {
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
        },
        // keep legacy text.primary / text.secondary aliases
        text: {
          primary: {
            DEFAULT: 'var(--text-primary)',
            light:   '#111111',
          },
          secondary: {
            DEFAULT: 'var(--text-secondary)',
            light:   '#666666',
          },
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':   'fadeIn 0.5s ease-in',
        'slide-up':  'slideUp 0.5s ease-out',
        'slide-down':'slideDown 0.5s ease-out',
        'star-btn':  'star-btn calc(var(--duration)*1s) linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        slideDown: {
          '0%':   { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',     opacity: '1' },
        },
        'star-btn': {
          '0%':   { offsetDistance: '0%' },
          '100%': { offsetDistance: '100%' },
        },
      },
    },
  },
  plugins: [],
}
