"use client";
import { motion } from "framer-motion";
import React from "react";

import { useHomeMode } from "../lib/useHomeMode";
import CommonModal from "@/widgets/ComonModal";
import { patchRoom } from "@/entities/room/lib/patchRoom";
import { useRoomStore } from "../model/store";
import { useRouter } from "next/navigation";
import { useCoupleInfo } from "@/entities/user/lib/useCoupleInfo";

const RoomSaveButton = () => {
  const coupleQuery = useCoupleInfo();
  const [modal, setModal] = React.useState(false);
  const router = useRouter();

  const currentFurnitures = useRoomStore((state) => state.currentRoomFurnitures);
  const notIsOwnedFurnitures = currentFurnitures.filter((item) => !item.isOwned);

  const handleModal = () => {
    setModal(false);
  };
  //현재 방상태를 저장하고 만약 isOwned가 false인 경우에는 저장치 않고 구매유도 모달을 띄우는 함수
  const handleSave = async () => {
    if (notIsOwnedFurnitures.length === 0) {
      setModal(true);
      return;
    }
    const replacedFurniture = notIsOwnedFurnitures.map((item) => {
      return {
        coupleFurnitureId: item.furnitureId,
        isPlaced: item.isPlaced,
      };
    });

    try {
      const coupleData = coupleQuery.data?.data;
      if (!coupleData) {
        return;
      }
      const coupleId = coupleData.coupleId;
      const res = await patchRoom({ coupleId, replacedFurniture });
      if (res.statusCode === 2300) {
        router.push("/home");
      }
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  const { mode, setMode } = useHomeMode();
  return (
    <>
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
        } font-extrabold px-4   text-lg rounded-lg`}
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
