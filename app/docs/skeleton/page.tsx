'use client'

import { Skeleton, SkeletonCard, SkeletonText } from '@/src/components/Skeleton/Skeleton'
import { DocHeading, DocSection, Preview, PropTable } from '@/components/docs/DocComponents'

export default function SkeletonPage() {
  return (
    <div>
      <DocHeading title="Skeleton" description="Shimmer loading placeholder. Includes prebuilt SkeletonCard and SkeletonText compositions." />

      <DocSection title="Basic shapes">
        <Preview code={`<Skeleton height={16} width="200px" />
<Skeleton height={40} width={40} rounded="full" />
<Skeleton height={120} rounded="md" />`} center={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 400 }}>
            <Skeleton height={16} width="200px" />
            <Skeleton height={40} width={40} rounded="full" />
            <Skeleton height={120} rounded="md" />
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Multiple lines">
        <Preview code={`<SkeletonText lines={4} />`} center={false}>
          <div style={{ width: '100%', maxWidth: 400 }}>
            <SkeletonText lines={4} />
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Card preset">
        <Preview code={`<SkeletonCard />`} center={false}>
          <div style={{ width: '100%', maxWidth: 360 }}>
            <SkeletonCard />
          </div>
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropTable rows={[
          { name: 'width',   type: 'string | number', default: '100%',  description: 'Width of the skeleton block.' },
          { name: 'height',  type: 'string | number', default: '16',    description: 'Height in pixels.' },
          { name: 'rounded', type: "'none' | 'sm' | 'md' | 'full'", default: "'md'", description: 'Border radius.' },
          { name: 'lines',   type: 'number',           default: '—',    description: 'Render N stacked lines with decreasing widths.' },
        ]} />
      </DocSection>
    </div>
  )
}
