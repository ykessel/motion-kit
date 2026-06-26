'use client'

import { useState } from 'react'
import { Input } from '@/src/components/Input/Input'
import { Search, Mail, Eye, EyeOff } from 'lucide-react'
import { DocHeading, DocSection, Preview, PropTable } from '@/components/docs/DocComponents'

export default function InputPage() {
  const [showPass, setShowPass] = useState(false)

  return (
    <div>
      <DocHeading title="Input" description="Animated focus ring with label, hint, and error states." />

      <DocSection title="Basic">
        <Preview center={false} code={`<Input label="Email" placeholder="you@example.com" type="email" />`}>
          <div style={{ width: 320 }}>
            <Input label="Email" placeholder="you@example.com" type="email" />
          </div>
        </Preview>
      </DocSection>

      <DocSection title="With icons">
        <Preview center={false} code={`<Input placeholder="Search..." leftIcon={<Search size={14} />} />
<Input label="Email" type="email" leftIcon={<Mail size={14} />} />`}>
          <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Input placeholder="Search..." leftIcon={<Search size={14} />} />
            <Input label="Email" type="email" leftIcon={<Mail size={14} />} />
          </div>
        </Preview>
      </DocSection>

      <DocSection title="States">
        <Preview center={false} code={`<Input label="Username" hint="Only letters and numbers" />
<Input label="Password" error="Password must be at least 8 characters" />`}>
          <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="Username" hint="Only letters and numbers" />
            <Input label="Password" error="Password must be at least 8 characters" />
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropTable rows={[
          { name: 'label',     type: 'string',    default: '—',     description: 'Renders an associated <label> above the input.' },
          { name: 'error',     type: 'string',    default: '—',     description: 'Error message shown below. Adds red ring.' },
          { name: 'hint',      type: 'string',    default: '—',     description: 'Helper text shown below (hidden when error is set).' },
          { name: 'leftIcon',  type: 'ReactNode', default: '—',     description: 'Icon on the left inside the input.' },
          { name: 'rightIcon', type: 'ReactNode', default: '—',     description: 'Icon on the right inside the input.' },
        ]} />
      </DocSection>
    </div>
  )
}
