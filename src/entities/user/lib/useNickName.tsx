"use client";
import { useQuery } from "@tanstack/react-query";
import { httpNoThrow } from "@/shared/lib/http";
import { useRouter } from "next/navigation";

interface NickNameInfo {
  code: number;
  message: string;
  data: {
    nickname: string;
  };
}
export function useNickName({ inviteCode }: { inviteCode: string }) {
  const router = useRouter();
  return useQuery<string>({
    queryKey: ["nickName"],
    queryFn: async () => {
      const res = await httpNoThrow
        .get(`api/couples/code/${inviteCode}/nickname`)
        .json<NickNameInfo>();

      if (res.code !== 2000 && res.code === 41003) {
        router.push(`/login?inviteCode=${inviteCode}`);
        localStorage.setItem("inviteCode", inviteCode);
      }
      return res.data.nickname;
    },
    enabled: inviteCode.length === 6,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
