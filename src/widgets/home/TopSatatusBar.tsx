"use client";

import CoupleProfile from "@/entities/user/ui/CoupleProfile";
import useHandleMypage from "@/features/mypage/lib/hadnleMypage";
import { useHomeMode } from "@/features/room-customizer/lib/useHomeMode";
import { motion } from "framer-motion";
import WiggleBadge from "./WiggleBadge";

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
      <div className=" flex w-full items-start justify-between">
        {/*  D-Day + 하트 */}
        <motion.div
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className=" w-[140px] flex flex-col gap-2.5 rounded-lg"
        >
          <WiggleBadge value="+200" type="heart" />
          <WiggleBadge value="-50" type="calendar" />
        </motion.div>

        {/* 커플 프로필 */}
        <motion.button
          onClick={() => handleMypage.navigateToMypage()}
          whileHover={{ scale: 1.05 }}
          animate={{
            opacity: mode === "inventory" ? 0 : 1,
            pointerEvents: mode === "inventory" ? "none" : "auto",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`${mode === "inventory" ? "hidden" : "visibile"}`}
        >
          <CoupleProfile size="small" />
        </motion.button>

        {/* 우측: 저장하기 버튼 */}
        <motion.button
          onClick={handleHomeMode}
          whileHover={{ scale: 1.05 }}
          animate={{
            opacity: mode === "inventory" ? 1 : 0,
            pointerEvents: mode === "inventory" ? "auto" : "none",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`${
            mode === "inventory" ? "visible" : "hidden"
          } font-extrabold px-4   text-lg rounded-lg`}
        >
          저장
        </motion.button>
      </div>
    </div>
  );
};

export default TopStatusBar;
