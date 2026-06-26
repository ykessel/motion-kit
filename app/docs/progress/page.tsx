'use client'

import { useState, useEffect } from 'react'
import { Progress } from '@/src/components/Progress/Progress'
import { Button } from '@/src/components/Button/Button'
import { DocHeading, DocSection, Preview, PropTable } from '@/components/docs/DocComponents'

function AnimatedDemo() {
  const [value, setValue] = useState(30)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 400 }}>
      <Progress value={value} showValue label="Upload progress" />
      <div style={{ display: 'flex', gap: 8 }}>
        <Button size="sm" variant="outline" onClick={() => setValue(v => Math.max(0, v - 20))}>-20</Button>
        <Button size="sm" onClick={() => setValue(v => Math.min(100, v + 20))}>+20</Button>
      </div>
    </div>
  )
}

export default function ProgressPage() {
  return (
    <div>
      <DocHeading title="Progress" description="Spring-animated fill bar. Supports determinate, indeterminate, and colored variants." />

      <DocSection title="Variants">
        <Preview center={false} code={`<Progress value={75} label="Default" />
<Progress value={60} variant="success" label="Success" showValue />
<Progress value={45} variant="warning" label="Warning" showValue />
<Progress value={25} variant="danger" label="Danger" showValue />`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 400 }}>
            <Progress value={75} label="Default" />
            <Progress value={60} variant="success" label="Success" showValue />
            <Progress value={45} variant="warning" label="Warning" showValue />
            <Progress value={25} variant="danger" label="Danger" showValue />
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Indeterminate">
        <Preview center={false} code={`<Progress variant="indeterminate" label="Loading..." />`}>
          <div style={{ width: '100%', maxWidth: 400 }}>
            <Progress variant="indeterminate" label="Loading..." />
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Sizes">
        <Preview center={false} code={`<Progress value={60} size="sm" />
<Progress value={60} size="md" />
<Progress value={60} size="lg" />`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 400 }}>
            <Progress value={60} size="sm" />
            <Progress value={60} size="md" />
            <Progress value={60} size="lg" />
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Animated">
        <Preview center={false}>
          <AnimatedDemo />
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropTable rows={[
          { name: 'value',     type: 'number',                                              default: '—',     description: '0–100. Omit for indeterminate.' },
          { name: 'variant',   type: "'default' | 'success' | 'warning' | 'danger' | 'indeterminate'", default: "'default'", description: 'Color and behavior.' },
          { name: 'size',      type: "'sm' | 'md' | 'lg'",                                  default: "'md'",  description: 'Track height.' },
          { name: 'label',     type: 'string',                                               default: '—',     description: 'Accessible label rendered above the bar.' },
          { name: 'showValue', type: 'boolean',                                              default: 'false', description: 'Shows percentage on the right.' },
        ]} />
      </DocSection>
    </div>
  )
}
