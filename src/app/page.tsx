"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SplashContent from "@/widgets/splash/SplashContent";
import InstallPrompt from "@/features/splash/ui/InstallPrompt";
import { useMyInfo } from "@/entities/user/lib/userMyInfo";

export default function Page() {
  const router = useRouter();
  const { data, isSuccess } = useMyInfo();
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

      //로컬 스토리지에 accessToken이 있다면
      if (accessToken) {
        //커플 등록 여부 체크
        if (isSuccess && data.coupleId !== null) {
          //커플일 시에 → /home
          router.push("/home");
        } //커플 아닐 시에 → /couple
        else if (isSuccess && data.coupleId === null) {
          router.push("/couple");
        }
        //로컬 스토리지에 accessToken이 없다면
        // PWA에서 설치한 경우 그리고 온보딩이 완료되지 않은 경우
      } else if (isStandalone && !isInboardFinished) {
        router.push("/onboard");

        // PWA에서 설치한 경우 그리고 온보딩이 완료된 경우
      } else if (isStandalone && isInboardFinished) {
        router.push("/login");

        // PWA에서 설치되어있지 않은 경우
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
