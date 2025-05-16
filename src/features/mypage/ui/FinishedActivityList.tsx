"use client";
import { useCoupleInfo } from "@/entities/user/lib/useCoupleInfo";
import { useSubmitActivityList } from "@/features/certification/lib/useSubmitActivities";
import { SubmitActivitiesItem } from "@/features/certification/model/store";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-lg p-6 flex justify-between items-center">
    <div className="flex gap-4 items-center">
      <div className="bg-gray-300 rounded-full w-14 h-14" />
      <div className="flex flex-col gap-2">
        <div className="bg-gray-300 h-4 w-32 rounded-md" />
        <div className="bg-gray-200 h-3 w-24 rounded-md" />
      </div>
    </div>
    <div className="flex flex-col gap-2 w-[71px]">
      <div className="bg-gray-200 h-6 rounded-[3.54px] w-full" />
      <div className="bg-gray-300 h-6 rounded-[3.54px] w-full" />
    </div>
  </div>
);

const FinishedActivityList = () => {
  const { data } = useCoupleInfo();
  const heart = data?.data.point || 0;
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<SubmitActivitiesItem[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const loader = useRef(null);

  const { data: submitData, isSuccess, isPending } = useSubmitActivityList({ page, limit: 10 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isPending) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [hasNextPage, isPending]);

  useEffect(() => {
    if (!isPending && isSuccess && submitData) {
      const filtered = submitData.ecoVerifications.filter((item) => item.status === "success");
      setItems((prev) => [...prev, ...filtered]);
      if (filtered.length < 10) setHasNextPage(false);
    }
  }, [submitData]);

  return (
    <div className="flex flex-col bg-[#F1F2F5] min-h-screen p-4">
      {!isPending && items.length === 0 ? (
        <div className="text-center text-lg font-semibold text-[#777777] flex items-center justify-center h-full pb-48">
          아직 모인 활동이 없어요! <br />
          다양한 활동에 참여해보세요!
        </div>
      ) : (
        !isPending && (
          <div className="text-right text-md font-medium mb-2.5 mt-6">
            얻은 하트 : {heart !== 0 ? heart - 14 : 0}
          </div>
        )
      )}

      <div className="flex flex-col gap-4">
        {items.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white px-4 py-6 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <Image
                width={56}
                height={56}
                src={
                  (activity.title as string) === "다회용 컵 이용하기"
                    ? "/icon/activity/cupIcon2.svg"
                    : (activity.title as string) === "중고 제품 나눔/구매 인증하기"
                    ? "/icon/activity/danguenIcon2.svg"
                    : (activity.title as string) === "플로깅 데이트하기"
                    ? "/icon/activity/trashIcon2.svg"
                    : ""
                }
                alt={activity.title}
              />
              <div className="flex flex-col">
                {activity.title.length > 10 ? (
                  <span className="text-lg font-semibold truncate max-w-[150px] md:max-w-[220px] block">
                    {activity.title}
                  </span>
                ) : (
                  <span className="text-lg font-semibold">{activity.title}</span>
                )}
                <span className="text-sm text-[#777777]">신청일 : {activity.createdAt}</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 w-[71px]">
              {activity.point && (
                <div className="flex items-center justify-center px-2 gap-1 text-ppink bg-[#FF387F1A] w-full py-0.75 rounded-[3.54px] text-sm font-medium">
                  <Image
                    width={16}
                    height={16}
                    src="/icon/home/heartIcon.svg"
                    alt="하트"
                    className="w-4 h-4"
                  />
                  +{activity.breakupAtPoint}
                </div>
              )}
              {activity.breakupAtPoint && (
                <div className="flex items-center justify-between w-full gap-1 text-[#222222] bg-[#5151511A] px-2 py-0.75 rounded-[3.54px] text-sm font-medium">
                  <Image
                    width={16}
                    height={16}
                    src="/icon/home/calendarIcon.svg"
                    alt="보너스"
                    className="w-4 h-4"
                  />
                  +{activity.breakupAtPoint}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* 스켈레톤 3개 */}
        {isPending && Array.from({ length: 3 }).map((_, idx) => <SkeletonCard key={idx} />)}

        {hasNextPage && <div ref={loader} className="h-6" />}
      </div>
    </div>
  );
};

export default FinishedActivityList;
