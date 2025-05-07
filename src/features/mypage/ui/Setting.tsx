"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Setting = () => {
  const router = useRouter();

  const menuItems = [
    { label: "건의하기", path: "/feedback" },
    { label: "이용약관", path: "/terms" },
  ];

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
            onClick={() => router.push(item.path)}
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
