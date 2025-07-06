"use client";
import React, { useRef, useEffect, useState } from "react";
import StatusListItem from "./StatusListItem";
import SkeletonStatusItem from "@/widgets/SkeletonStatusItem";
import { useSubmitActivityList } from "../lib/useSubmitActivities";
import { SubmitActivitiesItem } from "../model/type";

const StatusList = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<SubmitActivitiesItem[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const loader = useRef(null);

  const { data, isSuccess, isPending } = useSubmitActivityList({ page, limit: 10 });

  useEffect(() => {
    const current = loader.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isPending) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    observer.observe(current);

    return () => observer.unobserve(current);
  }, [hasNextPage, isPending]);

  useEffect(() => {
    if (!isPending && isSuccess && data?.results) {
      setItems((prev) => [...prev, ...(data.results ?? [])]);
      if (data.results.length < 10) setHasNextPage(false);
    }
  }, [data, isPending, isSuccess]);

  return (
    <div className="bg-[#F4F5F7] flex flex-col gap-2.5 py-8 px-5 no-scrollbar overflow-y-hidden h-full">
      {!isPending && items.length === 0 ? (
        <div className="text-center text-lg font-semibold text-[#777777] flex items-center justify-center h-full pb-48">
          아직 모인 활동이 없어요! <br />
          다양한 활동에 참여해보세요!
        </div>
      ) : (
        <div className="flex flex-col gap-2.5 scrollable-area">{
        !isPending &&
        items &&
        items.map((activity, index) => (
          <StatusListItem
            key={index}
            iconSrc={
              activity.title === "다회용 컵 이용하기"
                ? "/icon/activity/cupIcon2.svg"
                : activity.title === "중고 제품 나눔/구매 인증하기"
                ? "/icon/activity/danguenIcon2.svg"
                : activity.title === "플로깅 데이트하기"
                ? "/icon/activity/trashIcon2.svg"
                : ""
            }
            label={activity.title}
            status={activity.status}
            date={new Date(activity.createdAt)}
          />
        ))
        }</div>
      )}

      {/* 스켈레톤 UI */}
      {isPending &&
        Array.from({ length: 3 }).map((_, idx) => <SkeletonStatusItem key={`skeleton-${idx}`} />)}
      {hasNextPage && <div ref={loader} className="h-6" />}
    </div>
  );
};

export default StatusList;
