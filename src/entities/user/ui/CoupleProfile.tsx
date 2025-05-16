"use client";
import Image from "next/image";
import React from "react";
import { useCoupleInfo } from "../lib/useCoupleInfo";

const CoupleProfile = () => {
  const { data, isPending } = useCoupleInfo();

  const renderProfile = (memberIndex: number) => {
    if (isPending || !data?.data.members[memberIndex]) {
      return (
        <div className="flex flex-col items-center gap-2.5 animate-pulse">
          <div className={`bg-gray-300 rounded-full`} style={{ width: 100, height: 100 }} />
          <div className={`bg-gray-300 w-24 h-4rounded`} />
        </div>
      );
    }

    const member = data.data.members[memberIndex];
    return (
      <div className="relative flex   w-[100px] h-[100px] flex-col items-center gap-2.5">
        <Image
          className="rounded-full object-cover"
          src={member.profileImageUrl ?? "/default/profile.png"}
          alt="커플 프로필"
          fill
        />
        <p className={`font-bold text-[#121212] absolute bottom-[-32px]`}>{member.nickname}</p>
      </div>
    );
  };

  return (
    <div className={`mt-6 mb-6 relative flex items-end justify-center gap-3 `}>
      {renderProfile(0)}

      <div className="py-1 flex items-end justify-center">
        <Image
          src="/icon/home/lightHeartIcon.svg"
          alt="하트 아이콘"
          width={20}
          height={20}
          className="absolute z-1 bottom-[-28px]"
        />
      </div>

      {renderProfile(1)}
    </div>
  );
};

export default CoupleProfile;
