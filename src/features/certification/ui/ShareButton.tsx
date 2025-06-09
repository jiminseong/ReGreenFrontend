import html2canvas from "html2canvas-pro";
import React, { useEffect, useRef } from "react";
import Button from "@/shared/ui/Button";
import { postShare } from "../lib/postShare";
import { useToastStore } from "@/shared/store/useToastStore";

interface ShareButtonProps {
  image: React.RefObject<HTMLDivElement | null>;
  title: string;
  memberEcoVerificationId: string;
}

const ShareButton = ({ image, title, memberEcoVerificationId }: ShareButtonProps) => {
  const { openToast } = useToastStore();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClick = async () => {
      if (!image.current) return;

      try {
        // html2canvas → canvas 얻기
        const canvas = await html2canvas(image.current, {
          useCORS: true,
          scale: 1,
          backgroundColor: null,
          scrollY: -window.scrollY,
        });

        // toDataURL → fetch → blob 변환 (Safari 대응)
        const dataUrl = canvas.toDataURL("image/png");
        console.log("dataUrl length", dataUrl.length);
        console.log("dataUrl sample", dataUrl.slice(0, 100));
        console.log("fetch start");
        const response = await fetch(dataUrl);
        console.log("fetch success");

        const blob = await response.blob();

        console.log("blob size", blob.size);

        const fileTitle = `우이미에서의 ${title === "" ? "활동" : title}!`;
        const file = new File([blob], `${fileTitle}.png`, {
          type: "image/png",
        });

        // Safari 대응용 trusted click 확보 → requestAnimationFrame + setTimeout
        requestAnimationFrame(() => {
          setTimeout(async () => {
            try {
              await navigator.share({
                title: fileTitle,
                files: [file], // files만
              });

              console.log("✅ 파일만 공유 성공");

              // 공유 성공 시 → postShare 호출
              const response = await postShare(memberEcoVerificationId);
              if (response.code === 2000) {
                openToast("공유 추가 하트 20점 적립! 감사합니다!");
              } else if (response.code === 47004) {
                openToast("이미 공유한 인증입니다.");
              } else {
                console.log("공유하기 실패:", response.code);
              }
            } catch (err) {
              console.error("❌ 파일만 공유 실패:", err);
              openToast("이미지 공유 중 오류가 발생했습니다.");
            }
          }, 150); // 애니메이션 frame 안정화
        });
      } catch (err) {
        console.error("이미지 처리 실패:", err);
        openToast("이미지 처리 중 오류가 발생했습니다.");
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
  }, [image, title, memberEcoVerificationId, openToast]);

  return <Button ref={buttonRef}>공유하기</Button>;
};

export default ShareButton;
