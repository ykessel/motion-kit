'use client'

import { useToast } from '@/src/components/Toast/Toast'
import { Button } from '@/src/components/Button/Button'
import { DocHeading, DocSection, Preview, PropTable } from '@/components/docs/DocComponents'

function ToastDemo() {
  const { toast } = useToast()
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Button size="sm" onClick={() => toast({ type: 'success', title: 'Saved!', message: 'Your changes have been saved.' })}>
        Success
      </Button>
      <Button size="sm" variant="danger" onClick={() => toast({ type: 'error', title: 'Error', message: 'Something went wrong.' })}>
        Error
      </Button>
      <Button size="sm" variant="outline" onClick={() => toast({ type: 'warning', title: 'Warning', message: 'Storage almost full.' })}>
        Warning
      </Button>
      <Button size="sm" variant="outline" onClick={() => toast({ type: 'info', title: 'Info', message: 'New version available.' })}>
        Info
      </Button>
      <Button size="sm" variant="ghost" onClick={() => toast('Simple message')}>
        Default
      </Button>
    </div>
  )
}

export default function ToastPage() {
  return (
    <div>
      <DocHeading title="Toast" description="Notification stack with slide-in animation and auto-dismiss. Requires ToastProvider in your layout." />

      <DocSection title="Interactive demo">
        <Preview code={`// In layout.tsx
<ToastProvider>{children}</ToastProvider>

// In any component
const { toast } = useToast()
toast({ type: 'success', title: 'Saved!', message: 'Your changes were saved.' })
toast('Simple message')  // shorthand`}>
          <ToastDemo />
        </Preview>
      </DocSection>

      <DocSection title="Props — toast()">
        <PropTable rows={[
          { name: 'type',     type: "'success' | 'error' | 'warning' | 'info' | 'default'", default: "'default'", description: 'Icon and left border color.' },
          { name: 'title',    type: 'string',  required: true,  description: 'Main toast message.' },
          { name: 'message',  type: 'string',  default: '—',    description: 'Optional secondary line.' },
          { name: 'duration', type: 'number',  default: '4000', description: 'Auto-dismiss delay in ms.' },
        ]} />
      </DocSection>
    </div>
  )
}
