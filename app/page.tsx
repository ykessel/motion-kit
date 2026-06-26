'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

/* ─── Theme definitions ───────────────────────────────────── */
const THEMES = {
  eclipse: {
    label: 'Eclipse',
    '--bg': '#0c0c0e', '--bg-2': '#151517', '--bg-3': '#1d1d20',
    '--line': 'rgba(255,255,255,.07)', '--line-2': 'rgba(255,255,255,.13)',
    '--fg': '#f4f3f1', '--muted': '#9c9b98', '--faint': '#646461',
    '--accent': '#8b86e8', '--accent-2': '#a9a0f5', '--accent-fg': '#ffffff',
    '--accent-soft': 'rgba(139,134,232,.16)', '--accent-glow': 'rgba(139,134,232,.45)',
    '--glow-a': 'rgba(139,134,232,.20)', '--glow-b': 'rgba(120,120,160,.12)',
    '--shadow': '0 30px 60px -30px rgba(0,0,0,.7)',
  },
  daylight: {
    label: 'Daylight',
    '--bg': '#f4f2ec', '--bg-2': '#ffffff', '--bg-3': '#f3f1ea',
    '--line': 'rgba(20,18,30,.10)', '--line-2': 'rgba(20,18,30,.16)',
    '--fg': '#17161c', '--muted': '#56545f', '--faint': '#8c8a94',
    '--accent': '#5a4fe0', '--accent-2': '#7a5cf0', '--accent-fg': '#ffffff',
    '--accent-soft': 'rgba(90,79,224,.12)', '--accent-glow': 'rgba(90,79,224,.30)',
    '--glow-a': 'rgba(120,100,240,.16)', '--glow-b': 'rgba(90,79,224,.08)',
    '--shadow': '0 26px 50px -28px rgba(40,36,70,.25)',
  },
  pulse: {
    label: 'Pulse',
    '--bg': '#070710', '--bg-2': '#10101e', '--bg-3': '#191930',
    '--line': 'rgba(255,255,255,.09)', '--line-2': 'rgba(255,255,255,.16)',
    '--fg': '#f7f7fc', '--muted': '#a6a4be', '--faint': '#67658a',
    '--accent': '#6d5efc', '--accent-2': '#22d3ee', '--accent-fg': '#ffffff',
    '--accent-soft': 'rgba(109,94,252,.20)', '--accent-glow': 'rgba(109,94,252,.55)',
    '--glow-a': 'rgba(109,94,252,.30)', '--glow-b': 'rgba(34,211,238,.18)',
    '--shadow': '0 30px 70px -28px rgba(0,0,0,.8)',
  },
} as const

type ThemeKey = keyof typeof THEMES

const INSTALL_CMDS: Record<string, string> = {
  npm: 'npm install motionkit',
  pnpm: 'pnpm add motionkit',
  yarn: 'yarn add motionkit',
}

const TAB_CONTENT = [
  'Drop-in primitives with sensible defaults and zero config.',
  'import { Tabs } from "motionkit" — compose in three lines.',
  'Roving tabindex, arrow-key navigation, and a full ARIA tablist.',
]

/* ─── Main component ──────────────────────────────────────── */
export default function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<ThemeKey>('eclipse')
  const [pressCount, setPressCount] = useState(0)
  const [switchOn, setSwitchOn] = useState(true)
  const [checked, setChecked] = useState(true)
  const [inputVal, setInputVal] = useState('')
  const [inputFocus, setInputFocus] = useState(false)
  const [sliderVal, setSliderVal] = useState(64)
  const [activeTab, setActiveTab] = useState(0)
  const [installTab, setInstallTab] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Apply theme to root element
  const applyTheme = useCallback((key: ThemeKey) => {
    const t = THEMES[key]
    const el = rootRef.current
    if (!el) return
    Object.entries(t).forEach(([k, v]) => {
      if (k !== 'label') el.style.setProperty(k, v as string)
    })
    try {
      document.documentElement.style.background = t['--bg']
      document.body.style.background = t['--bg']
    } catch {}
  }, [])

  useEffect(() => { applyTheme(theme) }, [theme, applyTheme])

  const showToast = () => {
    setToastVisible(true)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastVisible(false), 2400)
  }

  // Close modal/drawer on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setModalOpen(false); setDrawerOpen(false) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 13px', borderRadius: 10,
    background: 'var(--bg-3)', color: 'var(--fg)',
    fontFamily: 'inherit', fontSize: 14, outline: 'none',
    border: `1px solid ${inputFocus ? 'var(--accent)' : 'var(--line-2)'}`,
    boxShadow: inputFocus ? '0 0 0 4px var(--accent-soft)' : '0 0 0 0 transparent',
    transition: 'box-shadow .2s, border-color .2s',
  }

  const switchTrack: React.CSSProperties = {
    width: 46, height: 27, borderRadius: 99, padding: 3,
    cursor: 'pointer', display: 'flex',
    border: `1px solid ${switchOn ? 'transparent' : 'var(--line-2)'}`,
    background: switchOn ? 'var(--accent)' : 'var(--bg-3)',
    boxShadow: switchOn ? '0 4px 14px -4px var(--accent-glow)' : 'none',
    transition: 'background .25s, border-color .25s, box-shadow .25s',
  }

  const switchThumb: React.CSSProperties = {
    width: 21, height: 21, borderRadius: '50%', background: '#fff',
    transform: switchOn ? 'translateX(19px)' : 'translateX(0)',
    boxShadow: '0 2px 6px rgba(0,0,0,.3)',
    transition: 'transform .28s cubic-bezier(.34,1.56,.64,1)',
  }

  const checkBox: React.CSSProperties = {
    width: 24, height: 24, borderRadius: 7,
    border: `2px solid ${checked ? 'var(--accent)' : 'var(--line-2)'}`,
    background: checked ? 'var(--accent)' : 'transparent',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'all .2s', flexShrink: 0,
  }

  const checkMark: React.CSSProperties = {
    transform: checked ? 'scale(1)' : 'scale(0)',
    opacity: checked ? 1 : 0,
    transition: 'transform .25s cubic-bezier(.34,1.7,.5,1), opacity .15s',
  }

  const sliderStyle: React.CSSProperties = {
    width: '100%',
    background: `linear-gradient(90deg, var(--accent) ${sliderVal}%, var(--bg-3) ${sliderVal}%)`,
  }

  const installPkgs = Object.keys(INSTALL_CMDS)

  return (
    <div
      ref={rootRef}
      style={{
        position: 'relative', overflowX: 'hidden', minHeight: '100vh',
        background: 'var(--bg)', color: 'var(--fg)',
        fontFamily: 'var(--font-sans), system-ui, sans-serif',
        transition: 'background .5s ease, color .5s ease',
      }}
    >
      {/* Floating background blobs */}
      <div style={{
        position: 'absolute', top: -200, left: '50%', width: 720, height: 720,
        transform: 'translateX(-50%)',
        background: 'radial-gradient(circle, var(--glow-a), transparent 70%)',
        filter: 'blur(30px)', pointerEvents: 'none', zIndex: 0,
      }} className="animate-float-a" />
      <div style={{
        position: 'absolute', top: 420, right: -220, width: 600, height: 600,
        background: 'radial-gradient(circle, var(--glow-b), transparent 70%)',
        filter: 'blur(30px)', pointerEvents: 'none', zIndex: 0,
      }} className="animate-float-b" />

      {/* ── Header ─────────────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        backdropFilter: 'blur(14px)',
        background: 'color-mix(in srgb, var(--bg) 70%, transparent)',
        borderBottom: '1px solid var(--line)',
      }}>
        <div style={{
          maxWidth: 1180, margin: '0 auto', padding: '0 28px',
          height: 66, display: 'flex', alignItems: 'center', gap: 22,
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{
              width: 31, height: 31, borderRadius: 9,
              background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 18px -6px var(--accent-glow)',
            }}>
              <div style={{ width: 11, height: 11, background: 'var(--accent-fg)', transform: 'rotate(45deg)', borderRadius: 2 }} />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, letterSpacing: '-.01em' }}>
              MotionKit
            </span>
          </div>

          <nav style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 20 }}>
            <Link href="/docs" style={{ fontSize: 14, color: 'var(--muted)', textDecoration: 'none' }}>Docs</Link>
            <a href="https://github.com/ykessel" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 14, color: 'var(--muted)', textDecoration: 'none' }}>GitHub</a>

            {/* Theme switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingLeft: 8, borderLeft: '1px solid var(--line)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--faint)' }}>
                Theme
              </span>
              <div style={{
                display: 'flex', gap: 3, padding: 4, borderRadius: 12,
                background: 'var(--bg-3)', border: '1px solid var(--line)',
              }}>
                {(Object.keys(THEMES) as ThemeKey[]).map(key => (
                  <button key={key} onClick={() => setTheme(key)} style={{
                    appearance: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600,
                    padding: '6px 13px', borderRadius: 9,
                    transition: 'all .22s',
                    background: theme === key ? 'var(--accent)' : 'transparent',
                    color: theme === key ? 'var(--accent-fg)' : 'var(--muted)',
                    boxShadow: theme === key ? '0 4px 14px -4px var(--accent-glow)' : 'none',
                  }}>
                    {THEMES[key].label}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1180, margin: '0 auto', padding: '88px 28px 48px',
        display: 'grid', gridTemplateColumns: '1.08fr .92fr', gap: 56,
        alignItems: 'center',
      }} className="responsive-hero">
        {/* Left — copy */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            padding: '6px 14px', borderRadius: 99,
            background: 'var(--accent-soft)', border: '1px solid var(--line)',
            marginBottom: 26,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }}
              className="animate-dot" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', letterSpacing: '.01em' }}>
              16 components · Framer Motion · TS
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(46px, 6.4vw, 78px)', lineHeight: .97,
            letterSpacing: '-.035em', margin: '0 0 24px',
          }}>
            Components that feel{' '}
            <span style={{
              background: 'linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent))',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            }} className="animate-gradient-shift">
              alive
            </span>
          </h1>

          <p style={{ fontSize: 18, lineHeight: 1.56, color: 'var(--muted)', maxWidth: '30em', margin: '0 0 32px' }}>
            An accessible, animated React component library. Every primitive ships with spring physics,
            full keyboard support, and theme-aware tokens — flip the switch up top to watch the whole
            page re-theme live.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/docs" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              textDecoration: 'none', fontWeight: 600, fontSize: 15,
              padding: '13px 21px', borderRadius: 12,
              background: 'var(--accent)', color: 'var(--accent-fg)',
              boxShadow: '0 10px 26px -10px var(--accent-glow)',
              transition: 'transform .16s cubic-bezier(.34,1.56,.64,1), box-shadow .25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = '' }}>
              Browse components →
            </Link>
            <button onClick={() => setDrawerOpen(true)} style={{
              appearance: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontWeight: 600, fontSize: 15, padding: '13px 21px', borderRadius: 12,
              background: 'var(--bg-3)', color: 'var(--fg)', border: '1px solid var(--line-2)',
              transition: 'transform .16s cubic-bezier(.34,1.56,.64,1), border-color .25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--line-2)' }}>
              View source
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 34, marginTop: 38 }}>
            {[
              { val: '16', unit: null, label: 'components' },
              { val: '4.2', unit: 'kb', label: 'core size' },
              { val: 'AA', unit: null, label: 'contrast' },
            ].map(({ val, unit, label }) => (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24 }}>
                  {val}{unit && <span style={{ fontSize: 15, color: 'var(--muted)' }}>{unit}</span>}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--faint)', marginTop: 3, letterSpacing: '.06em', textTransform: 'uppercase' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — live preview panel */}
        <div style={{
          position: 'relative', borderRadius: 22,
          background: 'var(--bg-2)', border: '1px solid var(--line)',
          boxShadow: 'var(--shadow)', padding: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.16em', color: 'var(--faint)' }}>
              live preview
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--line-2)', display: 'block' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--line-2)', display: 'block' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--accent)', display: 'block' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Spring button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Spring button</div>
                <div style={{ fontSize: 12, color: 'var(--faint)' }}>Pressed {pressCount}×</div>
              </div>
              <motion.button
                onClick={() => setPressCount(c => c + 1)}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                style={{
                  appearance: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', fontWeight: 600, fontSize: 14,
                  padding: '9px 16px', borderRadius: 10,
                  background: 'var(--accent)', color: 'var(--accent-fg)',
                }}>
                Press me
              </motion.button>
            </div>

            {/* Switch */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Switch</div>
                <div style={{ fontSize: 12, color: 'var(--faint)' }}>Smooth toggle</div>
              </div>
              <div onClick={() => setSwitchOn(v => !v)} style={switchTrack}>
                <div style={switchThumb} />
              </div>
            </div>

            {/* Checkbox */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid var(--line)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Checkbox</div>
                <div style={{ fontSize: 12, color: 'var(--faint)' }}>Spring checkmark</div>
              </div>
              <div onClick={() => setChecked(v => !v)} style={checkBox}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={checkMark}>
                  <path d="M5 12.5l4.5 4.5L19 6.5" stroke="var(--accent-fg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Input */}
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Input</div>
              <input
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                placeholder="you@studio.dev"
                style={inputStyle}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Component grid ─────────────────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 1180, margin: '0 auto', padding: '60px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 30, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>
              // the library
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px,3.4vw,40px)', letterSpacing: '-.02em', margin: 0 }}>
              Every primitive, interactive
            </h2>
          </div>
          <p style={{ fontSize: 15, color: 'var(--muted)', maxWidth: '24em', margin: 0 }}>
            These aren't screenshots. Click, toggle, drag, and type — it's the real thing running below.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(258px, 1fr))', gap: 16 }}>
          {/* Button */}
          <ComponentCard title="Button" desc="Spring tap feedback">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <motion.button
                onClick={() => setPressCount(c => c + 1)}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                style={{
                  appearance: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', fontWeight: 600, fontSize: 13.5,
                  padding: '9px 15px', borderRadius: 10,
                  background: 'var(--accent)', color: 'var(--accent-fg)',
                }}>
                Press
              </motion.button>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>{pressCount}×</span>
            </div>
          </ComponentCard>

          {/* Switch */}
          <ComponentCard title="Switch" desc="Smooth toggle">
            <div onClick={() => setSwitchOn(v => !v)} style={switchTrack}>
              <div style={switchThumb} />
            </div>
          </ComponentCard>

          {/* Checkbox */}
          <ComponentCard title="Checkbox" desc="Spring checkmark">
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, cursor: 'pointer' }} onClick={() => setChecked(v => !v)}>
              <div style={checkBox}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={checkMark}>
                  <path d="M5 12.5l4.5 4.5L19 6.5" stroke="var(--accent-fg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontSize: 13.5, color: 'var(--muted)' }}>Enable autosave</span>
            </div>
          </ComponentCard>

          {/* Input */}
          <ComponentCard title="Input" desc="Animated focus ring">
            <input
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              placeholder="Focus me…"
              style={inputStyle}
            />
          </ComponentCard>

          {/* Slider */}
          <ComponentCard title="Slider" desc="Draggable range"
            extra={<span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)' }}>{sliderVal}</span>}>
            <input
              type="range" min={0} max={100} value={sliderVal}
              onChange={e => setSliderVal(+e.target.value)}
              style={sliderStyle}
            />
          </ComponentCard>

          {/* Tabs */}
          <ComponentCard title="Tabs" desc="">
            <div>
              <div style={{ display: 'flex', gap: 16, borderBottom: '1px solid var(--line)' }}>
                {['Overview', 'Usage', 'A11y'].map((label, i) => (
                  <button key={label} onClick={() => setActiveTab(i)} style={{
                    appearance: 'none', border: 'none', background: 'transparent',
                    cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
                    padding: '8px 2px',
                    color: i === activeTab ? 'var(--fg)' : 'var(--faint)',
                    borderBottom: `2px solid ${i === activeTab ? 'var(--accent)' : 'transparent'}`,
                    transition: 'color .2s, border-color .2s',
                  }}>
                    {label}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 14, fontSize: 13, color: 'var(--muted)', lineHeight: 1.45 }}>
                {TAB_CONTENT[activeTab]}
              </div>
            </div>
          </ComponentCard>

          {/* Badge */}
          <ComponentCard title="Badge" desc="Status indicators">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 99, fontSize: 12, fontWeight: 500, background: 'rgba(34,197,94,.14)', color: '#4ade80' }}>
                <span className="animate-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />Online
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 99, fontSize: 12, fontWeight: 500, background: 'rgba(245,158,11,.14)', color: '#fbbf24' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', display: 'block' }} />Away
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 99, fontSize: 12, fontWeight: 500, background: 'var(--bg-3)', color: 'var(--faint)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--faint)', display: 'block' }} />Offline
              </span>
            </div>
          </ComponentCard>

          {/* Card */}
          <ComponentCard title="Card" desc="Hover lift">
            <motion.div
              whileHover={{ y: -5, boxShadow: 'var(--shadow)', borderColor: 'var(--accent)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ borderRadius: 12, background: 'var(--bg-3)', border: '1px solid var(--line)', padding: 13, cursor: 'pointer' }}>
              <div style={{ fontWeight: 600, fontSize: 13.5 }}>Pro plan</div>
              <div style={{ fontSize: 12, color: 'var(--faint)', marginTop: 2 }}>$19 / month · hover me</div>
            </motion.div>
          </ComponentCard>

          {/* Progress */}
          <ComponentCard title="Progress" desc="Indeterminate loop">
            <div style={{ width: '100%', height: 7, borderRadius: 99, background: 'var(--bg-3)', overflow: 'hidden', position: 'relative' }}>
              <div className="animate-prog" style={{
                position: 'absolute', top: 0, left: 0, height: '100%', width: '38%',
                borderRadius: 99,
                background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
              }} />
            </div>
          </ComponentCard>

          {/* Toast */}
          <ComponentCard title="Toast" desc="Auto-dismiss">
            <button onClick={showToast} style={{
              appearance: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontWeight: 600, fontSize: 13.5, padding: '9px 15px', borderRadius: 10,
              background: 'var(--bg-3)', color: 'var(--fg)', border: '1px solid var(--line-2)',
              transition: 'border-color .2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--line-2)' }}>
              Notify me
            </button>
          </ComponentCard>

          {/* Modal */}
          <ComponentCard title="Modal" desc="Scale + focus trap">
            <button onClick={() => setModalOpen(true)} style={{
              appearance: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontWeight: 600, fontSize: 13.5, padding: '9px 15px', borderRadius: 10,
              background: 'var(--bg-3)', color: 'var(--fg)', border: '1px solid var(--line-2)',
              transition: 'border-color .2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--line-2)' }}>
              Open modal
            </button>
          </ComponentCard>

          {/* Drawer */}
          <ComponentCard title="Drawer" desc="Slide from side">
            <button onClick={() => setDrawerOpen(true)} style={{
              appearance: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontWeight: 600, fontSize: 13.5, padding: '9px 15px', borderRadius: 10,
              background: 'var(--bg-3)', color: 'var(--fg)', border: '1px solid var(--line-2)',
              transition: 'border-color .2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--line-2)' }}>
              Open drawer
            </button>
          </ComponentCard>
        </div>
      </section>

      {/* ── Feature pillars ─────────────────────────────────────── */}
      <section style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1180, margin: '0 auto', padding: '60px 28px',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24,
        borderTop: '1px solid var(--line)',
      }}>
        {[
          {
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="var(--accent)" strokeWidth="2" />
                <circle cx="12" cy="12" r="3.5" fill="var(--accent)" />
              </svg>
            ),
            title: 'Accessible by default',
            desc: 'Keyboard navigable, focus-visible rings, and ARIA wired into every primitive. No retrofitting required.',
          },
          {
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" fill="none" stroke="var(--accent)" strokeWidth="2" />
                <path d="M12 3a9 9 0 0 1 0 18z" fill="var(--accent)" />
              </svg>
            ),
            title: 'Theme-aware tokens',
            desc: 'Every color is a CSS custom property — just retheme the whole page from the switch up top. One line, zero rebuild.',
          },
          {
            icon: (
              <svg width="22" height="22" viewBox="0 0 24 24">
                <ellipse cx="12" cy="12" rx="9" ry="6" fill="none" stroke="var(--accent)" strokeWidth="2" />
                <circle cx="12" cy="12" r="2.5" fill="var(--accent)" />
              </svg>
            ),
            title: 'Spring physics',
            desc: 'Framer Motion under the hood. Nothing eases linearly — taps squash, toggles settle, modals overshoot just enough.',
          },
        ].map(({ icon, title, desc }) => (
          <div key={title}>
            <div style={{
              width: 42, height: 42, borderRadius: 12, background: 'var(--accent-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
            }}>
              {icon}
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, margin: '0 0 8px' }}>
              {title}
            </h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--muted)', margin: 0 }}>{desc}</p>
          </div>
        ))}
      </section>

      {/* ── Install section ─────────────────────────────────────── */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto', padding: '30px 28px 90px' }}>
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>
            // install
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px,3.2vw,36px)', letterSpacing: '-.02em', margin: 0 }}>
            Two minutes to your first spring
          </h2>
        </div>

        <div style={{ borderRadius: 16, background: 'var(--bg-2)', border: '1px solid var(--line-2)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
          {/* Tab bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--line-2)', display: 'block' }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 3, padding: 3, borderRadius: 9, background: 'var(--bg-3)' }}>
              {installPkgs.map((pkg, i) => (
                <button key={pkg} onClick={() => setInstallTab(i)} style={{
                  appearance: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
                  padding: '6px 12px', borderRadius: 7, transition: 'all .2s',
                  background: i === installTab ? 'var(--bg-2)' : 'transparent',
                  color: i === installTab ? 'var(--fg)' : 'var(--faint)',
                  boxShadow: i === installTab ? '0 1px 4px rgba(0,0,0,.2)' : 'none',
                }}>
                  {pkg}
                </button>
              ))}
            </div>
          </div>

          {/* Code */}
          <div style={{ padding: 20, fontFamily: 'var(--font-mono)', fontSize: 14 }}>
            <div style={{ color: 'var(--muted)' }}>
              <span style={{ color: 'var(--accent)' }}>$</span>{' '}
              {INSTALL_CMDS[installPkgs[installTab]]}
              <span className="animate-caret" style={{
                display: 'inline-block', width: 8, height: 16,
                background: 'var(--accent)', marginLeft: 5, verticalAlign: -3,
              }} />
            </div>
            <div style={{ height: 1, background: 'var(--line)', margin: '18px 0' }} />
            <div style={{ lineHeight: 1.7 }}>
              <span style={{ color: 'var(--accent)' }}>import</span>{' '}
              <span style={{ color: 'var(--fg)' }}>{'{ Button, Switch, Modal }'}</span>{' '}
              <span style={{ color: 'var(--accent)' }}>from</span>{' '}
              <span style={{ color: 'var(--accent-2)' }}>&apos;motionkit&apos;</span>
            </div>
            <div style={{ lineHeight: 1.7, color: 'var(--faint)' }}>
              {'// that\'s it — every component is spring-loaded'}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer style={{ position: 'relative', zIndex: 1, borderTop: '1px solid var(--line)' }}>
        <div style={{
          maxWidth: 1180, margin: '0 auto', padding: '24px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg, var(--accent), var(--accent-2))' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14 }}>MotionKit</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--faint)' }}>
              MIT licensed · built with Framer Motion
            </span>
            <a href="https://portfolio-ykessel.vercel.app" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', textDecoration: 'none' }}>
              Yan Kessel ↗
            </a>
          </div>
        </div>
      </footer>

      {/* ── Modal overlay ──────────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
            }}>
            <motion.div
              initial={{ opacity: 0, scale: .96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: .96, y: 18 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '100%', maxWidth: 430,
                background: 'var(--bg-2)', border: '1px solid var(--line-2)',
                borderRadius: 20, padding: 28, boxShadow: 'var(--shadow)',
              }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <div style={{ width: 14, height: 14, background: 'var(--accent)', transform: 'rotate(45deg)', borderRadius: 3 }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, margin: '0 0 10px', letterSpacing: '-.01em' }}>
                16 components, one import
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--muted)', margin: '0 0 24px' }}>
                This modal traps focus, closes on Escape or backdrop click, and scales in with a spring. Same physics you'd ship.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <motion.button whileTap={{ scale: .95 }} onClick={() => setModalOpen(false)} style={{
                  appearance: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  fontWeight: 600, fontSize: 14, padding: '11px 18px', borderRadius: 11,
                  background: 'var(--bg-3)', color: 'var(--fg)', border: '1px solid var(--line-2)',
                }}>
                  Cancel
                </motion.button>
                <motion.button whileTap={{ scale: .95 }} onClick={() => setModalOpen(false)} style={{
                  appearance: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  fontWeight: 600, fontSize: 14, padding: '11px 18px', borderRadius: 11,
                  background: 'var(--accent)', color: 'var(--accent-fg)',
                  boxShadow: '0 10px 24px -10px var(--accent-glow)',
                }}>
                  Get started →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Drawer overlay ─────────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(3px)',
            }}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'fixed', top: 0, right: 0, height: '100%', width: 344,
                background: 'var(--bg-2)', borderLeft: '1px solid var(--line-2)',
                boxShadow: 'var(--shadow)', padding: 26, display: 'flex', flexDirection: 'column',
              }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>Source</span>
                <motion.button whileTap={{ scale: .9 }} onClick={() => setDrawerOpen(false)} style={{
                  appearance: 'none', cursor: 'pointer', width: 32, height: 32, borderRadius: 9,
                  background: 'var(--bg-3)', border: '1px solid var(--line)', color: 'var(--muted)',
                  fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  ×
                </motion.button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {['src/Button.tsx', 'src/Switch.tsx', 'src/Modal.tsx', 'src/tokens.css'].map(f => (
                  <div key={f} style={{ padding: 13, borderRadius: 11, background: 'var(--bg-3)', border: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)' }}>
                    {f}
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 'auto', fontSize: 13, color: 'var(--faint)', lineHeight: 1.5 }}>
                Drawers slide from any side, trap focus, and dismiss on backdrop click — all with spring easing.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toast ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: .96, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 14, scale: .96, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            style={{
              position: 'fixed', bottom: 28, left: '50%', zIndex: 120,
              background: 'var(--bg-2)', border: '1px solid var(--line-2)',
              borderRadius: 13, padding: '13px 18px', boxShadow: 'var(--shadow)',
              display: 'flex', alignItems: 'center', gap: 11, whiteSpace: 'nowrap',
            }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'block' }} />
            <span style={{ fontSize: 14, fontWeight: 500 }}>Saved to your workspace</span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 880px) {
          .responsive-hero { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  )
}

/* ─── ComponentCard ───────────────────────────────────────── */
function ComponentCard({
  title, desc, extra, children,
}: {
  title: string
  desc: string
  extra?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <motion.div
      whileHover={{ y: -3, borderColor: 'var(--line-2)', boxShadow: 'var(--shadow)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      style={{
        display: 'flex', flexDirection: 'column', padding: 18, borderRadius: 16,
        background: 'var(--bg-2)', border: '1px solid var(--line)', minHeight: 160,
      }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15 }}>{title}</div>
          {desc && <div style={{ fontSize: 12.5, color: 'var(--faint)', marginTop: 2 }}>{desc}</div>}
        </div>
        {extra}
      </div>
      <div style={{ marginTop: 'auto', paddingTop: 16 }}>{children}</div>
    </motion.div>
  )
}
