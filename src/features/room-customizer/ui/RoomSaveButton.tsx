"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";

import { useHomeMode } from "../lib/useHomeMode";
import CommonModal from "@/widgets/ComonModal";
import { patchRoom } from "@/entities/room/lib/patchRoom";
import { useRoomStore } from "../model/store";
import { useMyPlacedFurniture } from "../lib/useMyPlacedFurniture";
import LogoLoading from "@/widgets/LogoLoading";

const RoomSaveButton = () => {
  const [modal, setModal] = useState(false);
  const { mode, setMode } = useHomeMode();
  const [loading, setLoading] = useState(false);
  const { data, refetch } = useMyPlacedFurniture();
  const setCurrentFurnitures = useRoomStore((state) => state.setCurrentRoomFurnitures);
  const currentFurnitures = useRoomStore((state) => state.currentRoomFurnitures);
  const isOwnedFurnitures = currentFurnitures.filter((item) => item.isOwned === true);
  const coupleFurnitures = currentFurnitures.filter(
    (item) =>
      item.coupleItemId && item.coupleItemId !== null && typeof item.coupleItemId === "string"
  );

  const handleModal = () => {
    setModal(false);
  };
  //현재 방상태를 저장하고 만약 isOwned가 false인 경우에는 저장치 않고 구매유도 모달을 띄우는 함수
  const handleSave = async () => {
    setLoading(true);

    if (isOwnedFurnitures.length === 0) {
      await setLoading(false);
      setModal(true);
      return;
    }
    const replacedFurniture = coupleFurnitures.map((item) => {
      return {
        coupleItemId: item.coupleItemId !== undefined ? item.coupleItemId : null,
        isPlaced: item.isPlaced,
      };
    });

    try {
      const res = await patchRoom({ placements: replacedFurniture });
      if (res.code === 2000) {
        await setLoading(false);
        await refetch();

        setCurrentFurnitures(data?.data ?? []);
        setMode("home");
      }
    } catch (error) {
      await setLoading(false);
      console.error("Error saving room:", error);
    }
  };

  return (
    <>
      {loading && <LogoLoading />}
      <motion.button
        onClick={() => handleSave()}
        whileHover={{ scale: 1.05 }}
        animate={{
          opacity: mode === "inventory" ? 1 : 0,
          pointerEvents: mode === "inventory" ? "auto" : "none",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`${
          mode === "inventory" ? "visible" : "hidden"
        } w-full text-right justify-end font-extrabold    text-lg rounded-l `}
      >
        저장
      </motion.button>
      <CommonModal
        isOpen={modal}
        onCancel={handleModal}
        onConfirm={() => {
          setMode("home");
          window.location.reload();
        }}
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
