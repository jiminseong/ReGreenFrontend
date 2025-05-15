"use client";
import React, { useState } from "react";
import ActivityItem from "@/features/certification/ui/ActivityItem";
import ToastButton from "@/widgets/ToastButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
// import { http } from "@/shared/lib/http";

const activities = [
  {
    id: "1",
    iconSrc: "/icon/activity/cupIcon.svg",
    ready: true,
    type: "photo",
    label: "다회용 컵 사용하기",
  },
  {
    id: "2",
    iconSrc: "/icon/activity/danguenIcon.svg",
    ready: true,
    type: "photo",
    label: "중고 제품 나눔/구매 인증하기",
  },
  {
    id: "3",
    iconSrc: "/icon/activity/dateIcon.svg",
    ready: true,
    type: "photo",
    label: "플로깅 데이트 인증샷",
  },
  {
    id: "4",
    iconSrc: "/icon/activity/plugIcon.svg",
    ready: false,
    type: "photo",
    label: "대기전력 차단하기",
  },
  {
    id: "5",
    iconSrc: "/icon/activity/bagIcon.svg",
    ready: false,
    type: "photo",
    label: "장바구니 사용하기",
  },
  {
    id: "6",
    iconSrc: "/icon/activity/trashIcon.svg",
    ready: false,
    type: "photo",
    label: "분리배출하기",
  },
  {
    id: "7",
    iconSrc: "/icon/activity/stairIcon.svg",
    ready: false,
    type: "photo",
    label: "계단 이용하기",
  },
  {
    id: "8",
    iconSrc: "/icon/activity/leftfoodIcon.svg",
    ready: false,
    type: "photo",
    label: "잔반 없이 먹기",
  },
  {
    id: "9",
    iconSrc: "/icon/activity/busIcon.svg",
    ready: false,
    type: "photo",
    label: "대중교통 이용하기",
  },
  {
    id: "10",
    iconSrc: "/icon/activity/reviewIcon.svg",
    ready: false,
    type: "link",
    label: "친환경 제품 리뷰 남기기",
  },
  {
    id: "11",
    iconSrc: "/icon/activity/bicyleIcon.svg",
    ready: false,
    type: "photo",
    label: "자전거 이용하기",
  },
  {
    id: "12",
    iconSrc: "/icon/activity/billIcon.svg",
    ready: false,
    type: "photo",
    label: "전기/가스 요금 줄이기 챌린지",
  },
  {
    id: "13",
    iconSrc: "/icon/activity/treeIcon.svg",
    ready: false,
    type: "photo",
    label: "가족/커플 나무심기",
  },
];

const ActivityList = () => {
  const [currentCheckedId, setCurrentCheckedId] = useState<string>("");
  const router = useRouter();

  const selected = activities.find((a) => a.id === currentCheckedId);

  const handleCheckboxClick = (id: string) => {
    setCurrentCheckedId((prev) => (prev === id ? "" : id));
  };

  const openFileDialog = (): Promise<{ file: File | null; previewUrl: string | null }> => {
    return new Promise((resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => resolve({ file, previewUrl: reader.result as string });
          reader.readAsDataURL(file);
        } else {
          resolve({ file: null, previewUrl: null });
        }
      };
      input.click();
    });
  };

  const uploadPhoto = async (id: string) => {
    const { file } = await openFileDialog();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    // const res = await http.post("api/certification/photo", { body: formData }).json<{
    //   statusCode: number;
    //   message: string;
    //   data: { imageUrl: string };
    // }>();

    // const imageUrl = res!.data.imageUrl
    const imageUrl = "image/default.png";
    router.push(`/activity/${id}?imageUrl=${encodeURIComponent(imageUrl)}`);
  };

  const handleCertificationClick = async () => {
    if (!selected) return;
    const { id, type } = selected;
    setCurrentCheckedId("");

    if (type === "photo") await uploadPhoto(id);
    else if (type === "link") await uploadPhoto(id);
    //  router.push(`/activity/certify/link/${id}`);
  };

  const TOAST_MESSAGE = selected ? (
    <div className="flex items-center justify-center gap-2">
      {selected.type === "photo" && (
        <>
          사진으로 인증하기
          <Image
            src="/icon/activity/certification/cameraIcon.svg"
            width={24}
            height={24}
            alt="카메라아이콘"
          />
        </>
      )}
      {selected.type === "link" && (
        <>
          링크로 인증하기
          <Image
            src="/icon/activity/certification/linkIcon.svg"
            width={24}
            height={24}
            alt="링크아이콘"
          />
        </>
      )}
    </div>
  ) : null;

  return (
    <div className="bg-white h-full overflow-y-scroll no-scrollbar relative">
      <AnimatePresence>
        {selected && (
          <ToastButton message={TOAST_MESSAGE} onToastClick={handleCertificationClick} />
        )}
      </AnimatePresence>

      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          {...activity}
          currentCheckedId={currentCheckedId}
          onChecked={handleCheckboxClick}
        />
      ))}
      <span className="absolute z-20 w-full text-center bottom-32  font-normal text-lg">
        업데이트 예정입니다.
      </span>
    </div>
  );
};

export default ActivityList;
