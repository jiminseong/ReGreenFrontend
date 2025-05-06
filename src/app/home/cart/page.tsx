import Room from "@/widgets/home/Room";

const HomeInventoryPage = () => {
  return (
    <div className="p-5  flex flex-col items-center justify-evenly h-screen w-full bg-gradient-to-b from-[rgba(141,157,0,0.4)] to-[rgba(233,187,1,0.4)] ">
      <Room />
      {/* 인벤토리 요소 */}
    </div>
  );
};

export default HomeInventoryPage;
