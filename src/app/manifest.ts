import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "우리는 이별을 미루기로 했다.",
    short_name: "우이미",
    description: "우리는 이별을 미루기로 했다.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    orientation: "portrait",
    theme_color: "#ffffff",
    categories: ["social networking"],
    id: "wooimi",

    lang: "ko",
    dir: "ltr",
    scope: "/",
    icons: [
      {
        src: "/192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/image/onboard/1.png",
        type: "image/png",
        sizes: "440x448",
        label: "온보딩 화면 1",
      },
      {
        src: "/image/onboard/2.png",
        type: "image/png",
        sizes: "1226x1670",
        label: "온보딩 화면 2",
      },
      {
        src: "/image/onboard/3.png",
        type: "image/png",
        sizes: "1226x1670",
        label: "온보딩 화면 3",
      },
      {
        src: "/image/onboard/4.png",
        type: "image/png",
        sizes: "1226x1670",
        label: "온보딩 화면 4",
      },
    ],
    launch_handler: {
      client_mode: "focus-existing",
    },
  };
}
