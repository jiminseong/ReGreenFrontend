import Image from "next/image";
import React from "react";

const RankListItem = ({
  rank,
  name,
  ecoScore,
}: {
  rank: number;
  name: string;
  ecoScore: number;
}) => {
  return (
    <div className="flex items-center justify-between p-5 border-b border-[#EEEEEE]">
      <div className="flex items-center justify-center gap-6 h-full">
        <p className="text-[#222222] text-xl font-medium">{rank}</p>
        <h3 className="text-[#333333] font-semibold">{name}</h3>
      </div>

      <div className="flex items-center gap-1">
        <Image src="/icon/home/heartIcon.svg" alt="heart" width={17.5} height={17.5} />
        <span className="font-semibold">{ecoScore}</span>
      </div>
    </div>
  );
};

export default RankListItem;
