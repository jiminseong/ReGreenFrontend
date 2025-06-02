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

  return (
    <div className="relative">
      {showTour && <HomedDescription onFinish={handleTourFinish} />}
      <div className="py-5 relative flex flex-col items-center justify-evenly h-[100dvh] w-full">
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
