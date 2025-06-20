"use client";

import React from "react";
import { motion } from "framer-motion";
import { useFurnitureStore } from "@/entities/room/model/store";
import { FurnitureCategory } from "@/entities/room/model/type";
import { useDragScroll } from "../lib/useDragScroll";

// export type FurnitureCategory = "WALL_PAPER" | "floor" | "furniture" | "window" | "decor";
const categoryNameToTypeMap: Record<string, FurnitureCategory> = {
  벽지: "WALL_PAPER",
  바닥: "FLOOR",
  가구: "FURNITURE",
  창문: "WINDOW",
  소품: "PROP",
};

const tabs = Object.keys(categoryNameToTypeMap);

const CategorySwiper = () => {
  const currentCategory = useFurnitureStore((state) => state.currentFurnituresCategory[0]);
  const setCategories = useFurnitureStore((state) => state.setCategories);

  const dragRef = useDragScroll();

  return (
    <div className="relative w-full">
      <motion.div
        ref={dragRef}
        className="relative flex overflow-x-auto no-scrollbar w-full cursor-grab select-none "
        whileTap={{ cursor: "grabbing" }}
      >
        {tabs.map((tab) => {
          const cat = categoryNameToTypeMap[tab];
          const isActive = cat === currentCategory;

          return (
            <button
              key={tab}
              className={` text-center w-full py-2 whitespace-nowrap transition-all duration-150 min-w-[64px] ${
                isActive
                  ? "border-b-2 border-black font-bold"
                  : "text-[#999999] border-[#EEEEEE] border-b-2"
              }`}
              onClick={() => setCategories([cat])}
            >
              {tab}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default React.memo(CategorySwiper);
