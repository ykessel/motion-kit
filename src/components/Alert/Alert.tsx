'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '@/src/utils/cn'

export type AlertVariant = 'success' | 'error' | 'warning' | 'info'

export interface AlertProps {
  variant:    AlertVariant
  title?:     string
  children:   React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
  icon?:      React.ReactNode  // override default icon
}

const config: Record<AlertVariant, {
  icon:   React.ReactNode
  styles: string
  iconStyle: string
}> = {
  success: {
    icon:      <CheckCircle  size={18} />,
    styles:    'bg-[var(--success-subtle)] border-[rgba(34,197,94,.3)] text-[var(--text-primary)]',
    iconStyle: 'text-[var(--success)]',
  },
  error: {
    icon:      <AlertCircle  size={18} />,
    styles:    'bg-[var(--danger-subtle)] border-[rgba(239,68,68,.3)] text-[var(--text-primary)]',
    iconStyle: 'text-[var(--danger)]',
  },
  warning: {
    icon:      <AlertTriangle size={18} />,
    styles:    'bg-[var(--warning-subtle)] border-[rgba(245,158,11,.3)] text-[var(--text-primary)]',
    iconStyle: 'text-[var(--warning)]',
  },
  info: {
    icon:      <Info          size={18} />,
    styles:    'bg-[var(--info-subtle)] border-[rgba(59,130,246,.3)] text-[var(--text-primary)]',
    iconStyle: 'text-[var(--info)]',
  },
}

export function Alert({ variant, title, children, dismissible, onDismiss, className, icon }: AlertProps) {
  const [visible, setVisible] = useState(true)
  const cfg = config[variant]

  function dismiss() {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: .2 }}
          role="alert"
          className={cn(
            'flex items-start gap-3 p-4 rounded-[var(--radius-lg)] border',
            cfg.styles,
            className,
          )}
        >
          <motion.span
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25, delay: .05 }}
            className={cn('flex-shrink-0 mt-0.5', cfg.iconStyle)}
            aria-hidden="true"
          >
            {icon ?? cfg.icon}
          </motion.span>

          <div className="flex-1 min-w-0">
            {title && (
              <p className="text-sm font-semibold leading-snug mb-0.5">{title}</p>
            )}
            <div className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {children}
            </div>
          </div>

          {dismissible && (
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="flex-shrink-0 p-0.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors focus-ring rounded"
            >
              <X size={14} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
