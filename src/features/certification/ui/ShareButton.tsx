"use client";

import Button from "@/shared/ui/Button";
import html2canvas from "html2canvas-pro";
import React from "react";
import { postShare } from "../lib/postShare";
import { useToastStore } from "@/shared/store/useToastStore";
import Toast from "@/widgets/Toast";
import { useShare } from "@/shared/lib/useShare"; // 네가 만든 훅 사용

interface ShareButtonProps {
  image: React.RefObject<HTMLDivElement | null>;
  title: string;
  memberEcoVerificationId: string;
}

const ShareButton = ({ image, title, memberEcoVerificationId }: ShareButtonProps) => {
  const { isOpen, message, openToast } = useToastStore();
  const { share } = useShare();

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

      await share({
        file,
        title: fileTitle,
        text: "이 이미지를 확인해보세요!",
        url: window.location.href,
        onSuccess: async () => {
          // 포인트 적립
          const response = await postShare(memberEcoVerificationId);
          if (response.code === 2000) {
            openToast("공유 추가 하트 20점 적립! 감사합니다!");
          } else if (response.code === 47004) {
            openToast("이미 공유한 인증입니다.");
          } else {
            console.log("공유하기 실패:", response.code);
          }
        },
        onFailure: (err) => {
          openToast("이미지 공유 중 오류가 발생했습니다.");
          console.error("공유 실패:", err);
        },
      });
    } catch (err) {
      console.error("이미지 처리 실패:", err);
      openToast("이미지 처리 중 오류가 발생했습니다.");
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
