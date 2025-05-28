"use client";
import WiggleBadge from "@/widgets/home/WiggleBadge";
import { motion } from "framer-motion";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useCoupleInfo } from "../lib/useCoupleInfo";
import CommonModal from "@/widgets/ComonModal";

const HeartCalendarState = () => {
  const router = useRouter();

  const { data } = useCoupleInfo();
  const coupleInfo = data?.data;

  const ecoLovePoint = coupleInfo?.ecoLovePoint ?? 0;
  const breakupBufferPoint = coupleInfo?.breakupBufferPoint ?? 0;

  const [easterEgg, setEasterEgg] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }
  }, []);

  function handleEasterEgg() {
    setEasterEgg((prev) => prev + 1);

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

      <motion.div
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className=" w-full flex gap-3 rounded-lg"
      >
        <WiggleBadge onClick={() => handleEasterEgg()} value={String(ecoLovePoint)} type="heart" />
        <WiggleBadge value={String(breakupBufferPoint)} type="calendar" />
      </motion.div>
    </>
  );
};

export default HeartCalendarState;
