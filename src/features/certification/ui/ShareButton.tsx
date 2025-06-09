// features/certification/ui/ShareButton.tsx
"use client";
import React, { useState } from "react";
import Button from "@/shared/ui/Button";
import { postShare } from "../lib/postShare";
import { useToastStore } from "@/shared/store/useToastStore";
import LogoLoading from "@/widgets/LogoLoading";
import { createShareBlob } from "../lib/createShareBlob";

interface ShareButtonProps {
  containerRef: React.RefObject<HTMLDivElement | null>;

  title: string;
  memberEcoVerificationId: string;
}

export default function ShareButton({
  containerRef,
  title,
  memberEcoVerificationId,
}: ShareButtonProps) {
  const { openToast } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!containerRef.current) return;
    setIsLoading(true);

    // ① Pull the CSS background URL
    const bgStyle = getComputedStyle(containerRef.current);
    const match = bgStyle.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
    const bgUrl = match && match[1];
    if (!bgUrl) {
      openToast("배경 이미지가 준비되지 않았습니다.");
      setIsLoading(false);
      return;
    }

    // ② Wait for the background to load
    await new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = bgUrl;
      img.onload = () => resolve();
      img.onerror = () => reject("배경 이미지 로드 실패");
    });

    // ③ If you’re still using <img> or next/image for the icon, wait for that too:
    await new Promise<void>((resolve, reject) => {
      const iconEl =
        containerRef.current!.querySelector<HTMLImageElement>("img[alt='프레임 아이콘']");
      if (!iconEl) return resolve();
      if (iconEl.complete) return resolve();
      iconEl.onload = () => resolve();
      iconEl.onerror = () => reject("아이콘 로드 실패");
    });

    setIsLoading(true);
    try {
      // Blob 생성 (container 기반)
      const blob = await createShareBlob(containerRef.current);

      // 네이티브 공유
      const fileTitle = `우이미에서의 ${title || "활동"}!`;
      const file = new File([blob], `${fileTitle}.png`, { type: "image/png" });
      await navigator.share({ title: fileTitle, files: [file] });

      // 서버 기록
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
