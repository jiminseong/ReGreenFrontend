export async function createShareBlob(
  imageUrl: string | null,
  container: HTMLElement, // ref.current
  iconCssWidth = 38, // CSS 상에 보이는 아이콘 너비(px)
  iconCssHeight = 58, // CSS 상에 보이는 아이콘 높이(px)
  paddingCss = 20, // CSS 상 여백(px)
  overlayOpacity = 0.2
): Promise<Blob> {
  // 1) 로드 헬퍼
  const loadImg = (src: string) =>
    new Promise<HTMLImageElement>((res, rej) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = src;
    });

  // 2) 배경 + 아이콘 로딩
  const proxyUrl = `/api/proxy/image?url=${encodeURIComponent(imageUrl ?? "")}`;
  const [bg, icon] = await Promise.all([
    loadImg(proxyUrl),
    loadImg("/icon/activity/certification/photoFrameIcon.svg"),
  ]);

  // 3) 캔버스 및 DPI 세팅
  const dpr = window.devicePixelRatio || 1;
  const w = bg.naturalWidth;
  const h = bg.naturalHeight;
  const canvas = document.createElement("canvas");
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // 4) 배경 + overlay
  ctx.drawImage(bg, 0, 0, w, h);
  ctx.fillStyle = `rgba(0,0,0,${overlayOpacity})`;
  ctx.fillRect(0, 0, w, h);

  // 5) 스케일 계산: CSS → Blob
  const rect = container?.getBoundingClientRect();
  const scaleX = w / (rect?.width || 1);
  const scaleY = h / (rect?.height || 1);

  // 6) 아이콘 크기/위치 결정
  const iconW = iconCssWidth * scaleX;
  const iconH = iconCssHeight * scaleY;
  const padX = paddingCss * scaleX;
  const padY = paddingCss * scaleY;
  const x = w - iconW - padX;
  const y = h - iconH - padY;

  // 7) 아이콘 그리기
  ctx.drawImage(icon, x, y, iconW, iconH);

  // 8) Blob 반환
  return new Promise<Blob>((resolve) => canvas.toBlob((b) => b && resolve(b), "image/png"));
}
