"use client";
import React, { useRef, useEffect, useState } from "react";
import StatusListItem from "./StatusListItem";
import { useSubmitActivityList } from "../lib/useSubmitActivities";
import { SubmitActivitiesItem } from "../model/store";

const StatusList = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<SubmitActivitiesItem[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const loader = useRef(null);

  const { data, isSuccess, isPending } = useSubmitActivityList({ page, limit: 10 });

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
    if (!isPending && isSuccess && data) {
      setItems((prev) => [...prev, ...data.ecoVerifications]);
      if (data.ecoVerifications.length < 10) setHasNextPage(false);
    }
  }, [data]);

  return (
    <div className="bg-[#F4F5F7] flex flex-col gap-2.5 py-8 px-5 h-full no-scrollbar overflow-y-scroll">
      {items.map((activity, index) => (
        <StatusListItem
          key={index}
          iconSrc={
            (activity.title as string) === "다회용 컵 이용하기"
              ? "/icon/activity/cupIcon2.svg"
              : (activity.title as string) === "중고 제품 나눔/구매 인증하기"
              ? "/icon/activity/danguenIcon2.svg"
              : (activity.title as string) === "플로깅 데이트하기"
              ? "/icon/activity/trashIcon2.svg"
              : ""
          }
          label={activity.title}
          status={activity.status}
          date={new Date(activity.createdAt)}
        />
      ))}

      {/* 스켈레톤 UI */}
      {isPending &&
        Array.from({ length: 3 }).map((_, idx) => (
          <StatusListItem
            key={`skeleton-${idx}`}
            pending
            iconSrc=""
            label=""
            status="submit"
            date={new Date()}
          />
        ))}

      {hasNextPage && <div ref={loader} className="h-6" />}
    </div>
  );
};

export default StatusList;
