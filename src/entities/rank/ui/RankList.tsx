"use client";
import React, { useEffect, useRef } from "react";
import RankListItem from "./RankListItem";
import MyRankListItem from "./MyRankListItem";
import { RankingItem } from "../model/type";

const RankList = ({ data, myCoupleId }: { data: RankingItem[]; myCoupleId: string }) => {
  const myRankRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (myRankRef.current) {
      myRankRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="relative bg-[#F4F4F4] px-5 h-[100dvh] overflow-hidden no-scrollbar">
      <div className="bg-white">
        {data.map((item, i) => {
          if (item.coupleId === myCoupleId)
            return (
              <div key={myCoupleId} ref={myRankRef}>
                <MyRankListItem rankingItem={{ ...item, index: i + 4 }} />
              </div>
            );
          return <RankListItem key={item.coupleId} rankingItem={{ ...item, index: i + 4 }} />;
        })}
      </div>
    </div>
  );
};

export default RankList;
