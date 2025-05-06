import React from "react";
import ActivityItem from "./ActivityItem";

const activities = [
  { iconSrc: "/icon/activity/cupIcon.svg", label: "다회용 컵 사용하기", isChecked: false },
  { iconSrc: "/icon/activity/plugIcon.svg", label: "대기전력 차단하기", isChecked: false },
  { iconSrc: "/icon/activity/bagIcon.svg", label: "장바구니 사용하기", isChecked: false },
  { iconSrc: "/icon/activity/trashIcon.svg", label: "분리배출하기", isChecked: false },
  { iconSrc: "/icon/activity/stairIcon.svg", label: "계단 이용하기", isChecked: false },
  { iconSrc: "/icon/activity/leftfoodIcon.svg", label: "잔반 없이 먹기", isChecked: false },
  { iconSrc: "/icon/activity/busIcon.svg", label: "대중교통 이용하기", isChecked: false },
  {
    iconSrc: "/icon/activity/reviewIcon.svg",
    label: "친환경 제품 리뷰 남기기",
    isChecked: false,
  },
  {
    iconSrc: "/icon/activity/danguenIcon.svg",
    label: "중고 제품 나눔/구매 인증하기",
    isChecked: false,
  },
  { iconSrc: "/icon/activity/bicyleIcon.svg", label: "자전거 이용하기", isChecked: false },
  {
    iconSrc: "/icon/activity/billIcon.svg",
    label: "전기/가스 요금 줄이기 챌린지",
    isChecked: false,
  },
  {
    iconSrc: "/icon/activity/dateIcon.svg",
    label: "플로깅 데이트 인증샷",
    isChecked: false,
  },
  { iconSrc: "/icon/activity/treeIcon.svg", label: "가족/커플 나무심기", isChecked: false },
];

const ActivityList = () => {
  return (
    <div className="bg-white h-screen scrollbar-hide ">
      {activities.map((activity, index) => (
        <ActivityItem
          key={index}
          iconSrc={activity.iconSrc}
          label={activity.label}
          isChecked={activity.isChecked}
        />
      ))}
    </div>
  );
};

export default ActivityList;
