"use client";

import Image from "next/image";

import React from "react";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  provider?: "kakao" | "naver";
}

const LoginButton: React.FC<LoginButtonProps> = ({ provider = "kakao" }) => {
  const router = useRouter();
  function handleLogin() {
    if (provider === "kakao") {
      //임시 구현 : 홈으로 이동
      router.push("/home");
      // window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/kakao/login`;
    } else if (provider === "naver") {
      // window.location.href = "/api/auth/naver"; // 미래 확장 대비
    }
  }

  return (
    <button
      className={`${
        provider === "kakao" ? "bg-[#F7CE45] " : "bg-white "
      }  flex items-center justify-center w-full max-w-xs px-4 py-3  border-[1px] border-[#E2E2E2]  font-semibold rounded-xl `}
      onClick={handleLogin}
    >
      <Image
        src={`/icon/auth/${provider}.svg`}
        alt={`${provider}로그인`}
        width={14.87}
        height={14.87}
        className="mr-3"
      />
      {`${provider === "kakao" ? "카카오" : "네이버"}`} 계정으로 로그인
    </button>
  );
};

export default LoginButton;
