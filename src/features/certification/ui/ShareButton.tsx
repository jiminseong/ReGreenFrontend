"use client";

import Button from "@/shared/ui/Button";
import html2canvas from "html2canvas-pro";
import React from "react";
import { postShare } from "../lib/postShare";
import { useToastStore } from "@/shared/store/useToastStore";
import Toast from "@/widgets/Toast";

interface ShareButtonProps {
  image: React.RefObject<HTMLDivElement | null>;
  title: string;
  memberEcoVerificationId: string;
}

const ShareButton = ({ image, title, memberEcoVerificationId }: ShareButtonProps) => {
  const isiOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    typeof window !== "undefined" &&
    !("MSStream" in window);
  const { openToast, isOpen, message } = useToastStore();
  const handleShareButtonClick = async () => {
    if (!image.current) return;

    try {
      const canvas = await html2canvas(image.current, {
        useCORS: true,
        scale: window.devicePixelRatio,
        backgroundColor: null,
        scrollY: -window.scrollY,
      });

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Blob 생성 실패"));
        }, "image/png");
      });

      const fileTitle = `우이미에서의 ${title === "" ? "활동" : title}!`;
      const file = new File([blob], `${fileTitle}.png`, {
        type: "image/png",
      });

      const isWhatsApp = /whatsapp/i.test(navigator.userAgent);
      const canShareFiles = navigator.canShare?.({ files: [file] }) ?? false;

      const shareData = {} as ShareData;

      // Always add files if possible
      if (canShareFiles) {
        shareData.files = [file];
      }

      // WhatsApp + iOS + files → files만 전송
      if (!(isiOS && isWhatsApp && file)) {
        if (title !== "") shareData.title = title;
        shareData.text = "이 이미지를 확인해보세요!";
        shareData.url = window.location.href;
      }

      if (canShareFiles) {
        // 공유 시도
        await navigator.share(shareData);

        // 포인트 적립
        const response = await postShare(memberEcoVerificationId);
        if (response.code === 2000) {
          openToast("공유 추가 하트 20점 적립! 감사합니다!");
        } else if (response.code === 47004) {
          openToast("이미 공유한 인증입니다.");
        } else {
          console.log("공유하기 실패:", response.code);
        }
      } else {
        // fallback (iOS Safari 등) → 다운로드
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${fileTitle}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        openToast("이미지를 다운로드했습니다. iOS에서는 링크 공유를 권장합니다.");
      }
    } catch (error) {
      console.error("이미지 공유 실패:", error);
      openToast("이미지 공유 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      {isOpen && <Toast message={message} position="top" />}
      <Button onClick={handleShareButtonClick}>공유하기</Button>
    </>
  );
};

export default ShareButton;
