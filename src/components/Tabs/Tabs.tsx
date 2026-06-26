'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/src/utils/cn'

export interface TabItem {
  id:      string
  label:   React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

export interface TabsProps {
  items:        TabItem[]
  defaultTab?:  string
  onChange?:    (id: string) => void
  variant?:     'line' | 'pill'
  className?:   string
}

export function Tabs({
  items, defaultTab, onChange,
  variant = 'line', className,
}: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? items[0]?.id)
  const listRef = useRef<HTMLDivElement>(null)

  function select(id: string) {
    setActive(id)
    onChange?.(id)
  }

  function onKeyDown(e: React.KeyboardEvent, idx: number) {
    const enabled = items.filter(t => !t.disabled)
    const cur = enabled.findIndex(t => t.id === items[idx].id)
    if (e.key === 'ArrowRight') {
      const next = enabled[(cur + 1) % enabled.length]
      select(next.id)
    } else if (e.key === 'ArrowLeft') {
      const prev = enabled[(cur - 1 + enabled.length) % enabled.length]
      select(prev.id)
    }
  }

  const activeItem = items.find(t => t.id === active)

  return (
    <div className={className}>
      {/* Tab list */}
      <div
        ref={listRef}
        role="tablist"
        className={cn(
          'relative flex',
          variant === 'line'
            ? 'border-b border-[var(--border)] gap-0'
            : 'bg-[var(--surface-2)] rounded-[var(--radius-lg)] p-1 gap-1',
        )}
      >
        {items.map((tab, idx) => {
          const isActive = tab.id === active
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && select(tab.id)}
              onKeyDown={e => onKeyDown(e, idx)}
              tabIndex={isActive ? 0 : -1}
              className={cn(
                'relative text-sm font-medium transition-colors duration-150 focus-ring',
                variant === 'line'
                  ? cn('px-4 py-2.5', isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]')
                  : cn('px-3 py-1.5 rounded-[8px] z-10', isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'),
                tab.disabled && 'opacity-40 cursor-not-allowed',
              )}
            >
              {tab.label}

              {/* Animated indicator */}
              {isActive && variant === 'line' && (
                <motion.div
                  layoutId="tab-indicator-line"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)] rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              {isActive && variant === 'pill' && (
                <motion.div
                  layoutId="tab-indicator-pill"
                  className="absolute inset-0 bg-[var(--surface)] rounded-[8px] shadow-[var(--shadow-sm)] -z-10"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Panel */}
      {activeItem && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeItem.id}`}
          aria-labelledby={`tab-${activeItem.id}`}
          tabIndex={0}
          className="pt-4 focus-ring rounded"
        >
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .18 }}
          >
            {activeItem.content}
          </motion.div>
        </div>
      )}
    </div>
  )
}
