'use client'

import { Badge } from '@/src/components/Badge/Badge'
import { DocHeading, DocSection, Preview, PropTable } from '@/components/docs/DocComponents'

export default function BadgePage() {
  return (
    <div>
      <DocHeading title="Badge" description="Small status indicators that animate in with a spring scale." />

      <DocSection title="Variants">
        <Preview code={`<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="outline">Outline</Badge>`}>
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="outline">Outline</Badge>
        </Preview>
      </DocSection>

      <DocSection title="With dot">
        <Preview code={`<Badge variant="success" dot>Online</Badge>
<Badge variant="warning" dot>Pending</Badge>
<Badge variant="danger" dot>Offline</Badge>`}>
          <Badge variant="success" dot>Online</Badge>
          <Badge variant="warning" dot>Pending</Badge>
          <Badge variant="danger" dot>Offline</Badge>
        </Preview>
      </DocSection>

      <DocSection title="Sizes">
        <Preview code={`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>`}>
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropTable rows={[
          { name: 'variant',  type: "'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline'", default: "'default'", description: 'Color scheme.' },
          { name: 'size',     type: "'sm' | 'md'",  default: "'md'",   description: 'Text and padding size.' },
          { name: 'dot',      type: 'boolean',       default: 'false',  description: 'Shows a colored status dot before the label.' },
          { name: 'children', type: 'ReactNode',     required: true,    description: 'Badge label.' },
        ]} />
      </DocSection>
    </div>
  )
}
