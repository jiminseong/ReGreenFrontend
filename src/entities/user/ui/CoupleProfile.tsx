"use client";
import Image from "next/image";
import React from "react";
import { useCoupleInfo } from "../lib/useCoupleInfo";

const CoupleProfile = () => {
  const { data, isPending } = useCoupleInfo();

  const renderProfile = (memberIndex: number) => {
    if (isPending || !data?.data.members[memberIndex]) {
      return (
        <div
          className={` ${
            memberIndex === 1 ? "" : "flex-row-reverse"
          } w-full items-center flex gap-2.5`}
        >
          <div className="w-[58px] h-[58px] bg-gray-300 rounded-full" />
          <div className="w-[36px] h-[16px] bg-gray-300 rounded-full" />
        </div>
      );
    }

    const member = data.data.members[memberIndex];
    return (
      <div
        className={` ${
          memberIndex === 1 ? "" : "flex-row-reverse"
        } w-full items-center flex gap-2.5`}
      >
        <div className="relative  w-[58px] h-[58px] flex flex-col  items-center gap-2.5">
          <Image
            className="rounded-full object-cover"
            src={member.profileImageUrl ?? "/image/couple/defaultProfile.png"}
            alt="커플 프로필"
            fill
          />
        </div>
        <p className="font-semibold text-[#121212]">{member.nickname}</p>
      </div>
    );
  };

  return (
    <div
      className={` relative bg-[#F0F0F0]  mt-8 py-5 flex items-center justify-center gap-[21px] `}
    >
      {renderProfile(0)}

      <Image src="/icon/home/lightHeartIcon.svg" alt="하트 아이콘" width={15} height={14.15} />

      {renderProfile(1)}
    </div>
  );
};

export default CoupleProfile;
