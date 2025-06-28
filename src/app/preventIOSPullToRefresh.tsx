// components/PreventIOSPullToRefresh.tsx
'use client'

import { useEffect } from 'react'

export function PreventIOSPullToRefresh() {
  useEffect(() => {
    const preventPullToRefresh = (e: TouchEvent) => {
      if (window.scrollY <= 0 && e.touches[0].clientY > 0) {
        e.preventDefault()
      }
    }

    window.addEventListener('touchmove', preventPullToRefresh, { passive: false })

    return () => {
      window.removeEventListener('touchmove', preventPullToRefresh)
    }
  }, [])

  return null
}
