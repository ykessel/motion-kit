'use client'

import { Accordion } from '@/src/components/Accordion/Accordion'
import { DocHeading, DocSection, Preview, PropTable } from '@/components/docs/DocComponents'

const ITEMS = [
  {
    id: '1',
    trigger: 'What is MotionKit?',
    content: 'MotionKit is a collection of accessible, animated React components built with Framer Motion and TypeScript.',
  },
  {
    id: '2',
    trigger: 'Do I need to install any peer dependencies?',
    content: 'Yes — you need framer-motion, lucide-react, and clsx. Everything else is standard React.',
  },
  {
    id: '3',
    trigger: 'Can I use it with Tailwind CSS?',
    content: 'Absolutely. Components use CSS custom properties for theming and accept className for Tailwind overrides.',
  },
]

export default function AccordionPage() {
  return (
    <div>
      <DocHeading title="Accordion" description="Height-animated panels with spring chevron rotation. Supports single or multiple open items." />

      <DocSection title="Single open">
        <Preview center={false} code={`<Accordion items={items} />`}>
          <div style={{ width: '100%', maxWidth: 540 }}>
            <Accordion items={ITEMS} defaultOpen={['1']} />
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Multiple open">
        <Preview center={false} code={`<Accordion items={items} multiple />`}>
          <div style={{ width: '100%', maxWidth: 540 }}>
            <Accordion items={ITEMS} multiple defaultOpen={['1', '2']} />
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropTable rows={[
          { name: 'items',       type: 'AccordionItem[]', required: true,  description: 'Array of { id, trigger, content }.' },
          { name: 'multiple',    type: 'boolean',          default: 'false', description: 'Allow multiple panels open simultaneously.' },
          { name: 'defaultOpen', type: 'string[]',         default: '[]',    description: 'IDs of panels open on first render.' },
        ]} />
      </DocSection>
    </div>
  )
}
