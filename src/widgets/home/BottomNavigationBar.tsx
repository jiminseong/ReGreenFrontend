"use client";

import { useHomeMode } from "@/features/room-customizer/lib/useHomeMode";

import React from "react";
import BottomButtons from "./BottomButtons";
import NameBoard from "@/entities/user/ui/NameBoard";

const BottomNavigationBar = () => {
  const { mode } = useHomeMode();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {mode === "home" && (
        <div className="flex w-full items-center justify-center relative">
          {/*<Image*/}
          {/*  onClick={() => window.location.reload()}*/}
          {/*  className="absolute left-1/2  bottom-4 md:bottom-8 z-2  -translate-x-1/2 cursor-pointer"*/}
          {/*  src="/icon/home/reloadIcon.svg"*/}
          {/*  alt="새로고침 아이콘"*/}
          {/*  width={40}*/}
          {/*  height={40}*/}
          {/*/>*/}
          <div className="absolute right-0 bottom-4 md:bottom-8 z-2">
            <NameBoard />
          </div>
        </div>
      )}

      <BottomButtons />
    </div>
  );
};

export default React.memo(BottomNavigationBar);
