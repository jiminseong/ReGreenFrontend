"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const LogoLoading = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed max-w-[500px] w-full h-full z-210  flex items-center pb-20 justify-center bg-black/70 top-0 left-0 right-0 bottom-0"
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
    </AnimatePresence>
  );
};

export default LogoLoading;
