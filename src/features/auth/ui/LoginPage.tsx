"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import LoginButton from "@/features/auth/ui/LoginButton";
import { http } from "@/shared/lib/http";
import LogoLoading from "@/widgets/LogoLoading";
import { fetchMyInfo } from "@/entities/user/lib/fetchMyInfo";

interface LoginResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

interface ErrorWithResponse {
  res?: {
    code?: number;
    message?: string;
  };
}

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [loading, setLoading] = useState(false);

  const redirectAfterLogin = (coupleId: string | null, inviteCode: string | null) => {
    if (coupleId) {
      router.push("/home");
      return;
    }
    if (inviteCode && inviteCode.trim().length > 0) {
      router.push(`/couple/invited?inviteCode=${encodeURIComponent(inviteCode)}`);
      return;
    }

    router.push("/couple");
  };

  useEffect(() => {
    if (!code) return;

    let isMounted = true;
    setLoading(true);

    const loginHandler = async () => {
      try {
        const res = await http
          .post(`api/auth/kakao/login?code=${code}&local=${process.env.NEXT_PUBLIC_LOCAL_BOOLEAN}`)
          .json<LoginResponse>();

        if (res.code === 2000) {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          const inviteCode = localStorage.getItem("inviteCode");
          const user = await fetchMyInfo();
          if (!isMounted) return;
          redirectAfterLogin(user.coupleId, inviteCode);
        } else {
          throw new Error(res.message || "로그인 실패");
        }
      } catch (err) {
        const error = err as ErrorWithResponse;
        const isAlreadyLoggedIn = error?.res?.code === 41001;
        if (isAlreadyLoggedIn) {
          const user = await fetchMyInfo();
          if (!isMounted) return;
          const inviteCode = localStorage.getItem("inviteCode");
          redirectAfterLogin(user.coupleId, inviteCode);
        } else {
          if (!isMounted) return;
          router.replace("/login");
        }
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    setTimeout(loginHandler, 0);

    return () => {
      isMounted = false;
    };
  }, [code]);

  return (
    <div className="flex flex-col items-center justify-between h-[100dvh] p-5">
      {loading && <LogoLoading />}

      <div className="text-center h-[80%] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-ppink">wooimi</h1>
        <p className="text-xl font-medium">우리는 이별을 미루기로 했다.</p>
      </div>

      <div className="w-full flex flex-col items-center gap-4 mb-12.5">
        <LoginButton provider="kakao" />
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
