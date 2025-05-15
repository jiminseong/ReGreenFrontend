import Image from "next/image";
import React from "react";

interface ActivityItemProp {
  id: string; // 인증 아이템 ID
  iconSrc: string; // 아이콘 이미지 경로
  label: string; // 라벨 텍스트
  ready: boolean; // 준비 상태 (기본값: false)
  currentCheckedId: string; // 현재 체크된 아이템 ID
  onChecked: (id: string) => void; // 체크 상태 변경 함수
}

const ActivityItem = ({
  id,
  iconSrc,
  label,
  ready,
  onChecked,
  currentCheckedId,
}: ActivityItemProp) => {
  return (
    <div className="relative">
      {ready === false && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute z-10 bg-[#F1F2F5E5] w-full h-full"
        />
      )}
      <div
        key={id}
        onClick={ready === true ? () => onChecked(id) : (e) => e.stopPropagation()}
        className={`px-5 cursor-pointer relative flex items-center justify-between py-4 ${
          currentCheckedId === id ? "bg-[#f8f8f8]" : ""
        }`}
      >
        {/* 아이콘과 라벨 */}
        <div className={`flex items-center gap-4 `}>
          <Image src={iconSrc} alt={label} width={36} height={36} />
          <span className="text-lg font-medium">{label}</span>
        </div>

        {/* 체크박스 */}
        <div
          className={`w-6 h-6 cursor-pointer rounded-full flex items-center justify-center ${
            currentCheckedId === id ? "bg-[#FFE0EB] border-1 border-ppink" : "bg-gray-300"
          }`}
        >
          {currentCheckedId === id && <div className=" w-3 h-3 bg-ppink rounded-full"></div>}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
