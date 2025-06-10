import HeartAndCalendarCard from "@/widgets/mypage/HeartAndCalendarCard";
import React from "react";
import { Activity } from "./FinishedActivityListItem";

const FinishedActivityListIDetailItem = ({
  activity,
  onClick,
}: {
  activity: Activity;
  onClick: () => void;
}) => {
  return (
    <div
      key={activity.memberEcoVerificationId}
      className="bg-white w-full rounded-[10px] px-4 py-5 flex flex-col items-start cursor-pointer"
      onClick={onClick}
    >
      <div className="font-regular text-sm text-[#777777]">{activity.nickname}</div>
      <div className="w-full mt-2 flex justify-center">
        <HeartAndCalendarCard
          ecoLovePoint={activity.ecoLovePoint}
          breakupBufferPoint={activity.breakupBufferPoint}
        />
      </div>
    </div>
  );
};

export default FinishedActivityListIDetailItem;
