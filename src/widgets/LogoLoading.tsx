"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const LogoLoading = () => {
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20"
    >
      <motion.img
        src="/icon.webp"
        className="w-16 h-16 rounded-xl"
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </motion.div>
  </AnimatePresence>;
};

export default LogoLoading;
