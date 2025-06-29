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
    return () => {
      document.removeEventListener('touchmove', handler)
    }
  }, [])

  return null
}