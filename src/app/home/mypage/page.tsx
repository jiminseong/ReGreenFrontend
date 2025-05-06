import CoupleProfile from "@/entities/user/ui/CoupleProfile";
import SettingList from "@/features/mypage/ui/SettingList";
import TopNavigationBar from "@/shared/ui/TopNavigationBar";
import React from "react";

const MyPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopNavigationBar title="마이페이지" />
      <CoupleProfile className="mt-4" size="large" />
      <SettingList />
    </div>
  );
};

export default MyPage;
