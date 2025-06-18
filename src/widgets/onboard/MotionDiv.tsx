import { motion } from "framer-motion";

import React from "react";
interface MotionDivProps {
  children: React.ReactNode;
}

const MotionDiv = ({ children }: MotionDivProps) => {
  return (
    <motion.div
      className="relative flex flex-col gap-8 items-center justify-start w-full h-full pt-22"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;
