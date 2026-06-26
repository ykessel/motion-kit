'use client'

import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/src/utils/cn'

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'danger'
export type ButtonSize    = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?:  ButtonVariant
  size?:     ButtonSize
  loading?:  boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children?: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  solid:   'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] border border-transparent',
  outline: 'bg-transparent text-[var(--text-primary)] border border-[var(--border-strong)] hover:bg-[var(--surface-2)]',
  ghost:   'bg-transparent text-[var(--text-primary)] border border-transparent hover:bg-[var(--surface-2)]',
  danger:  'bg-[var(--danger)] text-white hover:bg-red-600 border border-transparent',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8  px-3   text-xs  gap-1.5 rounded-[8px]',
  md: 'h-10 px-4   text-sm  gap-2   rounded-[10px]',
  lg: 'h-12 px-5   text-base gap-2.5 rounded-[12px]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'solid',
  size    = 'md',
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  children,
  className,
  ...props
}, ref) => {
  const isDisabled = disabled || loading

  return (
    <motion.button
      ref={ref}
      disabled={isDisabled}
      whileTap={{ scale: isDisabled ? 1 : 0.96 }}
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={cn(
        'inline-flex items-center justify-center font-medium select-none',
        'transition-colors duration-150',
        'focus-ring',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      aria-disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin-slow"
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
            strokeDasharray="31.4" strokeDashoffset="10" opacity=".3" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ) : leftIcon}
      {children}
      {!loading && rightIcon}
    </motion.button>
  )
})

Button.displayName = 'Button'
