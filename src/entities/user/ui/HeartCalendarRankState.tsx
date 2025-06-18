"use client";
import WiggleBadge from "@/widgets/home/WiggleBadge";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useCoupleInfo } from "../lib/useCoupleInfo";
import CommonModal from "@/widgets/ComonModal";
import { postEasterEgg } from "../lib/postEasterEgg";
import { useToastStore } from "@/shared/model/useToastStore";

const HeartCalendarRankState = () => {
  const router = useRouter();
  const { openToast } = useToastStore();
  const { data, refetch } = useCoupleInfo();
  const coupleInfo = data?.data;

  const ecoLovePoint = coupleInfo?.ecoLovePoint ?? 0;
  const breakupBufferPoint = coupleInfo?.breakupBufferPoint ?? 0;
  const rank = coupleInfo?.rank ?? 0;

  const [easterEgg, setEasterEgg] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }
  }, []);

  const handleEasterEgg = async () => {
    setEasterEgg((prev) => prev + 1);

    if (easterEgg === 4) {
      const res = await postEasterEgg();
      if (res.code === 2000) {
        refetch();
        setModalOpen(true);
        setEasterEgg(0);
        return;
      }
      if (res.code === 47004) {
        openToast("이미 히든 미션을 완료하셨습니다.");
        setEasterEgg(0);
        return;
      }
      setEasterEgg(0);
      return;
    }
  };

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
        <WiggleBadge
          onClick={() => router.push("/couple/rank")}
          value={String(rank)}
          type="ranking"
        />
      </motion.div>
    </>
  );
};

export default HeartCalendarRankState;
