/**
 * 주어진 이미지 URL과 고정 아이콘을 합쳐
 * 검정 반투명 오버레이를 씌운 후 Blob으로 반환하는 함수
 */
export async function createShareBlob(
  imageUrl: string | null,
  iconPath: string = "/icon/activity/certification/photoFrameIcon.svg",
  overlayOpacity: number = 0.2,
  iconWidth: number = 38,
  iconHeight: number = 58,
  padding: number = 20
): Promise<Blob> {
  // 이미지 로드 헬퍼
  const loadImg = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  // 배경 + 아이콘 로딩
  const proxyUrl = imageUrl ? `/api/proxy/image?url=${encodeURIComponent(imageUrl)}` : "";
  const [bg, icon] = await Promise.all([loadImg(proxyUrl), loadImg(iconPath)]);

  // 캔버스 생성 (원본 크기 × DPR)
  const dpr = window.devicePixelRatio || 1;
  const width = bg.naturalWidth;
  const height = bg.naturalHeight;
  const canvas = document.createElement("canvas");
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext("2d")!;

  // Hi-DPI & 스무딩
  ctx.scale(dpr, dpr);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // 배경 그리기
  ctx.drawImage(bg, 0, 0, width, height);

  // 반투명 오버레이
  ctx.fillStyle = `rgba(0,0,0,${overlayOpacity})`;
  ctx.fillRect(0, 0, width, height);

  // 아이콘 그리기 (고정 크기, 우측 하단)
  const x = width - iconWidth - padding;
  const y = height - iconHeight - padding;
  ctx.drawImage(icon, x, y, iconWidth, iconHeight);

  // Blob 반환
  return new Promise<Blob>((resolve) => {
    canvas.toBlob((b) => b && resolve(b), "image/png");
  });
}
