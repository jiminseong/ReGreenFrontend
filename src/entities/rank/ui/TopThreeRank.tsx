import React from "react";
import RankCard from "./RankCard";
import { RankingItem } from "../model/type";

const TopThreeRank = ({ topThree }: { topThree: RankingItem[] }) => {
  if (topThree.length < 3) return null;
  return (
    <div className="relative flex flex-col max-h-[233px] gap-[44px] ">
      <div className="relative flex justify-center gap-30  items-center mt-3">
        <RankCard key={topThree[1].coupleId} rank={2} rankingItem={topThree[1]} />{" "}
        <RankCard key={topThree[0].coupleId} rank={1} rankingItem={topThree[0]} />
        <RankCard key={topThree[2].coupleId} rank={3} rankingItem={topThree[2]} />
      </div>
    </div>
  );
};

export default TopThreeRank;
