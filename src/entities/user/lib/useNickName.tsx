import { useQuery } from "@tanstack/react-query";
import { http } from "@/shared/lib/http";

interface NickNameInfo {
  code: number;
  message: string;
  data: {
    nickname: string;
  };
}
export function useNickName({ inviteCode }: { inviteCode: string }) {
  return useQuery<string>({
    queryKey: ["nickName"],
    queryFn: async () => {
      const res = await http.get(`api/couples/code/${inviteCode}/nickname`).json<NickNameInfo>();
      return res.data.nickname;
    },
    enabled: inviteCode.length === 6,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
