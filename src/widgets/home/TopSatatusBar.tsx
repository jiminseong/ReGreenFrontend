import RoomSaveButton from "@/features/room-customizer/ui/RoomSaveButton";
import MotionCoupleProfile from "@/entities/user/ui/MotionCoupleProfile";
import HeartCalendarState from "@/entities/user/ui/HeartCalendarState";

const TopStatusBar = () => {
  return (
    <div className="w-full relative flex flex-col justify-center items-center gap-4 z-10">
      <div className=" flex w-full items-start justify-between">
        <HeartCalendarState />
        <MotionCoupleProfile />
        <RoomSaveButton />
      </div>
    </div>
  );
};

export default TopStatusBar;
