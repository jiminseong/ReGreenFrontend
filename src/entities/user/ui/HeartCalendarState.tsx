"use client";
import WiggleBadge from "@/widgets/home/WiggleBadge";
import Toast from "@/widgets/Toast";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useToastStore } from "../model/store";
import { useRouter } from "next/navigation";

const HeartCalendarState = () => {
  const router = useRouter();
  const isCoupleJoinedToast = useToastStore((state) => state.isCoupleJoinedToast);
  const setIsCoupleJoinedToast = useToastStore((state) => state.setIsCoupleJoinedToast);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCoupleJoinedToast(false); // 3초 후에 토스트 숨기기
    }, 2000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  });

  useEffect(() => {
    // 로그인 여부 우선 판단
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }
  });

  return (
    <>
      {isCoupleJoinedToast && <Toast message="연결에 성공했습니다! 🎉" position="top" />}
      <motion.div
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className=" w-[140px] flex flex-col gap-2.5 rounded-lg"
      >
        <WiggleBadge value="200" type="heart" />
        <WiggleBadge value="50" type="calendar" />
      </motion.div>
    </>
  );
};

export default HeartCalendarState;
