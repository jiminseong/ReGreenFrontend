import TopNavigationBar from "@/shared/ui/TopNavigationBar";
import TermsContent from "@/widgets/mypage/TermsContent";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col h-[100dvh]">
      <TopNavigationBar title="이용약관" backPage="/home/mypage" />
      <div className="flex-1 scrollable-area no-scrollbar">
        <TermsContent />
      </div>
    </div>
  );
};

export default page;
