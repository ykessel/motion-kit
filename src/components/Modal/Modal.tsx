'use client'

import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/src/utils/cn'
import { useEscapeKey } from '@/src/hooks/useEscapeKey'
import { useFocusTrap } from '@/src/hooks/useFocusTrap'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalProps {
  open:       boolean
  onClose:    () => void
  title?:     string
  size?:      ModalSize
  closeOnOverlay?: boolean
  children:   React.ReactNode
  footer?:    React.ReactNode
  className?: string
}

const sizeStyles: Record<ModalSize, string> = {
  sm:   'max-w-sm',
  md:   'max-w-md',
  lg:   'max-w-lg',
  xl:   'max-w-2xl',
  full: 'max-w-full mx-4',
}

export function Modal({
  open, onClose, title, size = 'md',
  closeOnOverlay = true, children, footer, className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  useEscapeKey(onClose, open)
  useFocusTrap(dialogRef, open)

  if (typeof window === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeOnOverlay ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            key="dialog"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            initial={{ scale: .95, opacity: 0, y: 8 }}
            animate={{ scale: 1,   opacity: 1, y: 0 }}
            exit={{ scale: .95,   opacity: 0, y: 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={cn(
              'relative w-full z-10',
              'bg-[var(--surface)] border border-[var(--border)]',
              'rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)]',
              sizeStyles[size],
              className,
            )}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[var(--border)]">
                <h2 id="modal-title" className="text-base font-semibold text-[var(--text-primary)]">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="p-1.5 rounded-[8px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)] transition-colors focus-ring"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Body */}
            <div className={cn('px-6 py-5', !title && 'pt-6')}>
              {!title && (
                <button
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="absolute top-4 right-4 p-1.5 rounded-[8px] text-[var(--text-muted)] hover:bg-[var(--surface-2)] transition-colors focus-ring"
                >
                  <X size={16} />
                </button>
              )}
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-6 pb-6 pt-2 flex items-center justify-end gap-2 border-t border-[var(--border)]">
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
