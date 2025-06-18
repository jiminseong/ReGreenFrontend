"use client";
import React, { useRef } from "react";
import { useCoupleInfo } from "../lib/useCoupleInfo";
import Image from "next/image";
import { postCustomProfile } from "../lib/postCustomProfile";
import Toast from "@/widgets/Toast";
import { useToastStore } from "@/shared/model/useToastStore";

const CustomProfile = () => {
  const { data, refetch, isPending } = useCoupleInfo();
  const { isOpen, openToast, message } = useToastStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      const res = await postCustomProfile(file);
      if (res.code === 2000) {
        refetch();
        openToast("커플 이미지가 변경되었어요:)");
        return;
      }
      if (res.code !== 2000) {
        openToast("이미지 업로드에 실패했어요. 다시 시도해주세요.");
        return;
      }
    }

    event.target.value = "";
  };

  if (isPending) {
    return (
      <div className="flex flex-col justify-center mt-[12px]  items-center gap-[13px]  h-[131px] animate-pulse">
        <div className={`bg-gray-300 rounded-full`} style={{ width: 96, height: 96 }} />
        <div className="w-[80px] h-[22px] rounded-full bg-gray-300 " />
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-[12px]  gap-[13px] items-center">
      {isOpen && <Toast message={message} position="top" />}
      <div className="relative w-24 h-24 rounded-full overflow-hidden">
        <Image
          src={data?.data.profileImageUrl || "/image/couple/defaultProfile.png"}
          fill
          alt="커플 프로필 이미지"
          className="object-cover"
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          className="absolute bottom-0 text-[12px] text-white bg-[#000000] opacity-70 w-full py-1 z-10"
          onClick={openFileDialog}
        >
          수정
        </button>
      </div>
      <p className="text-center w-full text-22px font-bold">{data?.data.name || "익명의 커플"}</p>
    </div>
  );
};

export default CustomProfile;
