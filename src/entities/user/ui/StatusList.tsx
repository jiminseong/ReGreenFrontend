import React from "react";
import StatusListItem from "./StatusListItem";

const activities = [
  {
    iconSrc: "/icon/activity/cupIcon.svg",
    label: "다회용 컵 사용하기",
    status: "submit" as const,
    date: "2025-05-05",
  },
  {
    iconSrc: "/icon/activity/cupIcon.svg",
    label: "다회용 컵 사용하기",
    status: "review" as const,
    date: "2025-05-05",
  },
  {
    iconSrc: "/icon/activity/plugIcon.svg",
    label: "대기전력 차단하기",
    status: "success" as const,
    date: "2025-05-05",
  },
];

const StatusList = () => {
  return (
    <div className="bg-[#F4F5F7] flex flex-col gap-2.5 py-8 px-5 h-screen scrollbar-hide ">
      {activities.map((activity, index) => (
        <StatusListItem
          key={index}
          iconSrc={activity.iconSrc}
          label={activity.label}
          status={activity.status}
          date={new Date(activity.date)}
        />
      ))}
    </div>
  );
};

export default StatusList;
