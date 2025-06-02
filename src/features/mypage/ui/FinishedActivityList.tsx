"use client";

import { useState } from "react";
import Image from "next/image";
import { useCoupleSubmitActivity } from "../lib/useCoupleSubmitActivity";
import { SkeletonFinishedActivityList } from "@/widgets/mypage/SkeletonFinishedActivityList";
import FinishedActivityListItem from "./FinishedActivityListItem";

const activityTitleMap: Record<string, string> = {
  REUSABLE_CUP: "다회용 컵 사용하기",
  PLOGGING_PROOF: "플로깅 데이트",
  SECOND_HAND: "중고나눔 인증하기",
};

const iconMap: Record<string, string> = {
  REUSABLE_CUP: "/icon/mypage/cupIcon.svg",
  PLOGGING_PROOF: "/icon/mypage/pictureIcon.svg",
  SECOND_HAND: "/icon/mypage/pictureIcon.svg",
};

export const FinishedActivityList = () => {
  const [date, setDate] = useState("2025-05-05");

  const { data, isPending } = useCoupleSubmitActivity({ date });
  if (isPending || !data) return <SkeletonFinishedActivityList />;

  const members = [...data.today.members, ...data.yesterday.members];

  const groupedByType = members
    .flatMap((member) =>
      member.memberEcoVerifications.map((activity) => ({
        ...activity,
        nickname: member.nickname,
        isMe: member.isMe,
      }))
    )
    .reduce((acc, cur) => {
      acc[cur.type] = acc[cur.type] || [];
      acc[cur.type].push(cur);
      return acc;
    }, {} as Record<string, ((typeof members)[0]["memberEcoVerifications"][0] & { nickname: string; isMe: boolean })[]>);

  const handleDateChange = (diff: number) => {
    // 지금 날짜를 Date 객체로 변환
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + diff);
    const newDateString = newDate.toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 변환
    setDate(newDateString);
  };

  return (
    <div className="p-4 space-y-6 bg-[#F1F2F5] h-screen">
      {/* 날짜 조정 바 */}
      <div className="flex justify-center items-center space-x-4 ">
        <button onClick={() => handleDateChange(-1)}>
          <Image src="/icon/mypage/leftArrow.svg" alt="이전 날짜" width={28} height={28} />
        </button>
        <span className="text-[19px] font-semibold">{date}</span>
        <button onClick={() => handleDateChange(1)}>
          <Image src="/icon/mypage/rightArrow.svg" alt="다음 날짜" width={28} height={28} />
        </button>
      </div>

      {/* 활동 카드 */}
      {Object.entries(groupedByType).map(([type, activities]) => (
        <FinishedActivityListItem
          key={type}
          type={type}
          activities={activities}
          iconMap={iconMap}
          activityTitleMap={activityTitleMap}
        />
      ))}
    </div>
  );
};
