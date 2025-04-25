"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // 로그인 상태가 true라면 홈(/home)으로 리다이렉트
    if (isLoggedIn === "true") {
      router.push("/home");
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => router.push("/home")}
      >
        홈으로 이동
      </button>
    </div>
  );
};

export default LoginPage;
