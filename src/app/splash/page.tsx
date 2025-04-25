"use client";

import { useEffect, useState } from "react";
// import Image from "next/image";
import { useRouter } from "next/navigation";

const SplashPage = () => {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      router.push("/onboard"); // 온보딩으로 이동
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  if (!isVisible) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      {/* <Image src="/192.png" alt="로고" width={192} height={192} /> */}
      <h1 className="text-2xl font-bold mt-4">ReGreen</h1>
    </div>
  );
};

export default SplashPage;
