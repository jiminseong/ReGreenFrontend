"use client";
import StatusList from "@/features/certification/ui/StatusList";
import TopNavigationBar from "@/shared/ui/TopNavigationBar";
import ActivityList from "@/features/certification/ui/ActivityList";
import React, { useEffect, useState } from "react";
import ActivityDescription from "@/features/description/ui/ActivityDescription";
import { useActivityTourStore } from "@/features/certification/model/useActivityTourStore";
import {PreventIOSPullToRefresh} from "@/app/preventIOSPullToRefresh";

const ActivitySelectClientPage = () => {
  const [activeTab, setActiveTab] = useState("select");
  const { isSeen, setSeen, syncWithLocalStorage } = useActivityTourStore();

  const handleTourFinish = () => {
    setSeen(true);
    syncWithLocalStorage();
  };

  useEffect(() => {
    syncWithLocalStorage();
  }, [syncWithLocalStorage]);

  return (
    <div className="flex relative flex-col h-[100dvh] overflow-y-hidden">
      {isSeen === false && <ActivityDescription onFinish={handleTourFinish} />}
      {/* 상단 네비게이션 바 */}

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
      <div className="flex-1 overflow-y-hidden">
        {activeTab === "select" ? <ActivityList /> : <StatusList />}
      </div>
    </div>
  );
};

export default ActivitySelectClientPage;
