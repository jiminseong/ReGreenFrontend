import html2canvas from "html2canvas-pro";
import React, { useEffect, useRef } from "react";
import Button from "@/shared/ui/Button";

interface ShareButtonProps {
  image: React.RefObject<HTMLDivElement | null>;
  title: string;
}

const ShareButton = ({ image, title }: ShareButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClick = async () => {
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

        await navigator.share({
          title: fileTitle,
          files: [file],
        });

        console.log("✅ 파일만 공유 성공");
      } catch (err) {
        console.error("❌ 파일만 공유 실패:", err);
      }
    };

    const button = buttonRef.current;
    if (button) {
      button.addEventListener("click", handleClick);
    }

    return () => {
      if (button) {
        button.removeEventListener("click", handleClick);
      }
    };
  }, [image, title]);

  return <Button ref={buttonRef}>공유하기</Button>;
};

export default ShareButton;
