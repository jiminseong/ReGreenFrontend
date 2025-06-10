import Image from "next/image";
import React from "react";
import { CurrentActivityType } from "../model/type";
import FinishedActivityListIDetailItem from "./FinishedActivityListIDetailItem";

export interface Activity {
  memberEcoVerificationId: string;
  nickname: string;
  type: CurrentActivityType;
  ecoLovePoint: number;
  breakupBufferPoint: number;
  imageUrl: string | null;
  isMe: boolean;
}

interface FinishedActivityListItemProps {
  type: CurrentActivityType;
  activities: Activity[];
  iconMap: Record<string, string>;
  activityTitleMap: Record<string, string>;
}

const FinishedActivityListItem = ({
  type,
  activities,
  iconMap,
  activityTitleMap,
  onActivityClick,
}: FinishedActivityListItemProps & { onActivityClick: (activity: Activity) => void }) => {
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
        {leftActivity ? (
          <FinishedActivityListIDetailItem
            activity={leftActivity}
            onClick={() => onActivityClick(leftActivity)}
          />
        ) : (
          <div className="bg-[#DDE0E9] w-full h-full rounded-[10px]" />
        )}

        {rightActivity ? (
          <FinishedActivityListIDetailItem
            activity={rightActivity}
            onClick={() => onActivityClick(rightActivity)}
          />
        ) : (
          <div className="bg-[#DDE0E9] w-full h-full rounded-[10px]" />
        )}
      </div>
    </div>
  );
};

export default FinishedActivityListItem;
