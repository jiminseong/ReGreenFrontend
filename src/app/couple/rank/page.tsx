"use client";
import React, { useRef, useEffect } from "react";
import RankList from "@/entities/rank/ui/RankList";
import TopThreeRank from "@/entities/rank/ui/TopThreeRank";
import TopNavigationBar from "@/shared/ui/TopNavigationBar";
import { useRankings } from "@/entities/rank/lib/useRankings";
import { useCoupleInfo } from "@/entities/user/lib/useCoupleInfo";
import LogoLoading from "@/widgets/LogoLoading";
import CoupleGuard from "@/shared/lib/CoupleGuard";

const RankPage = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useRankings();
  const { data: coupleData, isPending } = useCoupleInfo();
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // “우리” 요소가 렌더링된 다음에 맨 위로 스크롤
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // 렌더링된 “우리” 요소를 찾기
    const myEl = container.querySelector<HTMLElement>("[data-my-rank]");
    if (myEl) {
      container.scrollTo({
        top: myEl.offsetTop,
        behavior: "smooth",
      });
    }
    // allRankings, coupleData 쪽이 다 준비된 직후 한 번만 실행
  }, [data, coupleData]);

  // 스크롤 하단 감지 후 fetchNextPage 호출
  useEffect(() => {
    if (!bottomRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [bottomRef, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 모든 랭킹 데이터 펼치기
  const allRankings = data?.pages.flatMap((page) => page.results) ?? [];

  // 상위 3명과 나머지 분리
  const topThree = allRankings.slice(0, 3);
  const rest = allRankings.slice(3);

  return (
    <div className="flex flex-col h-[100dvh]  bg-white overflow-y-hidden z-10">
      <CoupleGuard />
      {isPending && <LogoLoading />}
      <TopNavigationBar title="랭킹" />
      {coupleData && <TopThreeRank topThree={topThree} myCoupleId={coupleData.data.coupleId} />}

      {/* 스크롤 가능 본문 */}
      <div ref={scrollRef} className="flex flex-col flex-1 scrollable-area bg-[#F4F4F4] mt-[44px] no-scrollbar py-5">
        <div className="w-full h-8 bg-[#F4F4F4] z-10" />
        {coupleData && (
          <div  className="">
            <RankList data={rest} myCoupleId={coupleData?.data.coupleId} />
            {/* 로딩 중일 때 로딩 UI */}
            {isFetchingNextPage && (
              <div className="text-center py-4">
                <LogoLoading />
              </div>
            )}

            {/* 무한 스크롤 트리거 지점 */}
            <div ref={bottomRef} className="h-10" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RankPage;
