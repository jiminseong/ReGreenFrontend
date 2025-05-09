import Image from "next/image";
import React from "react";

interface StatusListItemProp {
  iconSrc: string; // 아이콘 이미지 경로
  label: string; // 라벨 텍스트
  status: "submit" | "review" | "success"; // 현재 상태
  date: Date;
}

const statusMap = {
  submit: {
    label: "인증신청",
    className: "bg-[#E6F0FF] text-[#3A8DFF]",
  },
  review: {
    label: "인증검토",
    className: "bg-[#D9F4E4] text-[#3BB67D]",
  },
  success: {
    label: "인증완료",
    className: "bg-[#E9E9E9] text-[#9E9E9E]",
  },
};

const StatusListItem: React.FC<StatusListItemProp> = ({ iconSrc, label, status, date }) => {
  const { label: statusLabel, className } = statusMap[status];

  return (
    <div className="flex items-center justify-between bg-[#FFFFFF] px-4 py-6 rounded-2xl">
      {/* 왼쪽 아이콘과 텍스트 */}
      <div className="flex items-center gap-4">
        <Image src={iconSrc} alt={label} width={36} height={36} />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{label}</span>
          <span className="text-sm font-normal text-[#777777]">
            신청일 : {date.toISOString().split("T")[0]}
          </span>
        </div>
      </div>

      {/* 상태 뱃지 */}
      <span className={`text-sm font-semibold px-3 py-1 rounded-md ${className}`}>
        {statusLabel}
      </span>
    </div>
  );
};

export default StatusListItem;
