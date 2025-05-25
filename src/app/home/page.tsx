"use client";
import { useEffect, useState } from "react";
import Room from "@/features/room-customizer/ui/Room";
import BottomNavigationBar from "@/widgets/home/BottomNavigationBar";
import TopSatatusBar from "@/widgets/home/TopSatatusBar";
import InventoryList from "@/entities/room/ui/InventoryList";
import CoupleGuard from "@/shared/lib/CoupleGuard";
import HomedDescription from "@/features/description/ui/HomedDescription";

const HomePage = () => {
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const isSeen = localStorage.getItem("homeTourSeen");
    if (!isSeen) {
      setShowTour(true);
    }
  }, []);

  const handleTourFinish = () => {
    setShowTour(false);
    localStorage.setItem("homeTourSeen", "true");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // SW 등록
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(() => {
        // 최초 한 번만 알림 보내기
        const isNotFirst = localStorage.getItem("isNotFirst");
        if (Notification.permission === "granted" && isNotFirst !== "true") {
          new Notification("우이미에 오신 걸 환영해요", {
            body: "홈 화면에 추가해 주셔서 고마워요!",
            requireInteraction: true,
          });
          localStorage.setItem("isNotFirst", "true");
        } else if (Notification.permission === "default") {
          Notification.requestPermission().then((perm) => {
            if (perm === "granted" && isNotFirst !== "true") {
              new Notification("우이미에 오신 걸 환영해요", {
                body: "홈 화면에 추가해 주셔서 고마워요!",
                requireInteraction: true,
              });
              localStorage.setItem("isNotFirst", "true");
            }
          });
        }
      });
    }
  }, []);

  return (
    <div className="relative">
      {showTour && <HomedDescription onFinish={handleTourFinish} />}
      <div className="py-5 relative flex flex-col items-center justify-evenly h-screen w-full">
        <div className="absolute top-0 w-full h-[50%] z-[0] bg-gradient-to-b from-white to-[#C2F1EE]" />
        <div className=" absolute bottom-0 w-full h-[50%] z-[0] bg-[#A5C939]" />
        <div className="flex flex-col items-center justify-evenly w-full h-full overflow-hidden">
          <CoupleGuard />
          <div className="px-5 flex justify-between items-center w-full">
            <TopSatatusBar />
          </div>

          <Room />
          <div className="px-5 flex justify-between items-center w-full">
            <BottomNavigationBar />
          </div>

          <InventoryList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
