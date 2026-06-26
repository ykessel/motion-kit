'use client'

import { useState, useRef, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/src/utils/cn'

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  content:    React.ReactNode
  side?:      TooltipSide
  delay?:     number
  children:   React.ReactElement
  className?: string
}

const sideConfig = {
  top:    { container: 'bottom-full left-1/2 -translate-x-1/2 mb-2',  initial: { opacity: 0, y: 4  } },
  bottom: { container: 'top-full  left-1/2 -translate-x-1/2 mt-2',   initial: { opacity: 0, y: -4 } },
  left:   { container: 'right-full top-1/2 -translate-y-1/2 mr-2',   initial: { opacity: 0, x: 4  } },
  right:  { container: 'left-full  top-1/2 -translate-y-1/2 ml-2',   initial: { opacity: 0, x: -4 } },
} as const

export function Tooltip({ content, side = 'top', delay = 300, children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tooltipId = useId()
  const cfg = sideConfig[side]

  function show() {
    timerRef.current = setTimeout(() => setVisible(true), delay)
  }
  function hide() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setVisible(false)
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {/* Clone child and inject aria-describedby */}
      {/* We wrap in a span to avoid cloneElement complexity */}
      <span aria-describedby={visible ? tooltipId : undefined}>
        {children}
      </span>

      <AnimatePresence>
        {visible && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={cfg.initial}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={cfg.initial}
            transition={{ duration: .12 }}
            className={cn(
              'absolute z-50 pointer-events-none whitespace-nowrap',
              'px-2.5 py-1.5 rounded-[8px]',
              'bg-[var(--surface-2)] border border-[var(--border-strong)]',
              'text-xs font-medium text-[var(--text-primary)]',
              'shadow-[var(--shadow-md)]',
              cfg.container,
              className,
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
