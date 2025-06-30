'use client'

import { useEffect } from 'react'

export function PreventIOSPullToRefresh() {
  useEffect(() => {

    const handler = (e: TouchEvent) => {
      const scrollable = (e.target as HTMLElement).closest('.scrollable-area')
      if (!scrollable) {
        e.preventDefault()
      }
    }

    document.addEventListener('touchmove', handler, { passive: false })

    const el = document.querySelector('.scrollable-area') as HTMLElement | null
    if (!el) return

    let startY = 0

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY
      const deltaY = currentY - startY

      const scrollTop = el.scrollTop
      const scrollHeight = el.scrollHeight
      const clientHeight = el.clientHeight

      const isAtTop = scrollTop <= 0
      const isAtBottom = scrollTop + clientHeight >= scrollHeight

      const pullingDown = deltaY > 0
      const pullingUp = deltaY < 0

      if ((isAtTop && pullingDown) || (isAtBottom && pullingUp)) {
        e.preventDefault()
      }
    }

    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchmove', handler)
    }
  }, [])

  return null
}
