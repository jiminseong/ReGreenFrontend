import Image from "next/image";
import React from "react";

interface ActivityItemProp {
  ecoVerificationId: string; // 인증 아이템 ID
  imageUrl: string; // 아이콘 이미지 경로
  title: string; // 라벨 텍스트
  currentCheckedId: string; // 현재 체크된 아이템 ID
  onChecked: (ecoVerificationId: string) => void; // 체크 상태 변경 함수
  point: number; // 포인트
  breakupAtPoint: number; // 날짜 포인트
}

const ActivityItem = ({
  ecoVerificationId,
  imageUrl,
  title,

  onChecked,
  currentCheckedId,
}: ActivityItemProp) => {
  return (
    <div className="relative">
      <div
        key={ecoVerificationId}
        onClick={() => onChecked(ecoVerificationId)}
        className={`px-5 cursor-pointer relative flex items-center justify-between py-4 ${
          currentCheckedId === ecoVerificationId ? "bg-[#f8f8f8]" : ""
        }`}
      >
        {/* 아이콘과 라벨 */}
        <div className={`flex items-center gap-4 `}>
          {imageUrl.length > 0 && <Image src={imageUrl} alt={title} width={36} height={36} />}
          <span className="text-lg font-medium">{title}</span>
        </div>

        {/* 체크박스 */}
        <div
          className={`w-6 h-6 cursor-pointer rounded-full flex items-center justify-center ${
            currentCheckedId === ecoVerificationId
              ? "bg-[#FFE0EB] border-1 border-ppink"
              : "bg-gray-300"
          }`}
        >
          {currentCheckedId === ecoVerificationId && (
            <div className=" w-3 h-3 bg-ppink rounded-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
