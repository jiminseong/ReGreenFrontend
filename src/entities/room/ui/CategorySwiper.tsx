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
            <motion.button
              key={tab}
              className={`text-center w-full h-10 whitespace-nowrap transition-all duration-150 min-w-[64px]`}
              onClick={() => setCategories([cat])}
            >
              <div className={"relative h-full"}>
                <p className={"absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center"}>{tab}</p>
                {
                  isActive ? <motion.div
                  layoutId={"tab"}
                  className={`relative h-full border-b-2 border-black`
                }></motion.div> : <></>
                }
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default React.memo(CategorySwiper);
