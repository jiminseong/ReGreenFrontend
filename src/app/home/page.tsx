import Room from "@/widgets/home/Room";
import BottomNavigationBar from "@/widgets/home/BottomNavigationBar";
import TopSatatusBar from "@/widgets/home/TopSatatusBar";

const HomePage = () => {
  return (
    <div className="p-5  relative flex flex-col items-center justify-evenly h-screen w-full ">
      <div className="z-[0] top-0 absolute bg-[#BEF2EE] w-full h-[50%]" />
      <div className="z-[0] bottom-0 absolute bg-[#AEC700] w-full h-[50%]" />
      <div className=" z-1 flex flex-col items-center justify-evenly w-full h-full">
        <div className="flex-grow" />
        <TopSatatusBar />
        <Room />
        <BottomNavigationBar />
      </div>
    </div>
  );
};

export default HomePage;
