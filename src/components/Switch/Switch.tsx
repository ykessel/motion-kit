'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/src/utils/cn'

export type SwitchSize = 'sm' | 'md' | 'lg'

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?:       string
  description?: string
  size?:        SwitchSize
}

const sizeConfig: Record<SwitchSize, { track: string; thumb: string; thumbSize: number; translate: number }> = {
  sm: { track: 'w-7 h-4',   thumb: 'w-3 h-3',   thumbSize: 12, translate: 12 },
  md: { track: 'w-9 h-5',   thumb: 'w-3.5 h-3.5', thumbSize: 14, translate: 16 },
  lg: { track: 'w-11 h-6',  thumb: 'w-4.5 h-4.5', thumbSize: 18, translate: 20 },
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  label, description, size = 'md', checked, className, id, onChange, ...props
}, ref) => {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-')
  const cfg = sizeConfig[size]

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'inline-flex items-start gap-3 cursor-pointer select-none',
        props.disabled && 'opacity-40 cursor-not-allowed',
        className,
      )}
    >
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={inputId}
          checked={checked}
          onChange={onChange}
          className="sr-only"
          aria-checked={checked}
          {...props}
        />
        <motion.div
          animate={{
            background: checked ? 'var(--accent)' : 'var(--surface-2)',
            borderColor: checked ? 'var(--accent)' : 'var(--border-strong)',
          }}
          transition={{ duration: .2 }}
          className={cn(
            'relative rounded-full border-2 transition-shadow',
            'focus-within:ring-2 focus-within:ring-[var(--accent)] focus-within:ring-offset-2',
            cfg.track,
          )}
        >
          <motion.div
            animate={{ x: checked ? cfg.translate : 0 }}
            transition={{ type: 'spring', stiffness: 600, damping: 35 }}
            className={cn('absolute top-0 left-0 m-[1px] bg-white rounded-full shadow-sm', cfg.thumb)}
          />
        </motion.div>
      </div>

      {(label || description) && (
        <div>
          {label && (
            <span className="text-sm font-medium text-[var(--text-primary)] leading-none">
              {label}
            </span>
          )}
          {description && (
            <p className="text-xs text-[var(--text-muted)] mt-1">{description}</p>
          )}
        </div>
      )}
    </label>
  )
})

Switch.displayName = 'Switch'
