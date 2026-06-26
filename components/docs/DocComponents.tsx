'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

// ── Page heading ──────────────────────────────────────────────
export function DocHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h1 style={{ fontWeight: 700, fontSize: 30, letterSpacing: '-.03em', color: 'var(--text-primary)', marginBottom: 8 }}>
        {title}
      </h1>
      {description && (
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: 560 }}>
          {description}
        </p>
      )}
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────
export function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ fontWeight: 600, fontSize: 16, color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '-.01em' }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

// ── Live preview box ──────────────────────────────────────────
export function Preview({
  label,
  children,
  code,
  center = true,
}: {
  label?: string
  children: React.ReactNode
  code?: string
  center?: boolean
}) {
  const [copied, setCopied] = useState(false)
  const [showCode, setShowCode] = useState(false)

  async function copy() {
    if (!code) return
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ marginBottom: 24 }}>
      {label && (
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10 }}>
          {label}
        </p>
      )}
      {/* Preview area */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '32px 24px',
        display: 'flex',
        alignItems: center ? 'center' : 'flex-start',
        justifyContent: center ? 'center' : 'flex-start',
        flexWrap: 'wrap',
        gap: 12,
        minHeight: 100,
      }}>
        {children}
      </div>

      {/* Code toggle */}
      {code && (
        <div style={{ marginTop: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface-2)', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', borderBottom: showCode ? 'none' : '1px solid var(--border)', borderTop: '1px solid var(--border-strong)', padding: '6px 12px', borderRadius: showCode ? '0' : '0 0 var(--radius-lg) var(--radius-lg)' }}>
            <button
              onClick={() => setShowCode(v => !v)}
              style={{ fontSize: 12, color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none', padding: 0, fontFamily: 'var(--font-mono)' }}
            >
              {showCode ? '▾ Hide code' : '▸ Show code'}
            </button>
            <button
              onClick={copy}
              style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: copied ? 'var(--success)' : 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          {showCode && (
            <pre style={{ margin: 0, borderRadius: '0 0 var(--radius-lg) var(--radius-lg)', borderTop: 'none', background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-secondary)' }}>
                {code}
              </code>
            </pre>
          )}
        </div>
      )}
    </div>
  )
}

// ── Props table ───────────────────────────────────────────────
export interface PropRow {
  name:     string
  type:     string
  default?: string
  required?: boolean
  description: string
}

export function PropTable({ rows }: { rows: PropRow[] }) {
  return (
    <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', marginTop: 4 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            {['Prop', 'Type', 'Default', 'Description'].map(h => (
              <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', whiteSpace: 'nowrap' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.name} style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '10px 16px', whiteSpace: 'nowrap' }}>
                <code style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                  {row.name}{row.required && <span style={{ color: 'var(--danger)' }}> *</span>}
                </code>
              </td>
              <td style={{ padding: '10px 16px', whiteSpace: 'nowrap' }}>
                <code style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  {row.type}
                </code>
              </td>
              <td style={{ padding: '10px 16px', color: 'var(--text-muted)', fontSize: 12, whiteSpace: 'nowrap' }}>
                {row.default ?? '—'}
              </td>
              <td style={{ padding: '10px 16px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
