import FinishedActivityList from "@/features/mypage/ui/FinishedActivityList";
import TopNavigationBar from "@/shared/ui/TopNavigationBar";

import React from "react";

const MyPageListPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopNavigationBar title="인증내역" backPage="/home/mypage" />
      <FinishedActivityList />
    </div>
  );
};

export default MyPageListPage;
