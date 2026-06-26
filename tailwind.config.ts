import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // CSS vars — see globals.css
        bg:        'var(--bg)',
        surface:   'var(--surface)',
        border:    'var(--border)',
        primary:   'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted:     'var(--text-muted)',
        accent:    'var(--accent)',
      },
      fontFamily: {
        sans:    ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '10px',
        lg: '14px',
        xl: '18px',
      },
    },
  },
  plugins: [],
}

export default config
