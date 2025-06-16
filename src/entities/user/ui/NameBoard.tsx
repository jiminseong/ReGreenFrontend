"use client";

import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useCoupleInfo } from "../lib/useCoupleInfo";
import { postCoupleNickName } from "@/features/couple-nickname/lib/postCoupleNickName";
import { checkIsValidNickName } from "@/features/couple-nickname/lib/checkIsValidNickName";
import { useToastStore } from "@/shared/store/useToastStore";

const TAIL_STYLE = {
  clipPath: "polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)",
} as const;

export default function NameBoard() {
  const { data: coupleInfo, refetch } = useCoupleInfo();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { openToast } = useToastStore();

  // 초기값 보관용 ref
  const initialNameRef = useRef<string>("");

  // 1) 데이터 로딩 시
  useEffect(() => {
    if (coupleInfo?.data.name) {
      setName(coupleInfo.data.name);
      initialNameRef.current = coupleInfo.data.name;
    }
  }, [coupleInfo?.data.name]);

  // 2) blur 또는 Enter 시 호출
  const handleBlurOrEnter = async () => {
    setEditing(false);

    // 2-1) 유효성 검사
    if (!checkIsValidNickName(name)) {
      openToast("띄어쓰기 포함 특수 문자 제외 10자 이내로 입력해주세요.");
      setName(initialNameRef.current); // 초기값으로 롤백
      return;
    }

    // 2-2) 입력값이 초기값과 같으면 요청 안 함
    if (name === initialNameRef.current) {
      openToast("아지트명이 변경되지 않았어요.");
      return;
    }

    // 2-3) 서버 요청
    try {
      const res = await postCoupleNickName(name);
      if (res.code !== 2000) throw new Error();

      await refetch(); // 데이터 갱신
      openToast("아지트명이 수정되었어요 :)");

      // refetch 후 useEffect가 실행되며 name, initialNameRef 동기화됨
    } catch {
      openToast("수정에 실패했습니다. 다시 시도해주세요.");
      await refetch(); // 실패 시에도 rollback
    }
  };

  // 3) 키 처리 (Enter → blur, Escape → 취소)
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
      {/* 표지판 텍스트 영역 */}
      <div
        className={
          `bg-[#CA9C61] rounded-md shadow-md  py-2  flex items-center justify-center h-[32px] cursor-text z-10 ` +
          (editing ? "ring-2 ring-inset ring-[#CA9C61]" : "")
        }
        onClick={() => {
          setEditing(true);
          inputRef.current?.focus();
        }}
      >
        <input
          ref={inputRef}
          type="text"
          className="p-0 m-0  text-sm text-center font-semibold bg-transparent border-none focus:outline-none  "
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 10))}
          maxLength={10}
          readOnly={!editing}
          onBlur={handleBlurOrEnter}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* 사다리꼴 꼬리 */}
      <div className="w-[20px] h-[61px] bg-[#A17B4A] mt-[-4px] z-0" style={TAIL_STYLE} />
    </div>
  );
}
