import Image from "next/image";

import React from "react";

interface LoginButtonProps {
  provider?: "kakao" | "naver";
}

const LoginButton: React.FC<LoginButtonProps> = ({ provider = "kakao" }) => {
  const handleLogin = async () => {
    console.log(`${process.env.NEXT_PUBLIC_KAKAO_URL}`);
    window.location.href =
      provider === "kakao"
        ? `${process.env.NEXT_PUBLIC_KAKAO_URL}`
        : `${process.env.NEXT_PUBLIC_KAKAO_URL}`;
  };

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
