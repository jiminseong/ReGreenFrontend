import Button from "@/shared/ui/Button";
import html2canvas from "html2canvas-pro";
import React from "react";

interface ShareButtonProps {
  image: React.RefObject<HTMLDivElement | null>;
  title: string;
}

const ShareButton = ({ image, title }: ShareButtonProps) => {
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) && !("MSStream" in window);

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

      if (navigator.canShare && navigator.canShare({ files: [file] }) && !isIOS) {
        await navigator.share({
          title: "나의 캡처 이미지",
          text: "이 이미지를 확인해보세요!",
          files: [file],
        });
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
