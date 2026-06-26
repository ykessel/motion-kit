'use client'

import { Card, CardHeader, CardTitle, CardBody, CardFooter } from '@/src/components/Card/Card'
import { Button } from '@/src/components/Button/Button'
import { Badge } from '@/src/components/Badge/Badge'
import { DocHeading, DocSection, Preview, PropTable } from '@/components/docs/DocComponents'

export default function CardPage() {
  return (
    <div>
      <DocHeading title="Card" description="Surface container with optional hover lift animation." />

      <DocSection title="Basic">
        <Preview code={`<Card padding="md">
  <CardHeader>
    <CardTitle>Project Alpha</CardTitle>
    <Badge variant="success" dot>Active</Badge>
  </CardHeader>
  <CardBody>A short description of the project goes here.</CardBody>
  <CardFooter>
    <Button size="sm" variant="outline">View</Button>
    <Button size="sm">Open</Button>
  </CardFooter>
</Card>`} center={false}>
          <Card padding="md" style={{ width: 280 }}>
            <CardHeader>
              <CardTitle>Project Alpha</CardTitle>
              <Badge variant="success" dot>Active</Badge>
            </CardHeader>
            <CardBody>A short description of the project goes here.</CardBody>
            <CardFooter>
              <Button size="sm" variant="outline">View</Button>
              <Button size="sm">Open</Button>
            </CardFooter>
          </Card>
        </Preview>
      </DocSection>

      <DocSection title="Hoverable">
        <Preview code={`<Card hoverable padding="md">
  <CardTitle>Hover me</CardTitle>
  <CardBody>Lifts on hover with a spring animation.</CardBody>
</Card>`} center={false}>
          <Card hoverable padding="md" style={{ width: 240 }}>
            <CardTitle>Hover me</CardTitle>
            <CardBody>Lifts on hover with a spring animation.</CardBody>
          </Card>
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropTable rows={[
          { name: 'hoverable', type: 'boolean',                      default: 'false', description: 'Adds y-translate + shadow on hover.' },
          { name: 'padding',   type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'",  description: 'Internal padding.' },
          { name: 'children',  type: 'ReactNode', required: true,                      description: 'Card content.' },
        ]} />
      </DocSection>
    </div>
  )
}
