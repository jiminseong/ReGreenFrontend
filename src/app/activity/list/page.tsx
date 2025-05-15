"use client";
import StatusList from "@/features/certification/ui/StatusList";
import TopNavigationBar from "@/shared/ui/TopNavigationBar";
import ActivityList from "@/features/certification/ui/ActivityList";
import React, { useState } from "react";
import AuthGuard from "@/shared/lib/AuthGuard";

const ActivitySelectPage = () => {
  const [activeTab, setActiveTab] = useState("select");

  return (
    <div className="flex flex-col h-screen">
      {/* 상단 네비게이션 바 */}
      <AuthGuard />
      <TopNavigationBar title="인증하기" />

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
