"use client";
import { useRouter } from "next/navigation";
import { useHomeMode } from "@/features/room-customizer/lib/useHomeMode";

const BottomNavigationBar = () => {
  const { mode, setMode } = useHomeMode();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    // 인증하기는 여전히 라우팅
    if (path === "/activity/list") {
      router.push(path);
    }

    // 방 꾸미기는 상태 전환
    if (path === "inventory") {
      setMode("inventory");
    }
  };

  return (
    <div
      className={`w-full transition-all duration-1000 ease-in-out
    ${mode === "inventory" ? "hidden" : ""}`}
    >
      <div className="flex w-full justify-center gap-4 mb-9">
        <div
          onClick={() => handleNavigation("/activity/list")}
          className="font-bold text-lg flex w-[50%] cursor-pointer flex-col rounded-[22px] bg-white px-7 py-5 text-center shadow-[0px_6px_0px_0px_rgba(0,0,0,0.25)]"
        >
          실천 인증 하기
        </div>

        <div
          onClick={() => handleNavigation("inventory")}
          className="font-bold text-lg md:text-xl flex w-[50%] cursor-pointer flex-col rounded-[22px] bg-white px-7 py-5 text-center shadow-[0px_6px_0px_0px_rgba(0,0,0,0.25)]"
        >
          방 꾸미기
        </div>
      </div>
    </div>
  );
};

export default BottomNavigationBar;
