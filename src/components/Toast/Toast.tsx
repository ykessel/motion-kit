'use client'

import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/src/utils/cn'

// ── Types ─────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default'

export interface ToastItem {
  id:       string
  type:     ToastType
  title:    string
  message?: string
  duration?: number
}

interface ToastContextValue {
  toast: (options: Omit<ToastItem, 'id'> | string) => string
  dismiss: (id: string) => void
}

// ── Context ───────────────────────────────────────────────────
const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

// ── Icon map ──────────────────────────────────────────────────
const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle  size={16} className="text-[var(--success)]" />,
  error:   <AlertCircle  size={16} className="text-[var(--danger)]" />,
  warning: <AlertTriangle size={16} className="text-[var(--warning)]" />,
  info:    <Info         size={16} className="text-[var(--info)]" />,
  default: null,
}

const typeStyles: Record<ToastType, string> = {
  success: 'border-l-[var(--success)]',
  error:   'border-l-[var(--danger)]',
  warning: 'border-l-[var(--warning)]',
  info:    'border-l-[var(--info)]',
  default: 'border-l-[var(--border-strong)]',
}

// ── Single Toast ──────────────────────────────────────────────
function ToastCard({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => onDismiss(item.id), item.duration)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [item.id, item.duration, onDismiss])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 40, scale: .95 }}
      animate={{ opacity: 1, x: 0,  scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: .95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      role="alert"
      aria-live="assertive"
      className={cn(
        'w-80 flex items-start gap-3 p-4',
        'bg-[var(--surface)] border border-[var(--border)] border-l-4',
        'rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)]',
        typeStyles[item.type],
      )}
    >
      {icons[item.type] && (
        <span className="flex-shrink-0 mt-0.5">{icons[item.type]}</span>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--text-primary)] leading-snug">{item.title}</p>
        {item.message && (
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{item.message}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(item.id)}
        aria-label="Dismiss"
        className="flex-shrink-0 p-0.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors focus-ring rounded"
      >
        <X size={14} />
      </button>
    </motion.div>
  )
}

// ── Provider ──────────────────────────────────────────────────
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toast = useCallback((options: Omit<ToastItem, 'id'> | string): string => {
    const id = Math.random().toString(36).slice(2)
    const item: ToastItem = typeof options === 'string'
      ? { id, type: 'default', title: options, duration: 4000 }
      : { id, ...options, duration: options.duration ?? 4000 }
    setToasts(prev => [...prev.slice(-4), item]) // max 5 at once
    return id
  }, [])

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {mounted && createPortal(
        <div
          className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2 items-end"
          aria-label="Notifications"
        >
          <AnimatePresence mode="popLayout">
            {toasts.map(t => (
              <ToastCard key={t.id} item={t} onDismiss={dismiss} />
            ))}
          </AnimatePresence>
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}
