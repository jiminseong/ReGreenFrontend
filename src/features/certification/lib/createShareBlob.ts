// lib/createShareBlob.ts
import * as htmlToImage from "html-to-image";

/**
 * HTMLElement를 html-to-image로 캡처하여
 * (기본 DPR × 2) 고해상도 PNG Blob으로 반환합니다.
 *
 * @param container 캡처할 HTMLElement (ref.current)
 * @param scaleFactor DPR에 곱할 배율 (default: 2)
 */
export async function createShareBlob(container: HTMLElement, scaleFactor = 2): Promise<Blob> {
  if (!(container instanceof HTMLElement)) {
    throw new Error("createShareBlob: 유효한 HTMLElement가 필요합니다.");
  }

  // 실제 사용할 픽셀 배율: devicePixelRatio × scaleFactor
  const pixelRatio = (window.devicePixelRatio || 1) * scaleFactor;

  const options = {
    cacheBust: true, // 캐시 우회
    backgroundColor: "transparent", // 투명 배경 유지
    width: container.clientWidth, // CSS 픽셀 너비 고정
    height: container.clientHeight, // CSS 픽셀 높이 고정
    pixelRatio, // DPR 대응 + 추가 배율
    style: {
      transform: "scale(1)",
      transformOrigin: "top left",
      width: `${container.clientWidth}px`,
      height: `${container.clientHeight}px`,
    },
  };

  // toPng → DataURL
  const dataUrl = await htmlToImage.toPng(container, options);
  // DataURL → Blob
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return blob;
}
