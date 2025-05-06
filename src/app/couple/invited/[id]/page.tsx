"use client";
import Button from "@/shared/ui/Button";
import { useParams } from "next/navigation";
import React from "react";

const CoupleInvitePage = () => {
  const { id: inviteCode } = useParams();

  return (
    <div className="flex flex-col items-center justify-between h-screen p-5 pt-24">
      <h1 className="text-2xl text-center w-full font-bold mb-4">환영합니다!</h1>
      <div className="h-full w-full flex flex-col items-center mt-44 gap-4">
        <div className="font-semibold text-xl">박춘향 님의 초대를 받고 오셨나요?</div>
        <div className="text-lg font-bold w-full text-center rounded-lg bg-[#F6F6F6] py-2.5">
          {inviteCode}
        </div>
      </div>
      <div className="flex w-full gap-4">
        <Button onClick={() => console.log(1)} active={false}>
          아니오
        </Button>
        <Button onClick={() => console.log(1)}>맞아요!</Button>
      </div>
    </div>
  );
};

export default CoupleInvitePage;
