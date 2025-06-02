import HeartAndCalendarCard from "@/widgets/mypage/HeartAndCalendarCard";
import React from "react";
interface FinishedActivityListIDetailItemProps {
  activity: {
    memberEcoVerificationId: string;
    nickname: string;
    ecoLovePoint: number; // 사랑의 점수
    breakupBufferPoint: number; // 이별 완충 포인트
    isMe: boolean;
  };
}

const FinishedActivityListIDetailItem = ({ activity }: FinishedActivityListIDetailItemProps) => {
  return (
    <div
      key={activity.memberEcoVerificationId}
      className="bg-white w-full rounded-[10px] px-4 py-5 flex flex-col items-start"
    >
      <div className="font-regular text-sm  text-[#777777]">{activity.nickname}</div>
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
