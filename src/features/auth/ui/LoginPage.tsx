"use client";
import { useMyInfo } from "@/features/auth/lib/userMyInfo";
import LoginButton from "@/features/auth/ui/LoginButton";
import { http } from "@/shared/lib/http";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { data, isSuccess } = useMyInfo();
  const code = useSearchParams().get("code");
  const router = useRouter();

  // 코드를 통해 token을 발급받고, 저장하는 프록시 route.ts

  async function loginHandler() {
    if (!code) return;
    console.log(`${process.env.NEXT_PUBLIC_KAKAO_URL}`);
    try {
      const res = await http
        .post(`api/auth/kakao/login?code=${code}&local=${process.env.NEXT_PUBLIC_LOCAL_BOOLEAN}`)
        .json<{
          code: number;
          message: string;
          data: { accessToken: string; refreshToken: string };
        }>();

      if (res.code === 2100) {
        console.log("로그인 성공");
        // TODO: accessToken, refreshToken HttpOnly 쿠키에 저장 처리
        // 반환받은 토큰을 HttpOnly 쿠키에 저장하는 로직
        document.cookie = `accessToken=${res.data.accessToken}; HttpOnly; Secure; SameSite=Strict`;
        document.cookie = `refreshToken=${res.data.refreshToken}; HttpOnly; Secure; SameSite=Strict`;

        window.location.reload();
      } else {
        console.log("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 요청 실패", error);
    }
  }

  // 로그인 상태 확인 후 커플 여부에 따라 페이지 이동
  useEffect(() => {
    loginHandler();
    if (!isSuccess) return;

    if (data.coupleId) {
      // 커플이면 홈으로 이동
      router.push("/home");
    } else {
      router.push("/couple");
    }
  }, [isSuccess, data]);

  return (
    <div className="flex flex-col items-center justify-between h-screen p-5  ">
      {/* 로고 및 타이틀 */}
      <div className="text-center h-[60%] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-ppink">wooimi</h1>
        <p className="text-xl ">우리는 이별을 미루기로 했다.</p>
      </div>

      <div className=" w-full items-center justify-center flex flex-col gap-4">
        {/* 카카오 로그인 버튼 */}
        <LoginButton provider="kakao" />
        {/* 네이버 로그인 버튼 */}
        {/* <LoginButton provider="naver" /> */}
      </div>
      {/* 하단 텍스트 */}
      <button className="underline text-sm text-gray-500 mt-4">로그인에 어려움이 있나요?</button>
    </div>
  );
};

export default LoginPage;
