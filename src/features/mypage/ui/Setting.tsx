"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Setting = () => {
  const router = useRouter();
  // https://docs.google.com/forms/d/e/1FAIpQLSdcwgPqeLoHsDdiFPkxdJM87XUXRQNAfXHXpa5oiIVeZm5fCg/viewform?usp=dialog

  const menuItems = [
    { label: "건의하기", path: "/feedback" },
    { label: "오류 문의하기", path: "/cs" },
    { label: "이용약관", path: "/home/mypage/terms" },
  ];

  const handleMenuClick = (path: string) => {
    if (path === "/feedback") {
      window.open(
        "https://docs.google.com/forms/d/e/1FAIpQLSdcwgPqeLoHsDdiFPkxdJM87XUXRQNAfXHXpa5oiIVeZm5fCg/viewform?usp=dialog",
        "_blank"
      );
      return;
    }
    if (path === "/cs") {
      window.open(`${process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL}`, "_blank");
      return;
    }

    router.push(path);
  };
  return (
    <div className="py-2 flex flex-col border-b-[1px] border-b-[#EEEEEE]">
      {/* 상단 네비게이션 바 */}
      <div className="py-4 px-5 text-left relative ">
        <h1 className="text-[#999999] text-[15px] font-medium">설정</h1>
      </div>

      {/* 메뉴 리스트 */}
      <div className="flex flex-col">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleMenuClick(item.path)}
            className="text-left px-5 py-5 text-lg font-medium "
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Setting;
