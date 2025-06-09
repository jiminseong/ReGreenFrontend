"use client";
import React, { useState } from "react";
import Button from "@/shared/ui/Button";
import { postShare } from "../lib/postShare";
import { useToastStore } from "@/shared/store/useToastStore";
import LogoLoading from "@/widgets/LogoLoading";

interface ShareButtonProps {
  imageUrl: string | null;
  title: string;
  memberEcoVerificationId: string;
}

export default function ShareButton({
  imageUrl,
  title,
  memberEcoVerificationId,
}: ShareButtonProps) {
  const { openToast } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);

  // Canvas로 Blob 생성
  const makeBlob = async (): Promise<Blob> => {
    // 1) 이미지 로드 헬퍼
    const loadImg = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    // 2) 배경 + 아이콘 이미지 로딩
    const proxyUrl = imageUrl ? `/api/proxy/image?url=${encodeURIComponent(imageUrl)}` : "";
    const [bg, icon] = await Promise.all([
      loadImg(proxyUrl),
      loadImg("/icon/activity/certification/photoFrameIcon.svg"),
    ]);

    // 3) 캔버스 생성 (원본 크기 × DPR)
    const dpr = window.devicePixelRatio || 1;
    const width = bg.naturalWidth;
    const height = bg.naturalHeight;
    const canvas = document.createElement("canvas");
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d")!;

    // 4) 스케일 & 스무딩 설정
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // 5) 배경 그리기 (CSS 픽셀 단위)
    ctx.drawImage(bg, 0, 0, width, height);

    // 6) 아이콘 위치 계산 (우측 하단 padding: 20px)
    const padding = 20;
    const iconW = icon.naturalWidth;
    const iconH = icon.naturalHeight;
    const x = width - iconW - padding;
    const y = height - iconH - padding;

    // 7) 아이콘 그리기
    ctx.drawImage(icon, x, y, iconW, iconH);

    // 8) Blob으로 변환
    return new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => b && resolve(b), "image/png");
    });
  };

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const blob = await makeBlob();
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
