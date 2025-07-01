"use client";
import React from "react";
import { useAuthRedirect } from "../lib/useAuthRedirect";
import { useToastStore } from "@/shared/model/useToastStore";
import LoginButton from "@/features/auth/ui/LoginButton";
import LogoLoading from "@/widgets/LogoLoading";
import Toast from "@/widgets/Toast";

const LoginPage = () => {
  const { loading } = useAuthRedirect();
  const { isOpen, message } = useToastStore();

  return (
    <div className="flex flex-col items-center justify-between h-[100dvh] p-5">
      {isOpen && <Toast message={message} />}
      {loading && <LogoLoading />}

      <div className="text-center h-[80%] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-ppink">wooimi</h1>
        <p className="text-xl font-medium">우리는 이별을 미루기로 했다.</p>
      </div>

      <div className="w-full flex flex-col items-center gap-4 mb-12.5">
        <LoginButton provider="kakao" disabled={loading} />
        <button
          onClick={() => window.open(process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL || "#", "_blank")}
          className="underline text-sm text-gray-500"
        >
          로그인에 어려움이 있나요?
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
