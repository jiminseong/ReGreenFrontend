"use client";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/shared/lib/http";
import { RankingsResponse } from "../model/type";

export function useRankings() {
  return useQuery({
    queryKey: ["rankings"],
    queryFn: async () => {
      const res = await http.get("api/couples/rankings?page=1&limit=30").json<RankingsResponse>();
      if (res.code !== 2000) {
        throw new Error("Failed to fetch rankings");
      }

      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}
