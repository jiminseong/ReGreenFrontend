"use client";

import Image from "next/image";
import React, { useState } from "react";

const InventoryList = () => {
  const [activeTab, setActiveTab] = useState("소파");

  const tabs = ["소파", "침대", "벽지", "선반", "커텐", "액자"];
  const items = [
    { id: 1, name: "노랑 소파", image: "/image/home/inventory/example.png", points: 200 },
    { id: 2, name: "초록 소파", image: "/image/home/inventory/example.png", points: 200 },
    { id: 3, name: "노랑 소파", image: "/image/home/inventory/example.png", points: 200 },
    { id: 4, name: "초록 소파", image: "/image/home/inventory/example.png", points: 200 },
  ];

  return (
    <div className="w-full h-[40%] absolute bottom-0  bg-white  px-5 pt-12">
      {/* 탭 메뉴 */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex-1 text-center py-2 ${
              activeTab === tab
                ? "border-b-2 border-black font-bold"
                : "text-[#999999] border-[#EEEEEE] border-b-1 "
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 아이템 목록 */}
      <div className="grid grid-cols-3  mt-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col items-center px-6 py-5">
            <Image width={58} height={64} src={item.image} alt={item.name} />
            <p className="mt-2 text-sm">{item.name}</p>
            <div className="flex items-center justify-center gap-1">
              <Image alt="하트아이콘" src="/icon/home/heartIcon.svg" width={14.17} height={12.19} />
              <p className="text-pink-500 text-sm font-semibold">+{item.points}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryList;
