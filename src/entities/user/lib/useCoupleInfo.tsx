"use client";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/shared/lib/http";

interface CoupleInfo {
  coupleId: string;
  ecoLovePoint: number;
  breakupBufferPoint: number;
  members: [
    {
      memberId: string;
      nickname: string;
      profileImageUrl: string;
    },
    {
      memberId: string;
      nickname: string;
      profileImageUrl: string;
    }
  ];
}

interface CoupleInfoResponse {
  code: string;
  message: string;
  data: CoupleInfo;
}

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
