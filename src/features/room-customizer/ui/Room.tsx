"use client";

import { useHomeMode } from "@/features/room-customizer/lib/useHomeMode";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRoomStore } from "../model/store";
import { useMyPlacedFurniture } from "../lib/useMyPlacedFurniture";
import LogoLoading from "@/widgets/LogoLoading";
import { useCoupleInfo } from "@/entities/user/lib/useCoupleInfo";

const Room = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const { mode } = useHomeMode();
  const targetRef = useRef<HTMLDivElement>(null);

  const { data, isSuccess, isPending } = useMyPlacedFurniture();
  const { isSuccess: coupleIsSuccess, data: couple } = useCoupleInfo();

  const setFurnitures = useRoomStore((state) => state.setCurrentRoomFurnitures);
  const currentFurnitures = useRoomStore((state) => state.currentRoomFurnitures);

  const filteredItems = useMemo(() => {
    if (mode === "home") {
      if (data?.data && data.data.length > 0) {
        return data?.data.filter((item) => item.isPlaced && item.isOwned);
      }
    }

    return currentFurnitures.filter((item) => item.isPlaced);
  }, [currentFurnitures]);
  const sortedItems = [...filteredItems].sort((a, b) => a.zIndex - b.zIndex);

  useEffect(() => {
    if (mode === "home" && isSuccess && data?.data) {
      setFurnitures(data.data);
    }
  }, [isSuccess, data, mode, setFurnitures]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      handleResize(); // 최초 한 번 설정

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const getRoomScale = (mode: string): number => {
    if (mode !== "home" && windowWidth >= 500) return 0.8;
    if (mode !== "home") return 0.8;
    if (windowWidth >= 1024) return 1.08125; // 데스크탑
    if (windowWidth >= 768) return 1.125; // 태블릿
    return 1.125;
  };

  const getRoomY = (mode: string): number => {
    return mode === "inventory" ? -60 : -30;
  };

  return (
    <>
      {isPending && <LogoLoading />}

      <motion.div
        ref={targetRef}
        animate={{
          scale: getRoomScale(mode),
          y: getRoomY(mode),
        }}
        style={{
          transformOrigin: "top center",
        }}
        transition={{
          duration: mode === "inventory" ? 0.35 : 0.35,
          ease: "linear",
        }}
        className="relative w-full h-full flex flex-col items-center justify-center  overflow-hidden"
      >
        {coupleIsSuccess && couple.data.breakupBufferPoint === 0 && (
          <span className="fixed top-0 left-0 z-50 text-white bg-red-500 px-2 py-1 rounded">
            이별 버퍼링 중{couple.data.breakupBufferPoint}일 남음
          </span>
          // <Image
          //   src="/image/home/roomBackdrop.png"
          //   alt="방 배경"
          //   width={1000}
          //   height={1000}
          //   className="absolute z-99999 opacity-55 "
          // />
        )}
        <Image
          src="https://regreen-bucket.s3.ap-northeast-2.amazonaws.com/images/constant/furniture/20250524-00.png"
          alt="바닥"
          width={1000}
          height={1000}
          className={`absolute `}
        />
        <Image
          src="https://regreen-bucket.s3.ap-northeast-2.amazonaws.com/images/constant/furniture/20250524-01.png"
          alt="벽"
          width={1000}
          height={1000}
          className={`absolute z-5 `}
        />
        {sortedItems.map((item) => (
          <Image
            key={item.itemId}
            src={item.imageUrl}
            alt={item.name}
            width={1000}
            height={1000}
            style={{ zIndex: item.zIndex, position: "absolute" }}
          />
        ))}
        <div
          className={`${
            mode === "inventory" ? "visible" : "hidden"
          } w-full h-[162px] absolute z-[-1] bottom-[-20px] sm:bottom-[-80px] md:bottom-[-80px]  flex justify-center items-center`}
        >
          <Image
            src="/image/home/backgroundFillter.png"
            alt="배경 필터"
            width={1000}
            height={1000}
            className="absolute z-[-10] bottom-[80px] md:bottom-[150px] w-full h-full"
          />
        </div>
      </motion.div>

      {/* TODO : 캡처 버튼 */}
      {/* <CaptureButton captureTargetRef={targetRef} /> */}
    </>
  );
};

export default Room;
