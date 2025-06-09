// lib/createShareBlob.ts
import domtoimage from "dom-to-image-more";

/**
 * dom-to-image-more의 toPng을 이용해 HTMLElement를 캡처하여
 * 고해상도 PNG DataURL을 Blob으로 변환 후 반환합니다.
 *
 * @param container 캡처할 HTMLElement (예: ref.current)
 * @param filterNode 캡처 대상 필터 함수 (기본: 모든 노드 포함)
 */
export async function createShareBlob(
  container: HTMLElement,
  filterNode: (node: Node) => boolean = () => true
): Promise<Blob> {
  if (!(container instanceof HTMLElement)) {
    throw new Error("createShareBlob: 유효한 HTMLElement가 필요합니다.");
  }

  console.log("createShareBlob: 캡처 시작", container);
  // 요소 크기 및 DPR 계산
  const rect = container.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = rect.width;
  const height = rect.height;

  // dom-to-image-more 옵션 설정: 고해상도 캡처
  const options = {
    width: width * dpr,
    height: height * dpr,
    style: {
      transform: `scale(${dpr})`,
      transformOrigin: "top left",
      width: `${width}px`,
      height: `${height}px`,
    },
    filter: filterNode,
    cacheBust: true,
  };

  // toPng: PNG DataURL로 반환
  const dataUrl: string = await domtoimage.toPng(container, options);

  // DataURL을 Blob으로 변환
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return blob;
}
