"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // iOS 기기인지 확인 (iPhone, iPad, iPod) 및 MSStream이 없는 경우
    setIsIOS(/iPhone|iPad|iPod/.test(navigator.userAgent) && !("MSStream" in window));

    // PWA가 standalone 모드로 실행 중인지 확인
    const isStandaloneMode = window.matchMedia("(display-mode: standalone)").matches;
    setIsStandalone(isStandaloneMode);

    // PWA가 standalone 모드로 실행 중인 경우 스플래쉬 페이지로 즉시 이동
    if (isStandaloneMode) {
      router.push("/splash");
    }
  }, []);

  // isStandalone 상태가 null일 때 로딩 화면 표시
  if (isStandalone === null) {
    return <div className="flex items-center justify-center h-screen">로딩 중...</div>;
  }

  return (
    <div className="max-w-md mx-auto mb-32 md:mb-0 p-6 bg-white rounded-2xl shadow-lg text-center border">
      \
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
      <button onClick={() => router.push("/splash")} className="mt-6 px-4 py-2  underline text-sm ">
        시작
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <InstallPrompt />
    </main>
  );
}
