"use client";
import WiggleBadge from "@/widgets/home/WiggleBadge";
import Toast from "@/widgets/Toast";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useToastStore } from "../model/store";
import { useRouter } from "next/navigation";
import { useCoupleInfo } from "../lib/useCoupleInfo";
import CommonModal from "@/widgets/ComonModal";

const HeartCalendarState = () => {
  const router = useRouter();
  const isCoupleJoinedToast = useToastStore((state) => state.isCoupleJoinedToast);
  const setIsCoupleJoinedToast = useToastStore((state) => state.setIsCoupleJoinedToast);
  const coupleQuery = useCoupleInfo();
  const [heart, setHeart] = React.useState(0);
  const [day, setDay] = React.useState(0);
  const [easterEgg, setEasterEgg] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);
  useEffect(() => {
    if (coupleQuery.isSuccess) {
      const coupleData = coupleQuery.data?.data;
      if (coupleData) {
        setHeart(coupleData.ecoLovePoint);
        setDay(coupleData.breakupBufferPoint);
      }
    }
  });

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

  function handleEasterEgg() {
    setEasterEgg((prev) => prev + 1);
    console.log(easterEgg);
    if (easterEgg === 4) {
      //TODO: 이스터에그 발견시 하트 추가 API 호출
      setModalOpen(true);
      setEasterEgg(0);
    }
  }

  const EASTER_EGG_MESSAGE = (
    <div className="flex flex-col gap-2 justify-center items-center">
      <span className="text-ppink font-bold">히든 미션 클리어! 🎉 </span>
      <span className="text-[#444444] font-normal">하트 100개를 획득하셨습니다!</span>
    </div>
  );
  return (
    <>
      {modalOpen && (
        <CommonModal
          isOpen={modalOpen}
          message={EASTER_EGG_MESSAGE}
          onlyConfirm
          onConfirm={() => setModalOpen(false)}
        />
      )}
      {isCoupleJoinedToast && <Toast message="연결에 성공했습니다! 🎉" position="top" />}
      <motion.div
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className=" w-full flex gap-3 rounded-lg"
      >
        <WiggleBadge onClick={() => handleEasterEgg()} value={String(heart)} type="heart" />
        <WiggleBadge value={String(day)} type="calendar" />
      </motion.div>
    </>
  );
};

export default HeartCalendarState;
