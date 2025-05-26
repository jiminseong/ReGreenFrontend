"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import ActivityItem from "@/features/certification/ui/ActivityItem";
import ToastButton from "@/widgets/ToastButton";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { useActivityList } from "@/entities/activity/lib/useActivityList";
import DummyActivityItem from "./DummyActivityItem";
import Loading from "@/widgets/Loading";
import Toast from "@/widgets/Toast";
import { useCertificationStore } from "@/features/description/lib/store";
import { dummyActivities } from "../model/dummyActivities";
import { useUploadPhoto } from "../lib/useUploadPhoto";
import { useLoadingStore } from "../model/useLoadingStore";
import { useToastStore } from "../../../shared/store/useToastStore";
import LogoLoading from "@/widgets/LogoLoading";

const ActivityList = () => {
  const plusProgress = useCertificationStore((state) => state.plusProgress);
  const { uploadPhoto } = useUploadPhoto();
  const { loading } = useLoadingStore();
  const { isOpen, message } = useToastStore();
  const [currentCheckedId, setCurrentCheckedId] = useState<string>("");
  const { data: activities, isSuccess, isPending } = useActivityList();

  const notReadyActivities = dummyActivities;

  const selected = activities?.find((a) => a.ecoVerificationId === currentCheckedId);

  const isActivityTourSeen = localStorage.getItem("activityTourSeen");

  const handleCheckboxClick = (id: string) => {
    if (isActivityTourSeen !== "true") {
      plusProgress?.(1);
      setCurrentCheckedId((prev) => (prev === id ? "" : id));
      return;
    }
    setCurrentCheckedId((prev) => (prev === id ? "" : id));
  };

  const handleCertificationClick = () => {
    if (isActivityTourSeen !== "true") {
      plusProgress?.(1);
      return;
    }
    if (!selected) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

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

  const TOAST_BUTTON_MESSAGE = selected ? (
    <div className="flex items-center justify-center gap-2">
      <>
        사진으로 인증하기
        <Image
          src="/icon/activity/certification/cameraIcon.svg"
          width={24}
          height={24}
          alt="카메라아이콘"
        />
      </>
    </div>
  ) : null;

  return (
    <div className="bg-white h-full overflow-y-scroll no-scrollbar relative">
      {isOpen && <Toast message={message} position="top" />}
      {loading && <LogoLoading />}
      <AnimatePresence>
        {selected && (
          <div className="w-full px-5 max-w-[500px] fixed bottom-10 left-1/2  transform -translate-x-1/2  flex flex-col gap-2 z-50">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="w-full justify-center gap-4 flex items-center z-50"
            >
              <div className="flex items-center justify-center  gap-2">
                <Image src="/icon/home/heartIcon.svg" width={24} height={24} alt="하트아이콘" />
                <span className="text-ppink font-bold">+{selected.breakupBufferPoint}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Image src="/icon/home/calendarIcon.svg" width={24} height={24} alt="달력아이콘" />
                <span className="font-bold">+{selected.breakupBufferPoint}</span>
              </div>
            </motion.div>
            <ToastButton message={TOAST_BUTTON_MESSAGE} onToastClick={handleCertificationClick} />
          </div>
        )}
      </AnimatePresence>
      {isPending && (
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      )}
      {isSuccess &&
        activities.map((activity) => (
          <ActivityItem
            key={activity.ecoVerificationId}
            ecoVerificationId={activity.ecoVerificationId}
            title={activity.title}
            ecoLovePoint={activity.ecoLovePoint}
            breakupBufferPoint={activity.breakupBufferPoint}
            imageUrl={
              activity.iconImageUrl || activity.title === "다회용 컵 이용하기"
                ? "/icon/activity/cupIcon.svg"
                : activity.title === "중고 제품 나눔/구매 인증하기"
                ? "/icon/activity/danguenIcon.svg"
                : activity.title === "플로깅 데이트하기"
                ? "/icon/activity/trashIcon.svg"
                : ""
            }
            currentCheckedId={currentCheckedId}
            onChecked={handleCheckboxClick}
          />
        ))}{" "}
      <div className="relative">
        <span className="absolute z-20 w-full text-center bottom-110  md:bottom-64  font-normal text-lg">
          업데이트 예정입니다.
        </span>
        {notReadyActivities.map((activity) => (
          <DummyActivityItem
            key={activity.id}
            ecoVerificationId={activity.id}
            imageUrl={activity.iconSrc}
            title={activity.label}
            {...activity}
          />
        ))}{" "}
      </div>
    </div>
  );
};

export default ActivityList;
