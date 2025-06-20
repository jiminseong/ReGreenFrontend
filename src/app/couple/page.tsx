"use client";

import Button from "@/shared/ui/Button";
import Image from "next/image";
import { useMyInfo } from "@/entities/user/lib/userMyInfo";
import { useRouter } from "next/navigation";
import { http } from "@/shared/lib/http";
import { useEffect } from "react";

const CoupleCheckPage = () => {
  const router = useRouter();
  const data = useMyInfo();

  // 커플이라면 초대 코드 발급 누르면 발급 후
  const handleInvite = async () => {
    if (data.isSuccess) {
      if (data.data.coupleId === null) {
        // 발급 API 호출
        try {
          const res = await http.get("api/couples/code").json<{
            code: number;
            message: string;
            data: { code: string };
          }>();
          if (res.code === 2000) {
            // 초대 코드 페이지로 이동
            const URLDecodedInviteCode = encodeURIComponent(res.data.code);
            router.push(`/couple/invite/${URLDecodedInviteCode}`);
          } else if (res.code === 42002) {
          }
        } catch (error) {
          console.error("초대 코드 발급 요청 실패", error);
        }
      }
      return;
    }
  };

  // 초대 코드 발급 입력 페이지로 이동
  const handleInvited = () => {
    if (data.isSuccess) {
      if (data.data.coupleId === null) {
        router.push(`/couple/invited`);
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
    <div className="flex flex-col items-center justify-between h-[100dvh] p-5 pb-8 pt-24">
      <h1 className="text-2xl text-center w-full font-bold mb-4">
        친구, 연인을 <br />
        초대해 주세요!
      </h1>
      <Image src="/image/couple/coupleInvite.png" width={255} height={260} alt="일러스트" />
      <div className="w-full flex flex-col gap-2">
        <Button onClick={() => handleInvite()}>초대하러 가기 </Button>
        <Button primary={false} onClick={() => handleInvited()}>
          초대받으러 가기 {">"}
        </Button>
      </div>
    </div>
  );
};

export default CoupleCheckPage;
