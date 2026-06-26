'use client'

import { DocHeading, DocSection, PropTable } from '@/components/docs/DocComponents'

export default function GettingStartedPage() {
  return (
    <div>
      <DocHeading
        title="Getting Started"
        description="A collection of 16 accessible, animated React components built with Framer Motion and TypeScript."
      />

      <DocSection title="Installation">
        <pre><code>{`npm install framer-motion lucide-react clsx`}</code></pre>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 12 }}>
          Components live in <code>src/components/</code> — copy what you need directly into your project.
        </p>
      </DocSection>

      <DocSection title="Theme">
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          All components use CSS custom properties from <code>globals.css</code>. Add <code>html.light</code> to
          toggle the light theme. No Tailwind required at runtime — tokens handle everything.
        </p>
        <pre><code>{`/* globals.css */
:root {
  --accent: #6366F1;
  --surface: #111118;
  /* ... */
}
html.light {
  --surface: #FFFFFF;
  /* ... */
}`}</code></pre>
      </DocSection>

      <DocSection title="Components">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
          {[
            'Button', 'Badge', 'Card', 'Input', 'Checkbox', 'Switch',
            'Modal', 'Drawer', 'Toast', 'Tooltip', 'Dropdown',
            'Accordion', 'Tabs', 'Progress', 'Skeleton', 'Alert',
          ].map(name => (
            <a
              key={name}
              href={`/docs/${name.toLowerCase()}`}
              style={{
                padding: '12px 14px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                display: 'block',
                transition: 'border-color .15s, background .15s',
              }}
              onMouseEnter={e => {
                const t = e.currentTarget
                t.style.borderColor = 'var(--accent-border)'
                t.style.background = 'var(--accent-subtle)'
              }}
              onMouseLeave={e => {
                const t = e.currentTarget
                t.style.borderColor = 'var(--border)'
                t.style.background = 'var(--surface)'
              }}
            >
              {name}
            </a>
          ))}
        </div>
      </DocSection>
    </div>
  )
}
