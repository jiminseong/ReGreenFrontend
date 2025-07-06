"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMyInfo } from "@/entities/user/lib/userMyInfo";
import InstallPrompt from "@/features/splash/ui/InstallPrompt";
import { useInstallPromptStore } from "@/features/splash/ui/model/store";
import { KakaoInAppBanner } from "@/shared/ui/KakaoInAppBanner";
import { PreventZoomGesture } from "@/app/preventZoomGesture";

export default function Page() {
  const router = useRouter();
  const { data, isSuccess, isPending } = useMyInfo();

  const {
    isIOS,
    isGoogleApp,
    isAndroid,
    isStandalone,
    promptVisible,
    promptSkipped,
    setPromptSkipped,
    initEnvironment,
    setPromptVisible,
  } = useInstallPromptStore();

  useEffect(() => {
    initEnvironment();
  }, [initEnvironment]);

  useEffect(() => {
    if (isPending) return;
    const onboarded = localStorage.getItem("onboarded");

    // PWA 미설치 + 아직 "웹으로 시작" 선택 안한 경우: 설치 안내만 보여줌
    if (!isStandalone && !promptSkipped) {
      setPromptVisible(true);
      return;
    }

    // 1) 온보딩이 완료되지 않은 경우 최우선 처리
    if (onboarded !== "true") {
      router.push("/onboard");
      return;
    }

    // 2) 커플 정보 유무에 따른 라우팅
    if (data?.coupleId) {
      router.push("/home");
      return;
    }

    // 3) 로그인 상태가 필요한 경우
    router.push("/login");
  }, [isPending, isSuccess, data, isStandalone, promptSkipped, router, setPromptVisible]);

  return (
    <main className="min-h-[100dvh] bg-white flex  items-center justify-center px-4">
      <PreventZoomGesture />
      <KakaoInAppBanner />
      {promptVisible && (
        <InstallPrompt
          isIOS={isIOS}
          isGoogleApp={isGoogleApp}
          isAndroid={isAndroid}
          onSkip={() => {
            setPromptSkipped();
            setPromptVisible(false);
          }}
        />
      )}
    </main>
  );
}
