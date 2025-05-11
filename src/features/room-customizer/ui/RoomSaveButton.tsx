"use client";
import { motion } from "framer-motion";
import React from "react";

import { useHomeMode } from "../lib/useHomeMode";

const RoomSaveButton = () => {
  const handleHomeMode = () => {
    if (mode === "inventory") {
      setMode("home");
    }
  };
  const { mode, setMode } = useHomeMode();
  return (
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
  );
};

export default RoomSaveButton;
