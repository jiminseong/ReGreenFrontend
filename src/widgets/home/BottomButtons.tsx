"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useHomeMode } from "@/features/room-customizer/lib/useHomeMode";
import { useRouter } from "next/navigation";

interface BottomButtonsProps {
  type?: "description" | null;
}
const BottomButtons = ({ type = null }: BottomButtonsProps) => {
  const router = useRouter();
  const [pressedButton, setPressedButton] = useState<"activity" | "inventory" | null>(null);
  const { mode, setMode } = useHomeMode();

  const handleNavigation = (action: "activity" | "inventory") => {
    setPressedButton(action);
    setTimeout(() => {
      setPressedButton(null);
      if (action === "activity") {
        router.push("/activity/list");
      } else {
        setMode("inventory");
      }
    }, 150);
  };
  const getButtonShadow = (action: "activity" | "inventory") => {
    return pressedButton === action
      ? "shadow-none scale-[0.98]"
      : "shadow-[0px_6px_0px_0px_rgba(0,0,0,0.25)]";
  };

  const baseButtonClass =
    "transition-all duration-150 font-bold text-lg md:text-xl flex w-full justify-center items-center cursor-pointer flex-col rounded-[22px] bg-white px-7 py-5";
  return (
    <motion.div
      initial={false}
      animate={{ y: mode === "inventory" ? 300 : 0 }}
      transition={{ duration: mode === "inventory" ? 0.455 : 0.9, ease: "easeInOut" }}
      className="z-5 w-full"
    >
      <div className="w-full flex flex-col items-start  gap-3.5">
        <div
          className={`flex ${
            type === "description" ? "w-[48%]" : "w-full"
          }  justify-center gap-4 mb-9 `}
        >
          <button
            type="button"
            onClick={() => {
              if (type === "description") {
                localStorage.setItem("homeTourSeen", "true");
                handleNavigation("activity");
              } else {
                handleNavigation("activity");
              }
            }}
            className={`${baseButtonClass} ${getButtonShadow("activity")}`}
          >
            실천 인증 하기
          </button>
          {type !== "description" && (
            <button
              type="button"
              onClick={() => handleNavigation("inventory")}
              className={`${baseButtonClass}  ${getButtonShadow("inventory")}`}
            >
              방 꾸미기
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BottomButtons;
