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
  }, []);

  useEffect(() => {
    if (isPending) return;
    const onboarded = localStorage.getItem("onboarded");

    // PWA 미설치 + 아직 "웹으로 시작" 선택 안한 경우: 설치 안내만 보여줌
    if (!isStandalone && !promptSkipped) {
      setPromptVisible(true);
      return;
    }

    if (data?.coupleId) {
      if (onboarded === "true") {
        router.push("/home");
      } else {
        router.push("/couple");
      }
    } else {
      if (onboarded === "true") {
        router.push("/login");
      }
    }

    if (onboarded !== "true") {
      router.push("/onboard");
    }
  }, [isPending, isSuccess, data, isStandalone, promptSkipped]);

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
