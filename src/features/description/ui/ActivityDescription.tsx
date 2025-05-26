"use client";

import React from "react";
import TextBox from "./TextBox";
import { useCertificationStore } from "../lib/store";
import ToastButton from "@/widgets/ToastButton";
import Image from "next/image";

const ActivityDescription = ({ onFinish }: { onFinish: () => void }) => {
  const progress = useCertificationStore((state) => state.progress) ?? 0;
  const plusProgress = useCertificationStore((state) => state.plusProgress);

  const handleNext = () => {
    if (progress < 2) {
      plusProgress?.(1);
    } else {
      onFinish();
    }
  };

  const TOAST_MESSAGE = (
    <div className="flex items-center justify-center gap-2">
      <>
        사진으로 인증하기
        <Image
          src="/icon/activity/certification/cameraIcon.svg"
          width={24}
          height={24}
          alt="카메라아이콘"
        />
      </>
    </div>
  );

  return (
    <>
      {progress === 0 && (
        <div className="absolute top-0 left-0 w-full max-w-[500px] h-full flex flex-col items-center justify-center z-50">
          {/* 상단 블러 처리 */}
          <div className="absolute top-0 w-full h-[80px] bg-black/70 z-[100]" />

          {/* 메시지 박스 */}
          <div className="absolute top-[220px] w-full px-5 z-[100]">
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

          {/* 하단 블러 처리 */}
          <div className="absolute bottom-0 w-full h-[calc(100%-200px)] bg-black/70 z-[90]" />
        </div>
      )}{" "}
      {progress === 1 && (
        <div className="absolute top-0 left-0 w-full max-w-[500px] h-full flex flex-col items-center justify-center z-50">
          <div className="absolute top-0 w-full h-[80px] bg-black/70 z-[100]" />

          {/* 메시지 박스 */}
          <div className="absolute flex items-end pb-10 top-[200px] w-full px-5 z-[100] bg-black/70 h-[calc(100%-320px)]">
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
          <div className="w-full px-5 max-w-[500px] fixed bottom-10 left-1/2  transform -translate-x-1/2  flex flex-col gap-2 z-50">
            <ToastButton message={TOAST_MESSAGE} onToastClick={() => onFinish()} />
          </div>

          <div className={`absolute max-w-[500px] bottom-0 w-full h-[20px] bg-black/70 z-[100]`} />
        </div>
      )}
    </>
  );
};

export default ActivityDescription;
