'use client'

import { useState } from 'react'
import { Drawer } from '@/src/components/Drawer/Drawer'
import { Button } from '@/src/components/Button/Button'
import { DocHeading, DocSection, Preview, PropTable } from '@/components/docs/DocComponents'

type Side = 'right' | 'left' | 'bottom'

export default function DrawerPage() {
  const [side, setSide] = useState<Side>('right')
  const [open, setOpen] = useState(false)

  function openSide(s: Side) { setSide(s); setOpen(true) }

  return (
    <div>
      <DocHeading title="Drawer" description="Slides in from any side. Focus trapped, Escape to close." />

      <DocSection title="Sides">
        <Preview code={`<Drawer open={open} onClose={() => setOpen(false)} side="right" title="Settings">
  {/* content */}
</Drawer>`}>
          <Button onClick={() => openSide('right')}>Open right</Button>
          <Button variant="outline" onClick={() => openSide('left')}>Open left</Button>
          <Button variant="outline" onClick={() => openSide('bottom')}>Open bottom</Button>
          <Drawer open={open} onClose={() => setOpen(false)} side={side} title="Settings" footer={
            <Button size="sm" onClick={() => setOpen(false)}>Done</Button>
          }>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Notifications', 'Privacy', 'Appearance', 'Language', 'Advanced'].map(item => (
                <div key={item} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 14, color: 'var(--text-secondary)' }}>
                  {item}
                </div>
              ))}
            </div>
          </Drawer>
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropTable rows={[
          { name: 'open',    type: 'boolean',                             required: true,  description: 'Controls visibility.' },
          { name: 'onClose', type: '() => void',                         required: true,  description: 'Called on Escape or backdrop click.' },
          { name: 'side',    type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'", description: 'Which edge the drawer slides from.' },
          { name: 'title',   type: 'string',                              default: '—',    description: 'Header title.' },
          { name: 'size',    type: 'string',                              default: "'360px'", description: 'Width (horizontal) or height (vertical). Any CSS value.' },
          { name: 'footer',  type: 'ReactNode',                           default: '—',    description: 'Rendered in sticky footer.' },
        ]} />
      </DocSection>
    </div>
  )
}
