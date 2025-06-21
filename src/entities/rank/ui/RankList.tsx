"use client";
import React from "react";
import RankListItem from "./RankListItem";
import MyRankListItem from "./MyRankListItem";
import { RankingItem } from "../model/type";

const RankList = ({ data, myCoupleId }: { data: RankingItem[]; myCoupleId: string }) => {
  return (
    <div className="relative bg-[#F4F4F4] px-5 flex h-screen flex-col flex-grow">
      {data.map((item, i) => {
        if (item.coupleId === myCoupleId)
          return (
            <div key={myCoupleId} data-my-rank>
              <MyRankListItem rankingItem={{ ...item, index: i + 4 }} />
            </div>
          );
        return <RankListItem key={item.coupleId} rankingItem={{ ...item, index: i + 4 }} />;
      })}
    </div>
  );
};

export default RankList;
