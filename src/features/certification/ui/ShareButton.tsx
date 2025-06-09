"use client";
import React, { useState } from "react";
import Button from "@/shared/ui/Button";
import { postShare } from "../lib/postShare";
import { useToastStore } from "@/shared/store/useToastStore";
import LogoLoading from "@/widgets/LogoLoading";
import { createShareBlob } from "../lib/createShareBlob";

interface ShareButtonProps {
  imageUrl: string | null;
  title: string;
  memberEcoVerificationId: string;
  isRef: React.RefObject<HTMLDivElement> | null;
}

export default function ShareButton({
  imageUrl,
  title,
  memberEcoVerificationId,
  isRef,
}: ShareButtonProps) {
  const { openToast } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    if (isRef === null) {
      setIsLoading(false);
      openToast("공유할 이미지가 준비되지 않았습니다.");
      return;
    }
    const container = isRef.current;
    if (!container || !imageUrl) {
      setIsLoading(false);
      openToast("공유할 이미지를 찾을 수 없습니다.");
      return;
    }

    try {
      const blob = await createShareBlob(imageUrl, container);
      const fileTitle = `우이미에서의 ${title || "활동"}!`;
      const file = new File([blob], `${fileTitle}.png`, { type: "image/png" });

      await navigator.share({
        title: fileTitle,
        files: [file],
      });

      const res = await postShare(memberEcoVerificationId);
      if (res.code === 2000) {
        openToast("공유 추가 하트 20점 적립! 감사합니다!");
      } else if (res.code === 47004) {
        openToast("이미 공유한 인증입니다.");
      } else {
        openToast("공유는 완료되었지만, 서버 처리 중에 문제가 있었습니다.");
      }
    } catch (err) {
      console.error(err);
      openToast("공유 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LogoLoading />}
      <Button onClick={handleClick}>공유하기</Button>
    </>
  );
}
