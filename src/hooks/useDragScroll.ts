import { useRef, useEffect, useCallback } from 'react'

/**
 * Enables mouse-drag-to-scroll on a container element.
 * Scrollbar is hidden via CSS; dragging mimics mobile touch gesture.
 */
export function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let dragging = false
    let startX = 0
    let scrollStart = 0

    const onDown = (e: MouseEvent) => {
      dragging = true
      startX = e.pageX
      scrollStart = el.scrollLeft
      el.style.userSelect = 'none'
      e.preventDefault()
    }

    const onMove = (e: MouseEvent) => {
      if (!dragging) return
      const dx = startX - e.pageX
      el.scrollLeft = scrollStart + dx
    }

    const onUp = () => {
      dragging = false
      el.style.removeProperty('user-select')
    }

    el.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)

    return () => {
      el.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  return ref
}
