import Image from "next/image";
import React from "react";
import FinishedActivityListIDetailItem from "./FinishedActivityListIDetailItem";

interface Activity {
  memberEcoVerificationId: string;
  nickname: string;
  ecoLovePoint: number;
  breakupBufferPoint: number;
  isMe: boolean;
}

interface FinishedActivityListItemProps {
  type: string;
  activities: Activity[];
  iconMap: Record<string, string>;
  activityTitleMap: Record<string, string>;
}

const FinishedActivityListItem = ({
  type,
  activities,
  iconMap,
  activityTitleMap,
}: FinishedActivityListItemProps) => {
  const leftActivity = activities.find((a) => !a.isMe) ?? null;
  const rightActivity = activities.find((a) => a.isMe) ?? null;

  return (
    <div key={type}>
      <div className="flex items-center space-x-2 mb-2">
        {iconMap[type] && <Image src={iconMap[type]} alt={type} width={20} height={20} />}
        <span className="text-[#777777] font-regular text-sm ">
          {activityTitleMap[type] || type}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* 왼쪽 (상대방 or 빈칸) */}
        {leftActivity ? (
          <FinishedActivityListIDetailItem activity={leftActivity} />
        ) : (
          <div className="bg-[#DDE0E9] w-full h-full rounded-[10px]" />
        )}

        {/* 오른쪽 (나 or 빈칸) */}
        {rightActivity ? (
          <FinishedActivityListIDetailItem activity={rightActivity} />
        ) : (
          <div className="bg-[#DDE0E9] w-full h-full rounded-[10px]" />
        )}
      </div>
    </div>
  );
};

export default FinishedActivityListItem;
