"use client";
import Button from "@/shared/ui/Button";
import { useMyInfo } from "@/features/auth/lib/userMyInfo";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { http } from "@/shared/lib/http";

import { useToastStore } from "@/entities/user/model/store";

const CoupleInvitePage = () => {
  const router = useRouter();
  const data = useMyInfo();
  const [inviteCode, setInviteCode] = React.useState<string>("");

  const setIsCoupleJoinedToast = useToastStore((state) => state.setIsCoupleJoinedToast);

  // 커플이라면 초대 코드 발급 누르면 발급 후
  const postInviteCode = async () => {
    setIsCoupleJoinedToast(true);
    router.push(`/home`);
    if (data.isSuccess) {
      if (data.data.coupleId === null) {
        // 발급 API 호출
        try {
          const res = await http.post("api/couples/join", { body: inviteCode }).json<{
            statusCode: number;
            message: string;
            data: { coupleId: string };
          }>();
          if (res.statusCode === 2300) {
            console.log("참여 성공");
          }
        } catch (error) {
          console.error("초대 코드 발급 요청 실패", error);
        }
      }
      return;
    }
  };

  useEffect(() => {
    // 로그인 여부 우선 판단
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }
    if (data.isSuccess) {
      if (data.data.coupleId) {
        // 커플이 이미 존재하는 경우
        router.push("/home");
      } else {
        return;
      }
    }
  });

  return (
    <div className="flex flex-col items-center justify-between h-screen p-5 pt-24">
      {/* 로고 및 타이틀 */}
      <h1 className="text-2xl text-center w-full font-bold mb-4">환영합니다!</h1>
      <div className="h-full w-full flex flex-col items-center mt-44 gap-4">
        <div className="font-semibold text-xl">상대방의 초대를 받고 오셨나요?</div>
        <input
          value={inviteCode}
          className="text-lg font-bold w-full text-center rounded-lg bg-[#F6F6F6] py-2.5"
          placeholder="초대 코드를 입력해주세요"
          onChange={(e) => setInviteCode(e.target.value)}
        />
        <div className="text-sm text-[#AFAFAF]">초대 코드는 6자리입니다.</div>
      </div>
      <div className="flex w-full gap-4">
        <Button onClick={() => router.push("/couple")} active={false}>
          아니오
        </Button>
        <Button onClick={() => postInviteCode()}>확인</Button>
      </div>
    </div>
  );
};

export default CoupleInvitePage;
