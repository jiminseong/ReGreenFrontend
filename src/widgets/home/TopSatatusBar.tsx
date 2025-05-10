"use client";

import CoupleProfile from "@/entities/user/ui/CoupleProfile";
import useHandleMypage from "@/features/mypage/lib/hadnleMypage";
import { useHomeMode } from "@/features/room-customizer/lib/useHomeMode";
import Image from "next/image";
import { motion } from "framer-motion";

const TopStatusBar = () => {
  const { mode, setMode } = useHomeMode();
  const handleMypage = useHandleMypage();

  const handleHomeMode = () => {
    if (mode === "inventory") {
      setMode("home");
    }
  };

  return (
    <div className="w-full relative flex flex-col justify-center items-center gap-4 z-10">
      <div className="relative flex w-full items-start justify-between">
        {/* 좌측: 커플 프로필 */}
        <motion.button
          onClick={() => handleMypage.navigateToMypage()}
          whileHover={{ scale: 1.05 }}
          animate={{
            opacity: mode === "inventory" ? 0 : 1,
            pointerEvents: mode === "inventory" ? "none" : "auto",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="p-2 bg-[#FFFFFF8C] rounded-lg"
        >
          <CoupleProfile size="small" />
        </motion.button>

        {/* 중앙: D-Day + 하트 */}
        <motion.div
          animate={{
            left: mode === "inventory" ? "1.25rem" : undefined,
            right: mode === "inventory" ? undefined : "1.25rem",
          }}
          initial={false}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="absolute top-0 w-[140px] flex flex-col gap-2.5 rounded-lg"
        >
          <div className="flex justify-between">
            <div className="w-[52px] font-semibold bg-[#FFFFFFC2] border-[#EEEEEE] py-1.25 text-center rounded-full border-[1px]">
              이별
            </div>
            <div className="font-semibold py-1.25 px-3.25 text-right">D-100</div>
          </div>
          <div className="flex justify-between">
            <div className="w-[52px] font-semibold bg-[#FFFFFFC2] border-[#EEEEEE] py-1.25 flex justify-center items-center rounded-full border-[1px]">
              <Image width={14.17} height={12.19} alt="하트" src="/icon/home/heartIcon.svg" />
            </div>
            <div className="font-semibold py-1.25 px-3.25 text-right">0</div>
          </div>
        </motion.div>

        {/* 우측: 저장하기 버튼 */}
        <motion.button
          onClick={handleHomeMode}
          whileHover={{ scale: 1.05 }}
          animate={{
            opacity: mode === "inventory" ? 1 : 0,
            pointerEvents: mode === "inventory" ? "auto" : "none",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-0 right-0 bg-[#FF387F] px-4 h-[40px] text-white font-semibold text-[17px] rounded-lg"
        >
          저장하기
        </motion.button>
      </div>
    </div>
  );
};

export default TopStatusBar;
