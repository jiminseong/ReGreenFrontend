"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CoupleCheckPage = () => {
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState("");

  useEffect(() => {
    // 커플이면 home으로 강제 리다이렉트
    const isCouple = localStorage.getItem("isCouple");
    if (isCouple === "true") {
      router.push("/home");
    }
    // 랜덤 초대 코드 생성 함수
    const generateInviteCode = () => {
      return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    // 초대 코드 생성 및 상태 업데이트
    const code = generateInviteCode();
    setInviteCode(code);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">친구, 연인을 초대해 주세요!</h1>
      <p className="text-center text-lg mb-8">{inviteCode}</p>
      <button
        onClick={() => navigator.clipboard.writeText(inviteCode)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        초대 링크 복사
      </button>
    </div>
  );
};

export default CoupleCheckPage;
