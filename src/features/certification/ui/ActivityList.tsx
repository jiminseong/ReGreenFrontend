"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { useLoadingStore } from "../model/useLoadingStore";
import { useToastStore } from "../../../shared/store/useToastStore";
import LogoLoading from "@/widgets/LogoLoading";
import { postCertification } from "../lib/postCertification";
import { prepareFileInput } from "../lib/prepareFileInput";
import { HTTPError } from "ky";

const ActivityList = () => {
  const plusProgress = useCertificationStore((state) => state.plusProgress);
  const router = useRouter();
  const { openToast } = useToastStore();
  const { loading, setLoading } = useLoadingStore();
  const { isOpen, message } = useToastStore();
  const [currentCheckedId, setCurrentCheckedId] = useState<string>("");
  const { data: activities, isSuccess, isPending } = useActivityList();
  const [showTour, setShowTour] = useState("");

  const notReadyActivities = dummyActivities;

  const selected = activities?.find((a) => a.ecoVerificationId === currentCheckedId);

  useEffect(() => {
    const isActivityTourSeen = localStorage.getItem("activityTourSeen");
    if (isActivityTourSeen) {
      setShowTour(isActivityTourSeen);
    }
  }, []);

  const handleCheckboxClick = (id: string) => {
    if (showTour !== "true") {
      plusProgress?.(1);
      setCurrentCheckedId((prev) => (prev === id ? "" : id));
      return;
    }
    setCurrentCheckedId((prev) => (prev === id ? "" : id));
  };

  const uploadPhoto = async (
    file: File,
    ecoVerificationId: string,
    title: string,
    ecoLovePoint: number,
    breakupBufferPoint: number
  ) => {
    const MAX_FILE_SIZE = 20 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      openToast("파일 크기가 20MB를 초과합니다.", () => setLoading(false));
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      openToast("HEIC 형식은 지원되지 않아요. JPG 또는 PNG로 바꿔주세요.", () => setLoading(false));
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await postCertification(ecoVerificationId, formData);
      setLoading(false);
      console.log("업로드 결과:", res.code);

      if (res.data.status === "REJECTED") {
        openToast("활동과 무관한 사진입니다.", () => setLoading(false));
      }

      if (res.code !== 2000) {
        openToast("인증 사진 업로드에 실패했어요.", () => setLoading(false));
      }

      if (res.data.status === "APPROVED") {
        const { memberEcoVerificationId, imageUrl } = res.data;
        router.push(
          `/activity/${memberEcoVerificationId}?imageUrl=${imageUrl}&title=${title}&ecoLovePoint=${ecoLovePoint}&breakupBufferPoint=${breakupBufferPoint}`
        );
      }
    } catch (error) {
      if (error instanceof HTTPError) {
        const res = await error.response.json();
        const code = res.code;
        console.error("HTTP 에러:", res);

        if (code === 47003) {
          setLoading(false);
          openToast("이미 인증한 활동입니다.");
          return;
        }

        if (code === 54001) {
          setLoading(false);
          openToast("인증 사진은 1개만 업로드할 수 있습니다.");
          return;
        }

        if (code === 44001) {
          setLoading(false);
          openToast("등록 되지 않은 활동이에요");
          return;
        }
        setLoading(false);
        openToast("네트워크 오류로 업로드에 실패했어요.");
      }
    }
  };

  const handleCertificationClick = async () => {
    if (showTour !== "true") {
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
