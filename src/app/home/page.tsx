"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // 로컬 스토리지에서 커플 상태 확인
    const isCouple = localStorage.getItem("isCouple");

    // 커플 상태가 false라면 홈(/couple)로 리다이렉트
    if (isCouple === "false") {
      router.push("/couple");
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">홈</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => router.push("/cart")}
      >
        상점으로 이동
      </button>
    </div>
  );
};

export default HomePage;
