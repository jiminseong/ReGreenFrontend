"use client";

import React from "react";
import TextBox from "./TextBox";

const ActivityDescription = ({ onFinish }: { onFinish: () => void }) => {
  const [progress, setProgress] = React.useState(0);

  const handleNext = () => {
    if (progress < 2) {
      setProgress(progress + 1);
    } else {
      onFinish();
    }
  };

  return (
    <>
      {progress === 0 && (
        <>
          <div className={`absolute top-0 w-full h-[10%] bg-black/70 z-[100]`} />
          <div className={`absolute bottom-0 w-full h-[75%] bg-black/70 z-[100] p-5 py-8`}>
            <TextBox
              maxProgress={2}
              progress={progress}
              onConfirm={handleNext}
              message={
                <span>
                  <span className="font-bold text-ppink">다회용 컵 사용하기</span>를 선택해주세요!
                </span>
              }
            />
          </div>
        </>
      )}
      {progress === 1 && (
        <>
          <div className={`absolute top-0 w-full h-[10%] bg-black/70 z-[100]`} />
          <div
            className={`absolute flex items-end bottom-28 w-full h-[64%] bg-black/70 z-[100] py-8 p-5`}
          >
            <TextBox
              maxProgress={2}
              progress={progress}
              onConfirm={onFinish}
              trianglePosition="bottomCenter"
              message={
                <span>
                  <span className="font-bold text-ppink">사진으로 인증하기</span>를 눌러{" "}
                  <span className="font-bold ">
                    &lsquo;촬영&apos;, &lsquo;앨범에서 선택&apos;, &lsquo;파일에서 선택&apos;
                  </span>{" "}
                  중 원하는 인증방법을 선택하여 인증하면 해당 리워드가 지급됩니다!
                </span>
              }
            />
          </div>
          <div className={`absolute bottom-0 w-full h-[1%] bg-black/70 z-[100]`} />
        </>
      )}
    </>
  );
};

export default ActivityDescription;
