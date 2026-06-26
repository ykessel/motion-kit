'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/src/utils/cn'
import { ToastProvider } from '@/src/components/Toast/Toast'

const NAV = [
  { label: 'Getting Started', href: '/docs' },
  { label: '— Core', type: 'divider' },
  { label: 'Button',   href: '/docs/button' },
  { label: 'Badge',    href: '/docs/badge' },
  { label: 'Card',     href: '/docs/card' },
  { label: 'Input',    href: '/docs/input' },
  { label: 'Checkbox', href: '/docs/checkbox' },
  { label: 'Switch',   href: '/docs/switch' },
  { label: '— Overlay', type: 'divider' },
  { label: 'Modal',    href: '/docs/modal' },
  { label: 'Drawer',   href: '/docs/drawer' },
  { label: 'Toast',    href: '/docs/toast' },
  { label: 'Tooltip',  href: '/docs/tooltip' },
  { label: 'Dropdown', href: '/docs/dropdown' },
  { label: '— Feedback', type: 'divider' },
  { label: 'Accordion', href: '/docs/accordion' },
  { label: 'Tabs',      href: '/docs/tabs' },
  { label: 'Progress',  href: '/docs/progress' },
  { label: 'Skeleton',  href: '/docs/skeleton' },
  { label: 'Alert',     href: '/docs/alert' },
] as const

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <ToastProvider>
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        {/* Top nav */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: 'color-mix(in srgb, var(--bg) 70%, transparent)', backdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--line)',
          height: 56,
          display: 'flex', alignItems: 'center',
          padding: '0 24px',
          gap: 32,
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <MotionKitIcon />
            <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--fg)', letterSpacing: '-.02em' }}>
              MotionKit
            </span>
          </Link>
          <Link href="/docs" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>
            Docs
          </Link>
          <a
            href="https://github.com/ykessel"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--faint)', textDecoration: 'none' }}
          >
            GitHub ↗
          </a>
        </header>

        <div style={{ display: 'flex' }}>
          {/* Sidebar */}
          <aside style={{
            width: 220,
            flexShrink: 0,
            position: 'sticky',
            top: 56,
            height: 'calc(100vh - 56px)',
            overflowY: 'auto',
            borderRight: '1px solid var(--line)',
            padding: '20px 12px',
          }}>
            {NAV.map((item, i) => {
              if ('type' in item && item.type === 'divider') {
                return (
                  <p key={i} style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: '.1em',
                    color: 'var(--faint)', textTransform: 'uppercase',
                    padding: '12px 8px 4px',
                  }}>
                    {item.label.replace('— ', '')}
                  </p>
                )
              }
              const href = 'href' in item ? item.href : ''
              const isActive = pathname === href
              return (
                <Link key={href} href={href} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{
                    position: 'relative',
                    padding: '6px 10px',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--accent)' : 'var(--muted)',
                    background: isActive ? 'var(--accent-soft)' : 'transparent',
                    transition: 'all .15s',
                    marginBottom: 1,
                  }}>
                    {item.label}
                  </div>
                </Link>
              )
            })}
          </aside>

          {/* Main content */}
          <main style={{ flex: 1, minWidth: 0, padding: '40px 48px', maxWidth: 860 }}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .2 }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}

function MotionKitIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="8" fill="var(--accent)" />
      <path d="M8 14 L13 9 L18 14 L13 19 Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(255,255,255,.2)" />
      <path d="M14 9 L20 14 L14 19" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="none" opacity=".6" />
    </svg>
  )
}
