import localFont from "next/font/local";

export const Pretendard = localFont({
  src: [
    {
      path: "./Pretendard-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Pretendard-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Pretendard-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Pretendard-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Pretendard-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
});

export const Ownglyph = localFont({
  src: [
    {
      path: "./Ownglyph-ryurue.ttf",
      style: "normal",
    },
  ],
});
