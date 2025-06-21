import React from "react";
import RankCard from "./RankCard";
import { RankingItem } from "../model/type";

const TopThreeRank = ({
  topThree,
  myCoupleId,
}: {
  topThree: RankingItem[];
  myCoupleId: string;
}) => {
  if (topThree.length < 3) return null;
  // 총 3개의 순위 커플 중에 내 커플이랑 같다면 rankingItem.name에 (우리)를 추가
  const updatedTopThree = topThree.map((item) => {
    if (item.coupleId === myCoupleId) {
      return { ...item, name: `${item.name || "익명의 커플"} (우리)` };
    }
    return item;
  });
  return (
    <div className="relative flex flex-col max-h-[233px] gap-[44px] ">
      <div className="relative flex justify-center gap-30  items-center mt-3">
        <RankCard key={updatedTopThree[1].coupleId} rank={2} rankingItem={updatedTopThree[1]} />{" "}
        <RankCard key={updatedTopThree[0].coupleId} rank={1} rankingItem={updatedTopThree[0]} />
        <RankCard key={updatedTopThree[2].coupleId} rank={3} rankingItem={updatedTopThree[2]} />
      </div>
    </div>
  );
};

export default TopThreeRank;
