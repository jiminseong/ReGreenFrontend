"use client";
import { useMyInfo } from "@/entities/user/lib/userMyInfo";
import Button from "@/shared/ui/Button";
import Toast from "@/widgets/Toast";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CoupleInvitePage = () => {
  const { id: inviteCode } = useParams();
  const URLDecodedInviteCode = decodeURIComponent(inviteCode as string);
  const data = useMyInfo();
  const name = data.isSuccess ? data.data.nickname : "우이미 손님";
  const router = useRouter();
  const [copySuccessToast, setCopySuccessToast] = useState(false);

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}/couple/invited?inviteCode=${URLDecodedInviteCode}`
    );
    setCopySuccessToast(true);
    const timer = setTimeout(() => {
      setCopySuccessToast(false);
    }, 2000);
    return () => clearTimeout(timer);
  }

  function handleCopyToClipboardCode() {
    navigator.clipboard.writeText(URLDecodedInviteCode);
    setCopySuccessToast(true);
    const timer = setTimeout(() => {
      setCopySuccessToast(false);
    }, 2000);
    return () => clearTimeout(timer);
  }

  useEffect(() => {
    if (data.isSuccess) {
      if (data.data.coupleId) {
        // 커플이 이미 존재하는 경우
        router.push("/home");
      } else {
        return;
      }
    } else if (data.isError) {
      // 로그인 여부 우선 판단
      router.push("/login");
      return;
    }
  });

  return (
    <div className="flex flex-col items-center justify-between h-[100dvh] p-5 pb-8 pt-24">
      {copySuccessToast && <Toast message="초대 링크가 복사되었습니다!" position="top" />}
      {/* 로고 및 타이틀 */}
      <h1 className="text-2xl text-center w-full font-bold mb-4">
        초대 코드를 함께하고 싶은
        <br />
        사람에게 공유해 보세요
        <br />
      </h1>
      <div className="h-full w-full flex flex-col items-center mt-44 gap-4">
        <div className="text-center">
          {name}님 초대 코드에요. <br />
          24시간 뒤에 만료됩니다!
        </div>
        <div className="text-lg font-bold w-full text-center rounded-lg bg-[#F6F6F6] py-2.5">
          {URLDecodedInviteCode}
        </div>
        <button onClick={handleCopyToClipboard} className="text-ppink underline font-bold">
          링크로 복사하기
        </button>{" "}
        <button onClick={handleCopyToClipboardCode} className="text-ppink underline font-bold">
          코드로 복사하기
        </button>
      </div>{" "}
      <Button onClick={() => router.push("/home")}>홈으로 가기</Button>
    </div>
  );
};

export default CoupleInvitePage;
