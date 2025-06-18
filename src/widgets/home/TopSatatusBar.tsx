import RoomSaveButton from "@/features/room-customizer/ui/RoomSaveButton";
import HeartCalendarRankState from "@/entities/user/ui/HeartCalendarRankState";

import MotionCoupleProfile from "@/entities/user/ui/MotionCoupleProfile";

const TopStatusBar = () => {
  return (
    <div className="w-full relative flex flex-col justify-center items-center gap-4 z-10">
      <div className=" flex w-full items-start justify-between">
        <HeartCalendarRankState />
        <MotionCoupleProfile />
        <RoomSaveButton />
      </div>
    </div>
  );
};

export default TopStatusBar;
