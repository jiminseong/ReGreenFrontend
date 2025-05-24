"use client";
import dynamic from "next/dynamic";

const ActivitySelectClientPage = dynamic(() => import("./ActivitySelectClientPage"), {
  ssr: false, // 클라이언트에서만 렌더링
});

export default ActivitySelectClientPage;
