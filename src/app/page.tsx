"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SplashContent from "@/widgets/splash/SplashContent";

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const router = useRouter();

  //TODO : onboard 열람 했었으면 -> 홈으로 이동 하는 로직
  //TODO : onboard 열람 안했으면 -> onboard로 이동 하는 로직
  useEffect(() => {
    // 3초간 SplashContent 보여주고, iOS 여부 및 standalone 여부 확인
    const timer = setTimeout(() => {
      const isIOSDevice = /iPhone|iPad|iPod/.test(navigator.userAgent) && !("MSStream" in window);
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        ("standalone" in window.navigator && window.navigator.standalone === true);

      if (isStandalone) {
        router.push("/onboard");
      } else {
        setIsIOS(isIOSDevice);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="max-w-md mx-auto mb-32 md:mb-0 p-6 bg-white rounded-2xl shadow-lg text-center border">
      {isIOS ? (
        <div className="text-sm text-gray-500">
          iOS에서는 아래의
          <div className="flex justify-center items-center mt-2">
            <span className="font-semibold mr-1">공유 버튼</span>
            <Image src="/icon/shareIcon.svg" width={16} height={16} alt="공유하기" />을 누른 후
          </div>
          <div className="flex justify-center items-center mt-2">
            <span className="font-semibold mr-1">‘홈 화면에 추가’</span>
            <Image src="/icon/plusIcon.svg" width={16} height={16} alt="추가하기" />를 선택해주세요.
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          브라우저 주소창 옆에 <strong>설치 버튼</strong>이 보인다면 눌러서 <br /> 홈 화면에 추가할
          수 있어요.
        </p>
      )}
      <button onClick={() => router.push("/onboard")} className="mt-6 px-4 py-2 underline text-sm">
        웹으로 그냥 시작하기
      </button>
    </div>
  );
}

export default function Page() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      {showPrompt ? <InstallPrompt /> : <SplashContent />}
    </main>
  );
}
