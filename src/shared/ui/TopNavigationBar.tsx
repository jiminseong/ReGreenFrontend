"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FC } from "react";

interface TopNavigationBarProps {
  title: string;
  backPage?: string;
}

const TopNavigationBar: FC<TopNavigationBarProps> = ({ title, backPage = "/home" }) => {
  const router = useRouter();

  return (
    <div className="py-4 text-center relative">
      <button onClick={() => router.push(backPage)} className="absolute left-5 text-lg">
        <Image src="/icon/activity/leftArrow.svg" width={28} height={28} alt="홈으로 돌아가기" />
      </button>
      <h1 className="text-lg font-bold">{title}</h1>
    </div>
  );
};

export default TopNavigationBar;
