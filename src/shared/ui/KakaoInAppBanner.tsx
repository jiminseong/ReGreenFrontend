"use client";
import React, { useEffect, useState } from "react";
export const KakaoInAppBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ua = navigator.userAgent.toUpperCase();
    if (ua.includes("KAKAOTALK")) {
      setShow(true);
      return;
    }
    // KakaoAgent가 window에 존재하는지 안전하게 확인
    if ("KakaoAgent" in window) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-yellow-100 text-black p-3 flex items-center justify-center z-[9999] shadow-lg">
      <span>
        📢 카카오톡 인앱 브라우저에서는 일부 기능이 제한될 수 있어요.{" "}
        <br className="block md:hidden" />
        우측 상단 <b>⋮</b> 메뉴에서 <b>‘기본 브라우저로 열기’</b>를 선택해주세요!
      </span>
    </div>
  );
};
