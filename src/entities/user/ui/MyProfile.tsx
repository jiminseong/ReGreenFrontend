"use client";
import Image from "next/image";
import React from "react";
import { useMyInfo } from "../lib/userMyInfo";

const MyProfile = () => {
  const { data, isPending } = useMyInfo();

  return (
    <div className="relative flex  w-[51px] h-[51px] flex-col items-center gap-2.5">
      <div className={`flex flex-col items-center gap-2.5 ${isPending ? "animate-pulse" : ""}`}>
        <div className={`bg-gray-300 rounded-full`} style={{ width: 51, height: 51 }} />

        <Image
          className="rounded-full object-cover"
          src={data?.profileImageUrl ?? "/default/profile.png"}
          alt="유저 프로필"
          fill
        />
      </div>
      <p className={`font-semibold  text-[#121212] absolute bottom-[-32px]`}>프로필</p>
    </div>
  );
};

export default MyProfile;
