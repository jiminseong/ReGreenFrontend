import Room from "@/widgets/home/Room";
import BottomNavigationBar from "@/widgets/home/BottomNavigationBar";
import TopSatatusBar from "@/widgets/home/TopSatatusBar";
import InventoryList from "@/entities/room/ui/InventoryList";

const HomePage = () => {
  return (
    <div className="p-5 relative flex flex-col items-center justify-evenly h-screen w-full">
      <div className="absolute top-0 w-full h-[50%] z-[0] bg-gradient-to-b from-white to-[#C2F1EE]" />
      <div className="absolute bottom-0 w-full h-[50%] z-[0] bg-[#AEC700]" />
      <div className="z-[1] flex flex-col items-center justify-evenly w-full h-full">
        <div className="flex-grow" />
        <TopSatatusBar />
        <Room />
        <BottomNavigationBar />
        <InventoryList />
      </div>
    </div>
  );
};

export default HomePage;
