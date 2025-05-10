import Room from "@/widgets/home/Room";
import BottomNavigationBar from "@/widgets/home/BottomNavigationBar";
import TopSatatusBar from "@/widgets/home/TopSatatusBar";
import InventoryList from "@/entities/room/ui/InventoryList";

const HomePage = () => {
  return (
    <div className="p-5  relative flex flex-col items-center justify-evenly h-screen w-full ">
      <div
        className="absolute top-0 w-full h-[60%] z-[0]"
        style={{
          backgroundImage: `linear-gradient(to bottom, white 0%, #BEF2EE 30%, #BEF2EE 100%)`,
        }}
      />
      <div className="z-[0] bottom-0 absolute bg-[#AEC700] w-full h-[40%]" />
      <div className=" z-1 flex flex-col items-center justify-evenly w-full h-full">
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
