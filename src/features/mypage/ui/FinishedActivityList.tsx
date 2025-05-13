"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const FinishedActivityList = () => {
  const router = useRouter();

  useEffect(() => {
    // 로그인 여부 우선 판단
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }
  });

  const dummyActivities = [
    {
      iconSrc: "/icon/activity/cupIcon.svg",
      label: "다회용 컵 사용하기",
      date: "2025-05-05",
      heart: 200,
      bonus: 50,
      status: "success",
    },
    {
      iconSrc: "/icon/activity/cupIcon.svg",
      label: "다회용 컵 사용하기",
      date: "2025-05-05",
      heart: 200,
      bonus: null,
      status: "success",
    },
    {
      iconSrc: "/icon/activity/billIcon.svg",
      label: "전기/가스 요금 줄이기 ",
      date: "2025-05-05",
      heart: 200,
      bonus: null,
      status: "success",
    },
    {
      iconSrc: "/icon/activity/billIcon.svg",
      label: "전기/가스 요금 줄이기 ",
      date: "2025-05-05",
      heart: null,
      bonus: null,
      status: "complete",
    },
  ];

  return (
    <div className="flex flex-col bg-[#F1F2F5] min-h-screen p-4">
      {/* 상단 하트 획득 정보 */}
      <div className="text-right text-md font-medium mb-2.5 mt-6">얻은 하트 : 0000</div>

      {/* 활동 리스트 */}
      <div className="flex flex-col gap-4">
        {dummyActivities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between  bg-white px-4 py-6 rounded-lg"
          >
            {/* 왼쪽 아이콘과 텍스트 */}
            <div className="flex items-center gap-4">
              <Image width={56} height={56} src={activity.iconSrc} alt={activity.label} />
              <div className="flex flex-col">
                <span className="text-left  text-lg font-semibold">{activity.label}</span>
                <span className="text-sm text-[#777777]">신청일 : {activity.date}</span>
              </div>
            </div>

            {/* 오른쪽 상태 및 보상 */}
            <div className="flex flex-col items-center gap-2 w-[71px]">
              {activity.heart && (
                <div className="flex items-center justify-center px-2 gap-1 text-ppink bg-[#FF387F1A]   w-full py-0.75 rounded-[3.54px] text-sm font-medium">
                  <Image
                    width={56}
                    height={56}
                    src="/icon/home/heartIcon.svg"
                    alt="하트"
                    className="w-4 h-4"
                  />
                  +{activity.heart}
                </div>
              )}
              {activity.bonus && (
                <div className="flex items-center justify-between w-full gap-1 text-[#222222]  bg-[#5151511A]  px-2 py-0.75 rounded-[3.54px] text-sm font-medium">
                  <Image
                    width={56}
                    height={56}
                    src="/icon/home/calendarIcon.svg"
                    alt="보너스"
                    className="w-4 h-4"
                  />
                  +{activity.bonus}
                </div>
              )}
              {activity.status === "complete" && (
                <div className="flex items-center justify-center text-sm font-medium bg-[#EEEEEE] w-[71px]  px-2 py-0.75 rounded-[3.54px]  text-[#CCCCCC]">
                  인증완료
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinishedActivityList;
