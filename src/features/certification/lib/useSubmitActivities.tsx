import { useQuery } from "@tanstack/react-query";
import { http } from "@/shared/lib/http";
import { SubmitActivitiesResponse } from "../model/store";

export function useSubmitActivityList({ page, limit }: { page: number; limit: number }) {
  return useQuery({
    queryKey: ["submitActivityList", page, limit],
    queryFn: async () => {
      const res = await http
        .get(`api/eco-verifications/my?page=${page}&limit=${limit}`)
        .json<SubmitActivitiesResponse>();
      return res.data;
    },
    enabled: page !== undefined && limit !== undefined,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
