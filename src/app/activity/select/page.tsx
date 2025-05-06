"use client";
import ActivityList from "@/widgets/activity/ActivityList";
import Image from "next/image";
import React from "react";

const ActivitySelectPage = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* 상단 네비게이션 바 */}
      <div className="py-4 text-center">
        <button className="absolute left-5 text-lg ">
          <Image src="/icon/activity/leftArrow.svg" width={28} height={28} alt="홈으로 돌아가기" />
        </button>
        <h1 className="text-lg font-bold">인증하기</h1>
        <div></div>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex justify-center mt-4">
        <button className="flex-1 text-center py-4 text-black font-bold">환경보호활동</button>
        <button className="flex-1 text-center py-4 text-gray-400">인증현황</button>
      </div>

      {/* 탭 내용 */}
      <ActivityList />
    </div>
  );
};

export default ActivitySelectPage;
