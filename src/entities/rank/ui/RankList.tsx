"use client";
import React, { useEffect, useRef } from "react";
import RankListItem from "./RankListItem";
import MyRankListItem from "./MyRankListItem";

const RankList = ({
  data,
  myrankdata,
}: {
  data: Array<{ coupleId: string; rank: number; name: string; ecoScore: number }>;
  myrankdata: { coupleId: string; rank: number; name: string; ecoScore: number };
}) => {
  const myRankRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (myRankRef.current) {
      myRankRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="relative bg-[#F4F4F4]   px-5  h-[100dvh] overflow-hidden no-scrollbar">
      {/* 상단 빈 공간 */}
      <div className="absolute top-0 w-full bg-amber-200" />

      <div className="bg-white">
        {data.map((item) => {
          if (item.coupleId === myrankdata.coupleId)
            return (
              <div key={myrankdata.coupleId} ref={myRankRef}>
                <MyRankListItem {...myrankdata} />
              </div>
            );
          return <RankListItem key={item.coupleId} {...item} />;
        })}
      </div>
    </div>
  );
};

export default RankList;
