'use client'

import { Alert } from '@/src/components/Alert/Alert'
import { DocHeading, DocSection, Preview, PropTable } from '@/components/docs/DocComponents'

export default function AlertPage() {
  return (
    <div>
      <DocHeading title="Alert" description="Inline status banner with animated icon. Optionally dismissible." />

      <DocSection title="Variants">
        <Preview center={false} code={`<Alert variant="success" title="Payment successful">Your order has been confirmed.</Alert>
<Alert variant="error" title="Connection failed">Could not reach the server.</Alert>
<Alert variant="warning" title="Storage almost full">You're using 90% of your limit.</Alert>
<Alert variant="info" title="Update available">A new version is ready to install.</Alert>`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <Alert variant="success" title="Payment successful">Your order has been confirmed and will ship in 2–3 days.</Alert>
            <Alert variant="error" title="Connection failed">Could not reach the server. Check your network and try again.</Alert>
            <Alert variant="warning" title="Storage almost full">You're using 90% of your storage limit.</Alert>
            <Alert variant="info" title="Update available">A new version of the app is ready to install.</Alert>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Dismissible">
        <Preview center={false} code={`<Alert variant="info" title="Tip" dismissible>You can press Escape to close any overlay.</Alert>`}>
          <div style={{ width: '100%' }}>
            <Alert variant="info" title="Tip" dismissible>
              You can press Escape to close any overlay component.
            </Alert>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Without title">
        <Preview center={false} code={`<Alert variant="warning">Your session expires in 5 minutes.</Alert>`}>
          <div style={{ width: '100%' }}>
            <Alert variant="warning">Your session expires in 5 minutes.</Alert>
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropTable rows={[
          { name: 'variant',     type: "'success' | 'error' | 'warning' | 'info'", required: true,  description: 'Color and icon.' },
          { name: 'title',       type: 'string',    default: '—',     description: 'Bold heading above the content.' },
          { name: 'children',    type: 'ReactNode', required: true,   description: 'Alert body content.' },
          { name: 'dismissible', type: 'boolean',   default: 'false', description: 'Shows an ✕ button to collapse the alert.' },
          { name: 'onDismiss',   type: '() => void', default: '—',    description: 'Called after the dismiss animation completes.' },
          { name: 'icon',        type: 'ReactNode', default: '—',     description: 'Override the default variant icon.' },
        ]} />
      </DocSection>
    </div>
  )
}
