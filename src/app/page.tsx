"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SplashContent from "@/widgets/splash/SplashContent";
import InstallPrompt from "@/features/splash/ui/InstallPrompt";

export default function Page() {
  const router = useRouter();
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // 로컬 스토리지에 온보딩 열람 상태 있다면
      const isInboardFinished = localStorage.getItem("onboarded");
      const isIOSDevice = /iPhone|iPad|iPod/.test(navigator.userAgent) && !("MSStream" in window);
      setIsIOS(isIOSDevice);

      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        ("standalone" in window.navigator && window.navigator.standalone === true);

      if (!isStandalone && !isInboardFinished) {
        router.push("/onboard");
      } else if (isStandalone && isInboardFinished) {
        // 로컬 스토리지에 온보딩 열람 상태 있다면 로그인으로 이동
        // TODO: 로그인 되어있다면 -> 홈으로 이동
        router.push("/login");
      } else {
        setShowPrompt(true);
      }
    }, 2800);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      {showPrompt ? <InstallPrompt isIOS={isIOS} /> : <SplashContent />}
    </main>
  );
}
