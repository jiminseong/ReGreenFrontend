import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as authService from "@/features/auth/lib/authService";
import { useToastStore } from "@/shared/model/useToastStore";

export const useAuthRedirect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { openToast } = useToastStore();
  const [loading, setLoading] = useState(false);

  const getRedirectPath = useCallback(
    (coupleId: string | null, inviteCode: string | null, coupleName: string | null) => {
      if (coupleId && !coupleName) return "/couple/nickname";
      if (coupleId) return "/home";
      if (inviteCode?.trim()) return `/couple/invited?inviteCode=${encodeURIComponent(inviteCode)}`;
      return "/couple";
    },
    []
  );

  useEffect(() => {
    const inviteCode = localStorage.getItem("inviteCode");

    const run = async () => {
      setLoading(true);
      try {
        // 1) 카카오 콜백 처리
        if (code) {
          const res = await authService.loginWithKakao(code);
          if (res.code === 2000) {
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
          } else {
            throw new Error(res.err?.code === 41001 ? "LOGIN_FAILED" : res.message);
          }
        }

        // 2) 자동 Silent Refresh + 내 정보 조회
        const user = await authService.fetchMyInfo(); // 실패 시 http 훅에서 refresh 시도
        const coupleInfo = await authService.fetchCoupleInfo();

        // 3) 리다이렉트
        router.replace(getRedirectPath(user.coupleId, inviteCode, coupleInfo.data?.name ?? null));
      } catch (err) {
        console.error(err);
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        // 로그인 콜백 실패 or refresh 실패 등
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        openToast(
          errorMessage === "LOGIN_FAILED"
            ? "로그인에 실패했습니다. 다시 시도해주세요."
            : "세션이 만료되었습니다. 다시 로그인해주세요."
        );
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    // code 있거나, 토큰만 남아 있으면 시도
    if (code || localStorage.getItem("accessToken")) {
      run();
    }
  }, [code, router, openToast, getRedirectPath]);

  return { loading };
};
