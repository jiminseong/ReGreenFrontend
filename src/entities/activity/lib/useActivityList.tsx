import { useQuery } from "@tanstack/react-query";
import { http } from "@/shared/lib/http";
import { ActivityItemResponse } from "../model/type";

export function useActivityList() {
  return useQuery({
    queryKey: ["activityList"],
    queryFn: async () => {
      const res = await http.get("api/eco-verifications").json<ActivityItemResponse>();
      if (res.code !== 2400) {
        throw new Error("Failed to fetch activity list");
      }
      // const res = await http.get("api/eco-verifications").json<ActivityItem[]>();
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}
