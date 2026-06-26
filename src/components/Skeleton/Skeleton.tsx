'use client'

import { cn } from '@/src/utils/cn'

export interface SkeletonProps {
  className?: string
  width?:     string | number
  height?:    string | number
  rounded?:   'none' | 'sm' | 'md' | 'full'
  lines?:     number   // render N stacked lines
}

const roundedStyles = {
  none: 'rounded-none',
  sm:   'rounded',
  md:   'rounded-[var(--radius)]',
  full: 'rounded-full',
}

function SkeletonBox({
  className, width, height, rounded = 'md',
}: Omit<SkeletonProps, 'lines'>) {
  return (
    <div
      className={cn(
        'animate-shimmer',
        roundedStyles[rounded],
        className,
      )}
      style={{ width, height: height ?? 16 }}
      aria-hidden="true"
    />
  )
}

export function Skeleton({ lines, ...props }: SkeletonProps) {
  if (lines && lines > 1) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonBox
            key={i}
            {...props}
            width={i === lines - 1 ? '70%' : '100%'}
          />
        ))}
      </div>
    )
  }
  return <SkeletonBox {...props} />
}

// ── Preset compositions ───────────────────────────────────────
export function SkeletonCard() {
  return (
    <div className="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton rounded="full" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton height={12} width="60%" />
          <Skeleton height={10} width="40%" />
        </div>
      </div>
      <Skeleton lines={3} height={12} />
      <div className="flex gap-2">
        <Skeleton width={80} height={32} />
        <Skeleton width={80} height={32} />
      </div>
    </div>
  )
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return <Skeleton lines={lines} height={14} />
}
