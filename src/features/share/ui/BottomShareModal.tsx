"use client";
import React, { useRef, useState } from "react";
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
  actionLabel?: string;
  isMe?: boolean;
}

const BottomShareModal = ({
  imageUrl,
  title,
  memberEcoVerificationId,
  actionLabel = "홈으로",
  isMe,
}: BottomShareModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isOpen: isBottomModal, setIsOpen: setIsBottomModal } = useModalStore();

  const [shouldTriggerAction, setShouldTriggerAction] = useState(false);

  const handleToggleModal = () => {
    setShouldTriggerAction(!shouldTriggerAction);
    setIsBottomModal(!isBottomModal);
    console.log("Modal:", imageUrl, title, memberEcoVerificationId);
  };

  const handleActionClick = async () => {
    if (actionLabel === "홈으로") {
      router.push("/home");
      return;
    }
    handleToggleModal();
  };

  return (
    <AnimatePresence mode="wait">
      {isBottomModal && imageUrl && (
        <motion.div
          key="overlay"
          onClick={handleToggleModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 z-[999] w-full max-w-[500px] left-1/2 transform -translate-x-1/2 will-change-opacity cursor-pointer"
        >
          <motion.div
            key="bottom-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 650 }}
            animate={{ y: 0 }}
            exit={{ y: 650 }}
            transition={{ duration: 0.3 }}
            className="absolute z-50 bottom-0 px-5 py-5 bg-white rounded-t-[20px] cursor-auto flex flex-col gap-5 w-full max-w-[500px] left-1/2 transform will-change-transform -translate-x-1/2"
          >
            <div ref={ref} className="w-full aspect-square overflow-hidden rounded-lg relative ">
              <Image src={imageUrl} alt="인증 사진" fill className="object-cover" draggable={false} />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-5 right-5 flex items-center gap-2">
                <Image
                  src="/icon/activity/certification/photoFrameIcon.svg"
                  alt="프레임 아이콘"
                  width={38}
                  height={56}
                  draggable={false}
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-[15px]">
              {ref && (
                <ShareButton
                  isMe={isMe}
                  title={title ?? ""}
                  memberEcoVerificationId={String(memberEcoVerificationId)}
                  containerRef={ref}
                  imageUrl={imageUrl}
                />
              )}
              <Button gray onClick={handleActionClick}>
                {actionLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BottomShareModal;
