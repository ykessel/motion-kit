import type { Metadata } from 'next'
import { Space_Grotesk, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
})

const hankenGrotesk = Hanken_Grotesk({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MotionKit — Animated React Component Library',
  description: 'A collection of accessible, animated React components built with Framer Motion and TypeScript.',
  keywords: ['react', 'components', 'framer-motion', 'typescript', 'ui-library', 'design-system'],
  openGraph: {
    title: 'MotionKit',
    description: 'Accessible, animated React components',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable}`}
        style={{ fontFamily: 'var(--font-sans), system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
