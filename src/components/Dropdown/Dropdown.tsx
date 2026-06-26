'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/src/utils/cn'
import { useClickOutside } from '@/src/hooks/useClickOutside'

export interface DropdownItem {
  label:    string
  value:    string
  icon?:    React.ReactNode
  danger?:  boolean
  disabled?: boolean
  divider?: boolean  // renders separator before this item
}

export interface DropdownProps {
  items:     DropdownItem[]
  trigger:   React.ReactNode
  value?:    string
  onSelect?: (value: string) => void
  align?:    'left' | 'right'
}

export function Dropdown({ items, trigger, value, onSelect, align = 'left' }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref  = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setOpen(false), open)

  function handleSelect(item: DropdownItem) {
    if (item.disabled) return
    onSelect?.(item.value)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(o => !o)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: .95, y: -4 }}
            animate={{ opacity: 1, scale: 1,   y: 0  }}
            exit={{ opacity: 0, scale: .95,   y: -4 }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
            className={cn(
              'absolute z-50 mt-1 min-w-[180px]',
              'bg-[var(--surface)] border border-[var(--border)]',
              'rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)]',
              'py-1 overflow-hidden',
              align === 'right' ? 'right-0' : 'left-0',
            )}
            role="menu"
          >
            {items.map((item, i) => (
              <div key={item.value}>
                {item.divider && i > 0 && (
                  <div className="h-px bg-[var(--border)] my-1" role="separator" />
                )}
                <button
                  role="menuitem"
                  disabled={item.disabled}
                  onClick={() => handleSelect(item)}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left',
                    'transition-colors duration-100',
                    item.danger
                      ? 'text-[var(--danger)] hover:bg-[var(--danger-subtle)]'
                      : 'text-[var(--text-primary)] hover:bg-[var(--surface-2)]',
                    item.disabled && 'opacity-40 cursor-not-allowed',
                    'focus-ring rounded-none',
                  )}
                >
                  {item.icon && (
                    <span className="w-4 h-4 flex-shrink-0 text-[var(--text-muted)]" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className="flex-1">{item.label}</span>
                  {value === item.value && (
                    <Check size={14} className="text-[var(--accent)] flex-shrink-0" aria-hidden="true" />
                  )}
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Convenience trigger ───────────────────────────────────────
export function DropdownTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center gap-1.5 px-3 h-9 rounded-[var(--radius)] text-sm font-medium',
        'bg-[var(--surface)] border border-[var(--border-strong)]',
        'text-[var(--text-primary)] hover:bg-[var(--surface-2)]',
        'transition-colors duration-150 focus-ring',
        className,
      )}
    >
      {children}
      <ChevronDown size={14} className="text-[var(--text-muted)]" />
    </button>
  )
}
