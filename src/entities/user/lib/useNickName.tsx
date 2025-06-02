import { useQuery } from "@tanstack/react-query";
import { http } from "@/shared/lib/http";
import { InviteCodeResponse } from "../model/type";
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
      try {
        const res = await http.get(`api/couples/code/${inviteCode}/nickname`).json<NickNameInfo>();
        return res.data.nickname;
      } catch (error) {
        const err = error as InviteCodeResponse;
        if (err.code === 41003) {
          router.push(`/login?inviteCode=${inviteCode}`);
        }
        throw error;
      }
    },
    enabled: inviteCode.length === 6,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
