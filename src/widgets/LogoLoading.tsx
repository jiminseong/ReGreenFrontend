"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { createPortal } from "react-dom";

const LogoLoading = () => {
  if (typeof document === "undefined") return null;

  return createPortal(
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
    </AnimatePresence>,
    document.body
  );
};

export default LogoLoading;
