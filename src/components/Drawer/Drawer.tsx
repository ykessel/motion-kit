'use client'

import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/src/utils/cn'
import { useEscapeKey } from '@/src/hooks/useEscapeKey'
import { useFocusTrap } from '@/src/hooks/useFocusTrap'

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom'

export interface DrawerProps {
  open:    boolean
  onClose: () => void
  side?:   DrawerSide
  title?:  string
  size?:   string  // e.g. "320px", "40vw"
  children: React.ReactNode
  footer?:  React.ReactNode
}

const sideConfig = {
  right:  { position: 'right-0 top-0 bottom-0', initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } },
  left:   { position: 'left-0 top-0 bottom-0',  initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' } },
  bottom: { position: 'bottom-0 left-0 right-0', initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } },
  top:    { position: 'top-0 left-0 right-0',    initial: { y: '-100%' }, animate: { y: 0 }, exit: { y: '-100%' } },
} as const

export function Drawer({
  open, onClose, side = 'right', title,
  size = '360px', children, footer,
}: DrawerProps) {
  const ref = useRef<HTMLDivElement>(null)
  useEscapeKey(onClose, open)
  useFocusTrap(ref, open)

  if (typeof window === 'undefined') return null
  const cfg = sideConfig[side]
  const isHorizontal = side === 'left' || side === 'right'

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'drawer-title' : undefined}
            initial={cfg.initial}
            animate={cfg.animate}
            exit={cfg.exit}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            className={cn('absolute flex flex-col bg-[var(--surface)] border-[var(--border)] shadow-[var(--shadow-xl)]', cfg.position)}
            style={{
              [isHorizontal ? 'width' : 'height']: size,
              borderLeft:   side === 'right'  ? '1px solid var(--border)' : undefined,
              borderRight:  side === 'left'   ? '1px solid var(--border)' : undefined,
              borderTop:    side === 'bottom' ? '1px solid var(--border)' : undefined,
              borderBottom: side === 'top'    ? '1px solid var(--border)' : undefined,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              {title && (
                <h2 id="drawer-title" className="font-semibold text-sm text-[var(--text-primary)]">
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                aria-label="Close"
                className="ml-auto p-1.5 rounded-[8px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)] transition-colors focus-ring"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="px-5 py-4 border-t border-[var(--border)] flex items-center gap-2">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
