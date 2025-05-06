"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
        <button
          className="flex items-center justify-center w-full max-w-xs px-4 py-3  bg-[#F7CE45] border-[1px] border-[#E2E2E2]  font-semibold rounded-xl "
          onClick={() => router.push("/home")}
        >
          <Image
            src="/icon/auth/kakao.svg"
            alt="카카오 로고"
            width={14.87}
            height={14.87}
            className="mr-3"
          />
          카카오 계정으로 로그인
        </button>

        {/* 네이버 로그인 버튼 */}
        <button
          className="flex items-center justify-center w-full max-w-xs px-4 py-3  bg-white border-[1px] border-[#E2E2E2]  font-semibold rounded-xl "
          // onClick={() => router.push("/auth/naver")}
        >
          <Image
            src="/icon/auth/naver.svg"
            alt="네이버 로고"
            width={12.79}
            height={12.79}
            className="mr-3"
          />
          네이버 계정으로 로그인
        </button>
      </div>
      {/* 하단 텍스트 */}
      <button className="underline text-sm text-gray-500 mt-4">로그인에 어려움이 있나요?</button>
    </div>
  );
};

export default LoginPage;
