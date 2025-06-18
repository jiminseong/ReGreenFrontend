import Image from "next/image";
import React from "react";

const MyRankListItem = ({
  coupleId,
  rank,
  name,
  ecoScore,
}: {
  coupleId: string;
  rank: number;
  name: string;
  ecoScore: number;
}) => {
  return (
    <div
      key={coupleId}
      className="flex items-center justify-between pl-[15px] pr-5 py-5  border-l-5 border-l-ppink "
    >
      <div className="flex items-center justify-center gap-6 h-full">
        <div className="flex flex-col gap-0 items-center justify-center">
          <p className="text-[#222222] text-xl font-medium">{rank}</p>
          <p className="text-[#999999] text-[13px] font-semibold">우리</p>
        </div>
        <h3 className="text-[#333333] font-semibold">{name}</h3>
      </div>

      <div className="flex items-center gap-1">
        <Image src={"/icon/home/heartIcon.svg"} alt="heart" width={17.5} height={17.5} />
        <span className="font-semibold">{ecoScore}</span>
      </div>
    </div>
  );
};

export default MyRankListItem;
