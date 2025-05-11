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
    const accessToken = localStorage.getItem("accessToken");

    const timer = setTimeout(() => {
      // 로컬 스토리지에 온보딩 열람 상태 있다면
      const isInboardFinished = localStorage.getItem("onboarded");
      const isIOSDevice = /iPhone|iPad|iPod/.test(navigator.userAgent) && !("MSStream" in window);
      setIsIOS(isIOSDevice);

      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        ("standalone" in window.navigator && window.navigator.standalone === true);

      if (accessToken) {
        // 로그인 되어있다만 스플래쉬 종료 후 홈으로 이동

        router.replace("/home");
      } else if (isStandalone && !isInboardFinished) {
        router.push("/onboard");
      } else if (isStandalone && isInboardFinished) {
        router.push("/login");
      } else if (!isStandalone && !isInboardFinished) {
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
