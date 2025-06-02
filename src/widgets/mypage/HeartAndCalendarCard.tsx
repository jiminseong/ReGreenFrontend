import Image from "next/image";
import React from "react";

interface HeartAndCalendarCardProps {
  ecoLovePoint: number;
  breakupBufferPoint: number;
}

const HeartAndCalendarCard = ({ ecoLovePoint, breakupBufferPoint }: HeartAndCalendarCardProps) => {
  return (
    <div className="w-full justify-between flex gap-1 items-center z-50 text-sm lg:text-lg ">
      <div className="w-full bg-lpink px-[6px] py-[3.5px]  rounded-[4px] flex items-center justify-center  gap-2">
        <Image src="/icon/home/heartIcon.svg" width={17} height={17} alt="하트아이콘" />
        <span className="text-ppink font-bold">+{ecoLovePoint}</span>
      </div>
      <div className="w-full bg-[#EEEEEE] px-[6px] py-[3.5px]  rounded-[4px]  flex items-center justify-center gap-2">
        <Image src="/icon/home/calendarIcon.svg" width={17} height={17} alt="달력아이콘" />
        <span className="font-bold ">+{breakupBufferPoint}</span>
      </div>
    </div>
  );
};

export default HeartAndCalendarCard;
