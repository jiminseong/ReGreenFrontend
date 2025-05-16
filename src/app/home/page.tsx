import Room from "@/features/room-customizer/ui/Room";
import BottomNavigationBar from "@/widgets/home/BottomNavigationBar";
import TopSatatusBar from "@/widgets/home/TopSatatusBar";
import InventoryList from "@/entities/room/ui/InventoryList";
import CoupleGuard from "@/shared/lib/CoupleGuard";

const HomePage = () => {
  return (
    <div className="p-5 relative flex flex-col items-center justify-evenly h-screen w-full">
      <div className="absolute top-0 w-full h-[50%] z-[0] bg-gradient-to-b from-white to-[#C2F1EE]" />
      <div className="absolute bottom-0 w-full h-[50%] z-[0] bg-[#A5C939]" />
      <div className="flex flex-col items-center justify-evenly w-full h-full">
        <CoupleGuard />
        <TopSatatusBar />
        <Room />
        <BottomNavigationBar />
        <InventoryList />
      </div>
    </div>
  );
};

export default HomePage;
