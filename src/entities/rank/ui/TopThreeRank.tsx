import React from "react";
import RankCard from "./RankCard";

const TopThreeRank = ({
  topThree,
}: {
  topThree: Array<{ rank: number; name: string; ecoScore: number; coupleImageUrl: string }>;
}) => {
  return (
    <div className="relative flex justify-center gap-30 h-full items-center pt-4 pb-[64px]  ">
      <RankCard
        key={topThree[1].rank}
        rank={topThree[1].rank}
        name={topThree[1].name}
        coupleImageUrl={topThree[1].coupleImageUrl}
        points={topThree[1].ecoScore}
      />{" "}
      <RankCard
        key={topThree[0].rank}
        rank={topThree[0].rank}
        name={topThree[0].name}
        coupleImageUrl={topThree[0].coupleImageUrl}
        points={topThree[0].ecoScore}
      />
      <RankCard
        key={topThree[2].rank}
        rank={topThree[2].rank}
        name={topThree[2].name}
        coupleImageUrl={topThree[2].coupleImageUrl}
        points={topThree[2].ecoScore}
      />
    </div>
  );
};

export default TopThreeRank;
