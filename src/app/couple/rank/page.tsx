import React from "react";
import RankList from "@/entities/rank/ui/RankList";
import TopThreeRank from "@/entities/rank/ui/TopThreeRank";
import TopNavigationBar from "@/shared/ui/TopNavigationBar";

const mockData = [
  {
    rank: 1,
    coupleId: "a1b2c3",
    name: "예시커플2",
    ecoScore: 730, //가중치
    coupleImageUrl: "/icon.webp",
  },
  {
    coupleId: "d4e5f6",
    rank: 2,
    name: "Jane Smith",
    ecoScore: 650,
    coupleImageUrl: "/icon.webp",
  },
  {
    coupleId: "g7h8i9",
    rank: 3,
    name: "Alice Johnson",
    ecoScore: 90,
    coupleImageUrl: "/icon.webp",
  },
  {
    coupleId: "i0j1k2",
    rank: 4,
    name: "Bob Brown",
    ecoScore: 85,
    coupleImageUrl: "/icon.webp",
  },
  {
    coupleId: "j2k3l4",
    rank: 5,
    name: "Charlie White",
    ecoScore: 80,
    coupleImageUrl: "/icon.webp",
  },
  {
    coupleId: "m5n6o7",
    rank: 6,
    name: "David Wilson",
    ecoScore: 75,
    coupleImageUrl: "/icon.webp",
  },
  {
    coupleId: "p8q9r0",
    rank: 7,
    name: "Eva Green",
    ecoScore: 70,
    coupleImageUrl: "/icon.webp",
  },
  {
    coupleId: "s1t2u3",
    rank: 8,
    name: "Frank Black",
    ecoScore: 65,
    coupleImageUrl: "/icon.webp",
  },
  {
    coupleId: "v4w5x6",
    rank: 9,
    name: "Grace Blue",
    ecoScore: 60,
    coupleImageUrl: "/icon.webp",
  },
  {
    coupleId: "y7z8a9",
    rank: 10,
    name: "Hank Yellow",
    ecoScore: 55,
    coupleImageUrl: "/icon.webp",
  },
];

const myRankData = {
  coupleId: "p8q9r0",
  rank: 7,
  name: "Eva Green",
  ecoScore: 70,
  coupleImageUrl: "/icon.webp",
};

const RankPage = () => {
  return (
    <div className="flex flex-col h-screen bg-[#F4F4F4]">
      {/* 1) 고정 헤더 영역 */}
      <div className="flex-shrink-0 bg-white z-10">
        <TopNavigationBar title="랭킹" />
        <TopThreeRank topThree={mockData.slice(0, 3)} />
      </div>

      {/* 2) 스크롤 가능한 메인 영역 */}
      <div className="flex-grow overflow-y-auto no-scrollbar">
        <RankList data={mockData.slice(3)} myrankdata={myRankData} />
      </div>
    </div>
  );
};

export default RankPage;
