'use client'

import { useState } from 'react'
import { Modal } from '@/src/components/Modal/Modal'
import { Button } from '@/src/components/Button/Button'
import { DocHeading, DocSection, Preview, PropTable } from '@/components/docs/DocComponents'

export default function ModalPage() {
  const [open, setOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <div>
      <DocHeading title="Modal" description="Scales in with spring animation. Focus trapped, Escape to close, backdrop click to dismiss." />

      <DocSection title="Basic">
        <Preview code={`<Button onClick={() => setOpen(true)}>Open modal</Button>
<Modal open={open} onClose={() => setOpen(false)} title="Edit profile">
  <p>Modal content goes here.</p>
</Modal>`}>
          <Button onClick={() => setOpen(true)}>Open modal</Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Edit profile"
            footer={
              <>
                <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
                <Button size="sm" onClick={() => setOpen(false)}>Save changes</Button>
              </>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                Update your profile information below.
              </p>
            </div>
          </Modal>
        </Preview>
      </DocSection>

      <DocSection title="Confirmation dialog">
        <Preview code={`<Modal open={open} onClose={() => setOpen(false)} title="Delete project?" size="sm">
  <p>This action cannot be undone.</p>
</Modal>`}>
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>Delete project</Button>
          <Modal
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            title="Delete project?"
            size="sm"
            footer={
              <>
                <Button variant="ghost" size="sm" onClick={() => setConfirmOpen(false)}>Cancel</Button>
                <Button variant="danger" size="sm" onClick={() => setConfirmOpen(false)}>Delete</Button>
              </>
            }
          >
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
              This will permanently delete the project and all its data. This action cannot be undone.
            </p>
          </Modal>
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropTable rows={[
          { name: 'open',            type: 'boolean',                               required: true,  description: 'Controls visibility.' },
          { name: 'onClose',         type: '() => void',                            required: true,  description: 'Called on Escape key or backdrop click.' },
          { name: 'title',           type: 'string',                                default: '—',    description: 'Renders a header with title and close button.' },
          { name: 'size',            type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",  default: "'md'", description: 'Controls max-width of the dialog.' },
          { name: 'closeOnOverlay',  type: 'boolean',                               default: 'true', description: 'Dismiss when clicking the backdrop.' },
          { name: 'footer',          type: 'ReactNode',                             default: '—',    description: 'Rendered in the footer section.' },
        ]} />
      </DocSection>
    </div>
  )
}
