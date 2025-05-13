"use client";

import { useHomeMode } from "@/features/room-customizer/lib/useHomeMode";
import Image from "next/image";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useFurnitureStore } from "@/entities/room/model/store";
import { FurnitureItem } from "@/entities/room/model/type";
import CategorySwiper from "./CategorySwiper";
// import { http } from "@/shared/lib/http";
// import { useQuery } from "@tanstack/react-query"; // 주석용

const dummyItems: FurnitureItem[] = [
  {
    furnitureId: "furni1",
    name: "에코 소파",
    description: "친환경 소재 소파",
    price: 150,
    s3ImageUrl: "/sample/furni1.png",
    category: "interior",
    isOwned: true,
    isPlaced: false,
  },
  {
    furnitureId: "furni2",
    name: "우드 선반",
    description: "원목 벽 선반",
    price: 80,
    s3ImageUrl: "/sample/furni2.png",
    category: "storage",
    isOwned: true,
    isPlaced: false,
  },
];

const InventoryListComponent = () => {
  const { mode, setMode } = useHomeMode();
  const currentCategory = useFurnitureStore((state) => state.currentFurnituresCategory[0]);
  const setCategories = useFurnitureStore((state) => state.setCategories);
  const furnitures = useFurnitureStore((state) => state.currentFurnitures);

  // 초기에 더미 카테고리 하나 설정
  useEffect(() => {
    setCategories(["interior"]); // "소파" = interior
  }, []);

  function handleHomeMode() {
    if (mode === "inventory") {
      setMode("home");
    }
  }

  const filteredItems = furnitures.filter((item) => item.category === currentCategory);

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
          <div className="grid grid-cols-3 mt-4">
            {(filteredItems.length > 0 ? filteredItems : dummyItems).map((item) => (
              <div key={item.furnitureId} className="flex flex-col items-center px-6 py-5">
                <Image width={58} height={64} src={item.s3ImageUrl} alt={item.name} />
                <p className="mt-2 text-sm">{item.name}</p>
                <div className="flex items-center justify-center gap-1">
                  <Image
                    alt="하트아이콘"
                    src="/icon/home/heartIcon.svg"
                    width={14.17}
                    height={12.19}
                  />
                  <p className="text-pink-500 text-sm font-semibold">+{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(InventoryListComponent);
