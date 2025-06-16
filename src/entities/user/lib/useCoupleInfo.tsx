"use client";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/shared/lib/http";
import { CoupleInfoResponse } from "../model/type";

export function useCoupleInfo() {
  return useQuery<CoupleInfoResponse>({
    queryKey: ["coupleInfo"],
    queryFn: async () => {
      return await http.get("api/couples/my").json<CoupleInfoResponse>();
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}
