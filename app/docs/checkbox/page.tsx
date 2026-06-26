'use client'

import { useState } from 'react'
import { Checkbox } from '@/src/components/Checkbox/Checkbox'
import { DocHeading, DocSection, Preview, PropTable } from '@/components/docs/DocComponents'

export default function CheckboxPage() {
  const [checked, setChecked] = useState(false)
  const [all, setAll] = useState(false)

  return (
    <div>
      <DocHeading title="Checkbox" description="Animated checkmark with spring physics. Supports indeterminate state." />

      <DocSection title="Basic">
        <Preview code={`<Checkbox label="Accept terms" checked={checked} onChange={e => setChecked(e.target.checked)} />`}>
          <Checkbox label="Accept terms and conditions" checked={checked} onChange={e => setChecked(e.target.checked)} />
        </Preview>
      </DocSection>

      <DocSection title="With description">
        <Preview code={`<Checkbox label="Marketing emails" description="Receive updates about new features." />`}>
          <Checkbox
            label="Marketing emails"
            description="Receive updates about new features and promotions."
          />
        </Preview>
      </DocSection>

      <DocSection title="Indeterminate">
        <Preview code={`<Checkbox indeterminate label="Select all" />`}>
          <Checkbox indeterminate label="Select all (3 of 5 selected)" />
        </Preview>
      </DocSection>

      <DocSection title="Disabled">
        <Preview code={`<Checkbox disabled label="Disabled unchecked" />
<Checkbox disabled checked label="Disabled checked" />`}>
          <Checkbox disabled label="Disabled unchecked" />
          <Checkbox disabled checked label="Disabled checked" />
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropTable rows={[
          { name: 'label',         type: 'string',  default: '—',    description: 'Clickable label text.' },
          { name: 'description',   type: 'string',  default: '—',    description: 'Secondary helper text below the label.' },
          { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Shows a minus icon instead of a checkmark.' },
          { name: 'checked',       type: 'boolean', default: '—',    description: 'Controlled checked state.' },
          { name: 'disabled',      type: 'boolean', default: 'false', description: 'Disables the checkbox.' },
        ]} />
      </DocSection>
    </div>
  )
}
