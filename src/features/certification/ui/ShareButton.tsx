import * as htmlToImage from "html-to-image";
import React from "react";
import Button from "@/shared/ui/Button";
import { postShare } from "../lib/postShare";
import { useToastStore } from "@/shared/store/useToastStore";

interface ShareButtonProps {
  image: React.RefObject<HTMLDivElement> | null;
  title: string;
  memberEcoVerificationId: string;
}

const ShareButton = ({ image, title, memberEcoVerificationId }: ShareButtonProps) => {
  const { openToast } = useToastStore();

  const handleClick = async () => {
    if (!image) return;

    try {
      const blob = await htmlToImage.toBlob(image.current, {
        pixelRatio: 1,
        cacheBust: false,
      });

      if (!blob) {
        throw new Error("Blob 생성 실패");
      }

      console.log("blob size", blob.size);

      const fileTitle = `우이미에서의 ${title === "" ? "활동" : title}!`;
      const file = new File([blob], `${fileTitle}.png`, {
        type: "image/png",
      });

      await navigator.share({
        title: fileTitle,
        files: [file],
      });

      const response = await postShare(memberEcoVerificationId);
      if (response.code === 2000) {
        openToast("공유 추가 하트 20점 적립! 감사합니다!");
      } else if (response.code === 47004) {
        openToast("이미 공유한 인증입니다.");
      } else {
        console.log("공유하기 실패:", response.code);
      }
    } catch (err) {
      console.error("이미지 처리 실패:", err);
      openToast("이미지 처리 중 오류가 발생했습니다.");
    }
  };

  return <Button onClick={handleClick}>공유하기</Button>;
};

export default ShareButton;
