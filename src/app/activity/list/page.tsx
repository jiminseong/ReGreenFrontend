"use client";
import StatusList from "@/entities/user/ui/StatusList";
import ActivityList from "@/widgets/activity/ActivityList";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ActivitySelectPage = () => {
  const [activeTab, setActiveTab] = useState("select");
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen">
      {/* 상단 네비게이션 바 */}
      <div className="py-4 text-center relative ">
        <button onClick={() => router.push("/home")} className="absolute left-5 text-lg">
          <Image src="/icon/activity/leftArrow.svg" width={28} height={28} alt="홈으로 돌아가기" />
        </button>
        <h1 className="text-lg font-bold">인증하기</h1>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex justify-center mt-4 ">
        <button
          className={`flex-1 text-center py-4 ${
            activeTab === "select"
              ? "text-black font-bold border-b-[1.65px] border-black"
              : "text-gray-400 border-b-[1.65px] border-[#EFEFEF]"
          }`}
          onClick={() => setActiveTab("select")}
        >
          환경보호활동
        </button>
        <button
          className={`flex-1 text-center py-4 ${
            activeTab === "status"
              ? "text-black font-bold border-b-2 border-black"
              : "text-gray-400 border-b-[1.65px] border-[#EFEFEF]"
          }`}
          onClick={() => setActiveTab("status")}
        >
          인증현황
        </button>
      </div>

      {/* 탭 내용 */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "select" ? <ActivityList /> : <StatusList />}
      </div>
    </div>
  );
};

export default ActivitySelectPage;
