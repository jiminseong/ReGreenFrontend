"use client";

import { useHomeMode } from "@/features/room-customizer/lib/useHomeMode";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRoomStore } from "../model/store";
import { useMyPlacedFurniture } from "../lib/useMyPlacedFurniture";

const Room = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const { mode } = useHomeMode();
  const targetRef = useRef<HTMLDivElement>(null);

  const query = useMyPlacedFurniture();
  console.log("query 상태", query);

  const setFurnitures = useRoomStore((state) => state.setCurrentRoomFurnitures);
  const currentFurnitures = useRoomStore((state) => state.currentRoomFurnitures);

  const filteredItems = useMemo(() => {
    if (mode === "home") {
      if (query.data?.data && query.data.data.length > 0) {
        return query.data?.data.filter((item) => item.isPlaced && item.isOwned);
      }
    }
    return currentFurnitures.filter((item) => item.isPlaced);
  }, [currentFurnitures]);

  useEffect(() => {
    if (mode === "home" && query.isSuccess && query.data?.data) {
      setFurnitures(query.data.data);
    }
  }, [query.isSuccess, query.data, mode, setFurnitures]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);
  return (
    <>
      <motion.div
        ref={targetRef}
        animate={{
          y:
            mode === "inventory"
              ? windowWidth >= 1024
                ? -120 // lg 이상일 때
                : windowWidth >= 768
                ? -100 // md 이상일 때
                : -80 // 기본
              : windowWidth >= 1024
              ? 60 // lg 이상일 때
              : windowWidth >= 768
              ? 50 // md 이상일 때
              : 40, // 기본
        }}
        transition={{
          duration: mode === "inventory" ? 0.35 : 0.35,
          ease: "linear",
        }}
        className="relative w-full h-full flex flex-col items-center justify-center"
      >
        <Image
          src="/image/home/roomDefaultWall.png"
          alt="배경"
          width={900}
          height={900}
          className="absolute z-0"
        />
        {filteredItems?.map((item) => (
          <>
            <Image
              key={item.furnitureId}
              src={item.s3ImageUrl}
              alt={item.name}
              width={900}
              height={900}
              className={`absolute z-${item.zIndex}`}
            />{" "}
          </>
        ))}
        <div
          className={`${
            mode === "inventory" ? "visible" : "hidden"
          } w-full h-[162px] absolute z-[-1] bottom-[-50px] md:bottom-[-120px] flex justify-center items-center`}
        >
          <Image
            src="/image/home/backgroundFillter.png"
            alt="배경 필터"
            width={900}
            height={900}
            className="absolute z-[-10] bottom-[180px] md:bottom-[320px] lg:bottom-[230px] w-full h-full"
          />
        </div>
      </motion.div>
      {/* TODO : 캡처 버튼 */}
      {/* <CaptureButton captureTargetRef={targetRef} /> */}
    </>
  );
};

export default Room;
