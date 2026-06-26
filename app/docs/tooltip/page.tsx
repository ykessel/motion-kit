'use client'

import { Tooltip } from '@/src/components/Tooltip/Tooltip'
import { Button } from '@/src/components/Button/Button'
import { Badge } from '@/src/components/Badge/Badge'
import { DocHeading, DocSection, Preview, PropTable } from '@/components/docs/DocComponents'

export default function TooltipPage() {
  return (
    <div>
      <DocHeading title="Tooltip" description="Delayed fade-in tooltip with configurable side and content." />

      <DocSection title="Sides">
        <Preview code={`<Tooltip content="Top tooltip" side="top"><Button>Top</Button></Tooltip>
<Tooltip content="Bottom tooltip" side="bottom"><Button>Bottom</Button></Tooltip>
<Tooltip content="Left tooltip" side="left"><Button>Left</Button></Tooltip>
<Tooltip content="Right tooltip" side="right"><Button>Right</Button></Tooltip>`}>
          <Tooltip content="Top tooltip" side="top"><Button>Top</Button></Tooltip>
          <Tooltip content="Bottom tooltip" side="bottom"><Button>Bottom</Button></Tooltip>
          <Tooltip content="Left tooltip" side="left"><Button>Left</Button></Tooltip>
          <Tooltip content="Right tooltip" side="right"><Button>Right</Button></Tooltip>
        </Preview>
      </DocSection>

      <DocSection title="Rich content">
        <Preview code={`<Tooltip content={<>Pro plan <Badge variant="info" size="sm">Required</Badge></>}>
  <Button variant="outline">Upgrade feature</Button>
</Tooltip>`}>
          <Tooltip content={<span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>Pro plan <Badge variant="info" size="sm">Required</Badge></span>}>
            <Button variant="outline">Upgrade feature</Button>
          </Tooltip>
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropTable rows={[
          { name: 'content',  type: 'ReactNode',                           required: true,  description: 'Tooltip content (string or JSX).' },
          { name: 'side',     type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Which side the tooltip appears on.' },
          { name: 'delay',    type: 'number',                               default: '300',  description: 'Delay in ms before tooltip appears.' },
          { name: 'children', type: 'ReactElement',                        required: true,  description: 'Element that triggers the tooltip.' },
        ]} />
      </DocSection>
    </div>
  )
}
