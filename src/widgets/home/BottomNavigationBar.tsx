"use client";
import { useRouter } from "next/navigation";
import { useHomeMode } from "@/features/room-customizer/lib/useHomeMode";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

const BottomNavigationBar = () => {
  const { mode, setMode } = useHomeMode();
  const router = useRouter();
  const [pressedButton, setPressedButton] = React.useState<"activity" | "inventory" | null>(null);

  const handleNavigation = (action: "activity" | "inventory") => {
    setPressedButton(action); // 그림자 제거
    setTimeout(() => {
      setPressedButton(null); // 다시 그림자 복구
      if (action === "activity") {
        router.push("/activity/list");
      } else {
        setMode("inventory");
      }
    }, 150); // 150ms 후에 동작 실행
  };

  const getButtonShadow = (action: "activity" | "inventory") =>
    pressedButton === action
      ? "shadow-none scale-[0.98]"
      : "shadow-[0px_6px_0px_0px_rgba(0,0,0,0.25)]";

  const baseButtonClass =
    "transition-all duration-150 font-bold text-lg md:text-xl flex w-full justify-center items-center cursor-pointer flex-col rounded-[22px] bg-white px-7 py-5";

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {mode === "home" && (
        <div
          onClick={() => window.location.reload()}
          className="flex w-full items-center justify-center relative"
        >
          <Image
            className="absolute left-1/2  bottom-16 z-2 md:bottom-6 -translate-x-1/2 cursor-pointer"
            src="/icon/home/reloadIcon.svg"
            alt="새로고침 아이콘"
            width={40}
            height={40}
          />
        </div>
      )}

      <motion.div
        initial={false}
        animate={{ y: mode === "inventory" ? 300 : 0 }}
        transition={{ duration: mode === "inventory" ? 0.455 : 0.9, ease: "easeInOut" }}
        className="z-5 w-full"
      >
        <div className="w-full flex flex-col items-start  gap-3.5">
          <div className="flex w-full justify-center gap-4 mb-9">
            <button
              type="button"
              onClick={() => handleNavigation("activity")}
              className={`${baseButtonClass} ${getButtonShadow("activity")}`}
            >
              실천 인증 하기
            </button>
            <button
              type="button"
              onClick={() => handleNavigation("inventory")}
              className={`${baseButtonClass} ${getButtonShadow("inventory")}`}
            >
              방 꾸미기
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(BottomNavigationBar);
