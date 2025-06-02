"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import LoginButton from "@/features/auth/ui/LoginButton";
import { http } from "@/shared/lib/http";
import Loading from "@/widgets/Loading";
import { useMyInfo } from "@/entities/user/lib/userMyInfo";

interface LoginPageProps {
  inviteCode: string; // 초대 코드가 있을 경우
}
const LoginPage = ({ inviteCode }: LoginPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { data } = useMyInfo();

  const [hasRequestedLogin, setHasRequestedLogin] = useState(false); // 중복 방지
  const [loading, setLoading] = useState(false); // 로딩 상태

  // 1. 카카오 로그인 요청
  //    - code가 없거나 이미 로그인 요청을 했다면 아무것도 하지 않음
  //    - code가 있다면 카카오 로그인 API를 호출하여 accessToken과 refreshToken을 받아옴
  //    - 로그인 성공 시 hasRequestedLogin을 true로 설정하여 중복 요청 방지
  //    - 로그인 실패 시 에러 메시지 출력
  //    - 로그인 성공 시 쿠키에 accessToken과 refreshToken을 저장
  //    - 로그인 성공 후 페이지 새로고침 (선택적)
  //    - 로그인 성공 후 coupleId에 따라 페이지 분기
  //    - inviteCode가 있으면 /couple/invited/Encoded[inviteCode]로 이동
  //    - coupleId가 있으면 /home으로, 없으면 /couple로 이동

  useEffect(() => {
    if (!code || hasRequestedLogin) return;

    const loginHandler = async () => {
      try {
        setLoading(true);
        const res = await http
          .post(`api/auth/kakao/login?code=${code}&local=${process.env.NEXT_PUBLIC_LOCAL_BOOLEAN}`)
          .json<{
            code: number;
            message: string;
            data: { accessToken: string; refreshToken: string };
          }>();

        if (res.code === 2000) {
          await setLoading(false);
          setHasRequestedLogin(true);
          // 로컬 스토리지에 accessToken과 refreshToken 저장
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          if (data?.coupleId) {
            router.push("/home");
          } else if (data?.coupleId === null && inviteCode.length === 0) {
            // 커플이 없고, 초대 받기 로직으로부터 온 경우가 아니라면 couple 페이지로 이동
            router.push("/couple");
          } else if (data?.coupleId === null && inviteCode.length > 0) {
            // 초대 코드가 없고, 초대 받기 로직으로부터 온 경우
            const encodedInviteCode = encodeURIComponent(inviteCode);
            router.push(`/couple/invited/${encodedInviteCode}`);
          }
        } else {
        }
      } catch (error) {
        await setLoading(false);
        console.error("로그인 요청 실패", error);
      }
    };

    loginHandler();
  }, [code, hasRequestedLogin]);

  return (
    <div className="flex flex-col items-center justify-between h-screen p-5 ">
      {loading && <Loading />}
      {/* 로고 및 타이틀 */}
      <div className="text-center h-[80%] flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold text-ppink">wooimi</h1>
        <p className="text-xl">우리는 이별을 미루기로 했다.</p>
      </div>

      <div className="w-full items-center justify-center flex flex-col gap-4 mb-12.5">
        <LoginButton provider="kakao" />
        {/* <LoginButton provider="naver" /> */}

        <button
          onClick={() => window.open(`${process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL}`, "_blank")}
          className="underline text-sm text-gray-500 "
        >
          로그인에 어려움이 있나요?
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
