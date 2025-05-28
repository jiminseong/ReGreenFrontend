"use client";

import { useHomeMode } from "@/features/room-customizer/lib/useHomeMode";

import React from "react";
import Image from "next/image";
import BottomButtons from "./BottomButtons";

const BottomNavigationBar = () => {
  const { mode } = useHomeMode();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {mode === "home" && (
        <div
          onClick={() => window.location.reload()}
          className="flex w-full items-center justify-center relative"
        >
          <Image
            className="absolute left-1/2  bottom-10 md:bottom-8 z-2  -translate-x-1/2 cursor-pointer"
            src="/icon/home/reloadIcon.svg"
            alt="새로고침 아이콘"
            width={40}
            height={40}
          />
        </div>
      )}

      <BottomButtons />
    </div>
  );
};

export default React.memo(BottomNavigationBar);
