'use client'

import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/src/utils/cn'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?:       string
  description?: string
  indeterminate?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label, description, indeterminate, checked, className, id, onChange, ...props
}, ref) => {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-')
  const isChecked = checked || indeterminate

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'inline-flex items-start gap-3 cursor-pointer select-none group',
        props.disabled && 'opacity-40 cursor-not-allowed',
        className,
      )}
    >
      <div className="relative mt-0.5 flex-shrink-0">
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          checked={checked}
          onChange={onChange}
          className="sr-only"
          aria-checked={indeterminate ? 'mixed' : checked}
          {...props}
        />
        <motion.div
          animate={{
            background: isChecked ? 'var(--accent)' : 'var(--surface)',
            borderColor: isChecked ? 'var(--accent)' : 'var(--border-strong)',
          }}
          transition={{ duration: .15 }}
          className={cn(
            'w-4.5 h-4.5 rounded-[5px] border-2 flex items-center justify-center',
            'w-[18px] h-[18px]',
            'group-hover:border-[var(--accent)] transition-colors duration-150',
          )}
        >
          <AnimatePresence>
            {isChecked && (
              <motion.svg
                key="check"
                width="10" height="10" viewBox="0 0 10 10" fill="none"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 600, damping: 25 }}
              >
                {indeterminate ? (
                  <path d="M2 5h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M2 5l2.5 2.5L8 2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </motion.svg>
            )}
          </AnimatePresence>
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

Checkbox.displayName = 'Checkbox'
