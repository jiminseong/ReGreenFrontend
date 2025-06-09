// lib/createShareBlob.ts
import * as htmlToImage from "html-to-image";

/**
 * 지정된 HTMLElement를 html-to-image로 캡처하여 고해상도 PNG Blob으로 반환합니다.
 * @param container 캡처할 HTMLElement (ref.current 등)
 */
export async function createShareBlob(container: HTMLElement): Promise<Blob> {
  if (!(container instanceof HTMLElement)) {
    throw new Error("createShareBlob: 유효한 HTMLElement가 필요합니다.");
  }

  // html-to-image 옵션 설정
  const options = {
    cacheBust: true, // 네트워크 캐시 우회
    // backgroundColor을 생략하면 투명 배경을 유지합니다
    width: container.clientWidth, // CSS 픽셀 너비
    height: container.clientHeight, // CSS 픽셀 높이
    pixelRatio: window.devicePixelRatio || 1, // DPR 대응
    style: {
      transform: "scale(1)",
      transformOrigin: "top left",
      width: `${container.clientWidth}px`,
      height: `${container.clientHeight}px`,
    },
  };

  // toBlob 호출
  const blob = await htmlToImage.toBlob(container, options);
  if (!blob) {
    throw new Error("Blob 생성에 실패했습니다.");
  }
  return blob;
}
