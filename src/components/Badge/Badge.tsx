'use client'

import { motion } from 'framer-motion'
import { cn } from '@/src/utils/cn'

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline'

export interface BadgeProps {
  variant?: BadgeVariant
  size?:    'sm' | 'md'
  dot?:     boolean
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[var(--surface-2)] text-[var(--text-secondary)] border border-[var(--border)]',
  success: 'bg-[var(--success-subtle)] text-[var(--success)] border border-[rgba(34,197,94,.25)]',
  warning: 'bg-[var(--warning-subtle)] text-[var(--warning)] border border-[rgba(245,158,11,.25)]',
  danger:  'bg-[var(--danger-subtle)]  text-[var(--danger)]  border border-[rgba(239,68,68,.25)]',
  info:    'bg-[var(--info-subtle)]    text-[var(--info)]    border border-[rgba(59,130,246,.25)]',
  outline: 'bg-transparent text-[var(--text-primary)] border border-[var(--border-strong)]',
}

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-[var(--text-muted)]',
  success: 'bg-[var(--success)]',
  warning: 'bg-[var(--warning)]',
  danger:  'bg-[var(--danger)]',
  info:    'bg-[var(--info)]',
  outline: 'bg-[var(--text-primary)]',
}

export function Badge({ variant = 'default', size = 'md', dot, children, className }: BadgeProps) {
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
        variantStyles[variant],
        className,
      )}
    >
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotColors[variant])} aria-hidden="true" />
      )}
      {children}
    </motion.span>
  )
}
