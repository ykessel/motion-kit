import { useEffect, type RefObject } from 'react'

const FOCUSABLE = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled])',
  'select:not([disabled])', 'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export function useFocusTrap(ref: RefObject<HTMLElement | null>, active = true) {
  useEffect(() => {
    if (!active || !ref.current) return
    const el = ref.current
    const nodes = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE))
    if (!nodes.length) return

    const first = nodes[0]
    const last  = nodes[nodes.length - 1]

    // Focus first element on mount
    first.focus()

    function onTab(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus() }
      }
    }

    el.addEventListener('keydown', onTab)
    return () => el.removeEventListener('keydown', onTab)
  }, [ref, active])
}
