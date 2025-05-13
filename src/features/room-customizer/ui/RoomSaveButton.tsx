"use client";
import { motion } from "framer-motion";
import React from "react";

import { useHomeMode } from "../lib/useHomeMode";
import CommonModal from "@/widgets/ComonModal";

const RoomSaveButton = () => {
  const [modal, setModal] = React.useState(false);

  //모달을 여닫는 함수
  const handleModal = () => {
    setModal(!modal);
  };

  const handleHomeMode = () => {
    if (mode === "inventory") {
      setMode("home");
    }
  };
  const { mode, setMode } = useHomeMode();
  return (
    <>
      <motion.button
        onClick={() => {
          handleHomeMode();
          handleModal();
        }}
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
      <CommonModal
        isOpen={modal}
        onCancel={handleModal}
        onConfirm={handleModal}
        message={
          <span>
            아직 구매하지 않은
            <br />
            상품이 있어요!
          </span>
        }
      />
    </>
  );
};

export default RoomSaveButton;
