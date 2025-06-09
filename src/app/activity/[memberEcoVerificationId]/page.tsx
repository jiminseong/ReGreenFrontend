"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CoupleGuard from "@/shared/lib/CoupleGuard";
import ShareButton from "@/features/certification/ui/ShareButton";
import Button from "@/shared/ui/Button";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const imageUrl = searchParams.get("imageUrl");
  const title = searchParams.get("title");
  const ecoLovePoint = searchParams.get("ecoLovePoint");
  const breakupBufferPoint = searchParams.get("breakupBufferPoint");
  const memberEcoVerificationId = params.memberEcoVerificationId;

  const ref = useRef<HTMLDivElement>(null);
  const [isBottomModal, setIsBottomModal] = useState(false);

  const handleBottomModal = () => {
    setIsBottomModal(!isBottomModal);
  };

  const handleHomeButtonClick = async () => {
    await setIsBottomModal(false);
    router.push("/home");
  };

  useEffect(() => {
    if (!imageUrl || !title || !ecoLovePoint || !breakupBufferPoint || !memberEcoVerificationId) {
      router.push("/home");
    }
  }, [imageUrl, title, ecoLovePoint, breakupBufferPoint, memberEcoVerificationId, router]);

  return (
    <>
      <CoupleGuard />

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

        {/* 바텀 모달 */}
        <AnimatePresence>
          {isBottomModal && (
            <motion.div
              key="overlay"
              onClick={() => handleBottomModal()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 z-40"
            >
              <motion.div
                key="bottom-modal"
                onClick={(e) => e.stopPropagation()}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.3 }}
                className="absolute z-50 bottom-0 px-5 py-5 bg-white rounded-t-[20px] flex flex-col gap-5 w-full"
              >
                {imageUrl && (
                  <div
                    ref={ref}
                    // 높이를 넓이와 동일하게 설정
                    className="w-full h-[calc(100vw)] f  max-h-[500px] overflow-hidden rounded-lg relative"
                  >
                    <div className="absolute inset-0 bg-black/50 w-full h-full z-5" />
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="activity image"
                        className="object-cover rounded-lg w-full h-full"
                        style={{ objectFit: "cover", borderRadius: "12px" }}
                      />
                    )}
                    <div className="absolute bottom-5 right-5 flex flex-col gap-4 z-10">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/icon/activity/certification/photoFrameIcon.svg"
                          alt="calendar icon"
                          width={38}
                          height={56}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between gap-[15px]">
                  <ShareButton
                    title={title ?? ""}
                    memberEcoVerificationId={String(memberEcoVerificationId)}
                    image={ref}
                  />

                  <Button gray onClick={handleHomeButtonClick}>
                    홈으로
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
