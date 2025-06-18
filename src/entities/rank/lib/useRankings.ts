import { useInfiniteQuery } from "@tanstack/react-query";
import { http } from "@/shared/lib/http";
import { RankingsResponse } from "../model/type";

export function useRankings() {
  return useInfiniteQuery({
    queryKey: ["rankings"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await http
        .get(`api/couples/rankings?page=${pageParam}&limit=30`)
        .json<RankingsResponse>();

      if (res.code !== 2000) {
        throw new Error("Failed to fetch rankings");
      }

      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.results.length === 30) {
        return allPages.length + 1;
      }
      return undefined;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}
