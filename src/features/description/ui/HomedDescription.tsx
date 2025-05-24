"use client";

import HeartCalendarState from "@/entities/user/ui/HeartCalendarState";
import React from "react";
import TextBox from "./TextBox";
import MyProfile from "@/entities/user/ui/MyProfile";
import BottomButtons from "@/widgets/home/BottomButtons";

const HomedDescription = ({ onFinish }: { onFinish: () => void }) => {
  const [progress, setProgress] = React.useState(0);

  const handleNext = () => {
    if (progress < 2) {
      setProgress(progress + 1);
    } else {
      onFinish();
    }
  };

  let positionClass = "";

  if (progress === 0) {
    positionClass = "top-5 ";
  } else if (progress === 1) {
    positionClass = "top-5 ";
  } else {
    positionClass = "bottom-[80px] ";
  }

  return (
    <div className={`absolute  w-full h-full bg-black/70 z-[100]`}>
      <div className={`absolute ${positionClass} w-full px-5`}>
        {progress === 0 && (
          <div className="w-full">
            <HeartCalendarState />
            <TextBox
              className="mt-5"
              message={
                <div>
                  환경활동을 인증하고 얻을 수 있는{" "}
                  <span className="text-ppink font-bold">하트</span>와 <br />
                  이별을 미룰 수 있는 <span className="font-bold">날짜</span>입니다.
                </div>
              }
              onConfirm={handleNext}
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
                  환경활동을 하셨다면 <span className="text-ppink font-bold">실천 인증하기 </span>
                  버튼을 통해 인증을 완료해주세요.
                </div>
              }
              onConfirm={handleNext}
              progress={progress}
              trianglePosition="bottomLeft"
            />
            <div
              // 클릭안되도록
              onClick={(e) => e.stopPropagation()}
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
