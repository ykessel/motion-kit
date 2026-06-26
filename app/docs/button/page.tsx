'use client'

import { Button } from '@/src/components/Button/Button'
import { Trash2, Plus, ArrowRight } from 'lucide-react'
import { DocHeading, DocSection, Preview, PropTable } from '@/components/docs/DocComponents'

export default function ButtonPage() {
  return (
    <div>
      <DocHeading title="Button" description="Animated pressable button with multiple variants, sizes, and loading state." />

      <DocSection title="Variants">
        <Preview code={`<Button variant="solid">Solid</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}>
          <Button variant="solid">Solid</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </Preview>
      </DocSection>

      <DocSection title="Sizes">
        <Preview code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Preview>
      </DocSection>

      <DocSection title="With icons">
        <Preview code={`<Button leftIcon={<Plus size={14} />}>Add item</Button>
<Button variant="outline" rightIcon={<ArrowRight size={14} />}>Continue</Button>
<Button variant="danger" leftIcon={<Trash2 size={14} />}>Delete</Button>`}>
          <Button leftIcon={<Plus size={14} />}>Add item</Button>
          <Button variant="outline" rightIcon={<ArrowRight size={14} />}>Continue</Button>
          <Button variant="danger" leftIcon={<Trash2 size={14} />}>Delete</Button>
        </Preview>
      </DocSection>

      <DocSection title="States">
        <Preview code={`<Button loading>Saving...</Button>
<Button disabled>Disabled</Button>`}>
          <Button loading>Saving...</Button>
          <Button disabled>Disabled</Button>
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropTable rows={[
          { name: 'variant',   type: "'solid' | 'outline' | 'ghost' | 'danger'", default: "'solid'",   description: 'Visual style of the button.' },
          { name: 'size',      type: "'sm' | 'md' | 'lg'",                       default: "'md'",      description: 'Controls height and padding.' },
          { name: 'loading',   type: 'boolean',                                  default: 'false',     description: 'Shows spinner and disables interaction.' },
          { name: 'leftIcon',  type: 'ReactNode',                                default: '—',         description: 'Icon rendered before children.' },
          { name: 'rightIcon', type: 'ReactNode',                                default: '—',         description: 'Icon rendered after children. Hidden when loading.' },
          { name: 'disabled',  type: 'boolean',                                  default: 'false',     description: 'Disables the button.' },
        ]} />
      </DocSection>
    </div>
  )
}
