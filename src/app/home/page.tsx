"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Room from "@/widgets/home/Room";
import BottomNavigationBar from "@/widgets/home/BottomNavigationBar";
import TopNavigationBar from "@/widgets/home/TopNavigationBar";

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
    <div className="p-5  flex flex-col items-center justify-evenly h-screen w-full bg-gradient-to-b from-[rgba(141,157,0,0.4)] to-[rgba(233,187,1,0.4)] ">
      <TopNavigationBar />
      <Room />
      <BottomNavigationBar />
    </div>
  );
};

export default HomePage;
