import type { Metadata } from "next";
import { Pretendard } from "./fonts/font";
import QueryProvider from "./providers/query-provider";
import "./globals.css";
import SwiperBlockWrapper from "./providers/SwiperBlockWrapper";

export const metadata: Metadata = {
  title: "우리는 이별을 미루기로 했다.",
  description: "우리는 이별을 미루기로 했다.",
  manifest: "/manifest.json",
  icons: {
    icon: "/192.png",
    shortcut: "/192.png",
    apple: "/192.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/192.png",
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased overflow-hidden">
        <QueryProvider>
          <div
            className={`${Pretendard.className} inset-0 z-[210] mx-auto min-h-screen max-w-[500px] w-full min-w-[320px]  bg-white `}
          >
            <SwiperBlockWrapper>{children}</SwiperBlockWrapper>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
