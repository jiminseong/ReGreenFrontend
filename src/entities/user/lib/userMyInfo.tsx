"use client";
import { useQuery } from "@tanstack/react-query";
import { http } from "@/shared/lib/http";
import { MemberInfo } from "../model/type";

export function useMyInfo() {
  return useQuery<MemberInfo>({
    queryKey: ["myInfo"],
    queryFn: async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return {
          email: "",
          memberId: "",
          nickname: "",
          profileImageUrl: "",
          coupleId: null,
        };
      }
      //accessToken이 있을 시에 userInfo를 가져온다.
      const res = await http.get("api/members/my").json<{ code: number; data: MemberInfo }>();
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
}
