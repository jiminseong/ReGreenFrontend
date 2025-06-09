// lib/createShareBlob.ts
import html2canvas from "html2canvas";

/**
 * HTML 요소를 html2canvas로 캡처하여 Blob으로 반환
 * @param container HTMLElement를 React.RefObject.current 형태로 넘겨주세요.
 * @param useCORS crossOrigin 이미지 허용 여부
 * @param backgroundColor 배경색 (null이면 투명)
 */
export async function createShareBlob(
  container: HTMLElement,
  useCORS = true,
  backgroundColor: string | null = null
): Promise<Blob> {
  if (!(container instanceof HTMLElement)) {
    throw new Error("createShareBlob: 유효한 HTMLElement가 필요합니다.");
  }

  // html2canvas로 캡처
  const canvas = await html2canvas(container, {
    useCORS,
    backgroundColor,
    scale: window.devicePixelRatio || 1,
  });

  // canvas to Blob
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Blob 생성 실패"));
    }, "image/png");
  });
}
