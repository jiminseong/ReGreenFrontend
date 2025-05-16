"use client";
import { useRouter } from "next/navigation";
import { useHomeMode } from "@/features/room-customizer/lib/useHomeMode";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

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
    " font-bold text-lg md:text-xl flex w-full justify-center items-center cursor-pointer flex-col rounded-[22px] bg-white px-7 py-5  shadow-[0px_6px_0px_0px_rgba(0,0,0,0.25)] ";

  return (
    <>
      {mode === "home" && (
        <div
          onClick={() => window.location.reload()}
          className="flex w-full items-center justify-center relative"
        >
          <Image
            className="absolute left-1/2  bottom-16 z-2 md:bottom-24 -translate-x-1/2"
            src="/icon/home/reloadIcon.svg"
            alt="새로고침 아이콘"
            width={40}
            height={40}
          />
        </div>
      )}
      <motion.div
        initial={false}
        animate={{
          y: mode === "inventory" ? 300 : 0,
        }}
        transition={{
          duration: mode === "inventory" ? 0.455 : 0.9,
          ease: "easeInOut",
        }}
        className="z-5 w-full"
      >
        <div className="w-full flex flex-col items-start  gap-3.5">
          <div className="flex w-full justify-center gap-4 mb-9">
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              whileHover={{ scale: 1.025 }}
              exit={{ opacity: 0, y: -50 }}
              type="button"
              onClick={() => handleNavigation("activity")}
              className={buttonClass}
            >
              실천 인증 하기
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              whileHover={{ scale: 1.025 }}
              exit={{ opacity: 0, y: -50 }}
              type="button"
              onClick={() => handleNavigation("inventory")}
              className={buttonClass}
            >
              방 꾸미기
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default React.memo(BottomNavigationBar);
