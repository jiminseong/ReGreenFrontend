import Image from "next/image";
import React from "react";

interface ActivityItemProp {
  iconSrc: string; // 아이콘 이미지 경로
  label: string; // 라벨 텍스트
  isChecked: boolean; // 체크 여부
}
const ActivityItem: React.FC<ActivityItemProp> = ({ iconSrc, label, isChecked }) => {
  return (
    <div className="flex items-center justify-between px-5 py-4 ">
      {/* 아이콘과 라벨 */}
      <div className="flex items-center gap-4">
        <Image src={iconSrc} alt={label} width={36} height={36} />
        <span className="text-lg font-medium">{label}</span>
      </div>

      {/* 체크박스 */}
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center ${
          isChecked ? "bg-ppink" : "bg-gray-300"
        }`}
      >
        {isChecked && <div className="w-3 h-3 bg-white rounded-full"></div>}
      </div>
    </div>
  );
};

export default ActivityItem;
