"use client";
import WiggleBadge from "@/widgets/home/WiggleBadge";
import { motion } from "framer-motion";
import React from "react";

const HeartCalendarState = () => {
  return (
    <motion.div
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className=" w-[140px] flex flex-col gap-2.5 rounded-lg"
    >
      <WiggleBadge value="200" type="heart" />
      <WiggleBadge value="50" type="calendar" />
    </motion.div>
  );
};

export default HeartCalendarState;
