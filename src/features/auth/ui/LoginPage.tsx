"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import LoginButton from "@/features/auth/ui/LoginButton";
import { http } from "@/shared/lib/http";
import LogoLoading from "@/widgets/LogoLoading";
import { fetchMyInfo } from "@/entities/user/lib/fetchMyInfo";
import { ErrorWithResponse, LoginResponse } from "../model/type";
import { fetchCoupleInfo } from "@/entities/user/lib/fetchCoupleInfo";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code"); // 카카오 로그인 후 리디렉션된 code

  const [loading, setLoading] = useState(false);

  // 로그인 후 커플 여부 및 초대코드에 따라 이동 경로 결정
  const redirectAfterLogin = (
    coupleId: string | null,
    inviteCode: string | null,
    coupleName: string | null
  ) => {
    // 커플 닉네임이 없다면
    if (coupleId && !coupleName) {
      router.push("/couple/nickname");
      return;
    }
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
        // 카카오 로그인 요청
        const res = await http
          .post(`api/auth/kakao/login?code=${code}&local=${process.env.NEXT_PUBLIC_LOCAL_BOOLEAN}`)
          .json<LoginResponse>();

        if (res.code === 2000) {
          // 토큰 저장
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);

          // 로그인 후 유저 정보 조회 및 리디렉션
          const inviteCode = localStorage.getItem("inviteCode");
          const user = await fetchMyInfo();
          const coupleInfo = await fetchCoupleInfo();
          if (!isMounted) return;
          redirectAfterLogin(user.coupleId, inviteCode, coupleInfo.data.name);
        } else {
          throw new Error(res.message || "로그인 실패");
        }
      } catch (err) {
        // 이미 로그인된 경우 예외 처리
        const error = err as ErrorWithResponse;
        const isAlreadyLoggedIn = error?.res?.code === 41001;
        if (isAlreadyLoggedIn) {
          const user = await fetchMyInfo();
          const coupleInfo = await fetchCoupleInfo();
          if (!isMounted) return;
          const inviteCode = localStorage.getItem("inviteCode");
          redirectAfterLogin(user.coupleId, inviteCode, coupleInfo.data.name);
        } else {
          if (!isMounted) return;
          router.replace("/login"); // 실패 시 로그인 페이지로 이동
        }
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    // useEffect 비동기 처리 트릭
    setTimeout(loginHandler, 0);

    return () => {
      isMounted = false; // 컴포넌트 언마운트 방지
    };
  }, [code]);

  return (
    <div className="flex flex-col items-center justify-between h-[100dvh] p-5">
      {loading && <LogoLoading />}

      {/* 인트로 텍스트 영역 */}
      <div className="text-center h-[80%] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-ppink">wooimi</h1>
        <p className="text-xl font-medium">우리는 이별을 미루기로 했다.</p>
      </div>

      {/* 로그인 버튼 영역 */}
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
