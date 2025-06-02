"use client";

import { motion } from "framer-motion";
import React from "react";

const Loading = () => {
  return (
    <div className="fixed z-210  min-h-[100dvh] max-w-[500px] w-full min-w-[320px]  h-full flex items-center pb-20 justify-center">
      <motion.div
        className="w-16 h-16 border-4 border-ppink border-l-transparent border-b-transparent rounded-full "
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default Loading;
