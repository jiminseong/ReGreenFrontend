"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginButton from "@/features/auth/ui/LoginButton";

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // 로그인 상태가 true라면 홈(/home)으로 리다이렉트
    if (isLoggedIn === "true") {
      router.push("/home");
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-between h-screen p-5  ">
      {/* 로고 및 타이틀 */}
      <div className="text-center h-[60%] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-ppink">wooimi</h1>
        <p className="text-xl ">우리는 이별을 미루기로 했다.</p>
      </div>

      <div className=" w-full items-center justify-center flex flex-col gap-4">
        {/* 카카오 로그인 버튼 */}
        <LoginButton provider="kakao" />
        {/* 네이버 로그인 버튼 */}
        <LoginButton provider="naver" />
      </div>
      {/* 하단 텍스트 */}
      <button className="underline text-sm text-gray-500 mt-4">로그인에 어려움이 있나요?</button>
    </div>
  );
};

export default LoginPage;
