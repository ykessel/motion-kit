'use client'

import { useState } from 'react'
import { Dropdown, DropdownTrigger } from '@/src/components/Dropdown/Dropdown'
import { Copy, Edit, Trash2, Share, Download } from 'lucide-react'
import { DocHeading, DocSection, Preview, PropTable } from '@/components/docs/DocComponents'

export default function DropdownPage() {
  const [sort, setSort] = useState('name')

  const menuItems = [
    { label: 'Edit',     value: 'edit',     icon: <Edit size={14} /> },
    { label: 'Duplicate', value: 'dup',     icon: <Copy size={14} /> },
    { label: 'Share',    value: 'share',    icon: <Share size={14} /> },
    { label: 'Download', value: 'download', icon: <Download size={14} />, divider: true },
    { label: 'Delete',   value: 'delete',   icon: <Trash2 size={14} />, danger: true, divider: true },
  ]

  const sortItems = [
    { label: 'Name',       value: 'name' },
    { label: 'Date',       value: 'date' },
    { label: 'Size',       value: 'size' },
    { label: 'Modified',   value: 'modified' },
  ]

  return (
    <div>
      <DocHeading title="Dropdown" description="Spring-animated menu with icons, dividers, danger items, and selected state." />

      <DocSection title="Action menu">
        <Preview code={`<Dropdown trigger={<DropdownTrigger>Actions</DropdownTrigger>} items={menuItems} onSelect={console.log} />`}>
          <Dropdown
            trigger={<DropdownTrigger>Actions</DropdownTrigger>}
            items={menuItems}
            onSelect={v => console.log(v)}
          />
        </Preview>
      </DocSection>

      <DocSection title="With selected value">
        <Preview code={`<Dropdown
  trigger={<DropdownTrigger>Sort: {sort}</DropdownTrigger>}
  items={sortItems}
  value={sort}
  onSelect={setSort}
/>`}>
          <Dropdown
            trigger={<DropdownTrigger>Sort: {sort}</DropdownTrigger>}
            items={sortItems}
            value={sort}
            onSelect={setSort}
          />
        </Preview>
      </DocSection>

      <DocSection title="Props">
        <PropTable rows={[
          { name: 'items',    type: 'DropdownItem[]', required: true,  description: 'Menu items array.' },
          { name: 'trigger',  type: 'ReactNode',      required: true,  description: 'Element that opens the menu on click.' },
          { name: 'value',    type: 'string',          default: '—',    description: 'Currently selected value — adds checkmark.' },
          { name: 'onSelect', type: '(value: string) => void', default: '—', description: 'Called when an item is clicked.' },
          { name: 'align',    type: "'left' | 'right'", default: "'left'", description: 'Menu alignment relative to trigger.' },
        ]} />
      </DocSection>
    </div>
  )
}
