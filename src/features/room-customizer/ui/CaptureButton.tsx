"use client";

import Image from "next/image";
import React from "react";
import html2canvas from "html2canvas";
import { useHomeMode } from "../lib/useHomeMode";

interface CaptureButtonProps {
  captureTargetRef?: React.RefObject<HTMLDivElement | null>;
}

const CaptureButton: React.FC<CaptureButtonProps> = ({ captureTargetRef }) => {
  const { mode } = useHomeMode();
  const handleCapture = async () => {
    if (!captureTargetRef?.current) return;

    const canvas = await html2canvas(captureTargetRef.current, {
      useCORS: true, // cross-origin 이미지가 있을 경우
    });
    const image = canvas.toDataURL("image/png");

    // 다운로드
    const link = document.createElement("a");
    link.href = image;
    link.download = "우이미아지트.png";
    link.click();
  };

  return (
    <button
      onClick={handleCapture}
      style={{ boxShadow: "0px 3px 0px 0px #00000040" }}
      className={`${
        mode === "inventory" ? "hidden" : "visible"
      }bg-[#7FA119] absolute bottom-36 left-5 flex flex-col items-center justify-center px-3.5 py-1.5 rounded-full border-2 border-white`}
    >
      <Image src="/icon/home/captureIcon.svg" alt="캡쳐 아이콘" width={20} height={20} />
      <span className="text-white text-sm font-semibold">캡처</span>
    </button>
  );
};

export default CaptureButton;
