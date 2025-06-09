"use client";
import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ShareButton from "@/features/certification/ui/ShareButton";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/features/certification/model/useModalStore";
import Image from "next/image";
import Button from "@/shared/ui/Button";

interface BottomShareModalProps {
  imageUrl: string | null;
  title?: string | null;
  memberEcoVerificationId: string | null;
}

const BottomShareModal = ({ imageUrl, title, memberEcoVerificationId }: BottomShareModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isOpen: isBottomModal, setIsOpen: setIsBottomModal } = useModalStore();

  const handleHomeButtonClick = async () => {
    await setIsBottomModal(false);
    router.push("/home");
  };

  const handleBottomModal = () => {
    setIsBottomModal(!isBottomModal);
  };
  return (
    <AnimatePresence>
      {isBottomModal && imageUrl && (
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
            <div
              ref={ref}
              className="w-full max-w-[500px] aspect-square overflow-hidden rounded-lg relative "
            >
              <Image src={imageUrl} alt="인증 사진" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-5 right-5 flex items-center gap-2 border-none">
                <Image
                  src="/icon/activity/certification/photoFrameIcon.svg"
                  alt="프레임 아이콘"
                  width={38}
                  height={56}
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-[15px]">
              {ref !== null && (
                <ShareButton
                  title={title ?? ""}
                  memberEcoVerificationId={String(memberEcoVerificationId)}
                  containerRef={ref}
                  imageUrl={imageUrl}
                />
              )}

              <Button gray onClick={handleHomeButtonClick}>
                홈으로
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BottomShareModal;
