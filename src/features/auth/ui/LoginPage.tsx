"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import LoginButton from "@/features/auth/ui/LoginButton";
import { http } from "@/shared/lib/http";
import Loading from "@/widgets/Loading";
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
  const [inviteCode, setInviteCode] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

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
    // 최초 1회만 실행 (deps 비움)
    const storedInviteCode = localStorage.getItem("inviteCode") || searchParams.get("inviteCode");
    if (storedInviteCode && storedInviteCode.length === 6) {
      setInviteCode(storedInviteCode);
    } else {
      setInviteCode(null);
    }
  }, []);

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

          const user = await fetchMyInfo();
          if (!isMounted) return;

          redirectAfterLogin(user.coupleId);
        } else {
          throw new Error(res.message || "로그인 실패");
        }
      } catch (err) {
        const error = err as ErrorWithResponse;
        const isAlreadyLoggedIn = error?.res?.code === 41001;
        if (isAlreadyLoggedIn) {
          const user = await fetchMyInfo();
          if (!isMounted) return;
          redirectAfterLogin(user.coupleId);
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
