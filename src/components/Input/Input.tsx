'use client'

import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/src/utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:     string
  error?:     string
  hint?:      string
  leftIcon?:  React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label, error, hint, leftIcon, rightIcon,
  className, id, ...props
}, ref) => {
  const [focused, setFocused] = useState(false)
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-')
  const hasError = !!error

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--text-primary)]">
          {label}
        </label>
      )}

      <motion.div
        animate={{
          boxShadow: hasError
            ? '0 0 0 2px rgba(239,68,68,.4)'
            : focused
            ? '0 0 0 2px rgba(99,102,241,.4)'
            : '0 0 0 0px transparent',
        }}
        transition={{ duration: .15 }}
        className={cn(
          'flex items-center gap-2 px-3',
          'h-10 rounded-[var(--radius)]',
          'bg-[var(--surface)] border',
          hasError ? 'border-[var(--danger)]' : 'border-[var(--border-strong)]',
          'transition-colors duration-150',
        )}
      >
        {leftIcon && (
          <span className="text-[var(--text-muted)] flex-shrink-0 w-4 h-4 flex items-center justify-center">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'flex-1 bg-transparent text-sm text-[var(--text-primary)]',
            'placeholder:text-[var(--text-muted)]',
            'outline-none border-none',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            className,
          )}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          onFocus={e => { setFocused(true); props.onFocus?.(e) }}
          onBlur={e => { setFocused(false); props.onBlur?.(e) }}
          {...props}
        />
        {rightIcon && (
          <span className="text-[var(--text-muted)] flex-shrink-0 w-4 h-4 flex items-center justify-center">
            {rightIcon}
          </span>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {hasError ? (
          <motion.p
            key="error"
            id={`${inputId}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: .15 }}
            className="text-xs text-[var(--danger)]"
          >
            {error}
          </motion.p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="text-xs text-[var(--text-muted)]">{hint}</p>
        ) : null}
      </AnimatePresence>
    </div>
  )
})

Input.displayName = 'Input'
