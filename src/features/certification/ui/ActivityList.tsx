// ActivityList.tsx
"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ActivityItem from "@/features/certification/ui/ActivityItem";
import ToastButton from "@/widgets/ToastButton";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { useActivityList } from "@/entities/activity/lib/useActivityList";
import DummyActivityItem from "./DummyActivityItem";
import Toast from "@/widgets/Toast";
import { useCertificationStore } from "@/features/description/lib/store";
import { dummyActivities } from "../model/dummyActivities";
import { useRouter } from "next/navigation";
import { useLoadingStore } from "../model/useLoadingStore";
import { useToastStore } from "../../../shared/store/useToastStore";
import LogoLoading from "@/widgets/LogoLoading";
import { postCertification } from "../lib/postCertification";
import { prepareFileInput } from "../lib/prepareFileInput";
import { HTTPError } from "ky";
import { readImageDate } from "../lib/readImageDate";
import { isValidExifDate } from "../lib/isValidExifDate";
import { useActivityTourStore } from "@/features/certification/model/useActivityTourStore";
import CommonModal from "@/widgets/ComonModal";
import { postCertificationRetry } from "../lib/postCertificationRetry";

const ActivityList = () => {
  const plusProgress = useCertificationStore((s) => s.plusProgress);
  const router = useRouter();
  const { loading, setLoading } = useLoadingStore();
  const { openToast, isOpen, message } = useToastStore();
  const [currentCheckedId, setCurrentCheckedId] = useState("");
  const { data: activities, isSuccess, isPending } = useActivityList();
  const { isSeen, syncWithLocalStorage } = useActivityTourStore();
  const notReadyActivities = dummyActivities;
  const [retryId, setRetryId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    syncWithLocalStorage();
  }, [syncWithLocalStorage]);

  const selected = activities?.find((a) => a.ecoVerificationId === currentCheckedId);

  const handleCheckboxClick = (id: string) => {
    if (!isSeen) plusProgress?.(1);
    setCurrentCheckedId((prev) => (prev === id ? "" : id));
  };

  const uploadPhoto = async (
    file: File,
    ecoVerificationId: string,
    title: string,
    ecoLovePoint: number,
    breakupBufferPoint: number
  ) => {
    const MAX = 20 * 1024 * 1024;
    if (file.size > MAX) {
      openToast("파일 크기가 20MB를 초과합니다.");
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      openToast("HEIC 형식이 아닌 JPG/PNG로 바꿔주세요.");
      return;
    }
    const exif = await readImageDate(file);
    if (exif && !isValidExifDate(exif, 24)) {
      openToast("촬영일이 24시간 이전입니다.");
      return;
    }

    const form = new FormData();
    form.append("file", file);

    setLoading(true);
    try {
      const res = await postCertification(ecoVerificationId, form);

      if (res.data.status === "REJECTED") {
        setRetryId(res.data.memberEcoVerificationId);
        setIsModalOpen(true);
        return;
      }
      if (res.code !== 2000) {
        openToast("인증 사진 업로드에 실패했어요.");
        return;
      }

      const { memberEcoVerificationId, imageUrl } = res.data;
      router.push(
        `/activity/${memberEcoVerificationId}?imageUrl=${encodeURIComponent(
          imageUrl
        )}&title=${encodeURIComponent(
          title
        )}&ecoLovePoint=${ecoLovePoint}&breakupBufferPoint=${breakupBufferPoint}`
      );
    } catch (err) {
      if (err instanceof HTTPError) {
        const e = await err.response.json();
        switch (e.code) {
          case 47003:
            openToast("이미 인증한 활동입니다.");
            break;
          case 54001:
            openToast("인증 사진은 1개만 업로드할 수 있습니다.");
            break;
          case 44001:
            openToast("등록되지 않은 활동이에요.");
            break;
          default:
            openToast("네트워크 오류로 실패했어요.");
        }
      } else {
        openToast("예상치 못한 오류가 발생했어요.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCertificationClick = () => {
    if (!isSeen) {
      plusProgress?.(1);
      return;
    }
    if (!selected) return;

    const input = prepareFileInput();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        openToast("파일 선택 안 됨");
        return;
      }
      await uploadPhoto(
        file,
        selected.ecoVerificationId,
        selected.title,
        selected.ecoLovePoint,
        selected.breakupBufferPoint
      );
      setCurrentCheckedId("");
    };
    input.click();
  };

  return (
    <div className="bg-white h-full overflow-y-scroll no-scrollbar relative">
      {isOpen && <Toast message={message} position="top" />}
      {(isPending || loading) && <LogoLoading />}
      {isModalOpen && (
        <CommonModal
          isOpen={isModalOpen}
          message={
            <div className="flex flex-col items-center px-6">
              <span className="text-lg font-bold">아쉽게 거절되었어요.</span>
              <span className="text-sm text-center mt-2">
                지금 사진으로 재검토를 요청하시겠어요?
                <br />
                만약 새로운 사진으로 다시 시도하시려면 취소를 눌러주세요.
                <br />
                (재검토는 약 24시간 소요됩니다)
              </span>
            </div>
          }
          onConfirm={() => {
            setIsModalOpen(false);
            if (!retryId) return;
            postCertificationRetry(retryId, openToast);
          }}
          onCancel={() => setIsModalOpen(false)}
          confirmText="확인"
          cancelText="취소"
        />
      )}
      <AnimatePresence>
        {selected && (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-[500px] px-5 z-50 flex flex-col gap-2">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center gap-4 items-center"
            >
              <div className="bg-lpink px-2 py-[4.5px] border border-ppink rounded flex items-center gap-2">
                <Image src="/icon/home/heartIcon.svg" width={17} height={17} alt="하트" />
                <span className="text-ppink font-bold">+{selected.ecoLovePoint}</span>
              </div>
              <div className="bg-[#EEE] px-2 py-[4.5px] border border-[#222] rounded flex items-center gap-2">
                <Image src="/icon/home/calendarIcon.svg" width={17} height={17} alt="캘린더" />
                <span className="font-bold">+{selected.breakupBufferPoint}</span>
              </div>
            </motion.div>
            <ToastButton
              message={
                <div className="flex items-center justify-center gap-2">
                  사진으로 인증하기
                  <Image
                    src="/icon/activity/certification/cameraIcon.svg"
                    width={24}
                    height={24}
                    alt="카메라"
                  />
                </div>
              }
              onToastClick={handleCertificationClick}
            />
          </div>
        )}
      </AnimatePresence>

      {isSuccess &&
        activities
          .filter((a) => a.title !== "사전예약 히든미션")
          .map((activity) => (
            <ActivityItem
              key={activity.ecoVerificationId}
              ecoVerificationId={activity.ecoVerificationId}
              title={activity.title}
              ecoLovePoint={activity.ecoLovePoint}
              breakupBufferPoint={activity.breakupBufferPoint}
              imageUrl={
                activity.iconImageUrl ||
                (activity.title === "다회용 컵 이용하기"
                  ? "/icon/activity/cupIcon.svg"
                  : activity.title === "중고 제품 나눔/구매 인증하기"
                  ? "/icon/activity/danguenIcon.svg"
                  : "/icon/activity/trashIcon.svg")
              }
              currentCheckedId={currentCheckedId}
              onChecked={handleCheckboxClick}
            />
          ))}

      <div className="relative">
        <span className="absolute bottom-28 w-full text-center text-lg">업데이트 예정입니다.</span>
        {notReadyActivities.map((d) => (
          <DummyActivityItem
            key={d.id}
            ecoVerificationId={d.id}
            imageUrl={d.iconSrc}
            title={d.label}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
