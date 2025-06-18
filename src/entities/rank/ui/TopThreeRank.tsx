import React from "react";
import RankCard from "./RankCard";
import { RankingItem } from "../model/type";

const TopThreeRank = ({ topThree }: { topThree: RankingItem[] }) => {
  if (topThree.length < 3) return null;
  return (
    <div className="relative flex justify-center gap-30 h-full items-center pt-4 pb-[64px]  ">
      <RankCard key={topThree[1].coupleId} rank={2} rankingItem={topThree[1]} />{" "}
      <RankCard key={topThree[0].coupleId} rank={1} rankingItem={topThree[0]} />
      <RankCard key={topThree[2].coupleId} rank={3} rankingItem={topThree[2]} />
    </div>
  );
};

export default TopThreeRank;
