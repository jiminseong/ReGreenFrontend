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
  const inviteCode = localStorage.getItem("inviteCode") || searchParams.get("inviteCode");

  const [loading, setLoading] = useState(false);
  const [loginCompleted, setLoginCompleted] = useState(false);

  const { refetch } = useMyInfo();

  const redirectAfterLogin = (coupleId: string | null) => {
    if (coupleId) {
      router.push("/home");
    } else if (inviteCode) {
      router.push(`/couple/invited/${encodeURIComponent(inviteCode)}`);
    } else {
      router.push("/couple");
    }
  };

  useEffect(() => {
    if (!code || loginCompleted) return;

    const loginHandler = async () => {
      setLoading(true);

      try {
        const res = await http
          .post(`api/auth/kakao/login?code=${code}&local=${process.env.NEXT_PUBLIC_LOCAL_BOOLEAN}`)
          .json<LoginResponse>();

        if (res.code === 2000) {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);

          const { data: user } = await refetch();
          setLoginCompleted(true); // 완료 표시 → 중복 방지
          redirectAfterLogin(user?.coupleId ?? null);
        } else {
          throw new Error(res.message || "로그인 실패");
        }
      } catch (err) {
        const error = err as ErrorWithResponse;
        const isAlreadyLoggedIn = error?.res?.code === 41001;

        if (isAlreadyLoggedIn) {
          const { data: user } = await refetch();
          setLoginCompleted(true);
          redirectAfterLogin(user?.coupleId ?? null);
        } else {
          console.error("로그인 요청 실패", err);
          router.replace("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    // 마운트 후 이벤트 루프 이후 실행 보장
    setTimeout(() => {
      loginHandler();
    }, 0);
  }, [code, loginCompleted, inviteCode, refetch, router]);

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
