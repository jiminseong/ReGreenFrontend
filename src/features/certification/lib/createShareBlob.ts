export async function createShareBlob(
  container: HTMLElement,
  imageUrl: string,
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
  const [bg, icon] = await Promise.all([
    loadImg(imageUrl),
    loadImg("/icon/activity/certification/photoFrameIcon.svg"),
  ]);

  // 3) 캔버스 및 해상도 설정
  const dpr = (window.devicePixelRatio || 1) * 2;
  const CSSW = container.clientWidth;
  const CSSH = container.clientHeight;
  const canvas = document.createElement("canvas");
  canvas.width = CSSW * dpr;
  canvas.height = CSSH * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // 4) 둥근 모서리 클리핑
  const borderRadius = 12;
  ctx.save();
  ctx.beginPath();
  // top-left corner
  ctx.moveTo(borderRadius, 0);
  ctx.lineTo(CSSW - borderRadius, 0);
  ctx.quadraticCurveTo(CSSW, 0, CSSW, borderRadius);
  ctx.lineTo(CSSW, CSSH - borderRadius);
  ctx.quadraticCurveTo(CSSW, CSSH, CSSW - borderRadius, CSSH);
  ctx.lineTo(borderRadius, CSSH);
  ctx.quadraticCurveTo(0, CSSH, 0, CSSH - borderRadius);
  ctx.lineTo(0, borderRadius);
  ctx.quadraticCurveTo(0, 0, borderRadius, 0);
  ctx.closePath();
  ctx.clip();

  // 5) background-size: cover 계산
  const BW = bg.naturalWidth;
  const BH = bg.naturalHeight;
  const coverScale = Math.max(CSSW / BW, CSSH / BH);
  const sw = CSSW / coverScale;
  const sh = CSSH / coverScale;
  const sx = (BW - sw) / 2;
  const sy = (BH - sh) / 2;

  // 6) 배경 그리기
  ctx.drawImage(bg, sx, sy, sw, sh, 0, 0, CSSW, CSSH);

  // 7) 검정 반투명 overlay
  ctx.fillStyle = `rgba(0,0,0,${overlayOpacity})`;
  ctx.fillRect(0, 0, CSSW, CSSH);

  // 8) 아이콘 크기/위치 계산 (CSS→Canvas 비율)
  const scaleX = CSSW / container.clientWidth;
  const scaleY = CSSH / container.clientHeight;
  const iconW = iconCssWidth * scaleX;
  const iconH = iconCssHeight * scaleY;
  const padX = paddingCss * scaleX;
  const padY = paddingCss * scaleY;
  const x = CSSW - iconW - padX;
  const y = CSSH - iconH - padY;
  ctx.drawImage(icon, x, y, iconW, iconH);

  // 9) 클리핑 해제
  ctx.restore();

  // 10) Blob 반환
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Blob 생성 실패"))), "image/png");
  });
}
