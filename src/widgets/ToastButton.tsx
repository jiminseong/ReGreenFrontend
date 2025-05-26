"use client";
import { motion } from "framer-motion";
import React from "react";

interface ToastProps {
  message: string | React.ReactNode;
  onToastClick: () => void;
  otherProps?: React.ReactNode;
}

const ToastButton: React.FC<ToastProps> = ({ message, onToastClick }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={onToastClick}
      className={` 
        bg-[#FFE0EB]  text-ppink text-lg font-semibold
        py-4 rounded-xl w-full z-50
      `}
    >
      {message}
    </motion.button>
  );
};

export default ToastButton;
