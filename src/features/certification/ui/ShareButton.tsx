import Button from "@/shared/ui/Button";
import html2canvas from "html2canvas-pro";
import React from "react";
import { postShare } from "../lib/postShare";
import { useToastStore } from "@/shared/store/useToastStore";

interface ShareButtonProps {
  image: React.RefObject<HTMLDivElement | null>;
  title: string;
  memberEcoVerificationId: string;
}

const ShareButton = ({ image, title, memberEcoVerificationId }: ShareButtonProps) => {
  //const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) && !("MSStream" in window);
  const { openToast } = useToastStore((state) => ({
    openToast: state.openToast,
  }));
  const handleShareButtonClick = async () => {
    if (!image.current) return;

    try {
      //공유하기 누를 시에 포인트 추가 적립

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

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "나의 캡처 이미지",
          text: "이 이미지를 확인해보세요!",
          files: [file],
        });

        const response = await postShare(memberEcoVerificationId);
        if (response.code === 2000) {
          openToast("공유 추가 하트 20점 적립! 감사합니다!");
          return;
        }
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${fileTitle}.png`;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("이미지 공유 실패:", error);
    }
  };

  return <Button onClick={handleShareButtonClick}>공유하기</Button>;
};

export default ShareButton;
