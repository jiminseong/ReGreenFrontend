import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "우리는 이별을 미루기로 했다.",
    short_name: "우이미",
    description: "우리는 이별을 미루기로 했다.",
    start_url: "/",
    display: "standalone",
    background_color: "#3c3c3c",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/192.webp",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/512.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  };
}
