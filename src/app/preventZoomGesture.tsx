// app/layout.tsx 또는 app/providers.tsx 안에서 사용 가능

'use client'

import { useEffect } from 'react';

export function PreventZoomGesture() {
  useEffect(() => {
    const preventGesture = (e: TouchEvent | Event) => {
      e.preventDefault();
    };

    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (e: TouchEvent) => {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener('touchend', preventDoubleTapZoom);
    document.addEventListener('gesturestart', preventGesture);
    document.addEventListener('gesturechange', preventGesture);
    document.addEventListener('gestureend', preventGesture);

    return () => {
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('gesturechange', preventGesture);
      document.removeEventListener('gestureend', preventGesture);
      document.removeEventListener('touchend', preventDoubleTapZoom);
    };
  }, []);

  return null;
}