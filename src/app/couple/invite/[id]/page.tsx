"use client";
import { useParams } from "next/navigation";
import React from "react";

const CoupleInvitePage = () => {
  const { id: inviteCode } = useParams();

  return (
    <div className="flex flex-col items-center justify-between h-screen p-5 pt-24">
      <h1 className="text-2xl text-left w-full font-bold mb-4">
        초대 코드를 함께하고 싶은
        <br />
        사람에게 공유해 보세요
      </h1>
      <div className="h-full w-full flex flex-col items-center mt-44 gap-4">
        <div>박춘향님 초대 코드입니다.</div>
        <div className="text-lg font-bold w-full text-center rounded-lg bg-[#F6F6F6] py-2.5">
          {inviteCode}
        </div>
        <button className="text-ppink underline font-bold">공유하기</button>
      </div>
    </div>
  );
};

export default CoupleInvitePage;
