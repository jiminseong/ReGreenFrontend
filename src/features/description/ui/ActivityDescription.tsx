"use client";

import React from "react";
import TextBox from "./TextBox";
import { useCertificationStore } from "../lib/store";
import ToastButton from "@/widgets/ToastButton";
import Image from "next/image";
import { motion } from "framer-motion";

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
        <>
          <div className={`absolute top-0 w-full max-w-[500px] h-[80px] bg-black/70 z-[100]`} />
          <div
            className={`absolute bottom-0 w-full max-w-[500px] h-[76%] md:h-[80%] bg-black/70 z-[100] p-5 py-8`}
          >
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
          <div className={`absolute max-w-[500px] top-0 w-full h-[80px] bg-black/70 z-[100]`} />
          <div
            className={`absolute max-w-[500px] flex items-end bottom-28 w-full h-[62.7%] md:h-[68.8%] bg-black/70 z-[100] py-8 p-5`}
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
          <>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="w-full fixed bottom-20 left-1/2  transform -translate-x-1/2  justify-center gap-4 flex items-center z-50"
            >
              <div className="flex items-center justify-center  gap-2">
                <Image src="/icon/home/heartIcon.svg" width={24} height={24} alt="하트아이콘" />
                <span className="text-ppink font-bold">+2</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Image src="/icon/home/calendarIcon.svg" width={24} height={24} alt="달력아이콘" />
                <span className="font-bold">+2</span>
              </div>
            </motion.div>
            <ToastButton message={TOAST_MESSAGE} onToastClick={() => onFinish()} />
          </>

          <div className={`absolute max-w-[500px] bottom-0 w-full h-[1%] bg-black/70 z-[100]`} />
        </>
      )}
    </>
  );
};

export default ActivityDescription;
