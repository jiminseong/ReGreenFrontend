import CoupleGuard from "@/shared/lib/CoupleGuard";
import { FinishedActivityList } from "@/features/mypage/ui/FinishedActivityList";
import TopNavigationBar from "@/shared/ui/TopNavigationBar";

import React from "react";

const MyPageListPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <CoupleGuard />
      <TopNavigationBar title="우리 인증내역" backPage="/home/mypage" />
      <FinishedActivityList />
    </div>
  );
};

export default MyPageListPage;
