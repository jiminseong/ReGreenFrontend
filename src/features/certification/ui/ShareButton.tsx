import * as htmlToImage from "html-to-image";
import React, { useState } from "react";
import Button from "@/shared/ui/Button";
import { postShare } from "../lib/postShare";
import { useToastStore } from "@/shared/store/useToastStore";
import LogoLoading from "@/widgets/LogoLoading";

interface ShareButtonProps {
  image: React.RefObject<HTMLDivElement | null>;
  title: string;
  memberEcoVerificationId: string;
  imageLoaded?: boolean;
}

const ShareButton = ({ image, title, memberEcoVerificationId, imageLoaded }: ShareButtonProps) => {
  const { openToast } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!image.current) return;

    try {
      setIsLoading(true);

      const blob = await htmlToImage.toBlob(image.current, {
        pixelRatio: 1,
        cacheBust: false,
      });

      if (!blob) {
        throw new Error("Blob 생성 실패");
      }

      const fileTitle = `우이미에서의 ${title === "" ? "활동" : title}!`;
      const file = new File([blob], `${fileTitle}.png`, {
        type: "image/png",
      });

      await new Promise<void>((resolve) => {
        requestAnimationFrame(async () => {
          try {
            await navigator.share({
              title: fileTitle,
              files: [file],
            });
            resolve();
          } catch (err) {
            console.error("공유 실패:", err);
            resolve();
          }
        });
      });

      const response = await postShare(memberEcoVerificationId);
      if (response.code === 2000) {
        openToast("공유 추가 하트 20점 적립! 감사합니다!");
      } else if (response.code === 47004) {
        openToast("이미 공유한 인증입니다.");
      }
    } catch (error) {
      console.error("공유 실패:", error);
      openToast("이미지 처리 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LogoLoading />}
      <Button
        onClick={() => {
          if (!imageLoaded) {
            openToast("이미지가 아직 로드 중입니다. 잠시 후 다시 시도해주세요.");
            return;
          }
          handleClick();
        }}
      >
        공유하기
      </Button>
    </>
  );
};

export default ShareButton;
