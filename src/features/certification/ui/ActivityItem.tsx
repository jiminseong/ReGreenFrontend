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
    <div
      key={id}
      onClick={ready === true ? () => onChecked(id) : (e) => e.stopPropagation()}
      className={`cursor-pointer relative flex items-center justify-between px-5 py-4 ${
        currentCheckedId === id ? "bg-[#f8f8f8]" : ""
      }`}
    >
      {/* 준비 중입니다. 표시 */}
      {ready === false && (
        <>
          {/* <span className="text-[#777777] absolute z-10 w-full text-center font-semibold">
            준비 중입니다.
          </span> */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute z-10 top-0 left-0 w-full h-full  bg-[#CECECE] opacity-5 flex items-center justify-center"
          />
        </>
      )}
      {/* 아이콘과 라벨 */}
      <div className={` flex items-center gap-4 ${ready === false ? " blur-[2px]" : ""}`}>
        <Image src={iconSrc} alt={label} width={36} height={36} />
        <span className="text-lg font-medium">{label}</span>
      </div>

      {/* 체크박스 */}
      <div
        className={`w-6 h-6 cursor-pointer rounded-full flex items-center justify-center ${
          ready === false ? " blur-[2px]" : ""
        } ${currentCheckedId === id ? "bg-[#FFE0EB] border-1 border-ppink" : "bg-gray-300"}`}
      >
        {currentCheckedId === id && <div className="w-3 h-3 bg-ppink rounded-full"></div>}
      </div>
    </div>
  );
};

export default ActivityItem;
