import Image from "next/image";
import React from "react";

interface StatusListItemProp {
  iconSrc: string; // 아이콘 이미지 경로
  label: string; // 라벨 텍스트
  status: "APPROVED" | "REJECTED"; // 현재 상태
  date: Date;
  pending?: boolean; // 로딩 상태
}

const statusMap = {
  APPROVED: {
    label: "인증완료",
    className: "bg-[#E9E9E9] text-[#9E9E9E]",
  },
  REJECTED: {
    label: "인증거절",
    className: "bg-[#FFE6E6] text-[#FF3A3A]",
  },
};

const StatusListItem: React.FC<StatusListItemProp> = ({
  pending,
  iconSrc,
  label,
  status,
  date,
}) => {
  const { label: statusLabel, className } = statusMap[status] || {};

  // 글자수가 넓이를 초과하면 때는 그냥 span 태그로 감싸서 스타일을 적용
  // 넘으면 ...으로 나오게끔

  const formattedLabel =
    label.length > 10 ? (
      <span className="text-lg font-semibold truncate max-w-[150px] md:max-w-[220px] block">
        {label}
      </span>
    ) : (
      <span className="text-lg font-semibold">{label}</span>
    );
  return (
    // pending 상태일 때 스켈레톤 UI를 보여줌
    <div className={`relative ${pending ? "animate-pulse" : ""}`}>
      {pending ? (
        <div className="w-full h-[88px] bg-[#F4F5F7] rounded-2xl animate-pulse" />
      ) : (
        <div className="flex items-center justify-between bg-[#FFFFFF] px-4 py-6 rounded-2xl ">
          {/* 아이콘 + 텍스트 */}
          <div className="flex items-center gap-4">
            <Image src={iconSrc} alt={label} width={56} height={56} />
            <div className="flex flex-col">
              {formattedLabel}
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
      )}
    </div>
  );
};

export default StatusListItem;
