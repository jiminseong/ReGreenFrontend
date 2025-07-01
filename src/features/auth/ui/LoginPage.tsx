"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import LoginButton from "@/features/auth/ui/LoginButton";
import { httpNoThrow } from "@/shared/lib/http";
import LogoLoading from "@/widgets/LogoLoading";
import { fetchMyInfo } from "@/entities/user/lib/fetchMyInfo";
import { LoginResponse } from "../model/type";
import { fetchCoupleInfo } from "@/entities/user/lib/fetchCoupleInfo";
import { useToastStore } from "@/shared/model/useToastStore";
import Toast from "@/widgets/Toast";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { isOpen, openToast, message } = useToastStore();
  const [loading, setLoading] = useState(false);

  // 리디렉션 경로 계산 함수
  const getRedirectPath = (
    coupleId: string | null,
    inviteCode: string | null,
    coupleName: string | null
  ) => {
    if (coupleId && !coupleName) return "/couple/nickname";
    if (coupleId) return "/home";
    if (inviteCode?.trim()) return `/couple/invited?inviteCode=${encodeURIComponent(inviteCode)}`;
    return "/couple";
  };

  // 로그인 완료 후 리디렉션
  const redirectAfterLogin = (
    coupleId: string | null,
    inviteCode: string | null,
    coupleName: string | null
  ) => {
    const path = getRedirectPath(coupleId, inviteCode, coupleName);
    localStorage.removeItem("inviteCode");
    window.location.replace(path);
  };

  // 토큰이 이미 있는 경우 자동 리디렉션
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!code && token) {
      (async () => {
        setLoading(true);
        try {
          const inviteCode = localStorage.getItem("inviteCode");

          const user = await fetchMyInfo();

          const coupleInfo = await fetchCoupleInfo();

          const coupleName = coupleInfo.data?.name ?? null;

          redirectAfterLogin(user.coupleId, inviteCode, coupleName);
        } catch (error) {
          console.error("[useEffect] 자동 리디렉션 실패:", error);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  // 카카오 로그인 처리
  useEffect(() => {
    if (!code) return;

    let isMounted = true;
    setLoading(true);

    (async () => {
      try {
        const res = await httpNoThrow
          .post(`api/auth/kakao/login?code=${code}&local=${process.env.NEXT_PUBLIC_LOCAL_BOOLEAN}`)
          .json<LoginResponse>();

        if (res.code === 2000) {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
        } else {
          throw new Error(res.message || "로그인 실패");
        }

        if (res.err?.code === 41001) {
          openToast("로그인에 실패했습니다. 다시 시도해주세요.");
          const inviteCode = localStorage.getItem("inviteCode");
          const user = await fetchMyInfo();
          const coupleInfo = await fetchCoupleInfo();
          if (isMounted) await redirectAfterLogin(user.coupleId, inviteCode, coupleInfo.data.name);
        } else {
          if (isMounted) window.location.replace("/login");
        }

        if (!isMounted) {
          return;
        }

        const inviteCode = localStorage.getItem("inviteCode");
        const user = await fetchMyInfo();

        const coupleInfo = await fetchCoupleInfo();

        const coupleName = coupleInfo.data?.name ?? null;
        await redirectAfterLogin(user.coupleId, inviteCode, coupleName);
      } catch (err) {
        if (err && typeof err === "object" && "status" in err && err.status === 401) {
          console.error("[useEffect] 로그인 처리 중 오류 발생:", err);
          openToast("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [code]);

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
