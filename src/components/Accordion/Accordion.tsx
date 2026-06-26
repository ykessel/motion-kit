'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/src/utils/cn'

export interface AccordionItem {
  id:       string
  trigger:  React.ReactNode
  content:  React.ReactNode
}

export interface AccordionProps {
  items:    AccordionItem[]
  multiple?: boolean   // allow multiple open at once
  defaultOpen?: string[]
  className?: string
}

export function Accordion({ items, multiple = false, defaultOpen = [], className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpen)

  function toggle(id: string) {
    setOpenIds(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id)
      return multiple ? [...prev, id] : [id]
    })
  }

  return (
    <div className={cn('flex flex-col divide-y divide-[var(--border)]', className)}>
      {items.map(item => {
        const isOpen = openIds.includes(item.id)
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-${item.id}`}
              id={`accordion-trigger-${item.id}`}
              className={cn(
                'w-full flex items-center justify-between gap-4',
                'py-4 text-left text-sm font-medium text-[var(--text-primary)]',
                'hover:text-[var(--accent)] transition-colors duration-150',
                'focus-ring',
              )}
            >
              <span>{item.trigger}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="flex-shrink-0 text-[var(--text-muted)]"
                aria-hidden="true"
              >
                <ChevronDown size={16} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: .22, ease: [.4, 0, .2, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="pb-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
