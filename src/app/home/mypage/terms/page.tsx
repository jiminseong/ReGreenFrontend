import TopNavigationBar from "@/shared/ui/TopNavigationBar";
import TermsContent from "@/widgets/mypage/TermsContent";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col h-screen">
      <TopNavigationBar title="이용약관" backPage="/home/mypage" />
      <TermsContent />
    </div>
  );
};

export default page;
