'use client'

import { Tabs } from '@/src/components/Tabs/Tabs'
import { DocHeading, DocSection, Preview, PropTable } from '@/components/docs/DocComponents'

const TABS = [
  { id: 'overview', label: 'Overview', content: <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Overview content. The indicator slides smoothly between tabs using Framer Motion's layoutId.</p> },
  { id: 'analytics', label: 'Analytics', content: <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Analytics content. Each panel fades in independently.</p> },
  { id: 'settings', label: 'Settings', content: <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Settings content. Arrow keys navigate between tabs.</p> },
  { id: 'billing', label: 'Billing', disabled: true, content: null },
]

export default function TabsPage() {
  return (
    <div>
      <DocHeading title="Tabs" description="Sliding indicator, keyboard navigation (arrow keys), and fade-in panel animation." />

      <DocSection title="Line variant">
        <Preview center={false} code={`<Tabs items={tabs} variant="line" />`}>
          <div style={{ width: '100%' }}>
            <Tabs items={TABS} variant="line" />
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Pill variant">
        <Preview center={false} code={`<Tabs items={tabs} variant="pill" />`}>
          <div style={{ width: '100%' }}>
            <Tabs items={TABS} variant="pill" />
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropTable rows={[
          { name: 'items',      type: 'TabItem[]',       required: true,  description: 'Array of { id, label, content, disabled? }.' },
          { name: 'variant',    type: "'line' | 'pill'", default: "'line'", description: 'Visual style of the tab bar.' },
          { name: 'defaultTab', type: 'string',           default: 'first item', description: 'ID of the initially active tab.' },
          { name: 'onChange',   type: '(id: string) => void', default: '—', description: 'Called when active tab changes.' },
        ]} />
      </DocSection>
    </div>
  )
}
