"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import React from "react";
import AuthGuard from "@/shared/lib/AuthGuard";
import TopNavigationBar from "@/shared/ui/TopNavigationBar";
import CoupleGuard from "@/shared/lib/CoupleGuard";
import ShareButton from "@/features/certification/ui/ShareButton";

export default function Page() {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("imageUrl");
  const title = searchParams.get("title");

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  //요일
  const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = dayOfWeek[currentDate.getDay()];
  const formattedDate = `${year}.${month}.${day} ${dayName}요일`;

  //해당 ref에 해당 하는 컴포넌트를 GCS에 업로드하고 Share하기 위한 함수
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <AuthGuard />
      <CoupleGuard />

      <TopNavigationBar title="공유하기" backPage="/activity/list" />

      <div className="flex flex-col w-full px-5 py-20 justify-between  items-center h-screen">
        <div className="flex flex-col gap-5 w-full">
          {imageUrl && (
            <div ref={ref} className="w-full h-[350px] overflow-hidden rounded-lg relative">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="activity image"
                  fill
                  className="object-cover rounded-lg"
                />
              )}
              <div className="absolute bottom-5 left-5 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Image
                    src="/icon/activity/certification/calendarIcon.svg"
                    alt="calendar icon"
                    width={24}
                    height={24}
                  />
                  <span className="text-white  font-semibold">{formattedDate}</span>
                </div>
              </div>
            </div>
          )}

          {imageUrl && <ShareButton title={title ?? ""} image={ref} />}
        </div>
      </div>
    </>
  );
}
