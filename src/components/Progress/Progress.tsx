'use client'

import { motion } from 'framer-motion'
import { cn } from '@/src/utils/cn'

export type ProgressVariant = 'default' | 'success' | 'warning' | 'danger' | 'indeterminate'

export interface ProgressProps {
  value?:     number       // 0–100; omit for indeterminate
  variant?:   ProgressVariant
  size?:      'sm' | 'md' | 'lg'
  label?:     string
  showValue?: boolean
  className?: string
}

const variantColors: Record<ProgressVariant, string> = {
  default:       'var(--accent)',
  success:       'var(--success)',
  warning:       'var(--warning)',
  danger:        'var(--danger)',
  indeterminate: 'var(--accent)',
}

const sizeStyles = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

export function Progress({
  value, variant = 'default', size = 'md',
  label, showValue = false, className,
}: ProgressProps) {
  const isIndeterminate = variant === 'indeterminate' || value === undefined
  const clampedValue = Math.min(100, Math.max(0, value ?? 0))
  const color = variantColors[variant]

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className="text-xs font-medium text-[var(--text-secondary)]">{label}</span>}
          {showValue && !isIndeterminate && (
            <span className="text-xs font-medium text-[var(--text-muted)]">{clampedValue}%</span>
          )}
        </div>
      )}

      <div
        className={cn('w-full rounded-full bg-[var(--surface-2)] overflow-hidden', sizeStyles[size])}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        aria-busy={isIndeterminate}
      >
        {isIndeterminate ? (
          <motion.div
            className="h-full w-1/3 rounded-full"
            style={{ background: color }}
            animate={{ x: ['0%', '300%'] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          />
        ) : (
          <motion.div
            className="h-full rounded-full"
            style={{ background: color }}
            initial={{ width: 0 }}
            animate={{ width: `${clampedValue}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        )}
      </div>
    </div>
  )
}
