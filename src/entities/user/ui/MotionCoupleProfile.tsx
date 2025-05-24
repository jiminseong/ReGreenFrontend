"use client";
import React from "react";
import { motion } from "framer-motion";
import useHandleMypage from "@/features/mypage/lib/hadnleMypage";
import { useHomeMode } from "@/features/room-customizer/lib/useHomeMode";
import MyProfile from "./MyProfile";

const MotionCoupleProfile = () => {
  const { mode } = useHomeMode();
  const handleMypage = useHandleMypage();

  return (
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
      <MyProfile />
    </motion.button>
  );
};

export default MotionCoupleProfile;
