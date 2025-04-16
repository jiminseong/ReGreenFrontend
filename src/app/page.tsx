"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(/iPhone|iPad|iPod/.test(navigator.userAgent) && !("MSStream" in window));
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) return null;

  return (
    <div className="max-w-md mx-auto mb-32 md:mb-0 p-6 bg-white rounded-2xl shadow-lg text-center border">
      <h2 className="text-xl font-bold mb-2">우이미 베타버전 설치하기</h2>
      <p className="text-gray-700 text-sm">
        우이미를 홈 화면에 추가하면 <br /> 더 빠르고 편리하게 사용할 수 있어요!
      </p>

      {isIOS ? (
        <p className="mt-4 text-sm text-gray-500">
          iOS에서는 아래의
          <div className="flex justify-center">
            <span className="font-semibold">공유 버튼</span>
            <Image src="icon/shareIcon.svg" width={16} height={16} alt="공유하기" />을 누른 후
          </div>
          <br />
          <div className="flex justify-center">
            <span className="font-semibold"> ‘홈 화면에 추가’ </span>
            <Image src="icon/plusIcon.svg" width={16} height={16} alt="추가하기" />를 선택해주세요.
          </div>
        </p>
      ) : (
        <p className="mt-4 text-sm text-gray-500">
          브라우저 주소창 옆에 <strong>설치 버튼</strong>이 보인다면 눌러서 <br /> 홈 화면에 추가할
          수 있어요.
        </p>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <InstallPrompt />
    </main>
  );
}
