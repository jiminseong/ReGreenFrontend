'use client'

import {usePathname} from "next/navigation";
import {useEffect} from "react";

export function ForceViewportReset() {
  const pathname = usePathname()

  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      )
    }
  }, [pathname]) // 라우팅 경로 변경될 때마다 실행

  return null
}