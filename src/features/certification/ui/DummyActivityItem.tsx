import Image from "next/image";
import React from "react";

interface DummyActivityItemProps {
  ecoVerificationId: string; // 인증 아이템 ID
  imageUrl: string; // 아이콘 이미지 경로
  title: string; // 라벨 텍스트
}

const DummyActivityItem = ({ ecoVerificationId, imageUrl, title }: DummyActivityItemProps) => {
  return (
    <div className="relative">
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute z-10 bg-[#F1F2F5E5] w-full h-full"
      />

      <div
        key={ecoVerificationId}
        className={`px-5 cursor-pointer relative flex items-center justify-between py-4 `}
      >
        {/* 아이콘과 라벨 */}
        <div className={`flex items-center gap-4 `}>
          <Image src={imageUrl} alt={title} width={36} height={36} />
          <span className="text-lg font-medium">{title}</span>
        </div>

        {/* 체크박스 */}
        <div
          className={`w-6 h-6 cursor-pointer rounded-full flex items-center justify-center ${"bg-gray-300"}`}
        ></div>
      </div>
    </div>
  );
};

export default DummyActivityItem;
