import Button from "@/shared/ui/Button";
import html2canvas from "html2canvas";
import React from "react";

interface ShareButtonProps {
  image: React.RefObject<HTMLDivElement | null>;
  title: string;
}

const ShareButton = ({ image, title }: ShareButtonProps) => {
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

      const file = new File([blob], `우이미에서의 ${title === "" ? "활동" : title}!.png`, {
        type: "image/png",
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "나의 캡처 이미지",
          text: "이 이미지를 확인해보세요!",
          files: [file],
        });
        console.log("공유 성공!");
      } else {
        alert("이 브라우저는 이미지 공유를 지원하지 않습니다.");
      }
    } catch (error) {
      console.error("이미지 공유 실패:", error);
    }
  };

  return <Button onClick={handleShareButtonClick}>공유하기</Button>;
};

export default ShareButton;
