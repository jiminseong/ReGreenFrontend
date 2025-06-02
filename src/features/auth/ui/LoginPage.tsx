"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import LoginButton from "@/features/auth/ui/LoginButton";
import { http } from "@/shared/lib/http";
import Loading from "@/widgets/Loading";
import { useMyInfo } from "@/entities/user/lib/userMyInfo";

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
  const inviteCode = searchParams.get("inviteCode") || "";
  const { data: userInfo, isSuccess, refetch } = useMyInfo();

  const [hasRequestedLogin, setHasRequestedLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const redirectAfterLogin = () => {
    if (isSuccess && userInfo?.coupleId) {
      router.push("/home");
    } else if (inviteCode.length > 0) {
      router.push(`/couple/invited/${encodeURIComponent(inviteCode)}`);
    }
  };

  useEffect(() => {
    if (!code || hasRequestedLogin) return;

    const loginHandler = async () => {
      setLoading(true);
      try {
        const res = await http
          .post(`api/auth/kakao/login?code=${code}&local=${process.env.NEXT_PUBLIC_LOCAL_BOOLEAN}`)
          .json<LoginResponse>();

        if (res.code === 2000) {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          setHasRequestedLogin(true);
          refetch();
          redirectAfterLogin();
        } else {
          throw new Error(res.message || "로그인 실패");
        }
      } catch (err) {
        const error = err as ErrorWithResponse;
        const isAlreadyLoggedIn = error?.res?.code === 41001;

        setHasRequestedLogin(true);

        if (isAlreadyLoggedIn) {
          console.log("이미 로그인된 상태입니다.");
          redirectAfterLogin();
        } else {
          console.error("로그인 요청 실패", err);
          router.replace("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    loginHandler();
  }, [code, hasRequestedLogin]);

  return (
    <div className="flex flex-col items-center justify-between h-screen p-5">
      {loading && <Loading />}

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
