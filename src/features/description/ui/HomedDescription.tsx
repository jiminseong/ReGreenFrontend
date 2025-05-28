"use client";

import HeartCalendarState from "@/entities/user/ui/HeartCalendarState";
import React, { useEffect, useState } from "react";
import TextBox from "./TextBox";
import MyProfile from "@/entities/user/ui/MyProfile";
import BottomButtons from "@/widgets/home/BottomButtons";

const HomedDescription = ({ onFinish }: { onFinish: () => void }) => {
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    if (progress < 2) {
      setProgress(progress + 1);
    } else {
      onFinish();
    }
  };

  const requestNotificationPermission = () => {
    if (typeof window === "undefined") return;

    Notification.requestPermission().then((perm) => {
      const isNotFirst = localStorage.getItem("isNotFirst");
      if (perm === "granted" && isNotFirst !== "true") {
        new Notification("우이미에 오신 걸 환영해요", {
          body: "홈 화면에 추가해 주셔서 고마워요!",
          requireInteraction: true,
        });
        localStorage.setItem("isNotFirst", "true");
      }
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
  }, []);

  let positionClass = "";
  if (progress === 0 || progress === 1) {
    positionClass = "top-5 ";
  } else {
    positionClass = "bottom-[80px] ";
  }

  return (
    <div className={`absolute w-full h-full bg-black/70 z-[100]`}>
      <div className={`absolute ${positionClass} w-full px-5`}>
        {progress === 0 && (
          <div className="w-full">
            <HeartCalendarState />
            <TextBox
              className="mt-5"
              message={
                <div>
                  환경활동을 인증하고 얻을 수 있는{" "}
                  <span className="text-ppink font-bold">하트</span>와{" "}
                  <br className="block md:hidden" />
                  이별을 미룰 수 있는 <span className="font-bold">날짜</span>입니다.
                </div>
              }
              onConfirm={() => {
                handleNext();
                requestNotificationPermission(); // 사용자 제스처 기반 권한 요청
              }}
              progress={progress}
            />
          </div>
        )}

        {progress === 1 && (
          <div>
            <div className="absolute right-1 top-[-12px] bg-white px-4 pb-11 pt-3 w-fit rounded-lg">
              <MyProfile />
            </div>
            <TextBox
              className="mt-32"
              message={
                <div>
                  <span className="text-ppink font-bold">마이페이지</span>로 이동할 수 있는 프로필
                  버튼입니다.
                </div>
              }
              onConfirm={handleNext}
              progress={progress}
              trianglePosition="rightTop"
            />
          </div>
        )}

        {progress === 2 && (
          <div>
            <TextBox
              className="mb-5"
              message={
                <div>
                  환경활동을 하셨다면 <span className="text-ppink font-bold">실천 인증하기</span>{" "}
                  버튼을 통해 인증을 완료해주세요.
                </div>
              }
              onConfirm={handleNext}
              progress={progress}
              trianglePosition="bottomLeft"
            />
            <div
              onClick={(e) => e.stopPropagation()} // 클릭 방지
              className="mb-[-60px]"
            >
              <BottomButtons type={"description"} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomedDescription;
