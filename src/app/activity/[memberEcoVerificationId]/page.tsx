"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import React, { useEffect } from "react";

import CoupleGuard from "@/shared/lib/CoupleGuard";

import Button from "@/shared/ui/Button";
import Toast from "@/widgets/Toast";
import { useToastStore } from "@/shared/store/useToastStore";
import { useModalStore } from "@/features/certification/model/useModalStore";
import BottomShareModal from "@/features/share/ui/BottomShareModal";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const imageUrl = searchParams.get("imageUrl");
  const title = searchParams.get("title");
  const ecoLovePoint = searchParams.get("ecoLovePoint");
  const breakupBufferPoint = searchParams.get("breakupBufferPoint");
  const memberEcoVerificationId = params.memberEcoVerificationId;
  const { isOpen, message } = useToastStore();
  const { isOpen: isBottomModal, setIsOpen: setIsBottomModal } = useModalStore();

  const handleBottomModal = () => {
    setIsBottomModal(!isBottomModal);
  };

  useEffect(() => {
    if (!imageUrl || !title || !ecoLovePoint || !breakupBufferPoint || !memberEcoVerificationId) {
      router.push("/home");
    }
  }, [imageUrl, title, ecoLovePoint, breakupBufferPoint, memberEcoVerificationId, router]);

  return (
    <>
      <CoupleGuard />
      {isOpen && <Toast message={message} position="top" />}

      <div className="relative flex flex-col w-full px-5 py-5  items-center h-[100dvh]">
        <div className="flex flex-col  w-full h-full">
          <div className="flex flex-col items-center justify-center gap-[30px] h-full mb-20">
            <h1 className="font-semibold text-[28px] text-center ">
              인증이
              <br />
              완료되었습니다.
            </h1>
            <Image
              src="/icon/activity/certification/completeIcon.svg"
              alt="complete icon"
              width={100}
              height={100}
            />
            <div className="flex flex-col items-center justify-center gap-2.5">
              <p className="text-lg text-center">
                {title}
                <br />
                제공 보상
              </p>
              <div className="flex gap-4 justify-center items-center">
                <div className="flex items-center bg-lpink rounded-lg px-2 py-[1.5px] gap-2  min-w-[71px]">
                  <Image src="/icon/home/heartIcon.svg" alt="heart icon" width={17} height={17} />
                  <span className="text-ppink font-semibold text-lg">+{ecoLovePoint}</span>
                </div>
                <div className="flex items-center bg-[#EEEEEE] rounded-lg px-2 py-[1.5px] gap-2  min-w-[71px]">
                  <Image
                    src="/icon/home/calendarIcon.svg"
                    alt="calendar icon"
                    width={17}
                    height={17}
                  />
                  <span className="text-[#333333] font-semibold text-lg">
                    +{breakupBufferPoint}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Button className="" onClick={() => handleBottomModal()}>
            다음
          </Button>
        </div>

        <BottomShareModal
          title={title}
          imageUrl={imageUrl}
          memberEcoVerificationId={
            typeof memberEcoVerificationId === "string" ? memberEcoVerificationId : null
          }
        />
      </div>
    </>
  );
}
