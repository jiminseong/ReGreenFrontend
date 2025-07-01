"use client";

import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useCoupleInfo } from "../lib/useCoupleInfo";
import { postCoupleNickName } from "@/features/couple-nickname/lib/postCoupleNickName";
import { checkIsValidNickName } from "@/features/couple-nickname/lib/checkIsValidNickName";
import { useToastStore } from "@/shared/model/useToastStore";

const TAIL_STYLE = {
  clipPath: "polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)",
} as const;

export default function NameBoard() {
  const { data: coupleInfo, refetch } = useCoupleInfo();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { openToast } = useToastStore();
  const initialNameRef = useRef<string>("");

  useEffect(() => {
    if (!coupleInfo || coupleInfo.data === null) return;
    const nickname = coupleInfo.data.name;
    if (nickname) {
      setName(nickname);
      initialNameRef.current = nickname;
    }
  }, [coupleInfo, coupleInfo?.data?.name]);

  if (!coupleInfo || coupleInfo.data === null) return null;

  const handleBlurOrEnter = async () => {
    setEditing(false);

    if (!checkIsValidNickName(name)) {
      openToast("띄어쓰기, 특수문자 포함 10자 이내로 입력해주세요.");
      setName(initialNameRef.current);
      return;
    }

    if (name === initialNameRef.current) {
      openToast("아지트명이 변경되지 않았어요.");
      return;
    }

    try {
      const res = await postCoupleNickName(name);
      if (res.code !== 2000) throw new Error();

      await refetch();
      openToast("아지트명이 수정되었어요 :)");
    } catch {
      openToast("수정에 실패했습니다. 다시 시도해주세요.");
      await refetch();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
    if (e.key === "Escape") {
      setEditing(false);
      setName(initialNameRef.current);
    }
  };

  if (!coupleInfo) return null;

  return (
    <div className="relative flex flex-col items-center">
      <div className="bg-[#CA9C61] rounded-md shadow-md py-2 px-3 flex items-center justify-center h-[32px] cursor-text z-10 w-[120px]">
        {editing ? (
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 10))}
            onBlur={handleBlurOrEnter}
            onKeyDown={handleKeyDown}
            className="
              text-center
              text-base
              scale-[0.75]
              w-full
              transform
              leading-none
              p-0
              m-0
              bg-transparent
              border-none
              focus:outline-none
            "
            maxLength={10}
          />
        ) : (
          <div
            className="w-full h-full text-sm flex justify-center items-center font-semibold text-black truncate"
            onClick={() => setEditing(true)}
          >
            {name}
          </div>
        )}
      </div>

      {/* 사다리꼴 꼬리 */}
      <div className="w-[20px] h-[61px] bg-[#A17B4A] mt-[-4px] z-0" style={TAIL_STYLE} />
    </div>
  );
}
