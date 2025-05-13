"use client";

import { useHomeMode } from "@/features/room-customizer/lib/useHomeMode";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useFurnitureModalStore, useFurnitureStore } from "@/entities/room/model/store";
import { FurnitureItem } from "@/entities/room/model/type";
import CategorySwiper from "./CategorySwiper";
import InventoryListItem from "./InventoryListItem";
import CommonModal from "@/widgets/ComonModal";
import { useRoomStore } from "@/features/room-customizer/model/store";

// import { http } from "@/shared/lib/http";
// import { useQuery } from "@tanstack/react-query";

// const dummyItems: FurnitureItem[] = [
//   {
//     furnitureId: "6112f5e9-758d-49f9-8785-b1a0158eb064",
//     name: "자연빛\n룸쉘",
//     description: "기본 제공 방 구조 (그린 테마)",
//     price: 0,
//     s3ImageUrl: "image/home/inventory/green/wall.svg",
//     s3PreviewImageUrl: "image/home/inventory/green/wall.svg",
//     category: "interior",
//     isOwned: true,
//     coupleFurnitureId: "c13d945d-6e23-4aac-a6f9-4ecd06e937da",
//     isPlaced: true,
//     zIndex: 1,
//   },
//   {
//     furnitureId: "7d902598-551a-453e-a920-930c679e8601",
//     name: "업사이클\n선반",
//     description: "재활용 원목으로 제작된 벽 선반",
//     price: 150,
//     s3ImageUrl: "image/home/inventory/green/frame.svg",
//     s3PreviewImageUrl: "image/home/inventory/green/frame.svg",
//     category: "storage",
//     isOwned: false,
//     coupleFurnitureId: null,
//     isPlaced: false,
//     zIndex: 2,
//   },
//   {
//     furnitureId: "c4226204-825e-4b4d-a6d7-0943e36f14ed",
//     name: "커플\n에코인형",
//     description: "폐섬유로 만든 커플 토끼&곰 인형 세트",
//     price: 80,
//     s3ImageUrl: "image/home/inventory/green/rabbit.svg",
//     s3PreviewImageUrl: "image/home/inventory/green/rabbit.svg",
//     category: "decor",
//     isOwned: false,
//     coupleFurnitureId: null,
//     isPlaced: false,
//     zIndex: 3,
//   },
//   {
//     furnitureId: "9f2b0d52-bae4-410b-bb2f-58293173d2bb",
//     name: "재활용\n달력",
//     description: "종이 절약형 1장짜리 달력",
//     price: 60,
//     s3ImageUrl: "image/home/inventory/green/calendar.svg",
//     s3PreviewImageUrl: "image/home/inventory/green/calendar.svg",
//     category: "decor",
//     isOwned: true,
//     coupleFurnitureId: "b8cd28b5-785c-4a8c-b709-e44ea4e4c798",
//     isPlaced: true,
//     zIndex: 4,
//   },
//   {
//     furnitureId: "3c79ec53-1bfc-4385-a602-04227301fd0b",
//     name: "허브\n창문",
//     description: "자연광과 허브가 함께하는 창문 구조",
//     price: 200,
//     s3ImageUrl: "image/home/inventory/green/window.svg",
//     s3PreviewImageUrl: "image/home/inventory/green/window.svg",
//     category: "window",
//     isOwned: false,
//     coupleFurnitureId: null,
//     isPlaced: false,
//     zIndex: 5,
//   },
//   {
//     furnitureId: "91b8a118-07b7-444e-b334-d742e3ee079f",
//     name: "에코\n러그",
//     description: "폐플라스틱 섬유로 만든 따뜻한 러그",
//     price: 120,
//     s3ImageUrl: "image/home/inventory/green/carpet.svg",
//     s3PreviewImageUrl: "image/home/inventory/green/carpet.svg",
//     category: "fabric",
//     isOwned: false,
//     coupleFurnitureId: null,
//     isPlaced: false,
//     zIndex: 6,
//   },
//   {
//     furnitureId: "2e6fab33-cc46-4fb0-8d15-f8bee7b21c1f",
//     name: "친환경\n쿠션",
//     description: "옥수수 섬유 충전재로 만든 쿠션",
//     price: 90,
//     s3ImageUrl: "image/home/inventory/green/cushion.svg",
//     s3PreviewImageUrl: "image/home/inventory/green/cushion.svg",
//     category: "fabric",
//     isOwned: false,
//     coupleFurnitureId: null,
//     isPlaced: false,
//     zIndex: 7,
//   },
//   {
//     furnitureId: "bad3dc1c-6c65-487b-be08-bab2894eb1e4",
//     name: "중고\n동화책",
//     description: "재사용된 그림책, 감성 업사이클 아이템",
//     price: 50,
//     s3ImageUrl: "image/home/inventory/green/book.svg",
//     s3PreviewImageUrl: "image/home/inventory/green/book.svg",
//     category: "decor",
//     isOwned: false,
//     coupleFurnitureId: null,
//     isPlaced: false,
//     zIndex: 8,
//   },
//   {
//     furnitureId: "f9a24431-0cbb-477e-b642-850acf136cbf",
//     name: "리사이클\n침대",
//     description: "폐목재 프레임과 친환경 이불 세트",
//     price: 500,
//     s3ImageUrl: "image/home/inventory/green/bed.svg",
//     s3PreviewImageUrl: "image/home/inventory/green/bed.svg",
//     category: "bed",
//     isOwned: false,
//     coupleFurnitureId: null,
//     isPlaced: false,
//     zIndex: 9,
//   },
//   {
//     furnitureId: "29cc0daa-932f-4db7-94fa-e44cea1fc00c",
//     name: "태양광\n스탠드",
//     description: "태양광 충전으로 작동하는 미니 램프",
//     price: 250,
//     s3ImageUrl: "image/home/inventory/green/nightstand.svg",
//     s3PreviewImageUrl: "image/home/inventory/green/nightstand.svg",
//     category: "lighting",
//     isOwned: true,
//     coupleFurnitureId: null,
//     isPlaced: false,
//     zIndex: 10,
//   },
//   {
//     furnitureId: "2eb811b5-7f72-4604-b150-22b2e776be30",
//     name: "에코\n캠핑 침낭",
//     description: "리사이클 섬유로 제작된 그린 침낭",
//     price: 120,
//     s3ImageUrl: "image/home/inventory/green/bag.svg",
//     s3PreviewImageUrl: "image/home/inventory/green/bag.svg",
//     category: "bed",
//     isOwned: false,
//     coupleFurnitureId: null,
//     isPlaced: false,
//     zIndex: 11,
//   },
//   {
//     furnitureId: "b8b98e9e-7da2-40d0-aaa8-aa49afd939b4",
//     name: "업사이클\n책상",
//     description: "분리수거된 자재로 제작한 친환경 책상",
//     price: 300,
//     s3ImageUrl: "image/home/inventory/green/desk.svg",
//     s3PreviewImageUrl: "image/home/inventory/green/desk.svg",
//     category: "desk",
//     isOwned: false,
//     coupleFurnitureId: null,
//     isPlaced: false,
//     zIndex: 12,
//   },
//   {
//     furnitureId: "d65cd39c-cab9-4f8e-84fc-75ed6b10de53",
//     name: "리페어\n의자",
//     description: "오래된 의자를 수선해 만든 빈티지 의자",
//     price: 100,
//     s3ImageUrl: "image/home/inventory/green/chair.svg",
//     s3PreviewImageUrl: "image/home/inventory/green/chair.svg",
//     category: "chair",
//     isOwned: false,
//     coupleFurnitureId: null,
//     isPlaced: false,
//     zIndex: 13,
//   },
//   {
//     furnitureId: "a1673f4e-fb93-4bdf-9cc2-bf34be765d41",
//     name: "나무고양이\n액자",
//     description: "식물성 잉크로 인쇄된 고양이 그림 액자",
//     price: 70,
//     s3ImageUrl: "image/home/inventory/green/frame.svg",
//     s3PreviewImageUrl: "image/home/inventory/green/frame.svg",
//     category: "decor",
//     isOwned: false,
//     coupleFurnitureId: null,
//     isPlaced: false,
//     zIndex: 14,
//   },
//   {
//     furnitureId: "4a956245-7953-46eb-9c3f-2f705e120b87",
//     name: "플래닛\n조명",
//     description: "달과 지구를 본뜬 무드등, 충전식",
//     price: 200,
//     s3ImageUrl: "image/home/inventory/green/nightstand.svg",
//     s3PreviewImageUrl: "image/home/inventory/green/nightstand.svg",
//     category: "lighting",
//     isOwned: false,
//     coupleFurnitureId: null,
//     isPlaced: false,
//     zIndex: 15,
//   },
// ];

const InventoryListComponent = () => {
  const { mode, setMode } = useHomeMode();
  const currentCategory = useFurnitureStore((state) => state.currentFurnituresCategory[0]);
  const setCategories = useFurnitureStore((state) => state.setCategories);
  const currentFurnitures = useRoomStore((state) => state.currentRoomFurnitures);
  const togglePlacement = useRoomStore((state) => state.toggleFurniturePlacement);

  const modal = useFurnitureModalStore((state) => state.modal);
  const modalType = useFurnitureModalStore((state) => state.modalType);
  const modalItem = useFurnitureModalStore((state) => state.modalItem);
  const setModal = useFurnitureModalStore((state) => state.setModal);

  function handleToggle(item: FurnitureItem) {
    if (item.isOwned || item.price === 0) {
      console.log(item);
      togglePlacement(item);
    } else {
      setModal(true, "buy", item);
    }
  }
  const messageSpan = (
    <span className="text-[16px] font-medium">
      {modalType === "buy" ? (
        <>
          <span className="font-bold"> 하트 {modalItem?.price}개</span>를 사용해서 <br />
          <span className="font-bold">[{modalItem?.name}]</span>를 구매하시겠습니까?
        </>
      ) : (
        ""
      )}
    </span>
  );

  // 초기에 더미 카테고리 하나 설정
  useEffect(() => {
    setCategories(["interior"]); // "소파" = interior
  }, []);

  function handleHomeMode() {
    if (mode === "inventory") {
      setMode("home");
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  }

  const filteredItems = useMemo(
    () => currentFurnitures.filter((item) => item.category === currentCategory),
    [currentFurnitures, currentCategory]
  );

  return (
    <AnimatePresence mode="wait">
      {mode === "inventory" && (
        <motion.div
          key="inventory-list"
          initial={{ y: 650 }}
          animate={{ y: 0 }}
          exit={{ y: 250 }}
          transition={{ duration: 0.2, ease: "linear" }}
          className="z-20 w-full h-[40%] absolute bottom-0 bg-white px-5 pt-12 "
        >
          <Image
            onClick={handleHomeMode}
            src="icon/home/underTriangleIcon.svg"
            alt="삼각형 아이콘"
            width={25}
            height={12}
            className="absolute top-[-32px] left-[50%] translate-x-[-50%]"
          />

          {/* 탭 메뉴 */}
          <CategorySwiper />
          {/* 아이템 목록 */}
          <div className="grid grid-cols-3 mt-4 overflow-y-scroll no-scrollbar h-full gap-2 pt-4 pb-16">
            {filteredItems.map((item) => (
              <div id="item" key={item.furnitureId}>
                <InventoryListItem
                  isPlaced={item.isPlaced}
                  item={item}
                  onToggle={() => handleToggle(item)}
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}{" "}
      {modal && (
        <CommonModal
          isOpen={modal}
          message={messageSpan}
          onConfirm={() => {
            //TODO: 구매 로직 추가
            setModal(false, null, null);
          }}
          onCancel={() => {
            setModal(false, null, null);
          }}
          cancelText="아니오"
          confirmText="네"
        />
      )}
    </AnimatePresence>
  );
};

export default React.memo(InventoryListComponent);
