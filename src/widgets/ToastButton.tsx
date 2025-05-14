"ues client";
import { motion } from "framer-motion";
import React from "react";

interface ToastProps {
  message: string | React.ReactNode;
  onToastClick: () => void;
}

const ToastButton: React.FC<ToastProps> = ({ message, onToastClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      onClick={onToastClick}
      className={` 
        fixed bottom-4 left-1/2  transform -translate-x-1/2
        bg-[#222222]  text-white text-lg font-semibold
        py-4 rounded-xl w-[350px] md:w-[400px] z-50 
      `}
    >
      {message}
    </motion.button>
  );
};

export default ToastButton;
