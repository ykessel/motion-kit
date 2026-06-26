'use client'

import { useState } from 'react'
import { Switch } from '@/src/components/Switch/Switch'
import { DocHeading, DocSection, Preview, PropTable } from '@/components/docs/DocComponents'

export default function SwitchPage() {
  const [on, setOn] = useState(true)

  return (
    <div>
      <DocHeading title="Switch" description="Smooth spring-animated toggle. Accessible role='switch'." />

      <DocSection title="Sizes">
        <Preview code={`<Switch size="sm" label="Small" checked={on} onChange={e => setOn(e.target.checked)} />
<Switch size="md" label="Medium" checked={on} onChange={e => setOn(e.target.checked)} />
<Switch size="lg" label="Large" checked={on} onChange={e => setOn(e.target.checked)} />`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Switch size="sm" label="Small" checked={on} onChange={e => setOn(e.target.checked)} />
            <Switch size="md" label="Medium" checked={on} onChange={e => setOn(e.target.checked)} />
            <Switch size="lg" label="Large" checked={on} onChange={e => setOn(e.target.checked)} />
          </div>
        </Preview>
      </DocSection>

      <DocSection title="With description">
        <Preview code={`<Switch label="Dark mode" description="Switch between light and dark theme." />`}>
          <Switch label="Dark mode" description="Switch between light and dark theme." checked={on} onChange={e => setOn(e.target.checked)} />
        </Preview>
      </DocSection>

      <DocSection title="Disabled">
        <Preview code={`<Switch disabled label="Disabled off" />
<Switch disabled checked label="Disabled on" />`}>
          <Switch disabled label="Disabled off" />
          <Switch disabled checked label="Disabled on" />
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropTable rows={[
          { name: 'size',        type: "'sm' | 'md' | 'lg'", default: "'md'",  description: 'Track and thumb size.' },
          { name: 'label',       type: 'string',              default: '—',     description: 'Clickable label.' },
          { name: 'description', type: 'string',              default: '—',     description: 'Helper text below label.' },
          { name: 'checked',     type: 'boolean',             default: '—',     description: 'Controlled on/off state.' },
          { name: 'disabled',    type: 'boolean',             default: 'false', description: 'Disables the switch.' },
        ]} />
      </DocSection>
    </div>
  )
}
