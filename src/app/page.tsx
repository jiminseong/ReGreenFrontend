"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMyInfo } from "@/entities/user/lib/userMyInfo";
import InstallPrompt from "@/features/splash/ui/InstallPrompt";
import { useInstallPromptStore } from "@/features/splash/ui/model/store";

export default function Page() {
  const router = useRouter();
  const { data, isSuccess, isPending } = useMyInfo();
  

  const {
    isIOS,
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
    const accessToken = localStorage.getItem("accessToken")
    const onboarded = localStorage.getItem("onboarded");

    // PWA 미설치 + 아직 "웹으로 시작" 선택 안한 경우: 설치 안내만 보여줌
    if (!isStandalone && !promptSkipped) {
      setPromptVisible(true);
      return;
    }

    // 로그인 안 된 상태
    if (!isSuccess) {
      router.push("/login");
      return;
    }

    // 로그인 되었고 coupleId 있음 + 온보딩 완료
    if (data?.coupleId && onboarded === "true") {
      router.push("/home");
    }
    // 로그인 되었고 coupleId 없음 + 온보딩 완료
    else if (accessToken && !data?.coupleId && onboarded === "true") {
      router.push("/couple");
    }
    // 로그인 되었으나 온보딩 아직 안한 경우
    else {
      router.push("/onboard");
    }
  }, [isPending, isSuccess, data, isStandalone, promptSkipped]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      {promptVisible && (
        <InstallPrompt
          isIOS={isIOS}
          onSkip={() => {
            setPromptSkipped();
            setPromptVisible(false);
          }}
        />
      )}
    </main>
  );
}
