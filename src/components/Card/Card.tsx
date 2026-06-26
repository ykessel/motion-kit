'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/src/utils/cn'

export interface CardProps extends HTMLMotionProps<'div'> {
  hoverable?: boolean
  padding?:   'none' | 'sm' | 'md' | 'lg'
}

const paddingStyles = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

export function Card({
  hoverable = false,
  padding   = 'md',
  children,
  className,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -2, boxShadow: 'var(--shadow-lg)' } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={cn(
        'rounded-[var(--radius-lg)]',
        'bg-[var(--surface)] border border-[var(--border)]',
        'shadow-[var(--shadow-sm)]',
        hoverable && 'cursor-pointer',
        paddingStyles[padding],
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-start justify-between gap-4 mb-4', className)}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={cn('font-semibold text-base text-[var(--text-primary)]', className)}>
      {children}
    </h3>
  )
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('text-sm text-[var(--text-secondary)]', className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center gap-3 mt-4 pt-4 border-t border-[var(--border)]', className)}>
      {children}
    </div>
  )
}
