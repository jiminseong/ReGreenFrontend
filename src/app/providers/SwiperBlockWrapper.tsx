"use client";

import { useEffect, useRef } from "react";

export default function SwiperBlockWrapper({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const handler = (e: TouchEvent) => {
      const touchX = e.touches[0].pageX;
      const isNearEdge = touchX <= 20 || touchX >= window.innerWidth - 20;

      if (isNearEdge) {
        e.preventDefault();
      }
    };

    el.addEventListener("touchstart", handler, { passive: false });

    return () => {
      el.removeEventListener("touchstart", handler);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-full overflow-hidden">
      {children}
    </div>
  );
}
