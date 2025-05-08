import InventoryList from "@/entities/room/ui/InventoryList";
import Room from "@/widgets/home/Room";

const HomeInventoryPage = () => {
  return (
    <div className="p-5 relative  flex flex-col items-center justify-evenly h-screen w-full bg-gradient-to-b from-[rgba(141,157,0,0.4)] to-[rgba(233,187,1,0.4)] ">
      <Room type="inventory" />
      <InventoryList />
    </div>
  );
};

export default HomeInventoryPage;
