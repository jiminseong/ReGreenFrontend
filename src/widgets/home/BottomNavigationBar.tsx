"use client";
import { useRouter } from "next/navigation";
import { useHomeMode } from "@/features/room-customizer/lib/useHomeMode";
import { motion } from "framer-motion";
import React from "react";

const BottomNavigationBar = () => {
  const { mode, setMode } = useHomeMode();
  const router = useRouter();

  const handleNavigation = (action: "activity" | "inventory") => {
    if (action === "activity") {
      router.push("/activity/list");
    } else if (action === "inventory") {
      setMode("inventory");
    }
  };

  const buttonClass =
    "font-bold text-lg md:text-xl flex w-[50%] cursor-pointer flex-col rounded-[22px] bg-white px-7 py-5 text-center shadow-[0px_6px_0px_0px_rgba(0,0,0,0.25)]";

  return (
    <motion.div
      initial={false}
      animate={{
        y: mode === "inventory" ? 300 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="z-5 w-full"
    >
      <div className="w-full flex flex-col items-start  gap-3.5">
        <div className="flex w-full justify-center gap-4 mb-9">
          <div onClick={() => handleNavigation("activity")} className={buttonClass}>
            실천 인증 하기
          </div>
          <div onClick={() => handleNavigation("inventory")} className={buttonClass}>
            방 꾸미기
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(BottomNavigationBar);
