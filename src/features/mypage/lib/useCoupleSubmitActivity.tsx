"use client";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/shared/lib/http";
import { SubmitCoupleActivitiesResponse } from "../model/type";

export function useCoupleSubmitActivity({ date }: { date: string }) {
  //2025-05-01 (YYYY-MM-DD) 형식 체크
  const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
  if (!isValidDate) {
    throw new Error("Invalid date format. Please use YYYY-MM-DD.");
  }
  console.log("useCoupleSubmitActivity", date);
  return useQuery({
    queryKey: ["coupleSubmitActivity", date],
    queryFn: async () => {
      const res = await http
        .get(`api/eco-verifications/my/couple?date=${date}`)
        .json<SubmitCoupleActivitiesResponse>();
      return res.data;
    },
    enabled: date !== undefined,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
